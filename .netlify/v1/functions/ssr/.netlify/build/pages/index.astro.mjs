import { f as createComponent, g as createAstro } from '../chunks/astro/server_CPy7LejW.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { userData } = Astro2.locals;
  if (userData) {
    return Astro2.redirect("/dashboard");
  }
  return Astro2.redirect("/login");
}, "C:/Users/danie/Desktop/DIGID/Projects/erlenhof-resource-pool/src/pages/index.astro", void 0);

const $$file = "C:/Users/danie/Desktop/DIGID/Projects/erlenhof-resource-pool/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
