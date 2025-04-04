import { baseEmailLayout } from "@/emails/baseEmailLayout";

export function userJobAcceptedTemplate({
  userName,
  jobTitle,
}: {
  userName: string;
  jobTitle: string;
}) {
  const bodyContent = `
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:44px;color:#000000;">
      Hi ${userName},
    </div>
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1;color:#000000;">
      You have successfully accepted the job: <strong>${jobTitle}</strong>.
    </div>
  `;

  return baseEmailLayout({
    title: `Job "${jobTitle}" Assigned Successfully`,
    previewText: `You've accepted the job "${jobTitle}"`,
    bodyContent,
  });
}
