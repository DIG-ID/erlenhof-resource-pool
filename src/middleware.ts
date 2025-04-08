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

  // 🔓 Rotas públicas (não requerem autenticação)
  const publicRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/reset-password",
    "/auth/forgot-password",
    "/auth/email-validation",
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

  if (publicRoutes.includes(pathname)) {
    console.log("✅ Página pública — continua.");
    return next();
  }

  // 🔍 Verifica cookie de sessão
  const sessionCookie = cookies.get("__session")?.value;
  if (!sessionCookie) {
    console.log("🚫 Sessão não encontrada — redirecionar para login.");
    return redirect("/auth/login");
  }

  let decodedCookie;
  try {
    decodedCookie = await auth.verifySessionCookie(sessionCookie);
    console.log("✅ Sessão válida para UID:", decodedCookie.uid);
  } catch (error) {
    console.error("❌ Cookie de sessão inválido ou expirado:", error);
    cookies.delete("__session");
    console.warn("🔄 Cookie de sessão removido.");
    return redirect("/auth/login");
  }

  // 🧠 Buscar dados do utilizador (Firestore + Auth)
  const userData: UserData | null = await getUserData(decodedCookie.uid);
  if (!userData) {
    console.error("❌ Utilizador não encontrado no Firestore/Auth.");
    cookies.delete("__session");
    console.warn("🔄 Cookie de sessão removido porque o utilizador não existe.");
    return redirect("/auth/login");
  }

  // 🧩 Guarda os dados no contexto
  locals.userData = userData;
  console.log("✅ Utilizador autenticado:", userData.email);

  // 🔐 Verifica permissões com base no role
  const role = userData.role.id;
  const allowedRoutes = roleRoutes[role] || [];

  if (!isPathAllowed(pathname, allowedRoutes) && role !== "super_admin") {
    console.warn("🚫 Rota não permitida para o role. Redirecionar para /403.");
    return redirect("/403");
  }

  // 📧 Email não verificado
  if (!userData.emailVerified) {
    console.warn("🚫 Email por verificar — redirecionar.");
    return redirect("/auth/not-verified");
  }

  // 🔒 Conta ainda inativa
  if (!userData.isActive) {
    console.warn("🚫 Conta inativa — redirecionar.");
    return redirect("/auth/not-active");
  }

  // 🥱 Easter egg
  if (pathname === "/coffee") {
    return redirect("/418");
  }

  return next();
});
