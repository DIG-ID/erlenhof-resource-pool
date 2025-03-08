import { f as createComponent, g as createAstro, i as addAttribute, n as renderHead, l as renderSlot, r as renderTemplate } from './astro/server_C8eqZ-Yu.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Outfit:wght@100..900&display=swap" rel="stylesheet"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title} - Resource Pool</title>${renderHead()}</head> <body class="bg-slate-50 text-slate-900"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "D:/apps/astro-app/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
