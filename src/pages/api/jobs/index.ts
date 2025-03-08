import type { APIRoute } from "astro";
import { app } from "@/firebase/server";
import { getFirestore, FieldValue, } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const smallDescription = formData.get("smallDescription")?.toString();
  const roles = formData.get("roles")?.toString();
  const status = formData.get("status")?.toString();

  if ( !title || !smallDescription || !roles || !status ) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }
  try {
    const db = getFirestore(app);
    const jobsRef = db.collection("jobs");
    await jobsRef.add({
      title,
      smallDescription,
      roles,
      status,
      createdAt: FieldValue.serverTimestamp(),
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/jobs/jobs");
};