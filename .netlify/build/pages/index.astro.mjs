import { f as createComponent, j as renderComponent, r as renderTemplate } from '../chunks/astro/server_C8eqZ-Yu.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Dashboard } from '../chunks/Dashboard_pF1Ixeok.mjs';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent, c as CardDescription, e as CardFooter } from '../chunks/card_DHzrLONR.mjs';
import { B as Button } from '../chunks/button_PAnIewiZ.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "Dashboard" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Card", Card, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardHeader", CardHeader, {}, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "CardTitle", CardTitle, {}, { "default": ($$result5) => renderTemplate`Card Title` })} ` })} ${renderComponent($$result3, "CardContent", CardContent, {}, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "CardDescription", CardDescription, {}, { "default": ($$result5) => renderTemplate`
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat
        arcu ut nibh aliquet, vel ultricies nunc tincidunt.
` })} ` })} ${renderComponent($$result3, "CardFooter", CardFooter, {}, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Button", Button, { "className": "btn btn-primary" }, { "default": ($$result5) => renderTemplate`Click me` })} ` })} ` })} ` })}`;
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
