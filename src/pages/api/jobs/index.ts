import type { APIRoute } from "astro";
import { app } from "@/firebase/server";
import { getFirestore, FieldValue, Timestamp } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ request, redirect, locals }) => {

  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const notes = formData.get("notes")?.toString();
  const roles = formData.get("roles")?.toString();
  const status = formData.get("status")?.toString();
  const date = formData.get("date")?.toString();

  if (!title || !description || !roles || !status || !date) {
    return new Response("Missing required fields", { status: 400 });
  }

  try {
    const db = getFirestore(app);
    const jobsRef = db.collection("jobs");

    // 🔥 Converte `date` para Timestamp do Firestore
    const parsedDate = Timestamp.fromDate(new Date(date));

    await jobsRef.add({
      title,
      description,
      notes,
      roles,
      status,
      createdAt: FieldValue.serverTimestamp(),
      date: parsedDate, // 🔥 Agora é salvo como um Timestamp do Firestore
      createdBy: {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
      },
      assigned: false,
      assignedTo: null, // Agora é um único utilizador ou null
    });

  } catch (error) {
    return new Response("Error creating job", { status: 500 });
  }

  return redirect("/jobs/jobs");
};
