import type { APIRoute } from "astro";
import { firestore, auth } from "@/firebase/server";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const POST: APIRoute = async ({ request }) => {
  const { jobId } = await request.json();
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];

  if (!idToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    // Verifica e obtém o utilizador autenticado
    const decodedToken = await auth.verifyIdToken(idToken);
    const userId = decodedToken.uid;

    // Obtém detalhes do job
    const jobRef = doc(firestore, "jobs", jobId);
    const jobSnap = await getDoc(jobRef);

    if (!jobSnap.exists()) {
      return new Response(JSON.stringify({ error: "Job not found" }), { status: 404 });
    }

    const jobData = jobSnap.data();

    // Verifica se o job já está atribuído ou não está "open"
    if (jobData.assigned || jobData.status !== "open") {
      return new Response(JSON.stringify({ error: "Job is no longer available" }), { status: 400 });
    }

    // Atualiza o job para atribuir ao utilizador
    await updateDoc(jobRef, {
      assigned: true,
      assignedTo: {
        id: userId,
        email: decodedToken.email,
        displayName: decodedToken.name || decodedToken.email.split("@")[0],
      },
      status: "in_progress", // Muda o status para indicar que foi iniciado
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
};
