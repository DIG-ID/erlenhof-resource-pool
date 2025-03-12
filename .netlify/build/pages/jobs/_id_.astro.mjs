import { f as createComponent, g as createAstro, j as renderComponent, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../../chunks/astro/server_XNv-gxuY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { f as firestore } from '../../chunks/server_CQjZDwHP.mjs';
import { $ as $$Layout, f as formatDate, B as Button } from '../../chunks/button_DDiZ5ZSh.mjs';
import { $ as $$Dashboard } from '../../chunks/Dashboard_B2BslEt0.mjs';
import { C as ComponentWrapper } from '../../chunks/component-wrapper_D7thSUGz.mjs';
import { CalendarDays, Award, GalleryVerticalEnd, Pencil } from 'lucide-react';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  if (!id) {
    return Astro2.redirect("/404");
  }
  const jobsRef = firestore.collection("jobs");
  const jobSnapshot = await jobsRef.doc(id).get();
  if (!jobSnapshot.exists) {
    return Astro2.redirect("/404");
  }
  const job = jobSnapshot.data();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": job.title }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Dashboard", $$Dashboard, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "ComponentWrapper", ComponentWrapper, { "name": job.title }, { "default": async ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="0"> <div class="flex items-center gap-x-4 text-sm"> <span class="flex items-center gap-x-2">${renderComponent($$result4, "CalendarDays", CalendarDays, {})} Created:${formatDate(job.createdAt)}</span> <span class="flex items-center gap-x-2">${renderComponent($$result4, "Award", Award, {})} Status: ${job.status}</span> <span class="flex items-center gap-x-2">${renderComponent($$result4, "GalleryVerticalEnd", GalleryVerticalEnd, {})} Pool: ${job.roles} </span> </div> <h1 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">${job.title}</h1> <p class="scroll-m-20 text-xl font-semibold tracking-tight">Small Description</p> <p class="leading-7 [&:not(:first-child)]:mt-6">${job.smallDescription}</p> <div class="flex gap-x-4 [&:not(:first-child)]:mt-6"> ${renderComponent($$result4, "Button", Button, {}, { "default": async ($$result5) => renderTemplate`${renderComponent($$result5, "Pencil", Pencil, {})}<a${addAttribute(`/jobs/edit/${id}`, "href")}> Edit Job</a>` })} ${renderComponent($$result4, "Button", Button, { "type": "button", "id": "delete-document", "variant": "destructive" }, { "default": async ($$result5) => renderTemplate`Delete Job` })} </div> </div> ` })} ` })} ` })}`;
}, "D:/apps/erlenhof-resource-pool/src/pages/jobs/[id].astro", void 0);

const $$file = "D:/apps/erlenhof-resource-pool/src/pages/jobs/[id].astro";
const $$url = "/jobs/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
