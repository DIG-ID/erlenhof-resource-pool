import type { APIRoute } from "astro";
import { firestore, auth } from "@/firebase/server";
import { baseEmailLayout } from "@/emails/baseEmailLayout";
import { sendEmail } from "@/lib/email";
import { getAppUrl } from "@/lib/utils";
import { parsePhoneNumberWithError, isValidPhoneNumber } from "libphonenumber-js";

export const POST: APIRoute = async ({ params, request, redirect }) => {
  const id = params?.id;
  if (!id) return new Response("Missing user ID", { status: 400 });

  const formData = await request.formData();
  const updates: Record<string, any> = {};
  let shouldNotifyActivation = false;

  // 🔐 Verificar campos
  const name = formData.get("name")?.toString();
  const surname = formData.get("surname")?.toString();
  const displayName = formData.get("displayName")?.toString();
  const email = formData.get("email")?.toString();
  const phone = formData.get("phone")?.toString();
  const role = formData.get("role")?.toString();
  const pool = formData.get("pools")?.toString();
  const education = formData.get("education")?.toString();
  const isActive = formData.has("isActive");

  try {
    const docRef = firestore.collection("users").doc(id);
    const snapshot = await docRef.get();
    const existingData = snapshot.data();

    if (!existingData) throw new Error("User not found in Firestore");

    // 🛡️ Se ativar o utilizador agora e antes estava desativado
    if (!existingData.isActive && isActive) {
      shouldNotifyActivation = true;
    }

    // 🔧 Atualizar campos (apenas se fornecidos)
    if (name) updates.name = name;
    if (surname) updates.surname = surname;
    if (displayName) updates.displayName = displayName;
    if (role) updates.role = JSON.parse(role);
    if (pool) updates.pool = JSON.parse(pool);
    if (education) updates.education = JSON.parse(education);
    updates.isActive = isActive;

    if (phone) {
      const isValid = isValidPhoneNumber(phone);
      if (!isValid) return new Response("Invalid phone number", { status: 400 });
      try {
        updates.phoneNumber = parsePhoneNumberWithError(phone).number;
      } catch {
        updates.phoneNumber = phone; // fallback
      }
    }

    // 🔄 Atualiza o Firestore
    await docRef.update(updates);

    // 🔄 Atualiza Firebase Auth
    const user = await auth.getUser(id);
    await auth.updateUser(id, {
      email: email || user.email,
      displayName: displayName || user.displayName,
      phoneNumber: updates.phoneNumber || user.phoneNumber,
    });

    // 📬 Enviar email se for ativado agora
    if (shouldNotifyActivation) {
      const html = baseEmailLayout({
        title: "Account Approved.",
        previewText: "Your account has been reviewed and approved",
        bodyContent: `
          <p>Your account has been reviewed and successfully approved by our team.</p>
          <p>You can now <a href="${getAppUrl()}/auth/login">log in</a> to access the platform.</p>
          <p style="margin-top: 20px;">
            <a href="${getAppUrl()}" style="background-color:#0f172b;padding:10px 18px;color:#ffffff;border-radius:4px;text-decoration:none;display:inline-block;">
              Login
            </a>
          </p>
        `,
      });

      await sendEmail({
        to: user.email!,
        subject: "Your account has been approved.",
        html,
        text: "Your account has been approved. You can now log in to the platform.",
      });
    }

    return redirect(`/users/edit/${id}?success=true`);
  } catch (error: any) {
    console.error("❌ Error updating user:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};

export const DELETE: APIRoute = async ({ params, redirect }) => {
  const id = params?.id;
  if (!id) return new Response("Missing user ID", { status: 400 });

  try {
    await firestore.collection("users").doc(id).delete();
    await auth.deleteUser(id);
    return redirect("/users/users");
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
