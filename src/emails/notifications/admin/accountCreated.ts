import { baseEmailLayout } from "@/emails/baseEmailLayout";

export function notifyAdminAccountCreation({
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