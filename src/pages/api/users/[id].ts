import type { APIRoute } from "astro";
import { firestore, auth } from "@/firebase/server";

const usersRef = firestore.collection("users");

export const POST: APIRoute = async ({ params, redirect, request }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const surname = formData.get("surname")?.toString();
  const displayName = formData.get("displayName")?.toString();
  const email = formData.get("email")?.toString();
  const isActive = formData.get("isActive") === "on";
  const role = formData.get("roles")?.toString();

  if (!name || !surname || !displayName || !email || !role ) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  if (!params.id) {
    return new Response("Cannot find User", {
      status: 404,
    });
  }

  try {
    // 1. Atualize o email no Firebase Authentication
    const user = await auth.getUser(params.id);
    await auth.updateUser(user.uid, {
      email: email,
      displayName: displayName,
    });
    // 2. Atualize o email no Firestore
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
      status: 500,
    });
  }
  return redirect("/users/users");
};

export const DELETE: APIRoute = async ({ params, redirect }) => {
  if (!params.id) {
    return new Response("Cannot find User", {
      status: 404,
    });
  }

  try {
    await usersRef.doc(params.id).delete();
    await auth.deleteUser(params.id);
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/users/users");
};