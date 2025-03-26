import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CPy7LejW.mjs';
import 'kleur/colors';
import 'html-escaper';
import { h as getRolesData } from '../../chunks/get-data_Cl-dNvL7.mjs';
import { $ as $$Layout, B as Button } from '../../chunks/button_CAfgyFM1.mjs';
import { $ as $$DashboardWrapper } from '../../chunks/DashboardWrapper_Beif6c6R.mjs';
import { L as Label, I as Input } from '../../chunks/label_DvxtnI3c.mjs';
import { S as SelectRoles, C as CheckboxReact } from '../../chunks/select-roles_CSmDfw88.mjs';
import { C as ComponentWrapper } from '../../chunks/component-wrapper_BF_eSZ8t.mjs';
import { Plus } from 'lucide-react';
export { renderers } from '../../renderers.mjs';

const $$Add = createComponent(async ($$result, $$props, $$slots) => {
  const roles = await getRolesData();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Add a new User" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "DashboardWrapper", $$DashboardWrapper, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "ComponentWrapper", ComponentWrapper, { "name": "Add New User" }, { "default": async ($$result4) => renderTemplate` ${maybeRenderHead()}<form method="post" action="/api/users" class="w-full"> <div class="flex flex-col gap-y-8"> <div class="grid grid-cols-3 gap-x-4"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "roles", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Pool` })} ${renderComponent($$result4, "SelectRoles", SelectRoles, { "roles": roles, "name": "roles", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-roles", "client:component-export": "SelectRoles" })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "name" }, { "default": async ($$result5) => renderTemplate`Name` })} ${renderComponent($$result4, "Input", Input, { "type": "text", "id": "name", "name": "name", "placeholder": "Name" })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "Surname" }, { "default": async ($$result5) => renderTemplate`Surname` })} ${renderComponent($$result4, "Input", Input, { "type": "text", "id": "surname", "name": "surname", "placeholder": "Surname" })} </div> </div> <div class="grid grid-cols-3 gap-4"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "displayName" }, { "default": async ($$result5) => renderTemplate`Display Name` })} ${renderComponent($$result4, "Input", Input, { "type": "text", "id": "displayName", "name": "displayName", "placeholder": "Display Name" })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "email" }, { "default": async ($$result5) => renderTemplate`Email` })} ${renderComponent($$result4, "Input", Input, { "type": "email", "id": "email", "name": "email", "placeholder": "Email" })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "password" }, { "default": async ($$result5) => renderTemplate`Password` })} ${renderComponent($$result4, "Input", Input, { "type": "password", "name": "password", "id": "password", "required": true })} <span id="password-error" class="text-sm text-red-500 hidden error-message">Password must be at least 6 characters.</span> </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "isActive", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Activate Account` })} ${renderComponent($$result4, "CheckboxReact", CheckboxReact, { "isActive": false, "name": "isActive", "defaultChecked": true, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/checkbox", "client:component-export": "CheckboxReact" })} </div> </div> ${renderComponent($$result4, "Button", Button, { "type": "submit", "className": "self-end cursor-pointer" }, { "default": async ($$result5) => renderTemplate` ${renderComponent($$result5, "Plus", Plus, {})}Add New User` })} </div> </form> ` })} ` })} ` })}`;
}, "D:/apps/erlenhof-resource-pool/src/pages/users/add.astro", void 0);

const $$file = "D:/apps/erlenhof-resource-pool/src/pages/users/add.astro";
const $$url = "/users/add";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Add,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
