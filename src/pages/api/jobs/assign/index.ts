// src/page/api/jobs/assign/index.ts

import type { APIRoute } from "astro";
import { auth, firestore } from "@/firebase/server";
import { Timestamp } from "firebase-admin/firestore";
import { sendEmail } from "@/lib/email";
import { baseEmailLayout } from "@/emails/baseEmailLayout";

// 🚀 Atribuição de job a um utilizador autenticado
export const POST: APIRoute = async ({ request, cookies }) => {
  const sessionCookie = cookies.get("__session")?.value;

  if (!sessionCookie) {
    return new Response(
      JSON.stringify({ success: false, message: "Nicht autorisiert: Kein Sitzungscookie gefunden." }),
      { status: 401 }
    );
  }

  try {
    // 🔐 Validar sessão e obter dados do utilizador autenticado
    const decoded = await auth.verifySessionCookie(sessionCookie);
    const authUser = await auth.getUser(decoded.uid);

    if (!authUser?.uid) {
      return new Response(JSON.stringify({ success: false, message: "Benutzer nicht gefunden." }), { status: 404 });
    }

    const userRef = firestore.collection("users").doc(authUser.uid);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      return new Response(JSON.stringify({ success: false, message: "Benutzer nicht in Firestore gefunden." }), { status: 404 });
    }

    const user = userSnap.data()!;
    const currentJobs = user.currentJobs || [];

    // 📦 Receber ID do job
    const { jobId } = await request.json();
    if (!jobId) {
      return new Response(JSON.stringify({ success: false, message: "Job-ID fehlt." }), { status: 400 });
    }

    const jobRef = firestore.collection("jobs").doc(jobId);
    const jobSnap = await jobRef.get();

    if (!jobSnap.exists) {
      return new Response(JSON.stringify({ success: false, message: "Job nicht gefunden." }), { status: 404 });
    }

    const job = jobSnap.data()!;
    if (job.assignedTo) {
      return new Response(JSON.stringify({ success: false, message: "Der Job wurde bereits zugewiesen." }), { status: 400 });
    }

    const formattedDate = job.date?.toDate?.()?.toLocaleDateString("de-DE") ?? "Unbekanntes Datum";
    const userName = user.name || "";
    const userSurname = user.surname || "";
    const userEmail = authUser.email || "";

    // 📝 Atualizar job como atribuído
    await jobRef.update({
      status: { id: "closed", name: "Closed" },
      updatedAt: Timestamp.now(),
      assignedTo: {
        id: authUser.uid,
        email: userEmail,
        name: userName,
        surname: userSurname,
        displayName: authUser.displayName || userName,
      },
    });

    // 📧 Enviar email ao utilizador
    if (userEmail) {
      const html = baseEmailLayout({
        title: "Einsatz erfolgreich angenommen",
        previewText: `Du hast den Einsatz ${job.shift.name} am ${formattedDate} angenommen`,
        bodyContent: `
          <p>Guten Tag ${userName},</p>
          <p>Du hast den folgenden Einsatz verbindlich angenommen:</p>
          <p>
            <strong>Wohngruppe:</strong> ${job.property.name}<br/>
            <strong>Schicht:</strong> ${job.shift.name}<br/>
            <strong>Datum:</strong> ${formattedDate}
          </p>
          <p>Vielen Dank für deinen Einsatz.</p>
        `,
      });

      const text = `
        Guten Tag ${userName},

        Du hast den folgenden Einsatz verbindlich angenommen:

        Wohngruppe: ${job.property.name}
        Schicht: ${job.shift.name}
        Datum: ${formattedDate}

        Vielen Dank für deine Bestätigung.
      `.trim();

      await sendEmail({
        to: userEmail,
        subject: `Einsatz erfolgreich angenommen – ${job.shift.name} am ${formattedDate}`,
        text,
        html,
      });
    }

    // 🔍 Procurar criador do job (usuário com ID igual ao property.id)
    let creatorEmail = "";
    let creatorName = "";
    if (job.property?.id) {
      const creatorSnap = await firestore.collection("users").doc(job.property.id).get();
      if (creatorSnap.exists) {
        const creator = creatorSnap.data();
        creatorEmail = creator?.email || "";
        creatorName = creator?.name || "";
      }
    }

    // 📧 Enviar email ao criador do job
    if (creatorEmail) {
      const html = baseEmailLayout({
        title: `Job angenommen – ${job.shift.name} am ${formattedDate}`,
        previewText: `${userName} ${userSurname} hat deine Jobausschreibung am ${formattedDate} angenommen`,
        bodyContent: `
          <p>Guten Tag ${creatorName},</p>
          <p>Eine Jobausschreibung wurde erfolgreich von <strong>${userName} ${userSurname}</strong> angenommen.</p>
          <p>
            <strong>Wohngruppe:</strong> ${job.property.name}<br/>
            <strong>Schicht:</strong> ${job.shift.name}<br/>
            <strong>Datum:</strong> ${formattedDate}
          </p>
        `,
      });

      const text = `
        Guten Tag ${creatorName},

        Deine Jobausschreibung in der Wohngruppe "${job.property.name}" wurde angenommen.

        Schicht: ${job.shift.name}
        Datum: ${formattedDate}
        Angenommen von: ${userName} ${userSurname}

        Vielen Dank.
      `.trim();

      await sendEmail({
        to: creatorEmail,
        subject: `Deine Jobausschreibung wurde angenommen – ${job.shift.name} am ${formattedDate}`,
        text,
        html,
      });
    }

    // 📧 Notificar todos os Super Admins
    const superAdminsSnap = await firestore
      .collection("users")
      .where("role.id", "==", "super_admin")
      .where("isActive", "==", true)
      .get();

    await Promise.all(
      superAdminsSnap.docs.map((doc) => {
        const admin = doc.data();
        if (!admin.email) return;

        const html = baseEmailLayout({
          title: `Job angenommen – ${job.shift.name} am ${formattedDate}`,
          previewText: `${userName} ${userSurname} hat den Einsatz angenommen`,
          bodyContent: `
            <p>Guten Tag ${admin.name || "Super Admin"},</p>
            <p>Ein Einsatz wurde angenommen:</p>
            <p>
              <strong>Wohngruppe:</strong> ${job.property.name}<br/>
              <strong>Schicht:</strong> ${job.shift.name}<br/>
              <strong>Datum:</strong> ${formattedDate}<br/>
              <strong>Angenommen von:</strong> ${userName} ${userSurname}
            </p>
          `,
        });

        const text = `
          Guten Tag ${admin.name || "Super Admin"},

          Ein Einsatz wurde angenommen:

          Wohngruppe: ${job.property.name}
          Schicht: ${job.shift.name}
          Datum: ${formattedDate}
          Angenommen von: ${userName} ${userSurname}
        `.trim();

        return sendEmail({
          to: admin.email,
          subject: `Einsatz angenommen – ${job.shift.name} am ${formattedDate}`,
          text,
          html,
        });
      })
    );

    // 🧾 Atualizar utilizador com o novo job
    await userRef.update({
      currentJobs: [
        ...currentJobs,
        {
          id: jobId,
          shift: `${job.shift.name} ${formattedDate}`,
          property: job.property.name,
          date: job.date,
        },
      ],
    });

    // ✅ Sucesso
    return new Response(
      JSON.stringify({ success: true, message: "Job wurde zugewiesen und Benachrichtigung versendet." }),
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ Error assigning job:", error);
    return new Response(
      JSON.stringify({ success: false, message: error?.message || "Internal server error." }),
      { status: 500 }
    );
  }
};
