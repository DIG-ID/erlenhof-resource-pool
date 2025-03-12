// src/middleware.ts
import { defineMiddleware } from "astro:middleware";
import { auth, firestore } from "@/firebase/server";
import type { UserData } from "@/lib/types";

export const onRequest = defineMiddleware(async (context, next) => {
  const { cookies, locals, redirect, url } = context;

  // Lista de rotas públicas (não requerem autenticação)
  const publicRoutes = ["/login", "/register", "reset-password", "forgot-password", "/404", "/500"];

  // Verifica se a rota atual é pública
  if (publicRoutes.includes(url.pathname)) {
    return next(); // Pula a verificação de autenticação
  }

  // Inicializa userData como null
  let userData: UserData | null = null;

  try {
    // Verifica a sessão
    if (!cookies.has("__session")) {
      return redirect("/login");
    }

    const sessionCookie = cookies.get("__session").value;
    const decodedCookie = await auth.verifySessionCookie(sessionCookie);
    const userAuth = await auth.getUser(decodedCookie.uid);

    // Verifica se o usuário existe
    if (!userAuth || !userAuth.uid) {
      return redirect("/login");
    }

    // Busca os dados do usuário no Firestore
    const userRef = firestore.collection("users").doc(decodedCookie.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.error("Usuário não encontrado no Firestore");
      return redirect("/login");
    }

    const userFirestore = userDoc.data() as UserData;

    // Combina os dados do usuário
    userData = {
      id: userAuth.uid,
      email: userAuth.email || "",
      displayName: userAuth.displayName || "",
      name: userFirestore.name || "",
      surname: userFirestore.surname || "",
      role: userFirestore.role || "user",
      isActive: userFirestore.isActive || false,
    };

    //console.log("Dados do usuário carregados:", userData);
  } catch (error) {
    console.error("Erro ao carregar dados do usuário:", error);
    return redirect("/login");
  }

  // Adiciona os dados do usuário ao contexto (locals)
  locals.userData = userData;

  // Continua o fluxo da requisição
  return next();
});