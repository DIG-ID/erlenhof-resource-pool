import { defineMiddleware } from "astro:middleware";
import { auth } from "@/firebase/server";
import { getUserData } from "@/hooks/get-data";
import type { UserData } from "@/lib/types";

export const onRequest = defineMiddleware(async (context, next) => {
  const { cookies, locals, redirect, url } = context;

  console.log("✅ Middleware carregado!");
  console.log("🔎 Página requisitada:", url.pathname);

  // 🔹 Lista de rotas públicas (sem autenticação necessária)
  const publicRoutes = [
    "/login",
    "/register",
    "/reset-password",
    "/forgot-password",
    "/404",
    "/403",
    "/418",
    "/500",
    "/api/auth/signin",
    "/api/auth/register",
  ];

  // 🔹 Rotas protegidas com permissões (suporta regex para dinâmicas)
  const protectedRoutes: Record<string, RegExp[]> = {
    "admin": [/^\/users(\/.*)?$/, /^\/jobs\/add$/, /^\/jobs\/edit\/.+$/], // Admin e Super Admin
    "super_admin": [/^\/users(\/.*)?$/, /^\/jobs\/add$/, /^\/jobs\/edit\/.+$/, /^\/skills$/, /^\/education$/], // Super Admin tem mais permissões
  };

  // ✅ Se a rota for pública, segue normalmente
  if (publicRoutes.includes(url.pathname)) {
    console.log("✅ Página pública, continuando sem autenticação.");
    return next();
  }

  // 🔍 Verifica a sessão (se existir)
  const sessionCookie = cookies.get("__session")?.value;
  if (!sessionCookie) {
    console.log("🚫 Nenhuma sessão encontrada. Redirecionando para login.");
    return redirect("/login");
  }

  let decodedCookie;
  try {
    decodedCookie = await auth.verifySessionCookie(sessionCookie);
    console.log("✅ Sessão válida para UID:", decodedCookie.uid);
  } catch (error) {
    console.error("❌ Sessão inválida ou expirada:", error);
    return redirect("/login");
  }

  // 🔍 Buscar dados completos do utilizador
  const userData: UserData | null = await getUserData(decodedCookie.uid);
  if (!userData) {
    console.error("❌ Utilizador não encontrado no Firestore ou Authentication.");
    return redirect("/login");
  }

  // 🔹 Adiciona os dados completos do utilizador ao `locals`
  locals.userData = userData;

  console.log("✅ Utilizador autenticado:", locals.userData);

  // 🚨 **Verificação de Role para Páginas Protegidas**
  const userRole = locals.userData.role.id;
  const allowedPaths = protectedRoutes[userRole] || [];

  const isAuthorized = allowedPaths.some((regex) => regex.test(url.pathname));
  if (!isAuthorized && userRole !== "super_admin") {
    console.log("🚫 Acesso negado! Redirecionando para /403");
    return redirect("/403");
  }

  // 🔄 **Proteção de Páginas Especiais**
  if (url.pathname === "/coffee") {
    return redirect("/418");
  }

  return next();
});
