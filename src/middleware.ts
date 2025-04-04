import { defineMiddleware } from "astro:middleware";
import { auth } from "@/firebase/server";
import { getUserData } from "@/hooks/get-data";

import { roleRoutes } from "@/lib/auth/route-permissions";
import { isPathAllowed } from "@/lib/auth/match-route";
import type { UserData } from "@/lib/types";

export const onRequest = defineMiddleware(async (context, next) => {
  const { cookies, locals, redirect, url } = context;
  const pathname = url.pathname;

  console.log("✅ Middleware carregado!");
  console.log("🔎 Página requisitada:", pathname);

  // 🔹 Lista de rotas públicas (sem autenticação necessária)
  const publicRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/reset-password",
    "/auth/forgot-password",
    "/auth/email-verification",
    "/auth/action",
    "/auth/not-active",
    "/auth/not-verified",
    "/404",
    "/403",
    "/418",
    "/500",
    "/api/auth/signin",
    "/api/auth/register",
    "/api/auth/signout",
    "/"
  ];

  // ✅ Se a rota for pública, segue normalmente
  if (publicRoutes.includes(pathname)) {
    console.log("✅ Página pública, continuando sem autenticação.");
    return next();
  }

  // 🔍 Verifica a sessão (se existir)
  const sessionCookie = cookies.get("__session")?.value;
  if (!sessionCookie) {
    console.log("🚫 Nenhuma sessão encontrada. Redirecionando para login.");
    return redirect("/auth/login");
  }

  let decodedCookie;
  try {
    decodedCookie = await auth.verifySessionCookie(sessionCookie);
    console.log("✅ Sessão válida para UID:", decodedCookie.uid);
  } catch (error) {
    console.error("❌ Sessão inválida ou expirada:", error);
    return redirect("/auth/login");
  }

  // 🔍 Buscar dados completos do utilizador
  const userData: UserData | null = await getUserData(decodedCookie.uid);
  if (!userData) {
    console.error("❌ Utilizador não encontrado no Firestore ou Authentication.");
    return redirect("/auth/login");
  }

  // 🔹 Adiciona os dados completos do utilizador ao `locals`
  locals.userData = userData;

  console.log("✅ Utilizador autenticado:", locals.userData);

  // 🚨 **Verificação de Role para Páginas Protegidas**
  const role = userData.role.id;
  const allowedRoutes = roleRoutes[role] || [];


  // 🚨 Verificação de permissões por role
  if (!isPathAllowed(pathname, allowedRoutes) && role !== "super_admin") {
    console.log("🚫 Acesso negado! Redirecionando para /403");
    return redirect("/403");
  }

  // 🔄 Email ainda não verificado
  if (!userData.emailVerified) {
    console.warn("🚫 Email não verificado. Redirecionando...");
    return redirect("/auth/not-verified");
  }

  // 🔄 Conta ainda não aprovada
  if (!userData.isActive) {
    console.warn("🚫 Conta ainda não está ativa. Redirecionando...");
    return redirect("/auth/not-active");
  }

  // 🔄 **Proteção de Páginas Especiais**
  if (url.pathname === "/coffee") {
    return redirect("/418");
  }

  return next();
});
