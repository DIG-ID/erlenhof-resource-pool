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
    <p>
      Guten Tag ${creatorName},
    </p>
    <p>
      Eine Jobausschreibung wurde erfolgreich von <strong>${acceptedByName}</strong> angenommen.
    </p>
    <p>
      <strong>Wohngruppe:</strong> ${propertyName}<br/>
      <strong>Schicht:</strong> ${jobShift}<br/>
      <strong>Datum:</strong> ${jobDate}
    </p>
  `;

  return baseEmailLayout({
    title: `Job angenommen – ${jobShift} am ${jobDate}`,
    previewText: `${acceptedByName} hat deine Jobausschreibung am ${jobDate} angenommen`,
    bodyContent,
  });
}
