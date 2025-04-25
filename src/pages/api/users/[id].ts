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
  const updates: Record<string, any> = {}; // irá conter apenas os campos a atualizar
  let shouldNotifyActivation = false;

  // 📝 Captura dos dados do formulário
  const name = formData.get("name")?.toString();
  const surname = formData.get("surname")?.toString();
  const displayName = formData.get("displayName")?.toString();
  const email = formData.get("email")?.toString();
  const phone = formData.get("phone")?.toString();
  const roleRaw = formData.get("role")?.toString();
  const poolRaw = formData.get("pools")?.toString();
  const educationRaw = formData.get("education")?.toString();
  const isActive = formData.has("isActive");

  // Campos do role "property"
  const propertyName = formData.get("propertyName")?.toString();
  const propertyEmail = formData.get("propertyEmail")?.toString();
  const propertyPhone = formData.get("propertyPhone")?.toString();
  const propertyMobile = formData.get("propertyMobile")?.toString();
  const propertyAddress = formData.get("propertyAddress")?.toString();
  const teamLeaderName = formData.get("teamLeaderName")?.toString();
  const teamLeaderEmail = formData.get("teamLeaderEmail")?.toString();
  const teamLeaderPhone = formData.get("teamLeaderPhone")?.toString();

  try {
    // 🔍 Busca o documento no Firestore
    const docRef = firestore.collection("users").doc(id);
    const snapshot = await docRef.get();
    const existingData = snapshot.data();
    if (!existingData) throw new Error("User not found in Firestore");

    const userAuth = await auth.getUser(id); // Firebase Authentication

    // 📩 Verifica se foi ativado agora (para enviar email)
    if (!existingData.isActive && isActive) {
      shouldNotifyActivation = true;
    }

    // ✏️ Atualiza apenas se os campos foram enviados
    if (name) updates.name = name;
    if (surname) updates.surname = surname;
    if (displayName) updates.displayName = displayName;
    if (roleRaw) updates.role = JSON.parse(roleRaw);
    if (poolRaw && poolRaw !== "{}") updates.pool = JSON.parse(poolRaw);
    if (educationRaw && educationRaw !== "{}") updates.education = JSON.parse(educationRaw);
    updates.isActive = isActive;

    // 📞 Validação e verificação de duplicação de número de telefone
    if (phone && isValidPhoneNumber(phone)) {
      const parsedPhone = parsePhoneNumberWithError(phone).number;

      // Verifica se mudou o número comparado com o atual
      if (parsedPhone !== userAuth.phoneNumber) {
        try {
          const existingPhoneUser = await auth.getUserByPhoneNumber(parsedPhone);

          // ⚠️ Se o número já pertence a outro UID, bloqueia
          if (existingPhoneUser.uid !== id) {
            return new Response(JSON.stringify({ error: "Phone number already in use" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }
        } catch (err: any) {
          // OK se for "user-not-found", ou seja, telefone ainda não usado
          if (err.code !== "auth/user-not-found") {
            console.error("Erro ao verificar telefone:", err);
            return new Response("Unexpected error during phone validation", { status: 500 });
          }
        }

        updates.phoneNumber = parsedPhone; // ✅ Guardar versão formatada
      }
    }

    // 🏢 Se role = property, guardar campos extra de property
    const roleId = updates.role?.id || existingData.role?.id;
    if (roleId === "property") {
      const propertyObj = {
        id,
        name: propertyName || "",
        email: propertyEmail || "",
        phone: propertyPhone || "",
        mobile: propertyMobile || "",
        address: propertyAddress || "",
        teamLeader: {
          name: teamLeaderName || "",
          email: teamLeaderEmail || "",
          phone: teamLeaderPhone || "",
        },
      };

      // Só guarda se houver pelo menos um campo preenchido
      const hasPropertyData = Object.values(propertyObj).some((v) => v && v !== "");
      if (hasPropertyData) {
        updates.property = propertyObj;
      }
    }

    // 🔄 Atualiza Firestore com os campos alterados
    await docRef.update(updates);

    // 🔄 Atualiza Firebase Auth (somente campos alterados)
    const authUpdates: Partial<Parameters<typeof auth.updateUser>[1]> = {
      email: email || userAuth.email,
      displayName: displayName || userAuth.displayName,
    };
    if (updates.phoneNumber) {
      authUpdates.phoneNumber = updates.phoneNumber;
    }

    await auth.updateUser(id, authUpdates);

    // ✉️ Enviar email de notificação se aplicável
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
        to: userAuth.email!,
        subject: "Your account has been approved.",
        html,
        text: "Your account has been approved. You can now log in to the platform.",
      });
    }

    // ✅ Sucesso: redireciona para a página de edição
    return redirect(`/users/edit/${id}?success=true`);
  } catch (error: any) {
    console.error("❌ Error updating user:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};

// 🔥 Endpoint de eliminação de utilizador
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
