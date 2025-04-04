import type { APIRoute } from "astro";
import { auth, firestore } from "@/firebase/server";
import { Timestamp } from "firebase-admin/firestore";
import { sendEmail } from "@/lib/email";
import { jobAcceptedTemplate } from "@/emails/jobAcceptedTemplate";
import { userJobAcceptedTemplate } from "@/emails/userJobAcceptedTemplate";


export const POST: APIRoute = async ({ request, cookies }) => {
  const sessionCookie = cookies.get("__session")?.value;
  if (!sessionCookie) {
    return new Response(JSON.stringify({ success: false, message: "Unauthorized: No session cookie found." }), { status: 401 });
  }

  try {
    const decodedCookie = await auth.verifySessionCookie(sessionCookie);
    const userAuth = await auth.getUser(decodedCookie.uid);

    if (!userAuth || !userAuth.uid) {
      return new Response(JSON.stringify({ success: false, message: "User not found." }), { status: 404 });
    }

    const userRef = firestore.collection("users").doc(userAuth.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return new Response(JSON.stringify({ success: false, message: "User not found in Firestore." }), { status: 404 });
    }

    const userData = userDoc.data() || {};

    const userFirestore = userDoc.data() || {};
    const currentJobs = userFirestore.currentJobs || [];

    const userId = userAuth.uid;
    const userEmail = userAuth.email || "";
    const userName = userFirestore.name || "";
    const userSurname = userFirestore.surname || "";
    const userDisplayName = userAuth.displayName || userName;

    const { jobId } = await request.json();

    if (!jobId) {
      return new Response(JSON.stringify({ success: false, message: "Missing job ID." }), { status: 400 });
    }

    const jobRef = firestore.collection("jobs").doc(jobId);
    const jobDoc = await jobRef.get();

    if (!jobDoc.exists) {
      return new Response(JSON.stringify({ success: false, message: "Job not found." }), { status: 404 });
    }

    const jobData = jobDoc.data();

    if (jobData.assignedTo) {
      return new Response(JSON.stringify({ success: false, message: "Job is already assigned." }), { status: 400 });
    }

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

    if (userAuth.email) {
      const html = userJobAcceptedTemplate({
        userName: userData.name,
        jobTitle: jobData.title,
      });
    
      const text = `Hi ${userData.name},\n\nYou have successfully accepted the job: ${jobData.title}.`;
    
      await sendEmail({
        to: userAuth.email,
        subject: `Job "${jobData.title}" Assigned Successfully`,
        text,
        html,
      });
    }
    

    // Email: To the creator of the job
    const creator = jobData.createdBy;

    if (creator?.email) {
      const html = jobAcceptedTemplate({
        creatorName: creator.name,
        jobTitle: jobData.title,
        acceptedByName: `${userData.name} ${userData.surname}`,
      });

      const text = `Hello ${creator.name},\n\nYour job "${jobData.title}" was accepted by ${userData.name} ${userData.surname}.`;

      await sendEmail({
        to: creator.email,
        subject: `Your Job "${jobData.title}" Was Accepted`,
        text,
        html,
      });
    }
  
    // ✅ Atualizar o utilizador com o novo job
    await userRef.update({
      currentJobs: [
        ...currentJobs,
        {
          id: jobId,
          title: jobData.title,
        },
      ],
    });

    return new Response(JSON.stringify({ success: true, message: "Job assigned and notification sent." }), { status: 200 });
  } catch (error: any) {
    console.error("❌ Error assigning job:", error);
    return new Response(JSON.stringify({ success: false, message: error?.message || "Internal server error." }), { status: 500 });
  }
};
