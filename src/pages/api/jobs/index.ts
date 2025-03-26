import type { APIRoute } from "astro";
import { firestore} from "@/firebase/server";
import { getFirestore, FieldValue, Timestamp } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ request, redirect, locals }) => {

  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const notes = formData.get("notes")?.toString();
  const educationObj = formData.get("education")?.toString();
  const shift = formData.get("shifts")?.toString();
  const date = formData.get("date")?.toString();

  if (!title || !description || !educationObj || !shift || !date) {
    return new Response("Missing required fields", { status: 400 });
  }

  const user = locals.userData;

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const jobsRef = firestore.collection("jobs");

    // 🔥 Converte `date` para Timestamp do Firestore
    const parsedDate = Timestamp.fromDate(new Date(date));

    await jobsRef.add({
      title,
      description,
      notes,
      shift,
      education: JSON.parse(educationObj),
      status: {
        id: "open",
        name: "Open"
      },
      pool: {
        id: "level_1",
        name: "Level 1"
      }, 
      createdAt: FieldValue.serverTimestamp(),
      date: parsedDate,
      createdBy: {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
      },
      assignedTo: null,
    });

  } catch (error) {
    return new Response("Error creating job", { status: 500 });
  }

  return redirect("/jobs/jobs");
};
