import type { APIRoute } from "astro";
import { firestore } from "@/firebase/server";
import { Timestamp } from "firebase-admin/firestore";

const jobsRef = firestore.collection("jobs");

export const POST: APIRoute = async ({ params, redirect, request, locals }) => {
  // Captura os dados enviados pelo formulário
  const formData = await request.formData();
  const reason = formData.get("reason")?.toString();
  const notes = formData.get("notes")?.toString();
  const educationObj = formData.get("education")?.toString();
  const shiftObj = formData.get("shifts")?.toString();
  const poolObj = formData.get("pools")?.toString();
  const propertyRaw = formData.get("property")?.toString();
  const rawDate = formData.get("date")?.toString();
    // If rawDate is only a date (no time), set time to end of day
  let parsedDate: Date;
  if (rawDate && !rawDate.includes("T")) {
    parsedDate = new Date(rawDate + "T23:59:59");
  } else if (rawDate) {
    parsedDate = new Date(rawDate);
  } else {
    // Assign an invalid date to trigger validation below
    parsedDate = new Date(""); 
  }

  if (!parsedDate || isNaN(parsedDate.getTime())) {
    return new Response("Invalid or missing job date", { status: 400 });
  }

  const timestampDate = Timestamp.fromDate(parsedDate);

  // Validate required fields
  if ( !shiftObj || !educationObj || !poolObj ) {
    return new Response("Missing required fields", { status: 400 });
  }

  // Ensure user is authenticated
  const user = locals.userData;
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!params.id) {
    return new Response("Cannot find job", { status: 404 });
  }

  try {
    // Buscar o job antes de atualizar para preservar `assignedTo`
    const jobDoc = await jobsRef.doc(params.id).get();

    if (!jobDoc.exists) {
      return new Response("Job not found", { status: 404 });
    }

    const jobData = jobDoc.data();

    // Construir objeto com atualizações
    const updates: Record<string, any> = {
      reason,
      notes,
      shift: JSON.parse(shiftObj),
      education: JSON.parse(educationObj),
      pool: JSON.parse(poolObj),
      date: timestampDate,
      updatedAt: Timestamp.now(),
      assignedTo: jobData?.assignedTo || null, // mantém
    };

    // Se for super_admin e enviou novo valor de property, atualiza
    if (user.role.id === "super_admin" && propertyRaw) {
      try {
        const parsedProperty = JSON.parse(propertyRaw);
        updates.property = parsedProperty;
      } catch {
        console.warn("⚠️ Property value is not valid JSON. Ignored.");
      }
    }

    // 🔄 Atualiza no Firestore
    await jobsRef.doc(params.id).update(updates);

  } catch (error) {
    console.error("Error updating job:", error);
    return new Response("Something went wrong", { status: 500 });
  }

  return redirect(`/jobs/edit/${params.id}?updated=success`);
};

export const DELETE: APIRoute = async ({ params, redirect, locals }) => {
  if (!params.id) {
    return new Response("Cannot find job", { status: 404 });
  }

  const user = locals.userData;
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }


  try {
    const jobRef = jobsRef.doc(params.id);
    const jobDoc = await jobRef.get();

    if (!jobDoc.exists) {
      return new Response("Job not found", { status: 404 });
    }

    const jobData = jobDoc.data();

    // 🔍 Se o job tiver assignedTo, remove dos currentJobs do utilizador
    const assignedTo = jobData?.assignedTo;

    if (assignedTo?.id) {
      const userRef = firestore.collection("users").doc(assignedTo.id);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        const updatedJobs = (userData.currentJobs || []).filter(
          (job: any) => job.id !== params.id
        );

        await userRef.update({
          currentJobs: updatedJobs,
        });
      }
    }

    // 🗑️ Finalmente, apagar o job
    await jobRef.delete();
  } catch (error) {
    console.error("Error deleting job:", error);
    return new Response("Something went wrong", { status: 500 });
  }

  switch (user.role.id) {
    case "super_admin":
      return redirect("/jobs/all?deleted=success");
    case "property":
      return redirect("/jobs/property/open?deleted=success");
    default:
      return redirect("/dashboard");
  }
};

