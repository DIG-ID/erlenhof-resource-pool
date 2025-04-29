import type { APIRoute } from "astro";
import { firestore } from "@/firebase/server";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { notifyUsersForJob } from "@/lib/email-notifications/notify-user-for-job";
import { sendEmail } from "@/lib/email";
import { baseEmailLayout } from "@/emails/baseEmailLayout";
import { getAppUrl } from "@/lib/utils";
import type { Property } from "@/lib/types";

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const formData = await request.formData();
  const reason = formData.get("reason")?.toString();
  const notes = formData.get("notes")?.toString();
  const educationObj = formData.get("education")?.toString();
  const shiftObj = formData.get("shifts")?.toString();
  const rawProperty = formData.get("property")?.toString();
  const rawDate = formData.get("date")?.toString();
  const parsedDate = rawDate ? new Date(rawDate) : null;

  if (!parsedDate || isNaN(parsedDate.getTime())) {
    return new Response("Ungültiges oder fehlendes Jobdatum", { status: 400 });
  }

  const timestampDate = Timestamp.fromDate(parsedDate);

  if (!educationObj || !shiftObj) {
    return new Response("Fehlende Pflichtfelder", { status: 400 });
  }

  const user = locals.userData;
  if (!user) {
    return new Response("Unbefugter Zugriff", { status: 401 });
  }

  // 🔄 Verifica e extrai dados de shift e education
  let education, shift;
  try {
    education = JSON.parse(educationObj);
    shift = JSON.parse(shiftObj);
  } catch {
    return new Response("Fehler beim Parsen von Schicht oder Ausbildung", { status: 400 });
  }

  // 🏢 Define propriedade
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
    const jobsRef = firestore.collection("jobs");

    const jobDocRef = await jobsRef.add({
      reason,
      notes,
      shift,
      education,
      status: { id: "open", name: "Open" },
      pool: { id: "level_1", name: "Level 1" },
      createdAt: FieldValue.serverTimestamp(),
      date: timestampDate,
      property: propertyData,
      assignedTo: null,
    });

    const jobId = jobDocRef.id;

    // 📢 Notificar utilizadores (Education + Pool)
    await notifyUsersForJob({
      id: jobId,
      shift,
      education,
      pool: { id: "level_1", name: "Level 1" },
      date: timestampDate,
      property: propertyData,
    });

    // 📬 Notificar Super Admins
    const superAdminsSnapshot = await firestore
      .collection("users")
      .where("role.id", "==", "super_admin")
      .get();

    if (!superAdminsSnapshot.empty) {
      const appUrl = getAppUrl();
      const jobLink = `${appUrl}/jobs/${jobId}`;
      const subject = `Neuer Job erstellt von ${propertyData?.name || "Unbekannte Wohngruppe"}`;
      const text = `
        Neuer Job wurde erstellt:

        Wohngruppe: ${propertyData?.name || "Unbekannt"}
        Datum: ${parsedDate.toLocaleDateString()}
        Ausbildung: ${education.name}
        Schicht: ${shift.name}

        Details ansehen:
        ${jobLink}
        `.trim();

      const html = baseEmailLayout({
        title: "Neuer Job erstellt",
        previewText: `Neuer Job von ${propertyData?.name}`,
        bodyContent: `
          <p>Ein neuer Job wurde auf der Plattform erstellt von <strong>${propertyData?.name}</strong>.</p>
          <p>
            <strong>Datum:</strong> ${parsedDate.toLocaleDateString()}<br/>
            <strong>Ausbildung:</strong> ${education.name}<br/>
            <strong>Schicht:</strong> ${shift.name}
          </p>
          <p style="margin-top: 20px;">
            <a href="${jobLink}" style="background-color:#0f172b;padding:10px 18px;color:#ffffff;border-radius:4px;text-decoration:none;display:inline-block;">
              Jobdetails ansehen
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

    return redirect("/dashboard");
  } catch (error) {
    console.error("❌ Fehler beim Erstellen des Jobs:", error);
    return new Response("Fehler beim Erstellen des Jobs", { status: 500 });
  }
};
