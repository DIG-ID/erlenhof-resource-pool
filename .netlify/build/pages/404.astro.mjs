import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_XNv-gxuY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout, B as Button } from '../chunks/button_CGSdtx1P.mjs';
import { GalleryVerticalEnd, MoveLeft } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Nothing Found" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10"> <div class="flex w-full max-w-lg flex-col gap-6"> <a href="#" class="flex items-center gap-2 self-center font-medium"> <div class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground"> ${renderComponent($$result2, "GalleryVerticalEnd", GalleryVerticalEnd, { "className": "size-4" })} </div>
Erlenhof - Resource Pool
</a> <div class="flex flex-col gap-4 items-center"> <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">404 - Nothing Found</h1> <p class="leading-7 [&:not(:first-child)]:mt-6 text-center">Oops! The page you're looking for doesn't exist. It may have been moved, deleted, or never existed in the first place.<br>Try going back to the homepage or checking the URL</p> </div> ${renderComponent($$result2, "Button", Button, { "className": "self-center" }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "MoveLeft", MoveLeft, {})} <a href="/">Go to Homepage</a>` })} </div> </div> ` })}`;
}, "D:/apps/erlenhof-resource-pool/src/pages/404.astro", void 0);

const $$file = "D:/apps/erlenhof-resource-pool/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
