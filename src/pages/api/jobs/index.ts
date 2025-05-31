import type { APIRoute } from "astro";
import { firestore } from "@/firebase/server";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { notifyUsersForJob } from "@/lib/email-notifications/notify-user-for-job";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
import { sendEmail } from "@/emails/sendGrid";
import { baseEmailLayout } from "@/emails/baseEmailLayout";
import { getAppUrl } from "@/lib/utils";
import type { Property } from "@/lib/types";
>>>>>>> Stashed changes

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const notes = formData.get("notes")?.toString();
  const educationObj = formData.get("education")?.toString();
  const shiftObj = formData.get("shifts")?.toString();
  const date = formData.get("date")?.toString();

  // Validate required fields
  if (!title || !description || !educationObj || !shiftObj || !date) {
    return new Response("Missing required fields", { status: 400 });
  }

  const user = locals.userData;

  // Ensure user is authenticated
  if (!user) {
    return new Response("Unauthorized access", { status: 401 });
  }

  try {
    const parsedDate = Timestamp.fromDate(new Date(date));
    const jobsRef = firestore.collection("jobs");

    // Create job document in Firestore
    const jobDocRef = await jobsRef.add({
      title,
      description,
      notes,
      shift: JSON.parse(shiftObj),
      education: JSON.parse(educationObj),
      status: {
        id: "open",
        name: "Open",
      },
      pool: {
        id: "level_1",
        name: "Level 1",
      },
      createdAt: FieldValue.serverTimestamp(),
      date: parsedDate,
      createdBy: {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
      },
      assignedTo: null,
    });
    
    const jobId = jobDocRef.id;

    // Notify eligible users based on education and pool
    const jobData = {
      id: jobId,
      title,
      education: JSON.parse(educationObj),
      pool: {
        id: "level_1",
        name: "Level 1",
      },
    };

    await notifyUsersForJob(jobData);

  } catch (error) {
    console.error("Failed to create job or notify users:", error);
    return new Response("Failed to create job or notify users", { status: 500 });
  }

  return redirect("/jobs/jobs");
};
