import { f as firestore, a as auth } from '../../../chunks/server_DbD1HkL9.mjs';
export { renderers } from '../../../renderers.mjs';

const usersRef = firestore.collection("users");
function isValidPhoneNumber(phone) {
  if (!phone) return true;
  return /^\+\d{10,15}$/.test(phone);
}
const POST = async ({ params, redirect, request }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const surname = formData.get("surname")?.toString();
  const displayName = formData.get("displayName")?.toString();
  const email = formData.get("email")?.toString();
  const phoneNumber = formData.get("phone")?.toString();
  const roleObj = formData.get("role")?.toString();
  const poolObj = formData.get("pools")?.toString();
  const educationObj = formData.get("education")?.toString();
  const isActive = formData.has("isActive");
  if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
    return new Response("Invalid phone number format", { status: 400 });
  }
  if (!params?.id) {
    return new Response(JSON.stringify({ error: "Invalid user ID" }), { status: 400 });
  }
  if (!name || !surname || !displayName || !email || !roleObj) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }
  try {
    const user = await auth.getUser(params.id);
    await auth.updateUser(user.uid, {
      email,
      displayName,
      phoneNumber: phoneNumber || void 0
    });
    await usersRef.doc(params.id).update({
      name,
      surname,
      displayName,
      isActive,
      role: JSON.parse(roleObj),
      pool: JSON.parse(poolObj),
      education: JSON.parse(educationObj)
    });
    return redirect(`/users/edit/${params.id}?success=true`);
  } catch (error) {
    console.error("❌ Erro ao atualizar utilizador:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
const DELETE = async ({ params, redirect }) => {
  if (!params.id) {
    return new Response("Cannot find User", {
      status: 404
    });
  }
  try {
    await usersRef.doc(params.id).delete();
    await auth.deleteUser(params.id);
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500
    });
  }
  return redirect("/users/users");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
