// src/page/api/jobs/index.ts

import type { APIRoute } from "astro";
import { firestore } from "@/firebase/server";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { sendEmail } from "@/lib/email";
import { baseEmailLayout } from "@/emails/baseEmailLayout";
import { getAppUrl } from "@/lib/utils";
import type { Property } from "@/lib/types";

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  // 🧾 Extrair dados do formulário
  const formData = await request.formData();
  const reason = formData.get("reason")?.toString();
  const notes = formData.get("notes")?.toString();
  const educationObj = formData.get("education")?.toString();
  const shiftObj = formData.get("shifts")?.toString();
  const rawProperty = formData.get("property")?.toString();
  const rawDate = formData.get("date")?.toString();
  const parsedDate = rawDate ? new Date(rawDate) : null;

  // ⛔ Validar data
  if (!parsedDate || isNaN(parsedDate.getTime())) {
    return new Response("Ungültiges oder fehlendes Jobdatum", { status: 400 });
  }

  const timestampDate = Timestamp.fromDate(parsedDate);

  // ⛔ Validar campos obrigatórios
  if (!educationObj || !shiftObj) {
    return new Response("Fehlende Pflichtfelder", { status: 400 });
  }

  // 🔐 Verificar autenticação
  const user = locals.userData;
  if (!user) {
    return new Response("Unbefugter Zugriff", { status: 401 });
  }

  // 🧩 Parse dos dados de educação e turno
  let education, shift;
  try {
    education = JSON.parse(educationObj);
    shift = JSON.parse(shiftObj);
  } catch {
    return new Response("Fehler beim Parsen von Schicht oder Ausbildung", { status: 400 });
  }

  // 🏠 Obter propriedade do utilizador ou do formulário (consoante o role)
  let propertyData: Property | undefined;
  if (user.role.id === "super_admin") {
    if (rawProperty) {
      try {
        propertyData = JSON.parse(rawProperty);
      } catch {
        return new Response("Ungültiges Immobilienformat", { status: 400 });
      }
    }
  } else if (user.role.id === "property") {
    propertyData = user.property;
  }

  if (!propertyData) {
    return new Response("Property-Daten fehlen oder sind ungültig", { status: 400 });
  }

  try {
    // 📄 Criar job na base de dados
    const jobsRef = firestore.collection("jobs");

    const jobDocRef = await jobsRef.add({
      reason,
      notes,
      shift,
      education,
      status: { id: "open", name: "Open" },
      pool: { id: "level_1", name: "Festvertrag" },
      createdAt: FieldValue.serverTimestamp(),
      date: timestampDate,
      property: propertyData,
      assignedTo: null,
    });

    // 🔗 Gerar URL e data formatada
    const jobId = jobDocRef.id;
    const appUrl = getAppUrl();
    const jobUrl = `${appUrl}/jobs/${jobId}`;
    const formatedDate = parsedDate.toLocaleDateString("de-DE");

    // 📧 Notificar utilizadores da pool 1 com a mesma educação
    const usersSnapshot = await firestore
      .collection("users")
      .where("role.id", "==", "user")
      .where("isActive", "==", true)
      .where("education.id", "==", education.id)
      .where("pool.id", "==", "level_1")
      .get();

    console.log(
      `📨 Sending job notification to ${usersSnapshot.size} user${usersSnapshot.size !== 1 ? 's' : ''} in pool 'level_1' with education '${education.name}' for date ${parsedDate.toISOString()}`
    );

    if (!usersSnapshot.empty) {
      const jobLink = jobUrl;

      await Promise.all(
        usersSnapshot.docs.map((doc) => {
          const user = doc.data();
          if (!user.email) return;

          const subject = `Neue Job bei ${propertyData.name} – ${shift.name} am ${formatedDate}`;
          const text = `
            Sehr geehrte/r ${user.name},

            eine neue Job wurde veröffentlicht.

            Immobilie: ${propertyData.name}
            Schicht: ${shift.name}
            Datum: ${formatedDate}

            Details zur Job:
            ${jobUrl}
          `.trim();

          const html = baseEmailLayout({
            title: `Neue Job verfügbar`,
            previewText: `Neue Job bei ${propertyData.name}: ${shift.name} am ${formatedDate}`,
            bodyContent: `
              <p>Guten Tag ${user.name},</p>
              <p>Ein neuer Job wurde veröffentlicht.</p>
              <p>
                <strong>Wohngruppe:</strong> ${propertyData.name}<br/>
                <strong>Schicht:</strong> ${shift.name}<br/>
                <strong>Datum:</strong> ${formatedDate}
              </p>
              <p>Bitte klicken Sie auf den Button unten, um die Details einzusehen.</p>
              <p style="margin-top: 20px;">
                <a href="${jobLink}" style="background-color:#0f172b;padding:10px 18px;color:#ffffff;border-radius:4px;text-decoration:none;display:inline-block;">
                  Job anzeigen
                </a>
              </p>
            `,
          });

          return sendEmail({
            to: user.email,
            subject,
            text,
            html,
          });
        })
      );
    }

    // 👨‍💼 Notificar Super Admins sobre o novo job
    const superAdminsSnapshot = await firestore
      .collection("users")
      .where("role.id", "==", "super_admin")
      .get();

    if (!superAdminsSnapshot.empty) {
      const jobLink = jobUrl;

      const subject = `Neuer Job erstellt von ${propertyData?.name || "Unbekannte Wohngruppe"}`;
      const text = `
        Neuer Job wurde erstellt:

        Wohngruppe: ${propertyData?.name || "Unbekannt"}
        Datum: ${formatedDate}
        Ausbildung: ${education.name}
        Schicht: ${shift.name}

        Details ansehen:
        ${jobLink}
      `.trim();

      const html = baseEmailLayout({
        title: "Neuer Job erstellt",
        previewText: `Neuer Job von ${propertyData.name}`,
        bodyContent: `
          <p>Ein neuer Job wurde auf der Plattform erstellt von <strong>${propertyData.name}</strong>.</p>
          <p>
            <strong>Datum:</strong> ${formatedDate}<br/>
            <strong>Ausbildung:</strong> ${education.name}<br/>
            <strong>Schicht:</strong> ${shift.name}
          </p>
          <p style="margin-top: 20px;">
            <a href="${jobLink}" style="background-color:#0f172b;padding:10px 18px;color:#ffffff;border-radius:4px;text-decoration:none;display:inline-block;">
              Job anzeigen
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

    // ✅ Redirecionar após criação
    return redirect(`/jobs/${jobId}`);
  } catch (error) {
    // ❌ Erro inesperado
    console.error("❌ Error when creating the job:", error);
    return new Response("Fehler beim Erstellen des Jobs", { status: 500 });
  }
};
