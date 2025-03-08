import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { app } from "../../../firebase/server";

export const POST: APIRoute = async ({ request, redirect }) => {
  const auth = getAuth(app);
  const db = getFirestore(app);

  // Get form data
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const surname = formData.get("surname")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password || !name || !surname) {
    return new Response(
      "Missing form data",
      { status: 400 }
    );
  }

  // Create user in Firebase Authentication
  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    // Add additional user data to Firestore
    await db.collection("users").doc(userRecord.uid).set({
      email,
      name,
      surname,
      role: "level_1", // Default role
      isActive: false, // Default status
      createdAt: FieldValue.serverTimestamp(),
    });

    return redirect("/signin");
  } catch (error: any) {
    if (error.code === "auth/email-already-exists") {
      return new Response("Email already in use", { status: 400 });
    } else if (error.code === "auth/invalid-email") {
      return new Response("Invalid email", { status: 400 });
    } else {
      console.error("Error creating user: ", error);
      return new Response("Something went wrong", { status: 500 });
    }
  }
};