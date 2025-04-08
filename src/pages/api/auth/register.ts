import type { APIRoute } from "astro";
import { auth, firestore } from "@/firebase/server";
import { sendEmail } from "@/lib/email";
import { baseEmailLayout } from "@/emails/baseEmailLayout";
import { getAppUrl } from "@/lib/utils";
import { registerSchema } from "@/lib/schemas/register";
import { parsePhoneNumberWithError } from "libphonenumber-js";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const result = registerSchema.safeParse(body);

  if (!result.success) {
  return new Response(JSON.stringify({ error: "Invalid data" }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
  }

  const { name, surname, email, password, phoneNumber } = result.data;
  let formattedPhone = phoneNumber;
  try {
    formattedPhone = parsePhoneNumberWithError(phoneNumber).number;
  } catch {
    // fallback: mantém o que o utilizador submeteu
    formattedPhone = phoneNumber;
  }
  // 🛡️ Validação mínima no backend (em produção valida com zod também!)
  if (!email || !password || !name || !surname || !phoneNumber) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {

    // Verifica se já existe utilizador com este email
    const existingUser = await auth.getUserByEmail(email).catch(() => null);

    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already in use" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 🔐 Cria utilizador no Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: `${name} ${surname}`,
    });

    // 📝 Guarda no Firestore com valores default
    await firestore.collection("users").doc(userRecord.uid).set({
      role: { id: "user", name: "User" },
      isActive: false,
      name,
      surname,
      email,
      phoneNumber: formattedPhone,
    });

    // 🔍 Busca todos os Super Admins
    const superAdminsSnapshot = await firestore
      .collection("users")
      .where("role.id", "==", "super_admin")
      .get();

    // 📬 Se houver Super Admins, notifica por email
    if (!superAdminsSnapshot.empty) {
      const appUrl = getAppUrl();
      const profileLink = `${appUrl}/users/${userRecord.uid}`;

      const subject = `New user registered: ${name} ${surname}`;

      const text = `
        A new user has just registered on the platform.
        
        Name: ${name} ${surname}
        Email: ${email}
        
        Please review and activate their account so they can access the application:
        ${profileLink}
        `.trim();
      

      const html = baseEmailLayout({
        title: "New User Registration",
        previewText: `New signup: ${email}`,
        bodyContent: `
          <p>Hello,</p>
          <p>A new user has registered and is awaiting approval.</p>
          <p>
            <strong>Name:</strong> ${name} ${surname}<br/>
            <strong>Email:</strong> ${email}
          </p>
          <p>Please review their profile and activate the account to grant access to the application.</p>
          <p style="margin-top: 20px;">
            <a href="${profileLink}" style="background-color:#0f172b;padding:10px 18px;color:#ffffff;border-radius:4px;text-decoration:none;display:inline-block;">
              View User Profile
            </a>
          </p>
        `,
      });

      await Promise.all(
        superAdminsSnapshot.docs.map((doc) =>
          sendEmail({
            to: doc.data().email,
            subject,
            html,
            text,
          })
        )
      );
    }

    return new Response(
      JSON.stringify({ success: true, email: userRecord.email }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("❌ Error registering user:", error instanceof Error ? error.message : error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
