import { b as app } from '../../chunks/server_CQjZDwHP.mjs';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request, redirect, locals }) => {
  const user = locals.userData;
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
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
    const parsedDate = Timestamp.fromDate(new Date(date));
    await jobsRef.add({
      title,
      description,
      notes,
      roles,
      status,
      createdAt: FieldValue.serverTimestamp(),
      date: parsedDate,
      // 🔥 Agora é salvo como um Timestamp do Firestore
      createdBy: {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname
      },
      assigned: false,
      assignedTo: null
      // Agora é um único utilizador ou null
    });
  } catch (error) {
    return new Response("Error creating job", { status: 500 });
  }
  return redirect("/jobs/jobs");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
