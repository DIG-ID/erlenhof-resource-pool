import type { APIRoute } from "astro";
import { auth, firestore } from "@/firebase/server";
import { Timestamp } from "firebase-admin/firestore";
import type { UserData } from "@/lib/types";

export const POST: APIRoute = async ({ request, cookies }) => {
  // 🔍 Verificar o cookie de sessão
  const sessionCookie = cookies.get("__session")?.value;
  if (!sessionCookie) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    // ✅ Obter o utilizador autenticado do Firebase Authentication
    const decodedCookie = await auth.verifySessionCookie(sessionCookie);
    const userAuth = await auth.getUser(decodedCookie.uid);

    if (!userAuth || !userAuth.uid) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // 🔥 Buscar os dados do utilizador na Firestore
    const userRef = firestore.collection("users").doc(decodedCookie.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return new Response(JSON.stringify({ error: "User not found in Firestore" }), { status: 404 });
    }

    const userFirestore = userDoc.data() as Partial<UserData>;

    // 🔹 Combinar os dados de Authentication e Firestore num único objeto `userData`
    const userData: UserData = {
      id: userAuth.uid,
      email: userAuth.email || "",
      displayName: userAuth.displayName || userFirestore.name || "",
      name: userFirestore.name || "",
      surname: userFirestore.surname || "",
      role: userFirestore.role || "user",
      isActive: userFirestore.isActive ?? false, // Se não existir, assume `false`
      creationTime: userAuth.metadata.creationTime || "",
      lastSignInTime: userAuth.metadata.lastSignInTime || "",
      emailVerified: userAuth.emailVerified || false,
      phoneNumber: userAuth.phoneNumber || "",
      disabled: userAuth.disabled || false,
      photoURL: userAuth.photoURL || "",
      lastRefreshTime: userAuth.metadata.lastRefreshTime || "",
      currentJobs: userFirestore.currentJobs || [],
    };

    // 📌 Obter o ID do job do formulário
    const formData = await request.formData();
    const jobId = formData.get("jobId")?.toString();

    if (!jobId) {
      return new Response(JSON.stringify({ error: "Missing job ID" }), { status: 400 });
    }

    // 🔍 Buscar o job no Firestore
    const jobRef = firestore.collection("jobs").doc(jobId);
    const jobDoc = await jobRef.get();

    if (!jobDoc.exists) {
      return new Response(JSON.stringify({ error: "Job not found" }), { status: 404 });
    }

    const jobData = jobDoc.data();

    // ❌ Verificar se o job já está atribuído
    if (jobData.assigned) {
      return new Response(JSON.stringify({ error: "Job is already assigned" }), { status: 400 });
    }

    // 🚀 Atualizar o job no Firestore
    await jobRef.update({
      assigned: true,
      status: "Closed",
      updatedAt: Timestamp.now(),
      assignedTo: {
        id: userData.id,
        email: userData.email,
        displayName: userData.displayName,
        name: userData.name,
        surname: userData.surname,
      },
    });

    // 🚀 Atualizar o utilizador no Firestore com o novo job na lista `currentJobs`
    await userRef.update({
      currentJobs: [
        ...userData.currentJobs,
        {
          id: jobId,
          title: jobData.title,
        },
      ],
    });

    return new Response(JSON.stringify({ success: true, message: "Job assigned successfully" }), { status: 200 });

  } catch (error) {
    console.error("❌ Error assigning job:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
};
