import { firestore } from "@/firebase/server";
import { sendEmail } from "@/emails/sendGrid";
import { baseEmailLayout } from "@/emails/baseEmailLayout";
import { getAppUrl } from "@/lib/utils";

interface notifyAdminForJobParams {
  jobId: string;
  propertyName: string;
  date: Date;
  educationName: string;
  shiftName: string;
}

export async function notifyAdminForJob({
  jobId,
  propertyName,
  date,
  educationName,
  shiftName,
}: notifyAdminForJobParams) {
  const appUrl = getAppUrl();
  const jobLink = `${appUrl}/jobs/${jobId}`;

  const subject = `Neuer Job erstellt von ${propertyName || "Unbekannte Wohngruppe"}`;
  const text = `
    Neuer Job wurde erstellt:

    Wohngruppe: ${propertyName || "Unbekannt"}
    Datum: ${date.toLocaleDateString()}
    Ausbildung: ${educationName}
    Schicht: ${shiftName}

    Details ansehen:
    ${jobLink}
  `.trim();

  const html = baseEmailLayout({
    title: "Neuer Job erstellt",
    previewText: `Neuer Job von ${propertyName}`,
    bodyContent: `
      <p>Ein neuer Job wurde auf der Plattform erstellt von <strong>${propertyName}</strong>.</p>
      <p>
        <strong>Datum:</strong> ${date.toLocaleDateString()}<br/>
        <strong>Ausbildung:</strong> ${educationName}<br/>
        <strong>Schicht:</strong> ${shiftName}
      </p>
      <p style="margin-top: 20px;">
        <a href="${jobLink}" style="background-color:#0f172b;padding:10px 18px;color:#ffffff;border-radius:4px;text-decoration:none;display:inline-block;">
          Jobdetails ansehen
        </a>
      </p>
    `,
  });

  const superAdminsSnapshot = await firestore
    .collection("users")
    .where("role.id", "==", "super_admin")
    .get();

  if (superAdminsSnapshot.empty) {
    console.warn("Keine Super Admins gefunden zum Benachrichtigen.");
    return;
  }

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
