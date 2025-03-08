import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { app } from "../../firebase/server";

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
      createdAt: new Date().toISOString(),
    });

    return redirect("/signin");
  } catch (error: any) {
    return new Response(
      "Something went wrong",
      { status: 400 }
    );
  }
};