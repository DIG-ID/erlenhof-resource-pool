import { f as createComponent, j as renderComponent, r as renderTemplate } from '../chunks/astro/server_XNv-gxuY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/button_DDiZ5ZSh.mjs';
import { $ as $$Dashboard } from '../chunks/Dashboard_B2BslEt0.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dashboard" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Dashboard", $$Dashboard, {})} ` })}`;
}, "D:/apps/erlenhof-resource-pool/src/pages/index.astro", void 0);

const $$file = "D:/apps/erlenhof-resource-pool/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
