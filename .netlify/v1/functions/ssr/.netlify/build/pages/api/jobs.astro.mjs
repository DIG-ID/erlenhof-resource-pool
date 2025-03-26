import { f as firestore } from '../../chunks/server_BIJotdUM.mjs';
import { Timestamp, FieldValue } from 'firebase-admin/firestore';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request, redirect, locals }) => {
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
        surname: user.surname
      },
      assignedTo: null
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
