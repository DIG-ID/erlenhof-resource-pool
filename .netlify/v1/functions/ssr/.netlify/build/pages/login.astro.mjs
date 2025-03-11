import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, i as renderComponent, j as renderScript, r as renderTemplate } from '../chunks/astro/server_BqO5gSP-.mjs';
import 'kleur/colors';
import 'html-escaper';
import { a as app } from '../chunks/server_1hFA-0b5.mjs';
import { getAuth } from 'firebase-admin/auth';
import { $ as $$Layout } from '../chunks/Layout_CX7MkSx_.mjs';
import { c as cn, B as Button } from '../chunks/button_CnbqMR9w.mjs';
import { L as Label, I as Input } from '../chunks/label_Cfq7haAI.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from '../chunks/card_CjWkI_Sh.mjs';
import { jsx } from 'react/jsx-runtime';
import 'react';
import { cva } from 'class-variance-authority';
import { GalleryVerticalEnd } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "text-destructive-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-destructive-foreground/80"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Alert({
  className,
  variant,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: cn(alertVariants({ variant }), className),
      ...props
    }
  );
}
function AlertDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-description",
      className: cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      ),
      ...props
    }
  );
}

const $$Astro$1 = createAstro();
const $$LoginForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$LoginForm;
  const { className, ...props } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`flex flex-col gap-6 ${className || ""}`, "class")}${spreadAttributes(props)}> ${renderComponent($$result, "Card", Card, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, { "className": "text-center" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", CardTitle, { "className": "text-xl" }, { "default": ($$result4) => renderTemplate`Login to your account` })} ${renderComponent($$result3, "CardDescription", CardDescription, {}, { "default": ($$result4) => renderTemplate`
Enter your email below to login to your account
` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, { "className": "p-6 pt-0" }, { "default": ($$result3) => renderTemplate` <form id="login-form" action="/api/auth/signin" method="post"> <div class="grid gap-6"> <div class="grid gap-6"> <div class="grid gap-2"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "email" }, { "default": ($$result4) => renderTemplate`Email` })} ${renderComponent($$result3, "Input", Input, { "type": "email", "name": "email", "id": "email", "placeholder": "m@example.com", "required": true })} </div> <div class="grid gap-2"> <div class="flex items-center"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "password" }, { "default": ($$result4) => renderTemplate`Password` })} <a href="/forgot-password" class="ml-auto text-sm underline-offset-4 hover:underline"> Forgot your password?</a> </div> ${renderComponent($$result3, "Input", Input, { "type": "password", "name": "password", "id": "password", "required": true })} <!-- Error message for password validation --> ${renderComponent($$result3, "Alert", Alert, { "id": "password-error", "variant": "destructive", "className": "hidden mt-2" }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "AlertDescription", AlertDescription, { "id": "password-error-message" })} ` })} </div> ${renderComponent($$result3, "Button", Button, { "type": "submit", "className": "w-full" }, { "default": ($$result4) => renderTemplate`Login` })} </div> <div class="text-center text-sm">
Don&apos;t have an account?${" "} <a href="/register" class="underline underline-offset-4">
Sign up
</a> </div> </div> </form> ` })} ` })} <div class="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  "> By clicking continue, you agree to our <a href="#">Terms of Service</a>${" "} and <a href="#">Privacy Policy</a>.
</div> </div> ${renderScript($$result, "D:/apps/erlenhof-resource-pool/src/components/LoginForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/apps/erlenhof-resource-pool/src/components/LoginForm.astro", void 0);

const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const auth = getAuth(app);
  if (Astro2.cookies.has("__session")) {
    const sessionCookie = Astro2.cookies.get("__session").value;
    const decodedCookie = await auth.verifySessionCookie(sessionCookie);
    if (decodedCookie) {
      return Astro2.redirect("/");
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Login" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10"> <div class="flex w-full max-w-sm flex-col gap-6"> <a href="/" class="flex items-center gap-2 self-center font-medium"> <div class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground"> ${renderComponent($$result2, "GalleryVerticalEnd", GalleryVerticalEnd, { "className": "size-4" })} </div>
Erlenhof - Resource Pool
</a> ${renderComponent($$result2, "LoginForm", $$LoginForm, {})} </div> </div> ` })}`;
}, "D:/apps/erlenhof-resource-pool/src/pages/login.astro", void 0);

const $$file = "D:/apps/erlenhof-resource-pool/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
