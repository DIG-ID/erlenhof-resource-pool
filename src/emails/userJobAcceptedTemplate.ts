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
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1.5;color:#000000;">
      Guten Tag ${userName},
    </div>
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1.5;color:#000000;margin:16px 0;">
      Sie haben den folgenden Einsatz erfolgreich übernommen:
    </div>
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;color:#000000;margin-bottom:12px;">
      <strong>Wohngruppe:</strong> ${propertyName}<br/>
      <strong>Schicht:</strong> ${jobShift}<br/>
      <strong>Datum:</strong> ${jobDate}
    </div>
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;color:#000000;">
      Vielen Dank für Ihre Bestätigung.
    </div>
  `;

  return baseEmailLayout({
    title: `Einsatz erfolgreich übernommen`,
    previewText: `Sie haben den Einsatz ${jobShift} am ${jobDate} angenommen`,
    bodyContent,
  });
}
