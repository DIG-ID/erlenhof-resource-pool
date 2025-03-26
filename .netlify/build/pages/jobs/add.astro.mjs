import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CPy7LejW.mjs';
import 'kleur/colors';
import 'html-escaper';
import { c as getEducationData, d as getShiftsData } from '../../chunks/get-data_Cl-dNvL7.mjs';
import { $ as $$Layout, B as Button } from '../../chunks/button_CAfgyFM1.mjs';
import { $ as $$DashboardWrapper } from '../../chunks/DashboardWrapper_Beif6c6R.mjs';
import { C as ComponentWrapper } from '../../chunks/component-wrapper_BF_eSZ8t.mjs';
import { L as Label, I as Input } from '../../chunks/label_DvxtnI3c.mjs';
import { D as DatePicker, S as SelectShifts, T as Textarea } from '../../chunks/select-shifts_MfoAOnwj.mjs';
import { S as SelectEducation } from '../../chunks/select-education_Cvl1QZEN.mjs';
import { Plus } from 'lucide-react';
export { renderers } from '../../renderers.mjs';

const $$Add = createComponent(async ($$result, $$props, $$slots) => {
  const education = await getEducationData();
  const shifts = await getShiftsData();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Add New Job" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "DashboardWrapper", $$DashboardWrapper, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "ComponentWrapper", ComponentWrapper, { "name": "Add New Job" }, { "default": async ($$result4) => renderTemplate` ${maybeRenderHead()}<form method="post" action="/api/jobs" class="w-full"> <div class="flex flex-col gap-y-8"> <div class="grid grid-cols-3 gap-x-4"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "date", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Date` })} ${renderComponent($$result4, "DatePicker", DatePicker, { "name": "date", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/date-picker.tsx", "client:component-export": "DatePicker" })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "shifts", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Shifts` })} ${renderComponent($$result4, "SelectShifts", SelectShifts, { "shifts": shifts, "name": "shifts", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-shifts", "client:component-export": "SelectShifts" })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "education", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Education` })} ${renderComponent($$result4, "SelectEducation", SelectEducation, { "education": education, "name": "education", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-education", "client:component-export": "SelectEducation" })} </div> </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "title", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Title` })} ${renderComponent($$result4, "Input", Input, { "type": "text", "id": "title", "name": "title", "placeholder": "Insert the Job title here..." })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "description" }, { "default": async ($$result5) => renderTemplate`Description` })} ${renderComponent($$result4, "Textarea", Textarea, { "id": "textarea", "name": "description", "placeholder": "Insert description here..." })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "notes" }, { "default": async ($$result5) => renderTemplate`Notes` })} ${renderComponent($$result4, "Textarea", Textarea, { "id": "notes", "name": "notes", "placeholder": "Insert notes here..." })} </div> ${renderComponent($$result4, "Button", Button, { "type": "submit", "className": "self-end cursor-pointer" }, { "default": async ($$result5) => renderTemplate` ${renderComponent($$result5, "Plus", Plus, {})} Add New job` })} </div> </form> ` })} ` })} ` })}`;
}, "D:/apps/erlenhof-resource-pool/src/pages/jobs/add.astro", void 0);

const $$file = "D:/apps/erlenhof-resource-pool/src/pages/jobs/add.astro";
const $$url = "/jobs/add";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Add,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
