import type { APIRoute } from "astro";
import { auth, firestore } from "@/firebase/server";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
import { sendEmail } from "@/emails/sendGrid";
import { baseEmailLayout } from "@/emails/baseEmailLayout";
import { getAppUrl } from "@/lib/utils";
import { registerSchema } from "@/lib/schemas/register";
import { parsePhoneNumberWithError } from "libphonenumber-js";
>>>>>>> Stashed changes

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  if (!body.email || !body.password) {
    return new Response(JSON.stringify({ error: "Invalid data" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
   console.log("Creating user with:", body);
    const userRecord = await auth.createUser({
      email: body.email,
      password: body.password,
    });

    await firestore.collection("users").doc(userRecord.uid).set({
      role: { id: "user", name: "User" },
      isActive: false,
      name: body.name,
      surname: body.surname,
      email: body.email,
      phoneNumber: body.phoneNumber,
    });

    return new Response(
      JSON.stringify({ success: true, email: userRecord.email }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};


