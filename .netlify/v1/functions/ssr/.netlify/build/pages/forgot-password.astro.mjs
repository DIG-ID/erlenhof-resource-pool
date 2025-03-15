import { f as createComponent, g as createAstro, m as maybeRenderHead, i as addAttribute, s as spreadAttributes, j as renderComponent, r as renderTemplate } from '../chunks/astro/server_XNv-gxuY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { B as Button, $ as $$Layout } from '../chunks/button_CAYqDg-A.mjs';
import { L as Label, I as Input } from '../chunks/label_nNgA7TSJ.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from '../chunks/card_Yvhjps1-.mjs';
import { GalleryVerticalEnd } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$ForgotForm = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ForgotForm;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`flex flex-col gap-6 ${Astro2.props.className || ""}`, "class")}${spreadAttributes(Astro2.props)}> ${renderComponent($$result, "Card", Card, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, { "className": "text-center" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", CardTitle, { "className": "text-xl" }, { "default": ($$result4) => renderTemplate`Recover Your Password` })} ${renderComponent($$result3, "CardDescription", CardDescription, {}, { "default": ($$result4) => renderTemplate`
Enter your email below to recover your password
` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, { "className": "p-6 pt-0" }, { "default": ($$result3) => renderTemplate` <form id="password-recovery-form" method="post" action="/api/auth/recover"> <div class="grid gap-6"> <div class="grid gap-2"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "email" }, { "default": ($$result4) => renderTemplate`Email` })} ${renderComponent($$result3, "Input", Input, { "type": "email", "name": "email", "id": "email", "placeholder": "m@example.com", "required": true })} </div> ${renderComponent($$result3, "Button", Button, { "type": "submit", "className": "w-full" }, { "default": ($$result4) => renderTemplate`Recover Password` })} </div> <div class="text-center text-sm mt-4">
Don't have an account?${" "} <a href="/register" class="underline underline-offset-4">Sign up</a> </div> </form> ` })} ` })} </div>`;
}, "D:/apps/erlenhof-resource-pool/src/components/ForgotForm.astro", void 0);

const $$ForgotPassword = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Reset Password" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10"> <div class="flex w-full max-w-sm flex-col gap-6"> <a href="#" class="flex items-center gap-2 self-center font-medium"> <div class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground"> ${renderComponent($$result2, "GalleryVerticalEnd", GalleryVerticalEnd, { "className": "size-4" })} </div>
Erlehof - Resource Pool
</a> ${renderComponent($$result2, "ForgotForm", $$ForgotForm, {})} </div> </div> ` })}`;
}, "D:/apps/erlenhof-resource-pool/src/pages/forgot-password.astro", void 0);

const $$file = "D:/apps/erlenhof-resource-pool/src/pages/forgot-password.astro";
const $$url = "/forgot-password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ForgotPassword,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
