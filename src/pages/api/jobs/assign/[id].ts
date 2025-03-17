import type { APIRoute } from "astro";
import { firestore } from "@/firebase/server";
import { Timestamp } from "firebase-admin/firestore";

const jobsRef = firestore.collection("jobs");
const usersRef = firestore.collection("users");

export const POST: APIRoute = async ({ params, redirect, request }) => {
  // Captura os dados enviados pelo formulário
  const formData = await request.formData();
  const jobId = formData.get("jobId")?.toString();


  console.log(jobId)

  if (!jobId) {
    return new Response("Missing job id", { status: 400 });
  }

  if (!params.id) {
    return new Response("Cannot find jobbbb", { status: 404 });
  }

  try {
    // Buscar o job antes de atualizar para preservar `assigned` e `assignedTo`
    const jobDoc = await jobsRef.doc(params.id).get();

    if (!jobDoc.exists) {
      return new Response("Job not found", { status: 404 });
    }

    const jobData = jobDoc.data();

    await jobsRef.doc(params.id).update({
      status,
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