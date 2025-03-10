import { defineMiddleware } from "astro:middleware";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore"; 
import { app } from "./firebase/server"; // Ajuste o caminho conforme necessário

const auth = getAuth(app);
const db = getFirestore(app);

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, locals, cookies, redirect } = context;

  
  // Páginas permitidas sem login
  const publicRoutes = ["/login", "/register", "/password-recovery", "/404"];

  const pathname = new URL(request.url).pathname;

  // Se for uma página pública, continua normalmente
  if (publicRoutes.includes(pathname)) {
    return next();
  }

  // Verifica se o cookie de sessão existe
  const sessionCookie = cookies.get("__session")?.value;
  
  if (!sessionCookie) {
    // Primeiro, tenta processar a página normalmente
    const response = await next();

    // Se a página não existir (Erro 404), retorna diretamente o erro, sem redirecionar para login
    if (response.status === 404) {
      return response;
    }

    // Se não for um 404, redireciona para login
    return redirect("/login");
  }

  try {
    
    // Verifica o cookie e obtém os dados do usuário
    const decodedCookie = await auth.verifySessionCookie(sessionCookie);

    // Busca os dados do usuário na Firestore
    const userRef = db.collection("users").doc(decodedCookie.uid); // Substitua "users" com o nome da sua coleção
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new Error("Usuário não encontrado na Firestore");
    }

    // Dados de autenticação do Firebase
    const firebaseUser = await auth.getUser(decodedCookie.uid);

    // Dados adicionais do Firestore
    const firestoreUser = userDoc.data();

    // Combina os dados de autenticação e Firestore
    const user = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      emailVerified: firebaseUser.emailVerified,
      role: firestoreUser?.role,
      name: firestoreUser?.name,
      surname: firestoreUser?.surname,
      isActive: firestoreUser?.isActive,
      createdAt: firestoreUser?.createdAt?.toDate(), // Convertendo o Timestamp para Date
    };

    // Armazena os dados do usuário para uso futuro
    locals.user = user;

    return next(); // Permite acesso à págin
  } catch (error) {
    console.error("Erro ao verificar sessão:", error);

    // Primeiro, verifica se a página existe antes de redirecionar
    const response = await next();
    if (response.status === 404) {
      return response;
    }

    return redirect("/login");
  }
});
