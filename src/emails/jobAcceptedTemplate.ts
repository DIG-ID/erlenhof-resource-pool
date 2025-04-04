import { baseEmailLayout } from "@/emails/baseEmailLayout";

export function jobAcceptedTemplate({
  creatorName,
  jobTitle,
  acceptedByName
}: {
  creatorName: string;
  jobTitle: string;
  acceptedByName: string;
}) {
  const bodyContent = `
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:44px;color:#000000;">
      Hello ${creatorName},
    </div>
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1;color:#000000;">
      Your job "<strong>${jobTitle}</strong>" was accepted by <strong>${acceptedByName}</strong>.
    </div>
  `;

  return baseEmailLayout({
    title: `Your Job "${jobTitle}" Was Accepted`,
    previewText: `Your Job "${jobTitle}" Was Accepted by ${acceptedByName}`,
    bodyContent,
  });
}