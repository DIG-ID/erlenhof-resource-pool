import { f as createComponent, j as renderComponent, r as renderTemplate } from '../chunks/astro/server_CPy7LejW.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$ErrorLayout } from '../chunks/ErrorLayout_DJ_xPA5O.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "ErrorLayout", $$ErrorLayout, { "title": "\u274C 404 - Page Not Found", "message": "The page you are looking for does not exist or has been moved." })}`;
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
