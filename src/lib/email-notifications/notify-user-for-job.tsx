import { firestore } from "@/firebase/server";
import { sendEmail } from "@/lib/email";
import { getAppUrl } from "@/lib/utils";

interface JobData {
  id: string;
  title: string;
  education: { id: string; name: string };
  pool: { id: string; name: string };
}

const baseUrl = getAppUrl();

/**
 * Notifica por email todos os utilizadores ativos com role=user, education e pool compatíveis com o job.
 */
export async function notifyUsersForJob(job: JobData) {

  console.log("Notificando utilizadores para o job:", job);
  try {
    const usersSnapshot = await firestore.collection("users")
      .where("role.id", "==", "user")
      .where("isActive", "==", true)
      .where("education.id", "==", job.education.id)
      .where("pool.id", "==", job.pool.id)
      .get();

    const usersToNotify = usersSnapshot.docs.map(doc => doc.data());

    console.log("Utilizadores a notificar:", usersToNotify);

    const jobUrl = `${baseUrl}/jobs/${job.id}`;

    await Promise.all(usersToNotify.map(user =>
      sendEmail({
        to: user.email,
        subject: "New job available",
        text: `A new job "${job.title}" is available.`,
        html:  `
        <p>Hello ${user.name},</p>
        <p>A new job is available: <strong>${job.title}</strong>.</p>
        <p><a href="${jobUrl}">Click here to view the job</a></p>
      `,
      })
    ));
  } catch (error) {
    console.error("Erro ao notificar utilizadores do job:", error);
    throw error;
  }
}
