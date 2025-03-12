import { f as createComponent, g as createAstro, j as renderComponent, k as renderScript, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../../../chunks/astro/server_XNv-gxuY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { f as firestore } from '../../../chunks/server_CQjZDwHP.mjs';
import { $ as $$Layout, B as Button } from '../../../chunks/button_DDiZ5ZSh.mjs';
import { $ as $$Dashboard } from '../../../chunks/Dashboard_B2BslEt0.mjs';
import { C as ComponentWrapper } from '../../../chunks/component-wrapper_D7thSUGz.mjs';
import { L as Label, I as Input } from '../../../chunks/label_Cc3lLN36.mjs';
import { T as Textarea } from '../../../chunks/textarea_DUTmtNbP.mjs';
import { e as SelectRole } from '../../../chunks/select-role_BmQBCmKs.mjs';
export { renderers } from '../../../renderers.mjs';

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
  const rolesRef = firestore.collection("roles");
  const rolesSnapshot = await rolesRef.get();
  const roles = rolesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  const statusRef = firestore.collection("status");
  const statusSnapshot = await statusRef.get();
  const status = statusSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  const limitedRoles = roles.filter((role) => Number(role.id) === 3 || Number(role.id) === 4);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Edit ${job.title}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Dashboard", $$Dashboard, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "ComponentWrapper", ComponentWrapper, { "name": `Edit ${job.title}` }, { "default": async ($$result4) => renderTemplate` ${maybeRenderHead()}<form method="post"${addAttribute(`/api/jobs/${id}`, "action")} class="w-full"> <div class="flex flex-col gap-y-8"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "title" }, { "default": async ($$result5) => renderTemplate`Title` })} ${renderComponent($$result4, "Input", Input, { "type": "text", "id": "title", "name": "title", "defaultValue": job.title })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "smallDescription" }, { "default": async ($$result5) => renderTemplate`Small Description` })} ${renderComponent($$result4, "Textarea", Textarea, { "id": "textarea", "name": "smallDescription", "defaultValue": job.smallDescription })} </div> <div class="grid grid-cols-2 gap-x-4"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "roles", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Pool` })} ${renderComponent($$result4, "SelectRole", SelectRole, { "roles": limitedRoles, "name": "roles", "value": job.roles, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-role", "client:component-export": "SelectRole" })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "status", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Status` })} ${renderComponent($$result4, "SelectStatus", null, { "status": status, "name": "status", "value": job.status, "client:only": "react", "client:component-hydration": "only", "client:component-path": "@/components/select-status", "client:component-export": "SelectStatus" })} </div> </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Button", Button, { "type": "submit" }, { "default": async ($$result5) => renderTemplate`Update Job` })} ${renderComponent($$result4, "Button", Button, { "type": "button", "id": "delete-document", "variant": "destructive" }, { "default": async ($$result5) => renderTemplate`Delete Job` })} </div> </div> </form> ` })} ` })} ` })} ${renderScript($$result, "D:/apps/erlenhof-resource-pool/src/pages/jobs/edit/[id].astro?astro&type=script&index=0&lang.ts")}`;
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
