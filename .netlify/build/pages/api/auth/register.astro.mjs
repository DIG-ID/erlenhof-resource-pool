import { a as auth, f as firestore } from '../../../chunks/server_CQjZDwHP.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, redirect }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const surname = formData.get("surname")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  if (!email || !password || !name || !surname) {
    return new Response(
      "Missing form data",
      { status: 400 }
    );
  }
  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name
    });
    await firestore.collection("users").doc(userRecord.uid).set({
      email,
      name,
      surname,
      role: "level_1",
      // Default role
      isActive: false
      // Default status
    });
    return redirect("/login");
  } catch (error) {
    if (error.code === "auth/email-already-exists") {
      return new Response("Email already in use", { status: 400 });
    } else if (error.code === "auth/invalid-email") {
      return new Response("Invalid email", { status: 400 });
    } else {
      console.error("Error creating user: ", error);
      return new Response("Something went wrong", { status: 500 });
    }
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
