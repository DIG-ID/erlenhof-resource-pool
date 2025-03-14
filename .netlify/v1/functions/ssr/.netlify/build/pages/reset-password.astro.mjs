import { f as createComponent, m as maybeRenderHead, j as renderComponent, r as renderTemplate } from '../chunks/astro/server_XNv-gxuY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { B as Button, $ as $$Layout } from '../chunks/button_CGSdtx1P.mjs';
import { L as Label, I as Input } from '../chunks/label_DK6PtoXw.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from '../chunks/card_CxFAGwzZ.mjs';
import { GalleryVerticalEnd } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const $$ResetForm = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col gap-6"> ${renderComponent($$result, "Card", Card, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, { "className": "text-center" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", CardTitle, { "className": "text-xl" }, { "default": ($$result4) => renderTemplate`Reset Your Password` })} ${renderComponent($$result3, "CardDescription", CardDescription, {}, { "default": ($$result4) => renderTemplate`
Enter your new password.
` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, { "className": "p-6 pt-0" }, { "default": ($$result3) => renderTemplate` <form id="password-recovery-form" method="post" action="/api/auth/reset-password"> <div class="grid gap-6"> <div class="grid gap-2"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "password" }, { "default": ($$result4) => renderTemplate`Password` })} ${renderComponent($$result3, "Input", Input, { "type": "password", "name": "password", "id": "password", "required": true })} </div> <div class="grid gap-2"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "password" }, { "default": ($$result4) => renderTemplate`Password Confirmation` })} ${renderComponent($$result3, "Input", Input, { "type": "password", "name": "confirm-password", "id": "confirm-password", "required": true })} </div> ${renderComponent($$result3, "Button", Button, { "type": "submit", "className": "w-full" }, { "default": ($$result4) => renderTemplate`Save New Password` })} </div> </form> ` })} ` })} </div>`;
}, "D:/apps/erlenhof-resource-pool/src/components/ResetForm.astro", void 0);

const $$ResetPassword = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Recover Password" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10"> <div class="flex w-full max-w-sm flex-col gap-6"> <a href="#" class="flex items-center gap-2 self-center font-medium"> <div class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground"> ${renderComponent($$result2, "GalleryVerticalEnd", GalleryVerticalEnd, { "className": "size-4" })} </div>
Erlenhof - Resource Pool
</a> ${renderComponent($$result2, "ResetForm", $$ResetForm, {})} </div> </div> ` })}`;
}, "D:/apps/erlenhof-resource-pool/src/pages/reset-password.astro", void 0);

const $$file = "D:/apps/erlenhof-resource-pool/src/pages/reset-password.astro";
const $$url = "/reset-password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ResetPassword,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
