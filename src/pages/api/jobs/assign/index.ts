import type { APIRoute } from "astro";
import { auth, firestore } from "@/firebase/server";
import { Timestamp } from "firebase-admin/firestore";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(import.meta.env.SENDGRID_API_KEY);

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

    await userRef.update({
      currentJobs: [
        ...currentJobs,
        {
          id: jobId,
          title: jobData.title,
        },
      ],
    });

    await sgMail.send({
      to: jobData.createdBy.email,
      from: "no-reply@yournewwebsite.ch",
      subject: `Job \"${jobData.title}\" has been assigned`,
      text: `${userName} ${userSurname} has applied for the job \"${jobData.title}\".`,
      html: `
        <p><strong>${userName} ${userSurname}</strong> has applied for the job "<strong>${jobData.title}</strong>".</p>
        <p><a href="${import.meta.env.SITE_URL}/jobs/${jobId}">View job details</a></p>
      `,
    });

    return new Response(JSON.stringify({ success: true, message: "Job assigned and notification sent." }), { status: 200 });
  } catch (error: any) {
    console.error("❌ Error assigning job:", error);
    return new Response(JSON.stringify({ success: false, message: error?.message || "Internal server error." }), { status: 500 });
  }
};
