import { f as createComponent, g as createAstro, m as maybeRenderHead, i as addAttribute, s as spreadAttributes, j as renderComponent, k as renderScript, r as renderTemplate } from '../chunks/astro/server_C8eqZ-Yu.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_CM9-VB5w.mjs';
import { B as Button } from '../chunks/button_PAnIewiZ.mjs';
import { L as Label, I as Input } from '../chunks/label_-3OLH1iv.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from '../chunks/card_DHzrLONR.mjs';
import { GalleryVerticalEnd } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$ResetForm = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ResetForm;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`flex flex-col gap-6 ${Astro2.props.className || ""}`, "class")}${spreadAttributes(Astro2.props)}> ${renderComponent($$result, "Card", Card, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, { "className": "text-center" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", CardTitle, { "className": "text-xl" }, { "default": ($$result4) => renderTemplate`Reset Your Password` })} ${renderComponent($$result3, "CardDescription", CardDescription, {}, { "default": ($$result4) => renderTemplate`
Enter your email below to reset your password
` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, { "className": "p-6 pt-0" }, { "default": ($$result3) => renderTemplate` <form id="password-recovery-form" method="post" action="/api/auth/reset-password"> <div class="grid gap-6"> <div class="grid gap-2"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "password" }, { "default": ($$result4) => renderTemplate`Password` })} ${renderComponent($$result3, "Input", Input, { "type": "password", "name": "password", "id": "password", "required": true })} </div> <div class="grid gap-2"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "password" }, { "default": ($$result4) => renderTemplate`Password Confirmation` })} ${renderComponent($$result3, "Input", Input, { "type": "password", "name": "confirm-password", "id": "confirm-password", "required": true })} </div> ${renderComponent($$result3, "Button", Button, { "type": "submit", "className": "w-full" }, { "default": ($$result4) => renderTemplate`Save New Password` })} </div> </form> ` })} ` })} </div> ${renderScript($$result, "D:/apps/astro-app/src/components/ResetForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/apps/astro-app/src/components/ResetForm.astro", void 0);

const $$ResetPassword = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Reset Password" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10"> <div class="flex w-full max-w-sm flex-col gap-6"> <a href="#" class="flex items-center gap-2 self-center font-medium"> <div class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground"> ${renderComponent($$result2, "GalleryVerticalEnd", GalleryVerticalEnd, { "className": "size-4" })} </div>
Erlehof - Resource Pool
</a> ${renderComponent($$result2, "ResetForm", $$ResetForm, {})} </div> </div> ` })}`;
}, "D:/apps/astro-app/src/pages/reset-password.astro", void 0);

const $$file = "D:/apps/astro-app/src/pages/reset-password.astro";
const $$url = "/reset-password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ResetPassword,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
