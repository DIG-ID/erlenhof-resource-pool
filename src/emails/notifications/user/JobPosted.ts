import { firestore } from "@/firebase/server";
import { Timestamp } from "firebase-admin/firestore";
import { getAppUrl, formatDate } from "@/lib/utils";
import { sendEmail } from "@/emails/sendGrid";
import { baseEmailLayout } from "@/emails/baseEmailLayout";

// Job Interface
interface JobData {
  id: string;
  education: { id: string; name: string };
  pool: { id: string; name: string };
  shift: { id: string; name: string; details?: string };
  date: string | Timestamp;
  property: { id: string; name: string };
}

// Generates the HTML content of the email for a user
function notifyUserForJob({
  userName,
  jobShift,
  jobDate,
  propertyName,
  jobUrl,
}: {
  userName: string;
  jobShift: string;
  jobDate: string;
  propertyName: string;
  jobUrl: string;
}) {
  const bodyContent = `
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1.5;color:#000000;">
      Guten Tag ${userName},
    </div>
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1.5;color:#000000;margin:16px 0;">
      Ein neuer Job wurde veröffentlicht.
    </div>
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;color:#000000;margin-bottom:12px;">
      <strong>Wohngruppe:</strong> ${propertyName}<br/>
      <strong>Schicht:</strong> ${jobShift}<br/>
      <strong>Datum:</strong> ${jobDate}
    </div>
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;color:#000000;">
      Bitte klicke auf den untenstehenden Button, um die Details einzusehen.
    </div>
    <p style="margin-top: 20px;">
      <a href="${jobUrl}" style="background-color:#0f172b;padding:10px 18px;color:#ffffff;border-radius:4px;text-decoration:none;display:inline-block;">
        Job anzeigen
      </a>
    </p>
  `;

  return baseEmailLayout({
    title: `Neue Job verfügbar`,
    previewText: `Neue Job bei ${propertyName}: ${jobShift} am ${jobDate}`,
    bodyContent,
  });
}

// Main function for notifying users
export async function notifyUsersForJob(job: JobData) {
  const baseUrl = getAppUrl();

  try {
    console.log("Notifying users of the job:", job);

    const usersSnapshot = await firestore.collection("users")
      .where("role.id", "==", "user")
      .where("isActive", "==", true)
      .where("education.id", "==", job.education.id)
      .where("pool.id", "==", job.pool.id)
      .get();

    const usersToNotify = usersSnapshot.docs.map(doc => doc.data());

    console.log("Users to be notified:", usersToNotify);

    const jobUrl = `${baseUrl}/jobs/${job.id}`;
    const formattedDate = job.date instanceof Timestamp
      ? formatDate(job.date.toDate(), "short")
      : formatDate(new Date(job.date), "short");

    await Promise.all(usersToNotify.map(user => {
      if (!user.email) {
        console.warn(`User ${user.name} has no email. Ignoring sending.`);
        return Promise.resolve();
      }

      const html = notifyUserForJob({
        userName: user.name,
        jobShift: job.shift.name,
        jobDate: formattedDate,
        propertyName: job.property.name,
        jobUrl,
      }).trim();

      const text = `
        Sehr geehrte/r ${user.name},

        eine neue Stelle wurde veröffentlicht.

        Immobilie: ${job.property.name}
        Schicht: ${job.shift.name}
        Datum: ${formattedDate}

        Details zur Stelle:
        ${jobUrl}
      `.trim();

      return sendEmail({
        to: user.email,
        subject: `Neue Stelle bei ${job.property.name} – ${job.shift.name} am ${formattedDate}`,
        text,
        html,
      });
    }));
  } catch (error) {
    console.error("Error when notifying job users:", error);
    throw error;
  }
}
