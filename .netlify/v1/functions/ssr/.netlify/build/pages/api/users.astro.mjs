import { f as firestore, a as auth } from '../../chunks/server_BIJotdUM.mjs';
import { doc, getDoc, setDoc } from 'firebase/firestore';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request, redirect }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const surname = formData.get("surname")?.toString();
  const displayName = formData.get("displayName")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const role = formData.get("roles")?.toString();
  const isActive = formData.get("isActive") === "on";
  if (!email || !password || !name || !surname || !role) {
    return new Response("Missing form data", { status: 400 });
  }
  try {
    const roleRef = doc(firestore, "roles", role);
    const roleSnap = await getDoc(roleRef);
    if (!roleSnap.exists()) {
      return new Response(`Role "${role}" does not exist.`, { status: 400 });
    }
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
      disabled: !isActive
      // Se isActive = false, a conta fica desativada
    });
    const userRef = doc(firestore, "users", userRecord.uid);
    await setDoc(userRef, {
      id: userRecord.uid,
      name,
      surname,
      displayName,
      email,
      isActive,
      role,
      currentJobs: []
      // O utilizador começa sem jobs atribuídos
    });
    return redirect("/users/users");
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.code === "auth/email-already-exists") {
      return new Response("Email already in use", { status: 400 });
    } else if (error.code === "auth/invalid-email") {
      return new Response("Invalid email", { status: 400 });
    } else {
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
