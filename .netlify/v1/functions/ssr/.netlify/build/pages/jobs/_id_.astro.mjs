import { f as createComponent, g as createAstro, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_C8eqZ-Yu.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../../chunks/Layout_CVB4bZrz.mjs';
import { a as app } from '../../chunks/server_1hFA-0b5.mjs';
import { getFirestore } from 'firebase-admin/firestore';
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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": job.name }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>${job.name}</h1> <p>Age: ${job.age}</p> <p>Is best friend: ${job.isBestFriend ? "Yes" : "No"}</p> ` })}`;
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
