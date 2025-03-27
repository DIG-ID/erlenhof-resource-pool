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
  const date = formData.get("date")?.toString();

  if (!title || !description || !shiftObj || !educationObj || !date) {
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

    // 🔥 Converte a data para um Timestamp do Firestore
    const parsedDate = Timestamp.fromDate(new Date(date));

    await jobsRef.doc(params.id).update({
      title,
      description,
      notes,
      shift: JSON.parse(shiftObj),
      education: JSON.parse(educationObj),
      date: parsedDate,
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
    const jobDoc = await jobsRef.doc(params.id).get();

    if (!jobDoc.exists) {
      return new Response("Job not found", { status: 404 });
    }

    await jobsRef.doc(params.id).delete();
  } catch (error) {
    console.error("Error deleting job:", error);
    return new Response("Something went wrong", { status: 500 });
  }

  return redirect("/jobs/jobs");
};
