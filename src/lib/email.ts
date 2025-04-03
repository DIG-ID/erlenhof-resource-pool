import sgMail from "@sendgrid/mail";

sgMail.setApiKey(import.meta.env.SENDGRID_API_KEY);

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  if (!to || !subject || !html) {
    console.warn("Email not sent: Missing required fields");
    return;
  }

  try {
    await sgMail.send({
      to,
      from: "no-reply@yournewwebsite.ch",
      subject,
      html,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
