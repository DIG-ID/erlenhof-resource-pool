import type { APIRoute } from "astro";
import { firestore } from "@/firebase/server";

const skillRef = firestore.collection("skills");

export const POST: APIRoute = async ({ params, redirect, request }) => {
  // Captura os dados enviados pelo formulário
  const formData = await request.formData();
  const name = formData.get("name")?.toString();

  if (!name) {
    return new Response("Missing required fields", { status: 400 });
  }

  if (!params.id) {
    return new Response("Cannot find Skill", { status: 404 });
  }

  try {
    // Buscar o job antes de atualizar para preservar `assigned` e `assignedTo`
    const skillDoc = await skillRef.doc(params.id).get();

    if (!skillDoc.exists) {
      return new Response("Skill not found", { status: 404 });
    }

    await skillRef.doc(params.id).update({
      name,
    });

  } catch (error) {
    console.error("Error updating skill:", error);
    return new Response("Something went wrong", { status: 500 });
  }

  return redirect("/skills/skills");
};

export const DELETE: APIRoute = async ({ params, redirect }) => {
  if (!params.id) {
    return new Response("Cannot find Skill", { status: 404 });
  }

  try {
    const skillDoc = await skillRef.doc(params.id).get();

    if (!skillDoc.exists) {
      return new Response("Skill not found", { status: 404 });
    }

    await skillRef.doc(params.id).delete();
  } catch (error) {
    console.error("Error deleting Skill:", error);
    return new Response("Something went wrong", { status: 500 });
  }

  return redirect("/skills/skills");
};
