import { b as app } from '../../chunks/server_CQjZDwHP.mjs';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request, redirect }) => {
  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const smallDescription = formData.get("smallDescription")?.toString();
  const roles = formData.get("roles")?.toString();
  const status = formData.get("status")?.toString();
  if (!title || !smallDescription || !roles || !status) {
    return new Response("Missing required fields", {
      status: 400
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
      createdAt: FieldValue.serverTimestamp()
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500
    });
  }
  return redirect("/jobs/jobs");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
