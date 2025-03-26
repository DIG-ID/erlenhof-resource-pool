import { f as createComponent, g as createAstro, m as maybeRenderHead, i as addAttribute, s as spreadAttributes, j as renderComponent, k as renderScript, r as renderTemplate } from '../chunks/astro/server_CPy7LejW.mjs';
import 'kleur/colors';
import 'html-escaper';
import { B as Button, $ as $$Layout } from '../chunks/button_CAfgyFM1.mjs';
import { L as Label, I as Input } from '../chunks/label_DvxtnI3c.mjs';
import { C as Card, a as CardHeader, b as CardTitle, d as CardDescription, c as CardContent } from '../chunks/card_SD98urI6.mjs';
import { GalleryVerticalEnd } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$RegisterForm = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$RegisterForm;
  const { className, ...props } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`flex flex-col gap-6 ${className || ""}`, "class")}${spreadAttributes(props)}> ${renderComponent($$result, "Card", Card, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, { "className": "text-center" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", CardTitle, { "className": "text-xl" }, { "default": ($$result4) => renderTemplate`Create New Account` })} ${renderComponent($$result3, "CardDescription", CardDescription, {}, { "default": ($$result4) => renderTemplate`
Enter your details below to create your new account
` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, { "className": "p-6 pt-0" }, { "default": ($$result3) => renderTemplate` <form action="/api/auth/register" method="post"> <div class="grid gap-6"> <div class="grid gap-6"> <!-- Name and Surname --> <div class="grid grid-cols-2 gap-4"> <div class="grid gap-2"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "name" }, { "default": ($$result4) => renderTemplate`Name` })} ${renderComponent($$result3, "Input", Input, { "type": "text", "name": "name", "id": "name", "placeholder": "John", "required": true })} <span id="name-error" class="text-sm text-red-500 hidden error-message">Name is required.</span> </div> <div class="grid gap-2"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "surname" }, { "default": ($$result4) => renderTemplate`Surname` })} ${renderComponent($$result3, "Input", Input, { "type": "text", "name": "surname", "id": "surname", "placeholder": "Doe", "required": true })} <span id="surname-error" class="text-sm text-red-500 hidden error-message">Surname is required.</span> </div> </div> <!-- Email --> <div class="grid gap-2"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "email" }, { "default": ($$result4) => renderTemplate`Email` })} ${renderComponent($$result3, "Input", Input, { "type": "email", "name": "email", "id": "email", "placeholder": "m@example.com", "required": true })} <span id="email-error" class="text-sm text-red-500 hidden error-message">Invalid email format.</span> </div> <!-- Telephone --> <div class="grid gap-2"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "telephone" }, { "default": ($$result4) => renderTemplate`Telephone` })} ${renderComponent($$result3, "Input", Input, { "type": "tel", "name": "telephone", "id": "telephone", "placeholder": "+351 123 456 789" })} </div> <!-- Password --> <div class="grid gap-2"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "password" }, { "default": ($$result4) => renderTemplate`Password` })} ${renderComponent($$result3, "Input", Input, { "type": "password", "name": "password", "id": "password", "required": true })} <span id="password-error" class="text-sm text-red-500 hidden error-message">Password must be at least 6 characters.</span> </div> <!-- Confirm Password --> <div class="grid gap-2"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "confirmPassword" }, { "default": ($$result4) => renderTemplate`Confirm Password` })} ${renderComponent($$result3, "Input", Input, { "type": "password", "name": "confirmPassword", "id": "confirmPassword", "required": true })} <span id="confirmPassword-error" class="text-sm text-red-500 hidden error-message">Passwords do not match.</span> </div> ${renderComponent($$result3, "Button", Button, { "type": "submit", "className": "w-full" }, { "default": ($$result4) => renderTemplate`Create Account` })} </div> <div class="text-center text-sm">
Already have an account?${" "} <a href="/login" class="underline underline-offset-4">
Sign in
</a> </div> </div> </form> ` })} ` })} <div class="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
By clicking continue, you agree to our <a href="#">Terms of Service</a>${" "} and <a href="#">Privacy Policy</a>.
</div> </div> ${renderScript($$result, "D:/apps/erlenhof-resource-pool/src/components/RegisterForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/apps/erlenhof-resource-pool/src/components/RegisterForm.astro", void 0);

const $$Register = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sign up" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10"> <div class="flex w-full max-w-sm flex-col gap-6"> <div class="flex items-center gap-2 self-center font-medium"> <div class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground"> ${renderComponent($$result2, "GalleryVerticalEnd", GalleryVerticalEnd, { "className": "size-4" })} </div>
Erlenhof - Resource Pool
</div> ${renderComponent($$result2, "RegisterForm", $$RegisterForm, {})} </div> </div> ` })}`;
}, "D:/apps/erlenhof-resource-pool/src/pages/register.astro", void 0);

const $$file = "D:/apps/erlenhof-resource-pool/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
