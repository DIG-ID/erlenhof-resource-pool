import type { APIRoute } from "astro";
import { auth, firestore } from "@/firebase/server";
import { Timestamp } from "firebase-admin/firestore";
import { sendEmail } from "@/lib/email";
import { userJobAcceptedTemplate } from "@/emails/userJobAcceptedTemplate";
import { jobAcceptedTemplate } from "@/emails/jobAcceptedTemplate";
import { formatDate } from "@/lib/utils";

export const POST: APIRoute = async ({ request, cookies }) => {
  const sessionCookie = cookies.get("__session")?.value;
  if (!sessionCookie) {
    return new Response(JSON.stringify({ success: false, message: "Nicht autorisiert: Kein Sitzungscookie gefunden." }), { status: 401 });
  }

  try {
    const decodedCookie = await auth.verifySessionCookie(sessionCookie);
    const userAuth = await auth.getUser(decodedCookie.uid);

    if (!userAuth?.uid) {
      return new Response(JSON.stringify({ success: false, message: "Benutzer nicht gefunden." }), { status: 404 });
    }

    const userRef = firestore.collection("users").doc(userAuth.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return new Response(JSON.stringify({ success: false, message: "Benutzer nicht in Firestore gefunden." }), { status: 404 });
    }

    const userData = userDoc.data() || {};
    const currentJobs = userData.currentJobs || [];

    const { jobId } = await request.json();
    if (!jobId) {
      return new Response(JSON.stringify({ success: false, message: "Job-ID fehlt." }), { status: 400 });
    }

    const jobRef = firestore.collection("jobs").doc(jobId);
    const jobDoc = await jobRef.get();

    if (!jobDoc.exists) {
      return new Response(JSON.stringify({ success: false, message: "Job nicht gefunden." }), { status: 404 });
    }

    const jobData = jobDoc.data();
    
    if (jobData.assignedTo) {
      return new Response(JSON.stringify({ success: false, message: "Der Job wurde bereits zugewiesen." }), { status: 400 });
    }

    const formattedDate = formatDate(jobData.date, "short");

    const userId = userAuth.uid;
    const userEmail = userAuth.email || "";
    const userName = userData.name || "";
    const userSurname = userData.surname || "";
    const userDisplayName = userAuth.displayName || userName;

    // Atualiza o job no Firestore
    await jobRef.update({
      status: { id: "closed", name: "Closed" },
      updatedAt: Timestamp.now(),
      assignedTo: {
        id: userId,
        email: userEmail,
        displayName: userDisplayName,
        name: userName,
        surname: userSurname,
      },
    });

    // Email: para o utilizador que aceitou
    if (userEmail) {
      const html = userJobAcceptedTemplate({
        userName,
        jobShift: jobData.shift.name,
        jobDate: formattedDate,
        propertyName: jobData.property.name,
      });

      const text = `
        Guten Tag ${userName},

        Sie haben den folgenden Einsatz erfolgreich übernommen:

        Wohngruppe: ${jobData.property.name}
        Schicht: ${jobData.shift.name}
        Datum: ${formattedDate}

        Vielen Dank für Ihre Bestätigung.
        `.trim();

      await sendEmail({
        to: userEmail,
        subject: `Einsatz erfolgreich übernommen – ${jobData.shift.name} am ${formattedDate}`,
        text,
        html,
      });
    }


  // 🔍 Vai buscar o utilizador que criou o job, usando o ID da propriedade
    let creatorEmail = "";
    let creatorName = "";

    if (jobData.property?.id) {
      const creatorDoc = await firestore.collection("users").doc(jobData.property.id).get();
      if (creatorDoc.exists) {
        const creatorData = creatorDoc.data();
        creatorEmail = creatorData?.email || "";
        creatorName = creatorData?.name || "";
      }
    }


    // Email: para o criador do job

    if (creatorEmail) {
      const html = jobAcceptedTemplate({
        creatorName: creatorName,
        jobShift: jobData.shift.name,
        jobDate: formattedDate,
        propertyName: jobData.property.name,
        acceptedByName: `${userName} ${userSurname}`,
      });

      const text = `
      Guten Tag ${creatorName},
  
      Ihre Stelle in der Wohngruppe "${jobData.property.name}" wurde angenommen.
  
      Schicht: ${jobData.shift.name}
      Datum: ${formattedDate}
      Angenommen von: ${userName} ${userSurname}
  
      Vielen Dank.
    `.trim();

      await sendEmail({
        to: creatorEmail,
        subject: `Ihre Stelle wurde angenommen – ${jobData.shift.name} am ${formattedDate}`,
        text,
        html,
      });
    }

    const superAdminsSnapshot = await firestore
      .collection("users")
      .where("role.id", "==", "super_admin")
      .where("isActive", "==", true)
      .get();

    const superAdmins = superAdminsSnapshot.docs.map(doc => doc.data()).filter(admin => !!admin.email);

    await Promise.all(superAdmins.map((admin: any) => {
      const html = jobAcceptedTemplate({
        creatorName: admin.name || "Super Admin",
        jobShift: jobData.shift.name,
        jobDate: formattedDate,
        propertyName: jobData.property.name,
        acceptedByName: `${userName} ${userSurname}`,
      });
    
      const text = `
        Guten Tag ${admin.name || "Super Admin"},
        
        Ein Einsatz wurde angenommen:
        
        Wohngruppe: ${jobData.property.name}
        Schicht: ${jobData.shift.name}
        Datum: ${formattedDate}
        Angenommen von: ${userName} ${userSurname}
        `.trim();
    
      return sendEmail({
        to: admin.email,
        subject: `Einsatz angenommen – ${jobData.shift.name} am ${formattedDate}`,
        text,
        html,
      });
    }));
    

    // Atualizar o utilizador com o novo job
    await userRef.update({
      currentJobs: [
        ...currentJobs,
        {
          id: jobId,
          shift: `${jobData.shift.name} ${formattedDate}`,
          property: jobData.property.name,
          date: jobData.date,
        },
      ],
    });

    return new Response(JSON.stringify({ success: true, message: "Job wurde zugewiesen und Benachrichtigung versendet." }), { status: 200 });
  } catch (error: any) {
    console.error("❌ Error assigning job:", error);
    return new Response(JSON.stringify({ success: false, message: error?.message || "Internal server error." }), { status: 500 });
  }
};
