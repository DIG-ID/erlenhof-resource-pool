import { f as createComponent, g as createAstro, j as renderComponent, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../../../chunks/astro/server_CPy7LejW.mjs';
import 'kleur/colors';
import 'html-escaper';
import { g as getUserData, h as getRolesData, i as getPoolsData, c as getEducationData } from '../../../chunks/get-data_Bk8Z9YGD.mjs';
import { $ as $$Layout, B as Button } from '../../../chunks/button_QFx0fRuX.mjs';
import { $ as $$DashboardWrapper } from '../../../chunks/DashboardWrapper_Dt4wYjgE.mjs';
import { C as ComponentWrapper } from '../../../chunks/component-wrapper_BF_eSZ8t.mjs';
import { L as Label, I as Input } from '../../../chunks/label_DvxtnI3c.mjs';
import { S as SelectRoles, C as CheckboxReact } from '../../../chunks/select-roles_CSmDfw88.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from '../../../chunks/select_7Ibjs4GN.mjs';
import { S as SelectEducation } from '../../../chunks/select-education_Cvl1QZEN.mjs';
import { RefreshCw } from 'lucide-react';
import { A as AlertDialogDelete } from '../../../chunks/alert-dialog-delete_DBKvjzpp.mjs';
export { renderers } from '../../../renderers.mjs';

function SelectPools({ pools, name, value }) {
  return /* @__PURE__ */ jsxs(Select, { name, defaultValue: value ?? "", children: [
    /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select Pool" }) }),
    /* @__PURE__ */ jsx(SelectContent, { children: pools.map((pool) => /* @__PURE__ */ jsx(SelectItem, { value: pool.id, children: pool.name }, pool.id)) })
  ] });
}

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  if (!id) {
    return Astro2.redirect("/404");
  }
  const user = await getUserData(id);
  const roles = await getRolesData();
  const pools = await getPoolsData();
  const education = await getEducationData();
  if (!user) {
    return Astro2.redirect("/404");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Edit ${user.name}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "DashboardWrapper", $$DashboardWrapper, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "ComponentWrapper", ComponentWrapper, { "name": user.displayName, "id": id }, { "default": async ($$result4) => renderTemplate` ${maybeRenderHead()}<form method="post"${addAttribute(`/api/users/${id}`, "action")} class="w-full"> <div class="flex flex-col gap-y-8"> <div class="grid  grid-cols-2 gap-4"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "name" }, { "default": async ($$result5) => renderTemplate`Name` })} ${renderComponent($$result4, "Input", Input, { "type": "text", "id": "name", "name": "name", "defaultValue": user.name })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "name" }, { "default": async ($$result5) => renderTemplate`Surname` })} ${renderComponent($$result4, "Input", Input, { "type": "text", "id": "surname", "name": "surname", "defaultValue": user.surname })} </div> </div> <div class="grid  grid-cols-2 gap-4"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "name" }, { "default": async ($$result5) => renderTemplate`Display Name` })} ${renderComponent($$result4, "Input", Input, { "type": "text", "id": "displayName", "name": "displayName", "defaultValue": user.displayName })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "email" }, { "default": async ($$result5) => renderTemplate`Email` })} ${renderComponent($$result4, "Input", Input, { "type": "email", "id": "email", "name": "email", "defaultValue": user.email })} </div> </div> <div class="grid grid-cols-2 gap-x-4"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "phone" }, { "default": async ($$result5) => renderTemplate`Phone` })} ${renderComponent($$result4, "Input", Input, { "type": "text", "id": "phone", "name": "phone", "defaultValue": user.phoneNumber || "" })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "roles", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Role` })} ${renderComponent($$result4, "SelectRoles", SelectRoles, { "roles": roles || [], "name": "role", "value": user.role || "", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-roles", "client:component-export": "SelectRoles" })} </div> </div> <div class="grid grid-cols-2 gap-x-4"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "pools", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Pool` })} ${renderComponent($$result4, "SelectPools", SelectPools, { "pools": pools || [], "name": "pools", "value": user.pool || "", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-pools", "client:component-export": "SelectPools" })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "education", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Education` })} ${renderComponent($$result4, "SelectEducation", SelectEducation, { "education": education || [], "name": "education", "value": user.education || "", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-education", "client:component-export": "SelectEducation" })} </div> </div> <div class="grid grid-cols-2 gap-x-4"> <div class="flex items-center gap-x-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "isActive", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Activate Account` })} ${renderComponent($$result4, "CheckboxReact", CheckboxReact, { "isActive": user.isActive, "name": "isActive", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/checkbox", "client:component-export": "CheckboxReact" })} </div> </div> <div class="flex gap-x-4 justify-end"> ${renderComponent($$result4, "Button", Button, { "type": "submit" }, { "default": async ($$result5) => renderTemplate`${renderComponent($$result5, "RefreshCw", RefreshCw, {})} Update User` })} ${renderComponent($$result4, "AlertDialogDelete", AlertDialogDelete, { "id": id, "resourceType": "users", "client:load": true, "triggerText": "Delete User", "title": "Are you sure you want to delete this User?", "description": "This will permanently delete the user from the database.", "cancelText": "No, cancel", "actionText": "Yes, delete", "client:component-hydration": "load", "client:component-path": "@/components/alert-dialog-delete", "client:component-export": "AlertDialogDelete" })} </div> </div> </form> ` })} ` })} ` })}`;
}, "C:/Users/danie/Desktop/DIGID/Projects/erlenhof-resource-pool/src/pages/users/edit/[id].astro", void 0);

const $$file = "C:/Users/danie/Desktop/DIGID/Projects/erlenhof-resource-pool/src/pages/users/edit/[id].astro";
const $$url = "/users/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
