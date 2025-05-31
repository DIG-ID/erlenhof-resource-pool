// src/cron/promote-jobs.ts

import { firestore } from "@/firebase/server";
import { Timestamp } from "firebase-admin/firestore";
import { notifyUsersForJob } from "@/lib/email-notifications/notify-user-for-job";
import { sendEmail } from "@/emails/sendGrid";
import { baseEmailLayout } from "@/emails/baseEmailLayout";
import { getAppUrl, formatDate } from "@/lib/utils";
import type { Jobs } from "@/lib/types";

export const promoteOldJobs = async () => {
  const now = Timestamp.now();
  //const twoHoursAgo = Timestamp.fromMillis(Date.now() - 2 * 60 * 60 * 1000);
  const fiveMinutesAgo = Timestamp.fromMillis(Date.now() - 5 * 60 * 1000);
  const snapshot = await firestore
    .collection("jobs")
    .where("status.id", "==", "open")
    .where("pool.id", "==", "level_1")
    .where("assignedTo", "==", null)
    .where("createdAt", "<=", fiveMinutesAgo)
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

      console.log(`🔁 Promoting job ${jobId} to Level 2`);

      // Atualiza o job para a nova pool
      await doc.ref.update({
        pool: { id: "level_2", name: "Stundenvertrag" },
        updatedAt: now,
      });

      // Notificar utilizadores da pool level_2 com a mesma education
      await notifyUsersForJob({
        id: jobId,
        shift: job.shift,
        education: job.education,
        pool: { id: "level_2", name: "Stundenvertrag" },
        date: job.date,
        property: job.property,
      });

      // Notificar Super Admins
      const superAdminsSnapshot = await firestore
        .collection("users")
        .where("role.id", "==", "super_admin")
        .where("isActive", "==", true)
        .get();

      if (!superAdminsSnapshot.empty) {
        const jobLink = `${appUrl}/jobs/${jobId}`;
        const dateStr = formatDate(job.date, "short");

        const html = baseEmailLayout({
          title: "Job weitergeleitet",
          previewText: `Job ${job.shift.name} wurde in Stundenvertrag verschoben.`,
          bodyContent: `
            <p>Ein offener Job wurde seit über 2 Stunden nicht angenommen und wurde automatisch in <strong>Stundenvertrag</strong> verschoben.</p>
            <p>
              <strong>Wohngruppe:</strong> ${job.property.name}<br/>
              <strong>Ausbildung:</strong> ${job.education.name}<br/>
              <strong>Schicht:</strong> ${job.shift.name}<br/>
              <strong>Datum:</strong> ${dateStr}
            </p>
            <p style="margin-top: 20px;">
              <a href="${jobLink}" style="background-color:#0f172b;padding:10px 18px;color:#ffffff;border-radius:4px;text-decoration:none;display:inline-block;">
                Jobdetails ansehen
              </a>
            </p>
          `,
        });

        await Promise.all(
          superAdminsSnapshot.docs.map((admin) =>
            sendEmail({
              to: admin.data().email,
              subject: `Job weitergeleitet – ${job.shift.name} am ${dateStr}`,
              html,
              text: `Job ${jobId} wurde nach Stundenvertrag verschoben.`,
            })
          )
        );
      }

      // Notificar utilizador da propriedade
      if (job.property?.id) {
        const creatorDoc = await firestore.collection("users").doc(job.property.id).get();
        if (creatorDoc.exists) {
          const creator = creatorDoc.data();
          if (creator?.email) {
            const dateStr = formatDate(job.date, "short");
            const html = baseEmailLayout({
              title: "Ihr Job wurde weitergeleitet",
              previewText: `Ihr Job ${job.shift.name} wurde in Stundenvertrag verschoben.`,
              bodyContent: `
                <p>Ihr erstellter Job in der Wohngruppe <strong>${job.property.name}</strong> wurde in <strong>Stundenvertrag</strong> verschoben, da er über 2 Stunden lang offen blieb.</p>
                <p>
                  <strong>Schicht:</strong> ${job.shift.name}<br/>
                  <strong>Datum:</strong> ${dateStr}
                </p>
              `,
            });

            await sendEmail({
              to: creator.email,
              subject: `Ihr Job wurde weitergeleitet – ${job.shift.name} am ${dateStr}`,
              html,
              text: `Ihr Job wurde nach Stundenvertrag verschoben.`,
            });
          }
        }
      }
    })
  );
};
