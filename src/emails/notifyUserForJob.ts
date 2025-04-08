import { baseEmailLayout } from "@/emails/baseEmailLayout";
import { getAppUrl } from "@/lib/utils";

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
    <p style="margin-top: 20px;">
      <a href="${getAppUrl()}" style="background-color:#0f172b;padding:10px 18px;color:#ffffff;border-radius:4px;text-decoration:none;display:inline-block;">
        View Job
      </a>
    </p>
  `;

  return baseEmailLayout({
    title: `New Job Available: ${jobTitle}`,
    previewText: `A new job titled "${jobTitle}" is available for you to view`,
    bodyContent,
  });
}