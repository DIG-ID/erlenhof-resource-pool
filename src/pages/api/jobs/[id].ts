import type { APIRoute } from "astro";
import { firestore } from "@/firebase/server";
import { Timestamp } from "firebase-admin/firestore";

const jobsRef = firestore.collection("jobs");

export const POST: APIRoute = async ({ params, redirect, request }) => {
  // Captura os dados enviados pelo formulário
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

  if (!title || !description || !shiftObj || !educationObj ) {
    return new Response("Missing required fields", { status: 400 });
  }

  if (!params.id) {
    return new Response("Cannot find job", { status: 404 });
  }

  try {
    // Buscar o job antes de atualizar para preservar `assigned` e `assignedTo`
    const jobDoc = await jobsRef.doc(params.id).get();

    if (!jobDoc.exists) {
      return new Response("Job not found", { status: 404 });
    }

    const jobData = jobDoc.data();

    await jobsRef.doc(params.id).update({
      title,
      description,
      notes,
      shift: JSON.parse(shiftObj),
      education: JSON.parse(educationObj),
      date: timestampDate,
      updatedAt: Timestamp.now(),
      assignedTo: jobData?.assignedTo || null,
    });

  } catch (error) {
    console.error("Error updating job:", error);
    return new Response("Something went wrong", { status: 500 });
  }

  return redirect(`/jobs/edit/${params.id}?success=true`);
};

export const DELETE: APIRoute = async ({ params, redirect }) => {
  if (!params.id) {
    return new Response("Cannot find job", { status: 404 });
  }

  try {
    const jobRef = jobsRef.doc(params.id);
    const jobDoc = await jobRef.get();

    if (!jobDoc.exists) {
      return new Response("Job not found", { status: 404 });
    }

    const jobData = jobDoc.data();

    // 🔍 Se o job tiver assignedTo, remove dos currentJobs do utilizador
    const assignedTo = jobData?.assignedTo;

    if (assignedTo?.id) {
      const userRef = firestore.collection("users").doc(assignedTo.id);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        const updatedJobs = (userData.currentJobs || []).filter(
          (job: any) => job.id !== params.id
        );

        await userRef.update({
          currentJobs: updatedJobs,
        });
      }
    }

    // 🗑️ Finalmente, apagar o job
    await jobRef.delete();
  } catch (error) {
    console.error("Error deleting job:", error);
    return new Response("Something went wrong", { status: 500 });
  }

  return redirect("/jobs/jobs");
};

