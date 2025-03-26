import type { APIRoute } from "astro";
import { firestore } from "@/firebase/server";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();

  if (!name) {
    return new Response("Missing required field", { status: 400 });
  }

  try {
    const skillRef = firestore.collection("skills"); // Define o ID como o nome
    await skillRef.add({
      name
    });
  } catch (error) {
    return new Response("Error creating Skill", { status: 500 });
  }

  return redirect("/skills/skills");
};
