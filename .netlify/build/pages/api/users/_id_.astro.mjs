import { f as firestore, a as auth } from '../../../chunks/server_CQjZDwHP.mjs';
export { renderers } from '../../../renderers.mjs';

const usersRef = firestore.collection("users");
const POST = async ({ params, redirect, request }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const surname = formData.get("surname")?.toString();
  const displayName = formData.get("displayName")?.toString();
  const email = formData.get("email")?.toString();
  const isActive = formData.get("isActive") === "true";
  const role = formData.get("isActive")?.toString();
  if (!name || !surname || !surname || !displayName || !email || !isActive || !role) {
    return new Response("Missing required fields", {
      status: 400
    });
  }
  if (!params.id) {
    return new Response("Cannot find User", {
      status: 404
    });
  }
  try {
    const user = await auth.getUser(params.id);
    await auth.updateUser(user.uid, {
      email,
      displayName
    });
    await usersRef.doc(params.id).update({
      name,
      surname,
      displayName,
      email,
      isActive,
      role
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500
    });
  }
  return redirect("/users/users");
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
