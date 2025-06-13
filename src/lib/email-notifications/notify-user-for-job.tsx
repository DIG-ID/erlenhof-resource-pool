import { firestore } from "@/firebase/server";
import { sendEmail } from "@/lib/email";
import { getAppUrl } from "@/lib/utils";
import { notifyUserForJob } from "@/emails/notifyUserForJob";
import { formatDate } from "@/lib/utils";
import { Timestamp } from "firebase-admin/firestore";

interface JobData {
  id: string;
  education: { id: string; name: string };
  pool: { id: string; name: string };
  shift: { id: string; name: string; details?: string }; // se usares detalhes separados
  date: string | Timestamp; // ou Date se for objeto de data
  property: { id: string; name: string };
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

    const formattedDate =
      job.date instanceof Timestamp
        ? formatDate(job.date.toDate(), "short")
        : typeof job.date === "string" && /^\d{2}\.\d{2}\.\d{4}$/.test(job.date)
          ? job.date // já está formatado como DD.MM.YYYY
          : formatDate(new Date(job.date), "short");

    await Promise.all(usersToNotify.map(user => {
      const html = notifyUserForJob({
        userName: user.name,
        jobShift: job.shift.name,
        jobDate: formattedDate,
        propertyName: job.property.name,
        jobUrl,
      }).trim(); // <-- se necessário
      
    
      const text = `
        Sehr geehrte/r ${user.name},

        eine neue Stelle wurde veröffentlicht.

        Immobilie: ${job.property.name}
        Schicht: ${job.shift.name}
        Datum: ${formattedDate}

        Details zur Stelle:
        ${jobUrl}
        `.trim();

      if (!user.email) {
        console.warn(`Usuário ${user.name} não tem email. Ignorando envio.`);
        return Promise.resolve();
      }
      
      return sendEmail({
        to: user.email,
        subject: `Neue Stelle bei ${job.property.name} – ${job.shift.name} am ${formattedDate}`,

        text,
        html,
      });
    }));
  } catch (error) {
    console.error("Erro ao notificar utilizadores do job:", error);
    throw error;
  }
}
