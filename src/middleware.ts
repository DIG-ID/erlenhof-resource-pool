import { defineMiddleware } from "astro:middleware";
import { auth, firestore } from "@/firebase/server";
import type { UserData } from "@/lib/types";

export const onRequest = defineMiddleware(async (context, next) => {
  const { cookies, locals, redirect, url } = context;

  console.log("✅ Middleware carregado!");
  console.log("🔎 Página requisitada:", url.pathname);

  // Lista de rotas públicas (não requerem autenticação)
  const publicRoutes = [
    "/login",
    "/register",
    "/reset-password",
    "/forgot-password",
    "/404",
    "/500",
    "/api/auth/signin",
    "/api/auth/register"
  ];


  // Definir rotas protegidas com roles permitidos
  const protectedRoutes: Record<string, string[]> = {
    "/users/users": ["admin", "super_admin"],
    "/users/add": ["admin", "super_admin"],
    "/users/:id": ["admin", "super_admin"],
    "/users/edit/:id": ["admin", "super_admin"],
    "/jobs/add": ["admin", "super_admin"],
    "/jobs/edit/:id": ["admin", "super_admin"],
  };


  // Verificar se já há um cookie de sessão
  const sessionCookie = cookies.get("__session")?.value;

  if (sessionCookie) {
    try {
      const decodedCookie = await auth.verifySessionCookie(sessionCookie);
      console.log("✅ Sessão válida para UID:", decodedCookie.uid);


    } catch (error) {
      console.error("❌ Sessão inválida ou expirada:", error);
    }
  }

  // Se a rota for pública, não faz mais verificações
  if (publicRoutes.includes(url.pathname)) {
    console.log("✅ Página pública, continuando sem autenticação.");
    return next();
  }

  // Se não houver sessão, redireciona para login
  if (!sessionCookie) {
    console.log("🚫 Nenhuma sessão encontrada. Redirecionando para login.");
    return redirect("/login");
  }

  try {
    const decodedCookie = await auth.verifySessionCookie(sessionCookie);
    console.log("✅ Sessão verificada com sucesso para UID:", decodedCookie.uid);

    const userAuth = await auth.getUser(decodedCookie.uid);
    if (!userAuth || !userAuth.uid) {
      console.log("❌ Utilizador não encontrado no Authentication. Redirecionando para login.");
      return redirect("/login");
    }

    // Busca os dados do usuário no Firestore
    const userRef = firestore.collection("users").doc(decodedCookie.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.error("❌ Utilizador não encontrado no Firestore.");
      return redirect("/login");
    }

    const userFirestore = userDoc.data() as UserData;

    // Combina os dados do usuário
    locals.userData = {
      id: userAuth.uid,
      email: userAuth.email || "",
      displayName: userAuth.displayName || "",
      name: userFirestore.name || "",
      surname: userFirestore.surname || "",
      role: userFirestore.role || "user",
      isActive: userFirestore.isActive || false,
    };

    console.log("✅ Utilizador autenticado:", locals.userData);

    // 🚨 **Verificação de Role para Páginas Protegidas**
    const allowedRoles = protectedRoutes[url.pathname];
    if (allowedRoles && !allowedRoles.includes(locals.userData.role)) {
      console.log("🚫 Acesso negado! Redirecionando para /403");
      return redirect("/403");
    }


  } catch (error) {
    console.error("❌ Erro ao carregar dados do utilizador:", error);
    return redirect("/login");
  }

  if (url.pathname === "/coffee") {
    return redirect("/418");
  }

  return next();
});
