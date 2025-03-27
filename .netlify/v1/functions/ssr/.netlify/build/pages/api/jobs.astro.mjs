import { f as firestore } from '../../chunks/server_DbD1HkL9.mjs';
import { Timestamp, FieldValue } from 'firebase-admin/firestore';
import sgMail from '@sendgrid/mail';
export { renderers } from '../../renderers.mjs';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const POST = async ({ request, redirect, locals }) => {
  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const notes = formData.get("notes")?.toString();
  const educationObj = formData.get("education")?.toString();
  const shiftObj = formData.get("shifts")?.toString();
  const date = formData.get("date")?.toString();
  if (!title || !description || !educationObj || !shiftObj || !date) {
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
      shift: JSON.parse(shiftObj),
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
    await sgMail.send({
      to: user.email,
      // or a list of users the job applies to
      from: "no-reply@yournewwebsite.ch",
      subject: "New Job Created",
      text: `A new job titled "${title}" has been created.`,
      html: `<strong>A new job titled "${title}" has been created.</strong>`
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
