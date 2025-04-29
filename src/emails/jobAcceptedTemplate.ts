import { baseEmailLayout } from "@/emails/baseEmailLayout";

export function jobAcceptedTemplate({
  creatorName,
  jobShift,
  jobDate,
  propertyName,
  acceptedByName,
}: {
  creatorName: string;
  jobShift: string;
  jobDate: string;
  propertyName: string;
  acceptedByName: string;
}) {
  const bodyContent = `
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1.5;color:#000000;">
      Guten Tag ${creatorName},
    </div>
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1.5;color:#000000;margin:16px 0;">
      Eine Jobausschreibung wurde erfolgreich von <strong>${acceptedByName}</strong> angenommen.
    </div>
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;color:#000000;margin-bottom:12px;">
      <strong>Wohngruppe:</strong> ${propertyName}<br/>
      <strong>Schicht:</strong> ${jobShift}<br/>
      <strong>Datum:</strong> ${jobDate}
    </div>
  `;

  return baseEmailLayout({
    title: `Job angenommen – ${jobShift} am ${jobDate}`,
    previewText: `${acceptedByName} hat deine Jobausschreibung am ${jobDate} angenommen`,
    bodyContent,
  });
}
