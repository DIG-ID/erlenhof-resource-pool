import type { APIRoute } from "astro";
import { app } from "@/firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const age = formData.get("age")?.toString();
  const isBestFriend = formData.get("isBestFriend") === "on";
  const isActive = false
  const role = "level_1";

  if (!name || !age) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }
  try {
    const db = getFirestore(app);
    const usersRef = db.collection("users");

    // Verifica se a role existe
    const roleRef = db.collection("roles").where("name", "==", role);
    const roleSnapshot = await roleRef.get();
    if (roleSnapshot.empty) {
      throw new Error(`Role "${role}" does not exist.`);
    }

    await usersRef.add({
      name,
      age: parseInt(age),
      isBestFriend,
      isActive,
      role,
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/users/users");
};