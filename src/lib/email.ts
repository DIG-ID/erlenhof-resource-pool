import sgMail from "@sendgrid/mail";

sgMail.setApiKey(import.meta.env.SENDGRID_API_KEY);

type SendEmailParams = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  if (!to || !subject || !html || !text) {
    console.warn("Email not sent: Missing required fields");
    return;
  }

  try {
    await sgMail.send({
      to,
      from: "Erlenhof Resource Pool <noreply@yournewwebsite.ch>",
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
