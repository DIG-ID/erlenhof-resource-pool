import type { APIRoute } from "astro";
import { auth, firestore } from "@/firebase/server";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const POST: APIRoute = async ({ request, redirect }) => {
  // Obter dados do formulário
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const surname = formData.get("surname")?.toString();
  const displayName = formData.get("displayName")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const role = formData.get("roles")?.toString();
  const isActive = formData.get("isActive") === "on"; // O checkbox retorna "on" se marcado

  if (!email || !password || !name || !surname || !role) {
    return new Response("Missing form data", { status: 400 });
  }

  try {
    // 1️⃣ **Verifica se a role existe no Firestore**
    const roleRef = doc(firestore, "roles", role);
    const roleSnap = await getDoc(roleRef);
    if (!roleSnap.exists()) {
      return new Response(`Role "${role}" does not exist.`, { status: 400 });
    }

    // 2️⃣ **Cria o utilizador no Firebase Authentication**
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
      disabled: !isActive, // Se isActive = false, a conta fica desativada
    });

    // 3️⃣ **Adiciona os dados do utilizador no Firestore**
    const userRef = doc(firestore, "users", userRecord.uid);
    await setDoc(userRef, {
      id: userRecord.uid,
      name,
      surname,
      displayName,
      email,
      isActive,
      role,
      currentJobs: [], // O utilizador começa sem jobs atribuídos
    });

    return redirect("/users/users"); // Redireciona para a lista de utilizadores
  } catch (error: any) {
    console.error("Error creating user:", error);
    if (error.code === "auth/email-already-exists") {
      return new Response("Email already in use", { status: 400 });
    } else if (error.code === "auth/invalid-email") {
      return new Response("Invalid email", { status: 400 });
    } else {
      return new Response("Something went wrong", { status: 500 });
    }
  }
};
