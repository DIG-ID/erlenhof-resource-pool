import type { APIRoute } from "astro";
import { firestore } from "@/firebase/server";
import { notifyUsersForJob } from "@/lib/email-notifications/notify-user-for-job";

export const PATCH: APIRoute = async ({ request }) => {
  const body = await request.json();
  const jobId = body?.jobId;

  if (!jobId) {
    return new Response(JSON.stringify({ error: "Job-ID fehlt." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const jobRef = firestore.collection("jobs").doc(jobId);
    const jobSnap = await jobRef.get();

    if (!jobSnap.exists) {
      return new Response(JSON.stringify({ error: "Job wurde nicht gefunden." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const job = jobSnap.data();

    if (!job || job.pool?.id !== "level_1") {
      return new Response(JSON.stringify({ error: "Ungültiger Job-Zustand oder Pool bereits gewechselt." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 📩 Notificar pool 2
    await notifyUsersForJob({
      id: jobId,
      shift: job.shift,
      education: job.education,
      pool: { id: "level_2", name: "Stundenvertrag" },
      date: (job.date?.toDate?.() ?? new Date()).toLocaleDateString(), // fallback para evitar falhas,
      property: job.property,
    });

    // 🔄 Atualizar pool
    await jobRef.update({
      pool: { id: "level_2", name: "Stundenvertrag" },
      updatedAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, message: "Job wurde erfolgreich an die Pool-2-Benutzer gesendet." }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Fehler beim sofortigen Senden des Jobs:", error);
    return new Response(JSON.stringify({ error: "Interner Serverfehler. Bitte versuchen Sie es später erneut." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
