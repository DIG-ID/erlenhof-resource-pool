import { e as createComponent, i as renderComponent, r as renderTemplate } from '../chunks/astro/server_BqO5gSP-.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Dashboard } from '../chunks/Dashboard_FtT8_ORt.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "Dashboard" })}`;
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
