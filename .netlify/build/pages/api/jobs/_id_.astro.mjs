import { f as firestore } from '../../../chunks/server_DbD1HkL9.mjs';
import { Timestamp } from 'firebase-admin/firestore';
export { renderers } from '../../../renderers.mjs';

const jobsRef = firestore.collection("jobs");
const POST = async ({ params, redirect, request }) => {
  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const notes = formData.get("notes")?.toString();
  const education = formData.get("education")?.toString();
  const shifts = formData.get("shifts")?.toString();
  const date = formData.get("date")?.toString();
  if (!title || !description || !shifts || !education || !date) {
    return new Response("Missing required fields", { status: 400 });
  }
  if (!params.id) {
    return new Response("Cannot find job", { status: 404 });
  }
  try {
    const jobDoc = await jobsRef.doc(params.id).get();
    if (!jobDoc.exists) {
      return new Response("Job not found", { status: 404 });
    }
    const jobData = jobDoc.data();
    const parsedDate = Timestamp.fromDate(new Date(date));
    await jobsRef.doc(params.id).update({
      title,
      description,
      notes,
      education,
      shifts,
      date: parsedDate,
      updatedAt: Timestamp.now(),
      assigned: jobData?.assigned || false,
      assignedTo: jobData?.assignedTo || null
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return new Response("Something went wrong", { status: 500 });
  }
  return redirect(`/jobs/edit/${params.id}?success=true`);
};
const DELETE = async ({ params, redirect }) => {
  if (!params.id) {
    return new Response("Cannot find job", { status: 404 });
  }
  try {
    const jobDoc = await jobsRef.doc(params.id).get();
    if (!jobDoc.exists) {
      return new Response("Job not found", { status: 404 });
    }
    await jobsRef.doc(params.id).delete();
  } catch (error) {
    console.error("Error deleting job:", error);
    return new Response("Something went wrong", { status: 500 });
  }
  return redirect("/jobs/jobs");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
