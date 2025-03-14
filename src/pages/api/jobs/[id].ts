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
  const roles = formData.get("roles")?.toString();
  const status = formData.get("status")?.toString();
  const date = formData.get("date")?.toString(); // Data vinda do formulário

  if (!title || !description || !roles || !status || !date) {
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
      roles,
      status,
      date: parsedDate, // 🔥 Agora atualizado como Timestamp
      updatedAt: Timestamp.now(),
      assigned: jobData?.assigned || false, // Mantém o estado de assigned
      assignedTo: jobData?.assignedTo || null, // Mantém um único utilizador ou null
    });

  } catch (error) {
    console.error("Error updating job:", error);
    return new Response("Something went wrong", { status: 500 });
  }

  return redirect("/jobs/jobs");
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
