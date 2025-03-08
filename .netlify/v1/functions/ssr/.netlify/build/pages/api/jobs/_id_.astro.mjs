import { a as app } from '../../../chunks/server_1hFA-0b5.mjs';
import { getFirestore } from 'firebase-admin/firestore';
export { renderers } from '../../../renderers.mjs';

const db = getFirestore(app);
const jobsRef = db.collection("jobs");
const POST = async ({ params, redirect, request }) => {
  const formData = await request.formData();
  const title = formData.get("name")?.toString();
  const description = formData.get("age")?.toString();
  const role = formData.get("name")?.toString();
  const status = formData.get("age")?.toString();
  if (!title || !description || !role || !status) {
    return new Response("Missing required fields", {
      status: 400
    });
  }
  if (!params.id) {
    return new Response("Cannot find job", {
      status: 404
    });
  }
  try {
    await jobsRef.doc(params.id).update({
      title,
      description,
      role,
      status
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500
    });
  }
  return redirect("/jobs/jobs");
};
const DELETE = async ({ params, redirect }) => {
  if (!params.id) {
    return new Response("Cannot find offer", {
      status: 404
    });
  }
  try {
    await jobsRef.doc(params.id).delete();
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500
    });
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
