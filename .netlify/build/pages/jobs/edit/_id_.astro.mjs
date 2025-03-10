import { e as createComponent, f as createAstro, i as renderComponent, j as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../../chunks/astro/server_BqO5gSP-.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../../../chunks/Layout_Ck-VHlFC.mjs';
import { a as app } from '../../../chunks/server_1hFA-0b5.mjs';
import { getFirestore } from 'firebase-admin/firestore';
export { renderers } from '../../../renderers.mjs';

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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Edit {job.name}" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Edit ${job.name}</h1> <p>Here you can edit or delete your friend's data.</p> <form method="post"${addAttribute(`/api/jobs/${id}`, "action")}> <label for="name">Name</label> <input type="text" id="name" name="name"${addAttribute(job.name, "value")}> <label for="age">Age</label> <input type="number" id="age" name="age"${addAttribute(job.age, "value")}> <label for="isBestFriend">Is best friend?</label> <input type="checkbox" id="isBestFriend" name="isBestFriend"${addAttribute(job.isBestFriend, "checked")}> <button type="submit">Edit Job</button> </form> <button type="button" id="delete-document">Delete</button> ` })} ${renderScript($$result, "D:/apps/erlenhof-resource-pool/src/pages/jobs/edit/[id].astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/apps/erlenhof-resource-pool/src/pages/jobs/edit/[id].astro", void 0);

const $$file = "D:/apps/erlenhof-resource-pool/src/pages/jobs/edit/[id].astro";
const $$url = "/jobs/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
