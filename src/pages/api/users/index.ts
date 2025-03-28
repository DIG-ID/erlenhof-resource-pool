import type { APIRoute } from "astro";
import { auth, firestore } from "@/firebase/server";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();

  const name = formData.get("name")?.toString();
  const surname = formData.get("surname")?.toString();
  const displayName = formData.get("displayName")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const roleObj = formData.get("roles")?.toString();
  const isActive = formData.get("isActive") === "on";

  if (!email || !password || !name || !surname || !displayName || !roleObj) {
    return new Response("Missing form data", { status: 400 });
  }

  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
    });

    const userRef = firestore.collection("users").doc(userRecord.uid);

    await userRef.set({
      name,
      surname,
      displayName,
      email,
      isActive,
      role: JSON.parse(roleObj),
      currentJobs: [],
    });

    return redirect("/users/users");
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
