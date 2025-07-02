// src/cron/promote-jobs.ts

import { firestore } from "@/firebase/server";
import { Timestamp } from "firebase-admin/firestore";
import { sendEmail } from "@/lib/email";
import { baseEmailLayout } from "@/emails/baseEmailLayout";
import { getAppUrl, formatDate } from "@/lib/utils";
import type { Jobs } from "@/lib/types";

export const promoteOldJobs = async () => {
  const now = Timestamp.now();
  const threeHoursAgo = Timestamp.fromMillis(Date.now() - 3 * 60 * 60 * 1000);

  // 🔍 Vai buscar todos os jobs abertos, na pool level_1, criados há mais de 3 horas
  const snapshot = await firestore
    .collection("jobs")
    .where("status.id", "==", "open")
    .where("pool.id", "==", "level_1")
    .where("assignedTo", "==", null)
    .where("createdAt", "<=", threeHoursAgo)
    .get();

  if (snapshot.empty) {
    console.log("ℹ️ No eligible jobs to promote.");
    return;
  }

  const appUrl = getAppUrl();

  await Promise.all(
    snapshot.docs.map(async (doc) => {
      const job = doc.data() as Jobs;
      const jobId = doc.id;
      const parsedDate = job.date?.toDate?.() ?? new Date();
      const formattedDate = formatDate(parsedDate, "short");
      const jobUrl = `${appUrl}/jobs/${jobId}`;

      console.log(`🔁 Promoting job ${jobId} to Level 2`);

      // 🔄 Atualiza o job para a nova pool
      await doc.ref.update({
        pool: { id: "level_2", name: "Stundenvertrag" },
        updatedAt: now,
      });

      // 📢 Notifica utilizadores compatíveis na pool level_2
      const usersSnapshot = await firestore
        .collection("users")
        .where("role.id", "==", "user")
        .where("isActive", "==", true)
        .where("education.id", "==", job.education.id)
        .where("pool.id", "==", "level_2")
        .get();

      console.log(
        `📨 Sending job notification to ${usersSnapshot.size} user${usersSnapshot.size !== 1 ? "s" : ""} in pool 'level_2' with education '${job.education.name}' for date ${formattedDate}`
      );

      await Promise.all(
        usersSnapshot.docs.map((doc) => {
          const user = doc.data();
          if (!user.email) return;

          const subject = `Neuer Job bei ${job.property.name} – ${job.shift.name} am ${formattedDate}`;
          const text = `
            Sehr geehrte/r ${user.name},

            eine neue Job wurde veröffentlicht.

            Immobilie: ${job.property.name}
            Schicht: ${job.shift.name}
            Datum: ${formattedDate}

            Details zur Job:
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

      // 📬 Notifica Super Admins
      const superAdminsSnapshot = await firestore
        .collection("users")
        .where("role.id", "==", "super_admin")
        .where("isActive", "==", true)
        .get();

      if (!superAdminsSnapshot.empty) {
        const html = baseEmailLayout({
          title: "Job weitergeleitet",
          previewText: `Job ${job.shift.name} wurde in Stundenvertrag verschoben.`,
          bodyContent: `
            <p>Ein offener Job wurde seit über 2 Stunden nicht angenommen und wurde automatisch in <strong>Stundenvertrag</strong> verschoben.</p>
            <p>
              <strong>Wohngruppe:</strong> ${job.property.name}<br/>
              <strong>Bereich:</strong> ${job.education.name}<br/>
              <strong>Schicht:</strong> ${job.shift.name}<br/>
              <strong>Datum:</strong> ${formattedDate}
            </p>
            <p style="margin-top: 20px;">
              <a href="${jobUrl}" style="background-color:#0f172b;padding:10px 18px;color:#ffffff;border-radius:4px;text-decoration:none;display:inline-block;">
                Jobdetails ansehen
              </a>
            </p>
          `,
        });

        await Promise.all(
          superAdminsSnapshot.docs.map((admin) =>
            sendEmail({
              to: admin.data().email,
              subject: `Job weitergeleitet – ${job.shift.name} am ${formattedDate}`,
              html,
              text: `Job ${jobId} wurde nach Stundenvertrag verschoben.`,
            })
          )
        );
      }

      // 📬 Notifica criador do job (propriedade)
      if (job.property?.id) {
        const creatorDoc = await firestore.collection("users").doc(job.property.id).get();
        if (creatorDoc.exists) {
          const creator = creatorDoc.data();
          if (creator?.email) {
            const html = baseEmailLayout({
              title: "Ihr Job wurde weitergeleitet",
              previewText: `Ihr Job ${job.shift.name} wurde in Stundenvertrag verschoben.`,
              bodyContent: `
                <p>Ihr erstellter Job in der Wohngruppe <strong>${job.property.name}</strong> wurde in <strong>Stundenvertrag</strong> verschoben, da er über 2 Stunden lang offen blieb.</p>
                <p>
                  <strong>Schicht:</strong> ${job.shift.name}<br/>
                  <strong>Datum:</strong> ${formattedDate}
                </p>
              `,
            });

            await sendEmail({
              to: creator.email,
              subject: `Ihr Job wurde weitergeleitet – ${job.shift.name} am ${formattedDate}`,
              html,
              text: `Ihr Job wurde nach Stundenvertrag verschoben.`,
            });
          }
        }
      }
    })
  );
};
