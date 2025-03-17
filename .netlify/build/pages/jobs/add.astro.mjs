import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BqASRGhR.mjs';
import 'kleur/colors';
import 'html-escaper';
import { a as getRolesData, b as getStatusData } from '../../chunks/get-data_DnaYrzXR.mjs';
import { $ as $$Layout, B as Button } from '../../chunks/button_CqlQtJkJ.mjs';
import { $ as $$Dashboard } from '../../chunks/Dashboard_Dm4uxVzm.mjs';
import { C as ComponentWrapper } from '../../chunks/component-wrapper_PqDuhgIi.mjs';
import { L as Label, I as Input } from '../../chunks/label_BiP1iWPc.mjs';
import { D as DatePicker, S as SelectStatus, T as Textarea } from '../../chunks/select-status_C8TGhJfQ.mjs';
import { S as SelectRole } from '../../chunks/select-role_oB7rKRjz.mjs';
import { Plus } from 'lucide-react';
export { renderers } from '../../renderers.mjs';

const $$Add = createComponent(async ($$result, $$props, $$slots) => {
  const roles = await getRolesData();
  const status = await getStatusData();
  const limitedRoles = roles.filter((role) => role.id === "level_01" || role.id === "level_02");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Add New Job" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Dashboard", $$Dashboard, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "ComponentWrapper", ComponentWrapper, { "name": "Add New Job" }, { "default": async ($$result4) => renderTemplate` ${maybeRenderHead()}<form method="post" action="/api/jobs" class="w-full"> <div class="flex flex-col gap-y-8"> <div class="grid grid-cols-3 gap-x-4"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "date", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Date & Time` })} ${renderComponent($$result4, "DatePicker", DatePicker, { "name": "date", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/date-picker.tsx", "client:component-export": "DatePicker" })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "roles", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Pool` })} ${renderComponent($$result4, "SelectRole", SelectRole, { "roles": limitedRoles, "name": "roles", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-role.tsx", "client:component-export": "SelectRole" })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "status", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Status` })} ${renderComponent($$result4, "SelectStatus", SelectStatus, { "status": status, "name": "status", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-status.tsx", "client:component-export": "SelectStatus" })} </div> </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "title", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Title` })} ${renderComponent($$result4, "Input", Input, { "type": "text", "id": "title", "name": "title", "placeholder": "Insert the Job title here..." })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "description" }, { "default": async ($$result5) => renderTemplate`Description` })} ${renderComponent($$result4, "Textarea", Textarea, { "id": "textarea", "name": "description", "placeholder": "Insert description here..." })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "notes" }, { "default": async ($$result5) => renderTemplate`Notes` })} ${renderComponent($$result4, "Textarea", Textarea, { "id": "notes", "name": "notes", "placeholder": "Insert notes here..." })} </div> ${renderComponent($$result4, "Button", Button, { "type": "submit", "className": "self-end cursor-pointer" }, { "default": async ($$result5) => renderTemplate` ${renderComponent($$result5, "Plus", Plus, {})} Add New job` })} </div> </form> ` })} ` })} ` })}`;
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
