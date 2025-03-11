import { e as createComponent, f as createAstro, i as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_BqO5gSP-.mjs';
import 'kleur/colors';
import 'html-escaper';
import { a as app } from '../../chunks/server_1hFA-0b5.mjs';
import { getFirestore } from 'firebase-admin/firestore';
import { $ as $$Dashboard } from '../../chunks/Dashboard_DFLy0_1r.mjs';
import { C as ComponentWrapper } from '../../chunks/component-wrapper_Br55UD9U.mjs';
import { B as Button } from '../../chunks/button_CnbqMR9w.mjs';
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
  const db = getFirestore(app);
  const jobsRef = db.collection("jobs");
  const jobSnapshot = await jobsRef.doc(id).get();
  if (!jobSnapshot.exists) {
    return Astro2.redirect("/404");
  }
  const job = jobSnapshot.data();
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1e3);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": job.title }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ComponentWrapper", ComponentWrapper, { "name": job.title }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="0"> <div class="flex items-center gap-x-4 text-sm"> <span class="flex items-center gap-x-2">${renderComponent($$result3, "CalendarDays", CalendarDays, {})} Created:${formatDate(job.createdAt)}</span> <span class="flex items-center gap-x-2">${renderComponent($$result3, "Award", Award, {})} Status: ${job.status}</span> <span class="flex items-center gap-x-2">${renderComponent($$result3, "GalleryVerticalEnd", GalleryVerticalEnd, {})} Pool: ${job.roles} </span> </div> <h1 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">${job.title}</h1> <p class="scroll-m-20 text-xl font-semibold tracking-tight">Small Description</p> <p class="leading-7 [&:not(:first-child)]:mt-6">${job.smallDescription}</p> <div class="flex gap-x-4 [&:not(:first-child)]:mt-6"> ${renderComponent($$result3, "Button", Button, {}, { "default": ($$result4) => renderTemplate`${renderComponent($$result4, "Pencil", Pencil, {})}<a${addAttribute(`/jobs/edit/${id}`, "href")}> Edit Job</a>` })} ${renderComponent($$result3, "Button", Button, { "type": "button", "id": "delete-document", "variant": "destructive" }, { "default": ($$result4) => renderTemplate`Delete Job` })} </div> </div> ` })} ` })}`;
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
