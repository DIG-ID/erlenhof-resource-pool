import { f as createComponent, g as createAstro, m as maybeRenderHead, i as addAttribute, s as spreadAttributes, j as renderComponent, k as renderScript, r as renderTemplate } from '../chunks/astro/server_CPy7LejW.mjs';
import 'kleur/colors';
import 'html-escaper';
import { a as auth } from '../chunks/server_DbD1HkL9.mjs';
import { B as Button, $ as $$Layout } from '../chunks/button_QFx0fRuX.mjs';
import { L as Label, I as Input } from '../chunks/label_DvxtnI3c.mjs';
import { C as Card, a as CardHeader, b as CardTitle, d as CardDescription, c as CardContent } from '../chunks/card_SD98urI6.mjs';
import { A as Alert, a as AlertDescription } from '../chunks/alert_CkHLLdPP.mjs';
import { GalleryVerticalEnd } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$LoginForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$LoginForm;
  const { className, ...props } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`flex flex-col gap-6 ${className || ""}`, "class")}${spreadAttributes(props)}> ${renderComponent($$result, "Card", Card, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, { "className": "text-center" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", CardTitle, { "className": "text-xl" }, { "default": async ($$result4) => renderTemplate`Login to your account` })} ${renderComponent($$result3, "CardDescription", CardDescription, {}, { "default": async ($$result4) => renderTemplate`
Enter your email below to login to your account
` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, { "className": "p-6 pt-0" }, { "default": async ($$result3) => renderTemplate` <form id="login-form" action="/api/auth/signin" method="post"> <div class="grid gap-6"> <div class="grid gap-6"> <div class="grid gap-2"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "email" }, { "default": async ($$result4) => renderTemplate`Email` })} ${renderComponent($$result3, "Input", Input, { "type": "email", "name": "email", "id": "email", "placeholder": "m@example.com", "required": true })} </div> <div class="grid gap-2"> <div class="flex items-center"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "password" }, { "default": async ($$result4) => renderTemplate`Password` })} <a href="/forgot-password" class="ml-auto text-sm underline-offset-4 hover:underline"> Forgot your password?</a> </div> ${renderComponent($$result3, "Input", Input, { "type": "password", "name": "password", "id": "password", "required": true })} <!-- Error message for password validation --> ${renderComponent($$result3, "Alert", Alert, { "id": "password-error", "variant": "destructive", "className": "hidden mt-2" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "AlertDescription", AlertDescription, { "id": "password-error-message" })} ` })} </div> ${renderComponent($$result3, "Button", Button, { "type": "submit", "className": "w-full cursor-pointer" }, { "default": async ($$result4) => renderTemplate`Login` })} </div> <div class="text-center text-sm">
Don&apos;t have an account?${" "} <a href="/register" class="underline underline-offset-4">
Sign up
</a> </div> </div> </form> ` })} ` })} <div class="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  "> By clicking continue, you agree to our <a href="#">Terms of Service</a>${" "} and <a href="#">Privacy Policy</a>.
</div> </div> ${renderScript($$result, "C:/Users/danie/Desktop/DIGID/Projects/erlenhof-resource-pool/src/components/LoginForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/danie/Desktop/DIGID/Projects/erlenhof-resource-pool/src/components/LoginForm.astro", void 0);

const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  if (Astro2.cookies.has("__session")) {
    const sessionCookie = Astro2.cookies.get("__session").value;
    const decodedCookie = await auth.verifySessionCookie(sessionCookie);
    if (decodedCookie) {
      return Astro2.redirect("/dashboard");
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Login" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10"> <div class="flex w-full max-w-sm flex-col gap-6"> <div class="flex items-center gap-2 self-center font-medium"> <div class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground"> ${renderComponent($$result2, "GalleryVerticalEnd", GalleryVerticalEnd, { "className": "size-4" })} </div>
Erlenhof - Resource Pool
</div> ${renderComponent($$result2, "LoginForm", $$LoginForm, {})} </div> </div> ` })}`;
}, "C:/Users/danie/Desktop/DIGID/Projects/erlenhof-resource-pool/src/pages/login.astro", void 0);

const $$file = "C:/Users/danie/Desktop/DIGID/Projects/erlenhof-resource-pool/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
