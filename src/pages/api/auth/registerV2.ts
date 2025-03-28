import type { APIRoute } from "astro";
import { auth, firestore } from "@/firebase/server";


export const POST: APIRoute = async ({ request }) => {
  const body = await request.json(); // ✅ Agora aceita JSON corretamente

  if (!body.email || !body.password) {
    return new Response("Dados inválidos", { status: 400 });
  }

  try {
    const userRecord = await auth.createUser({
      email: body.email,
      password: body.password,
    });

    await firestore.collection("users").doc(userRecord.uid).set({
      role: { id: "user", name: "User" },
      isActive: false,
      name: body.name,
      surname: body.surname,
      phoneNumber: body.phoneNumber,
    });

    return new Response(JSON.stringify({ success: true, email: userRecord.email }), { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar utilizador:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

