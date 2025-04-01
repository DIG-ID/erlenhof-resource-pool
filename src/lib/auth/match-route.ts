// lib/auth/match-route.ts

// Converte "/users/:id" para regex /^\/users\/[^\/]+$/
export function pathToRegex(path: string): RegExp {
  const regexString = path
    .replace(/\//g, "\\/")            // escapa "/"
    .replace(/:\w+/g, "[^\\/]+");     // substitui params tipo :id
  return new RegExp(`^${regexString}$`);
}

// Verifica se pathname é autorizado para este role
export function isPathAllowed(pathname: string, allowedRoutes: string[]): boolean {
  return allowedRoutes.some((route) => {
    const regex = pathToRegex(route);
    return regex.test(pathname);
  });
}
