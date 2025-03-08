// src/api/auth/recover.ts

import type { APIRoute } from "astro";
import { getAuth, sendPasswordResetEmail, fetchSignInMethodsForEmail } from 'firebase/auth';
import { app } from '../../firebase/client'; // Ajuste o caminho do Firebase conforme necessário

export const POST: APIRoute = async ({ request }) => {
  const { email } = await request.json();

  // Verificar se o email está no formato correto
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return {
      status: 400,
      body: { message: "Please provide a valid email." },
    };
  }

  const auth = getAuth(app);

  try {
    // Verificar se o email existe no Firebase
    const methods = await fetchSignInMethodsForEmail(auth, email);

    if (methods.length === 0) {
      return {
        status: 404,
        body: { message: "Email is not registered." },
      };
    }

    // Se o email existe, enviar o email de recuperação de senha
    await sendPasswordResetEmail(auth, email);
    return {
      status: 200,
      body: { message: "Password reset email sent successfully." },
    };

  } catch (error) {
    console.error("Error during password reset process:", error);
    return {
      status: 500,
      body: { message: "Error sending password reset email.", error: error.message },
    };
  }
};
