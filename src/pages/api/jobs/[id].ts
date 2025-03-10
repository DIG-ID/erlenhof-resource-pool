import type { APIRoute } from "astro";
import { app } from "@/firebase/server";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore(app);
const jobsRef = db.collection("jobs");

export const POST: APIRoute = async ({ params, redirect, request }) => {
  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const smallDescription = formData.get("smallDescription")?.toString();
  const roles = formData.get("roles")?.toString();
  const status = formData.get("status")?.toString();
  console.log(formData)

  if (!title || !smallDescription || !roles || !status) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  if (!params.id) {
    return new Response("Cannot find job", {
      status: 404,
    });
  }

  try {
    await jobsRef.doc(params.id).update({
      title,
      smallDescription,
      roles,
      status,
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/jobs/jobs");
};

export const DELETE: APIRoute = async ({ params, redirect }) => {
  if (!params.id) {
    return new Response("Cannot find offer", {
      status: 404,
    });
  }

  try {
    await jobsRef.doc(params.id).delete();
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/jobs/jobs");
};