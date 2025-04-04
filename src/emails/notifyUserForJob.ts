import { baseEmailLayout } from "@/emails/baseEmailLayout";

export function notifyUserForJob({
  userName,
  jobTitle,
  jobUrl
}: {
  userName: string;
  jobTitle: string;
  jobUrl: string;
}) {
  const bodyContent = `
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:44px;color:#000000;">
      Hello ${userName},
    </div>
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1.5;color:#000000;margin-bottom:20px;">
      A new job is available: <strong>${jobTitle}</strong>.
    </div>
    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;color:#000000;">
      <a href="${jobUrl}" style="color:#1a73e8;text-decoration:none;">Click here to view the job</a>
    </div>
  `;

  return baseEmailLayout({
    title: `New Job Available: ${jobTitle}`,
    previewText: `A new job titled "${jobTitle}" is available for you to view`,
    bodyContent,
  });
}