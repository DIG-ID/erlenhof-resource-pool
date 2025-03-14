import { f as createComponent, g as createAstro, j as renderComponent, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../../../chunks/astro/server_XNv-gxuY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { b as getUserData, g as getRolesData } from '../../../chunks/get-data_Cy4mUGTJ.mjs';
import { $ as $$Layout, B as Button } from '../../../chunks/button_CGSdtx1P.mjs';
import { $ as $$Dashboard } from '../../../chunks/Dashboard_nOu31tXu.mjs';
import { C as ComponentWrapper } from '../../../chunks/component-wrapper_Ch4w2MbL.mjs';
import { L as Label, I as Input } from '../../../chunks/label_DK6PtoXw.mjs';
import { S as SelectRole } from '../../../chunks/select-role_DrrKqbTO.mjs';
import { C as CheckboxReact } from '../../../chunks/checkbox_D3dZD0FA.mjs';
import { RefreshCw } from 'lucide-react';
import { A as AlertDialogDelete } from '../../../chunks/alert-dialog-delete_Ch5r2t7X.mjs';
export { renderers } from '../../../renderers.mjs';

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
  if (!user) {
    return Astro2.redirect("/404");
  }
  console.log(user);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Edit ${user.name}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Dashboard", $$Dashboard, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "ComponentWrapper", ComponentWrapper, { "name": user.displayName, "id": id }, { "default": async ($$result4) => renderTemplate` ${maybeRenderHead()}<form method="post"${addAttribute(`/api/users/${id}`, "action")} class="w-full"> <div class="flex flex-col gap-y-8"> <div class="grid  grid-cols-2 gap-4"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "name" }, { "default": async ($$result5) => renderTemplate`Name` })} ${renderComponent($$result4, "Input", Input, { "type": "text", "id": "name", "name": "name", "defaultValue": user.name })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "name" }, { "default": async ($$result5) => renderTemplate`Surname` })} ${renderComponent($$result4, "Input", Input, { "type": "text", "id": "surname", "name": "surname", "defaultValue": user.surname })} </div> </div> <div class="grid  grid-cols-2 gap-4"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "name" }, { "default": async ($$result5) => renderTemplate`Display Name` })} ${renderComponent($$result4, "Input", Input, { "type": "text", "id": "displayName", "name": "displayName", "defaultValue": user.displayName })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "name" }, { "default": async ($$result5) => renderTemplate`Email` })} ${renderComponent($$result4, "Input", Input, { "type": "email", "id": "email", "name": "email", "defaultValue": user.email })} </div> </div> <div class="grid grid-cols-2 gap-x-4"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "roles", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Pool` })} ${renderComponent($$result4, "SelectRole", SelectRole, { "roles": roles, "name": "roles", "value": user.role, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-role", "client:component-export": "SelectRole" })} </div> <div class="flex items-center gap-x-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "isActive", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Activate Account` })} ${renderComponent($$result4, "CheckboxReact", CheckboxReact, { "isActive": user.isActive, "name": "isActive", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/checkbox", "client:component-export": "CheckboxReact" })} </div> </div> <div class="flex gap-x-4 justify-end"> ${renderComponent($$result4, "Button", Button, { "type": "submit" }, { "default": async ($$result5) => renderTemplate`${renderComponent($$result5, "RefreshCw", RefreshCw, {})} Update User` })} ${renderComponent($$result4, "AlertDialogDelete", AlertDialogDelete, { "id": id, "resourceType": "users", "client:load": true, "triggerText": "Delete User", "title": "Are you sure you want to delete this User?", "description": "This will permanently delete the user from the database.", "cancelText": "No, cancel", "actionText": "Yes, delete", "client:component-hydration": "load", "client:component-path": "@/components/alert-dialog-delete", "client:component-export": "AlertDialogDelete" })} </div> </div> </form> ` })} ` })} ` })}`;
}, "D:/apps/erlenhof-resource-pool/src/pages/users/edit/[id].astro", void 0);

const $$file = "D:/apps/erlenhof-resource-pool/src/pages/users/edit/[id].astro";
const $$url = "/users/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
