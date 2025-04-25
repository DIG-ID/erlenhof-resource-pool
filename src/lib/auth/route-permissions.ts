// lib/auth/route-permissions.ts

// 🔐 Permissões por role usando rotas legíveis
export const roleRoutes: Record<string, string[]> = {
  user: [
    "/jobs/:id",
    "/jobs/user/assigned",
    "/jobs/user/archive",
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
    "/jobs/property/open",
    "/jobs/property/archive",
    "/jobs/property/upcoming",
    "/dashboard",
    "/faq",
    "/account",
  ],
  super_admin: [
    "/users",
    "/users/all",
    "/users/properties",
    "/users/users",
    "/users/:id",
    "/jobs/add",
    "/jobs/edit/:id",
    "/jobs/all",
    "/jobs/upcoming",
    "/jobs/open",
    "/jobs/archive",
    "/skills",
    "/education",
    "/faq",
    "/account",
  ]
};
