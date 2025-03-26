import { f as createComponent, g as createAstro, j as renderComponent, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../../../chunks/astro/server_CPy7LejW.mjs';
import 'kleur/colors';
import 'html-escaper';
import { c as getEducationData, d as getShiftsData, e as getJobSingleData } from '../../../chunks/get-data_Bk8Z9YGD.mjs';
import { f as formatDate } from '../../../chunks/utils_CCYEXCBP.mjs';
import { $ as $$Layout, B as Button } from '../../../chunks/button_QFx0fRuX.mjs';
import { $ as $$DashboardWrapper } from '../../../chunks/DashboardWrapper_Dt4wYjgE.mjs';
import { C as ComponentWrapper } from '../../../chunks/component-wrapper_BF_eSZ8t.mjs';
import { L as Label, I as Input } from '../../../chunks/label_DvxtnI3c.mjs';
import { D as DatePicker, S as SelectShifts, T as Textarea } from '../../../chunks/select-shifts_MfoAOnwj.mjs';
import { S as SelectEducation } from '../../../chunks/select-education_Cvl1QZEN.mjs';
import { A as AlertDialogDelete } from '../../../chunks/alert-dialog-delete_DBKvjzpp.mjs';
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
  const education = await getEducationData();
  const shifts = await getShiftsData();
  const job = await getJobSingleData(id);
  if (!job) {
    return Astro2.redirect("/404");
  }
  const formattedDate = formatDate(job.date, "yyyy-MM-dd");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Edit ${job.title}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "DashboardWrapper", $$DashboardWrapper, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "ComponentWrapper", ComponentWrapper, { "name": `Edit ${job.title}`, "id": id }, { "default": async ($$result4) => renderTemplate` ${maybeRenderHead()}<form method="post"${addAttribute(`/api/jobs/${id}`, "action")} class="w-full"> <div class="flex flex-col gap-y-8"> <div class="grid grid-cols-3 gap-x-4"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "date", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Date` })} ${renderComponent($$result4, "DatePicker", DatePicker, { "name": "date", "defaultValue": formattedDate, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/date-picker.tsx", "client:component-export": "DatePicker" })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "education", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Education` })} ${renderComponent($$result4, "SelectEducation", SelectEducation, { "education": education || [], "name": "education", "value": job.education || "", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-education", "client:component-export": "SelectEducation" })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "shifts", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Shifts` })} ${renderComponent($$result4, "SelectShifts", SelectShifts, { "shifts": shifts || [], "name": "shifts", "value": job.shift || "", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-shifts", "client:component-export": "SelectShifts" })} </div> </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "title" }, { "default": async ($$result5) => renderTemplate`Title` })} ${renderComponent($$result4, "Input", Input, { "type": "text", "id": "title", "name": "title", "defaultValue": job.title })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "description" }, { "default": async ($$result5) => renderTemplate`Description` })} ${renderComponent($$result4, "Textarea", Textarea, { "id": "textarea", "name": "description", "defaultValue": job.description })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "notes" }, { "default": async ($$result5) => renderTemplate`Notes` })} ${renderComponent($$result4, "Textarea", Textarea, { "id": "notes", "name": "notes", "defaultValue": job.notes })} </div> <div class="flex gap-x-4 justify-end"> ${renderComponent($$result4, "Button", Button, { "type": "submit" }, { "default": async ($$result5) => renderTemplate`${renderComponent($$result5, "RefreshCw", RefreshCw, {})} Update Job` })} ${renderComponent($$result4, "AlertDialogDelete", AlertDialogDelete, { "id": id, "resourceType": "jobs", "client:load": true, "triggerText": "Delete Job", "title": "Are you sure you want to delete this Job?", "description": "This will permanently delete the job from the database.", "cancelText": "No, cancel", "actionText": "Yes, delete", "client:component-hydration": "load", "client:component-path": "@/components/alert-dialog-delete", "client:component-export": "AlertDialogDelete" })} </div> </div> </form> ` })} ` })} ` })}`;
}, "C:/Users/danie/Desktop/DIGID/Projects/erlenhof-resource-pool/src/pages/jobs/edit/[id].astro", void 0);

const $$file = "C:/Users/danie/Desktop/DIGID/Projects/erlenhof-resource-pool/src/pages/jobs/edit/[id].astro";
const $$url = "/jobs/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
