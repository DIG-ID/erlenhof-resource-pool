import { e as createComponent, f as createAstro, i as renderComponent, j as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../../chunks/astro/server_BqO5gSP-.mjs';
import 'kleur/colors';
import 'html-escaper';
import { a as app } from '../../../chunks/server_1hFA-0b5.mjs';
import { getFirestore } from 'firebase-admin/firestore';
import { $ as $$Dashboard } from '../../../chunks/Dashboard_DFLy0_1r.mjs';
import { C as ComponentWrapper } from '../../../chunks/component-wrapper_Br55UD9U.mjs';
import { B as Button } from '../../../chunks/button_CnbqMR9w.mjs';
import { L as Label, I as Input } from '../../../chunks/label_Cfq7haAI.mjs';
import { T as Textarea, S as SelectRole, a as SelectStatus } from '../../../chunks/select-status_BS3z_MFT.mjs';
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
  const rolesRef = db.collection("roles");
  const rolesSnapshot = await rolesRef.get();
  const roles = rolesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  const statusRef = db.collection("status");
  const statusSnapshot = await statusRef.get();
  const status = statusSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  const limitedRoles = roles.filter((role) => Number(role.id) === 3 || Number(role.id) === 4);
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": `Edit ${job.title}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ComponentWrapper", ComponentWrapper, { "name": `Edit ${job.title}` }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<form method="post"${addAttribute(`/api/jobs/${id}`, "action")} class="w-full"> <div class="flex flex-col gap-y-8"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "title" }, { "default": ($$result4) => renderTemplate`Title` })} ${renderComponent($$result3, "Input", Input, { "type": "text", "id": "title", "name": "title", "defaultValue": job.title })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "smallDescription" }, { "default": ($$result4) => renderTemplate`Small Description` })} ${renderComponent($$result3, "Textarea", Textarea, { "id": "textarea", "name": "smallDescription", "defaultValue": job.smallDescription })} </div> <div class="grid grid-cols-2 gap-x-4"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "roles", "className": "font-medium" }, { "default": ($$result4) => renderTemplate`Pool` })} ${renderComponent($$result3, "SelectRole", SelectRole, { "roles": limitedRoles, "name": "roles", "value": job.roles, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-role", "client:component-export": "SelectRole" })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "status", "className": "font-medium" }, { "default": ($$result4) => renderTemplate`Status` })} ${renderComponent($$result3, "SelectStatus", SelectStatus, { "status": status, "name": "status", "value": job.status, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-status", "client:component-export": "SelectStatus" })} </div> </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result3, "Button", Button, { "type": "submit" }, { "default": ($$result4) => renderTemplate`Update Job` })} ${renderComponent($$result3, "Button", Button, { "type": "button", "id": "delete-document", "variant": "destructive" }, { "default": ($$result4) => renderTemplate`Delete Job` })} </div> </div> </form> ` })} ` })} ${renderScript($$result, "D:/apps/erlenhof-resource-pool/src/pages/jobs/edit/[id].astro?astro&type=script&index=0&lang.ts")}`;
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
