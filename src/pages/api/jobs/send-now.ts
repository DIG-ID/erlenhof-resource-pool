// src/page/api/jobs/send-now.ts

import type { APIRoute } from "astro";
import { firestore } from "@/firebase/server";
import { sendEmail } from "@/lib/email";
import { baseEmailLayout } from "@/emails/baseEmailLayout";
import { getAppUrl } from "@/lib/utils";

export const PATCH: APIRoute = async ({ request }) => {
  const body = await request.json();
  const jobId = body?.jobId;

  if (!jobId) {
    return new Response(JSON.stringify({ error: "Job-ID fehlt." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const jobRef = firestore.collection("jobs").doc(jobId);
    const jobSnap = await jobRef.get();

    if (!jobSnap.exists) {
      return new Response(JSON.stringify({ error: "Job wurde nicht gefunden." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const job = jobSnap.data();
    if (!job || job.pool?.id !== "level_1") {
      return new Response(JSON.stringify({ error: "Ungültiger Job-Zustand oder Pool bereits gewechselt." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const appUrl = getAppUrl();
    const jobUrl = `${appUrl}/jobs/${jobId}`;
    const parsedDate = job.date?.toDate?.() ?? new Date();
    const formattedDate = parsedDate.toLocaleDateString("de-DE");

    const usersSnapshot = await firestore
      .collection("users")
      .where("role.id", "==", "user")
      .where("isActive", "==", true)
      .where("education.id", "==", job.education.id)
      .where("pool.id", "==", "level_2")
      .get();

      console.log(
        `📨 Sending job notification to ${usersSnapshot.size} user${usersSnapshot.size !== 1 ? "s" : ""} in pool 'level_2' with education '${job.education.name}' for date ${parsedDate.toLocaleDateString("de-DE")}`
      )

    await Promise.all(
      usersSnapshot.docs.map((doc) => {
        const user = doc.data();
        if (!user.email) return;

        const subject = `Neue Stelle bei ${job.property.name} – ${job.shift.name} am ${formattedDate}`;
        const text = `
          Sehr geehrte/r ${user.name},

          eine neue Stelle wurde veröffentlicht.

          Immobilie: ${job.property.name}
          Schicht: ${job.shift.name}
          Datum: ${formattedDate}

          Details zur Stelle:
          ${jobUrl}
        `.trim();

        const html = baseEmailLayout({
          title: "Neue Job verfügbar",
          previewText: `Neue Job bei ${job.property.name}: ${job.shift.name} am ${formattedDate}`,
          bodyContent: `
            <p>Guten Tag ${user.name},</p>
            <p>Ein neuer Job wurde veröffentlicht.</p>
            <p>
              <strong>Wohngruppe:</strong> ${job.property.name}<br/>
              <strong>Schicht:</strong> ${job.shift.name}<br/>
              <strong>Datum:</strong> ${formattedDate}
            </p>
            <p>Bitte klicken Sie auf den Button unten, um die Details einzusehen.</p>
            <p style="margin-top: 20px;">
              <a href="${jobUrl}" style="background-color:#0f172b;padding:10px 18px;color:#ffffff;border-radius:4px;text-decoration:none;display:inline-block;">
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

    await jobRef.update({
      pool: { id: "level_2", name: "Stundenvertrag" },
      updatedAt: new Date(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Job wurde erfolgreich an die Pool-2-Benutzer gesendet.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error when sending the job immediately:", error);
    return new Response(
      JSON.stringify({
        error: "Interner Serverfehler. Bitte versuchen Sie es später erneut.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
