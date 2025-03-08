// src/api/auth/reset-password.ts

import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ request }) => {
  const url = new URL(request.url);
  const oobCode = url.searchParams.get('oobCode');

  if (!oobCode) {
    return {
      status: 400,
      body: { message: 'Invalid or missing oobCode' }
    };
  }

  // Redireciona para a página de redefinição de senha passando o 'oobCode'
  return {
    status: 200,
    body: { oobCode } // Pass the oobCode to the frontend to handle
  };
};
