import { a as auth } from '../../../chunks/server_CQjZDwHP.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ request, cookies, redirect }) => {
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  if (!idToken) {
    return new Response(
      "No token found",
      { status: 401 }
    );
  }
  try {
    await auth.verifyIdToken(idToken);
  } catch (error) {
    return new Response(
      "Invalid token",
      { status: 401 }
    );
  }
  const fiveDays = 60 * 60 * 24 * 5 * 1e3;
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: fiveDays
  });
  cookies.set("__session", sessionCookie, {
    path: "/"
  });
  return redirect("/");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
