import { f as createComponent, g as createAstro, j as renderComponent, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../../../chunks/astro/server_BqASRGhR.mjs';
import 'kleur/colors';
import 'html-escaper';
import { f as firestore } from '../../../chunks/server_CQjZDwHP.mjs';
import { g as getRolesData, a as getStatusData } from '../../../chunks/get-data_DDg1WkVO.mjs';
import { f as formatDate, $ as $$Layout, B as Button } from '../../../chunks/button_hi5SnnYw.mjs';
import { $ as $$Dashboard } from '../../../chunks/Dashboard_BSJTwUzH.mjs';
import { C as ComponentWrapper } from '../../../chunks/component-wrapper_COdcfKFt.mjs';
import { L as Label, I as Input } from '../../../chunks/label_C9szNdj5.mjs';
import { D as DatePicker, S as SelectStatus, T as Textarea } from '../../../chunks/select-status_BTzHtSyP.mjs';
import { S as SelectRole } from '../../../chunks/select-role_CnIWuT4e.mjs';
import { A as AlertDialogDelete } from '../../../chunks/alert-dialog-delete_BFc3YlQ7.mjs';
import { RefreshCw } from 'lucide-react';
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
  const roles = await getRolesData();
  const status = await getStatusData();
  const limitedRoles = roles.filter((role) => role.id === "level_01" || role.id === "level_02");
  const formattedDate = formatDate(job.date, "yyyy-MM-dd'T'HH:mm");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Edit ${job.title}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Dashboard", $$Dashboard, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "ComponentWrapper", ComponentWrapper, { "name": `Edit ${job.title}`, "id": id }, { "default": async ($$result4) => renderTemplate` ${maybeRenderHead()}<form method="post"${addAttribute(`/api/jobs/${id}`, "action")} class="w-full"> <div class="flex flex-col gap-y-8"> <div class="grid grid-cols-3 gap-x-4"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "date", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Date & Time` })} ${renderComponent($$result4, "DatePicker", DatePicker, { "name": "date", "defaultValue": formattedDate, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/date-picker.tsx", "client:component-export": "DatePicker" })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "roles", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Pool` })} ${renderComponent($$result4, "SelectRole", SelectRole, { "roles": limitedRoles, "name": "roles", "value": job.roles, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-role", "client:component-export": "SelectRole" })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "status", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Status` })} ${renderComponent($$result4, "SelectStatus", SelectStatus, { "status": status, "name": "status", "value": job.status, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-status", "client:component-export": "SelectStatus" })} </div> </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "title" }, { "default": async ($$result5) => renderTemplate`Title` })} ${renderComponent($$result4, "Input", Input, { "type": "text", "id": "title", "name": "title", "defaultValue": job.title })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "description" }, { "default": async ($$result5) => renderTemplate`Description` })} ${renderComponent($$result4, "Textarea", Textarea, { "id": "textarea", "name": "description", "defaultValue": job.description })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "notes" }, { "default": async ($$result5) => renderTemplate`Notes` })} ${renderComponent($$result4, "Textarea", Textarea, { "id": "notes", "name": "notes", "defaultValue": job.notes })} </div> <div class="flex gap-x-4 justify-end"> ${renderComponent($$result4, "Button", Button, { "type": "submit" }, { "default": async ($$result5) => renderTemplate`${renderComponent($$result5, "RefreshCw", RefreshCw, {})} Update Job` })} ${renderComponent($$result4, "AlertDialogDelete", AlertDialogDelete, { "id": id, "resourceType": "jobs", "client:load": true, "triggerText": "Delete Job", "title": "Are you sure you want to delete this Job?", "description": "This will permanently delete the job from the database.", "cancelText": "No, cancel", "actionText": "Yes, delete", "client:component-hydration": "load", "client:component-path": "@/components/alert-dialog-delete", "client:component-export": "AlertDialogDelete" })} </div> </div> </form> ` })} ` })} ` })}`;
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
