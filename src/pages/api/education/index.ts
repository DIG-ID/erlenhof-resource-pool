import type { APIRoute } from "astro";
import { firestore } from "@/firebase/server";
import { sanitizeId } from "@/lib/utils";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();

  if (!name) {
    return new Response("Missing required field", { status: 400 });
  }

  // Sanitiza o ID para evitar espaços e caracteres proibidos
  const safeId = sanitizeId(name);

  try {
    const educationRef = firestore.collection("education").doc(safeId); // Define o ID como o nome
    await educationRef.set({
      name,
    });
  } catch (error) {
    return new Response("Error creating item", { status: 500 });
  }

  return redirect("/education/education");
};
