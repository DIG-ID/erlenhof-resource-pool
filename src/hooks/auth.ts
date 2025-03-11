import { app } from "../firebase/server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

/**
 * Verifica a sessão do utilizador e retorna os dados do Firebase Auth.
 */
export async function authSession(Astro) {
  const sessionCookie = Astro.cookies.get("__session")?.value;

  if (!sessionCookie) {
    return null; // Nenhum utilizador autenticado
  }

  try {
    const decodedCookie = await auth.verifySessionCookie(sessionCookie);
    const user = await auth.getUser(decodedCookie.uid);
    return user;
  } catch (error) {
    console.error("Erro ao verificar sessão:", error);
    return null;
  }
}

/**
 * Obtém os dados do utilizador do Firestore e combina com os dados do Firebase Auth.
 */
export async function getUserData(user) {
  if (!user) return null;

  const userRef = db.collection("users").doc(user.uid);
  const userDoc = await userRef.get();
  const userDB = userDoc.exists ? userDoc.data() : {};

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    role: userDB?.role || "user",
    name: userDB?.name || "",
    surname: userDB?.surname || "",
    isActive: userDB?.isActive ?? false,
    createdAt: userDB?.createdAt?.toDate() || null,
  };
}
