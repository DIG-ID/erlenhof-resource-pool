import type { APIRoute } from "astro";
import { firestore, auth } from "@/firebase/server";

const usersRef = firestore.collection("users");

function isValidPhoneNumber(phone?: string): boolean {
  if (!phone) return true; // ✅ Aceita `undefined` porque não é obrigatório
  return /^\+\d{10,15}$/.test(phone);
}

export const POST: APIRoute = async ({ params, redirect, request }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const surname = formData.get("surname")?.toString();
  const displayName = formData.get("displayName")?.toString();
  const email = formData.get("email")?.toString();
  const phone = formData.get("phone")?.toString();
  const role = formData.get("role")?.toString(); // 🔹 Corrigido
  const pool = formData.get("pools")?.toString();
  const education = formData.get("education")?.toString();
  const isActive = formData.has("isActive"); // 🔹 Corrigido

  if (phone && !isValidPhoneNumber(phone)) {
    return new Response("Invalid phone number format", { status: 400 });
  }

  if (!params?.id) {
    return new Response(JSON.stringify({ error: "Invalid user ID" }), { status: 400 });
  }

  if (!name || !surname || !displayName || !email || !role) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }

  try {
    // 🔹 Atualizar Firebase Authentication
    const user = await auth.getUser(params.id);
    await auth.updateUser(user.uid, {
      email: email,
      displayName: displayName,
      phoneNumber: phone || undefined,
    });

    // 🔹 Atualizar Firestore
    await usersRef.doc(params.id).update({
      name,
      surname,
      isActive,
      role,
      pool,
      education,
    });

    return redirect(`/users/edit/${params.id}?success=true`);
  } catch (error) {
    console.error("❌ Erro ao atualizar utilizador:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};


export const DELETE: APIRoute = async ({ params, redirect }) => {
  if (!params.id) {
    return new Response("Cannot find User", {
      status: 404,
    });
  }

  try {
    await usersRef.doc(params.id).delete();
    await auth.deleteUser(params.id);
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/users/users");
};