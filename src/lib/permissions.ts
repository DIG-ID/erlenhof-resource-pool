// src/config/permissions.ts

export const roleLevels = {
  user: 0,
  admin: 1,
  super_admin: 2,
} as const;

export const routePermissions: Record<string, { pattern: RegExp; roles: (keyof typeof roleLevels)[] }> = {
  dashboard: {
    pattern: /^\/dashboard$/,
    roles: ["user", "admin", "super_admin"],
  },
  profile: {
    pattern: /^\/profile$/,
    roles: ["user", "admin", "super_admin"],
  },
  faq: {
    pattern: /^\/faq$/,
    roles: ["user", "admin", "super_admin"],
  },
  jobDetails: {
    pattern: /^\/jobs\/view\/.+$/,
    roles: ["user", "admin", "super_admin"],
  },
  usersPage: {
    pattern: /^\/users(\/.*)?$/,
    roles: ["admin", "super_admin"],
  },
  addJob: {
    pattern: /^\/jobs\/add$/,
    roles: ["admin", "super_admin"],
  },
  editJob: {
    pattern: /^\/jobs\/edit\/.+$/,
    roles: ["admin", "super_admin"],
  },
  skills: {
    pattern: /^\/skills$/,
    roles: ["super_admin"],
  },
  education: {
    pattern: /^\/education$/,
    roles: ["super_admin"],
  },
};
