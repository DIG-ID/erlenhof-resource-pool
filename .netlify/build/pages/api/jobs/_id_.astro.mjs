import { b as app } from '../../../chunks/server_CQjZDwHP.mjs';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
export { renderers } from '../../../renderers.mjs';

const db = getFirestore(app);
const jobsRef = db.collection("jobs");
const POST = async ({ params, redirect, request }) => {
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
      roles,
      status,
      date: parsedDate,
      // 🔥 Agora atualizado como Timestamp
      updatedAt: Timestamp.now(),
      assigned: jobData?.assigned || false,
      // Mantém o estado de assigned
      assignedTo: jobData?.assignedTo || null
      // Mantém um único utilizador ou null
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return new Response("Something went wrong", { status: 500 });
  }
  return redirect("/jobs/jobs");
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
