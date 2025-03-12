import { a as app } from '../../../chunks/server_vHGSuMZV.mjs';
import { getFirestore } from 'firebase-admin/firestore';
export { renderers } from '../../../renderers.mjs';

const db = getFirestore(app);
const friendsRef = db.collection("friends");
const POST = async ({ params, redirect, request }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const age = formData.get("age")?.toString();
  const isBestFriend = formData.get("isBestFriend") === "on";
  if (!name || !age) {
    return new Response("Missing required fields", {
      status: 400
    });
  }
  if (!params.id) {
    return new Response("Cannot find friend", {
      status: 404
    });
  }
  try {
    await friendsRef.doc(params.id).update({
      name,
      age: parseInt(age),
      isBestFriend
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500
    });
  }
  return redirect("/friends/friends");
};
const DELETE = async ({ params, redirect }) => {
  if (!params.id) {
    return new Response("Cannot find offer", {
      status: 404
    });
  }
  try {
    await friendsRef.doc(params.id).delete();
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500
    });
  }
  return redirect("/friends/friends");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
