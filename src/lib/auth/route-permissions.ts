// lib/auth/route-permissions.ts

// 🔐 Permissões por role usando rotas legíveis
export const roleRoutes: Record<string, string[]> = {
  user: [
    "/jobs/:id",
    "/jobs/assigned",
    "/jobs/archive",
    "/dashboard",
    "/faq",
    "/account",
    "/api/jobs/assign",
  ],
  property: [
    "/users",
    "/users/:id",
    "/jobs/:id",
    "/jobs/add",
    "/jobs/edit/:id",
    "/api/jobs",
    "/api/jobs/:id",
    "/jobs/jobs",
    "/dashboard",
    "/faq",
    "/account",
  ],
  super_admin: [
    "/users",
    "/users/:id",
    "/jobs/add",
    "/jobs/edit/:id",
    "/jobs/jobs",
    "/skills",
    "/education",
    "/faq",
    "/account",
  ]
};
