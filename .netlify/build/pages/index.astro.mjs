import { e as createComponent, f as createAstro, i as renderComponent, r as renderTemplate } from '../chunks/astro/server_BqO5gSP-.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Dashboard } from '../chunks/Dashboard_DFLy0_1r.mjs';
import { a as authSession, g as getUserData } from '../chunks/auth_BY3QoS1E.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const user = await authSession(Astro2);
  if (!user) {
    return Astro2.redirect("/login");
  }
  const userData = await getUserData(user);
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "Dashboard", "user": userData })}`;
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
