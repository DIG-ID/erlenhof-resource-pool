import type { APIRoute } from "astro";
import { firestore } from "@/firebase/server";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { notifyUsersForJob } from "@/lib/email-notifications/notify-user-for-job";

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const notes = formData.get("notes")?.toString();
  const educationObj = formData.get("education")?.toString();
  const shiftObj = formData.get("shifts")?.toString();
  const rawDate = formData.get("date")?.toString();

  const parsedDate = rawDate ? new Date(rawDate) : null;

  if (!parsedDate || isNaN(parsedDate.getTime())) {
    return new Response("Invalid or missing job date", { status: 400 });
  }

  const timestampDate = Timestamp.fromDate(parsedDate);

  // Validate required fields
  if (!title || !description || !educationObj || !shiftObj ) {
    return new Response("Missing required fields", { status: 400 });
  }

  const user = locals.userData;

  // Ensure user is authenticated
  if (!user) {
    return new Response("Unauthorized access", { status: 401 });
  }

  try {
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
      date: timestampDate,
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
