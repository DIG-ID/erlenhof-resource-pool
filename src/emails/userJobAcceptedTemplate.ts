import { baseEmailLayout } from "@/emails/baseEmailLayout";

export function userJobAcceptedTemplate({
  userName,
  jobShift,
  jobDate,
  propertyName,
}: {
  userName: string;
  jobShift: string;
  jobDate: string;
  propertyName: string;
}) {
  const bodyContent = `
    <p>
      Guten Tag ${userName},
    </p>
    <p>
      Du hast den folgenden Einsatz verbindlich angenommen:
    </p>
    <p>
      <strong>Wohngruppe:</strong> ${propertyName}<br/>
      <strong>Schicht:</strong> ${jobShift}<br/>
      <strong>Datum:</strong> ${jobDate}
    </p>
    <p>
      Vielen Dank für deinen Einsatz.
    </p>
  `;

  return baseEmailLayout({
    title: `Einsatz erfolgreich angenommen`,
    previewText: `Du hast den Einsatz ${jobShift} am ${jobDate} angenommen`,
    bodyContent,
  });
}
