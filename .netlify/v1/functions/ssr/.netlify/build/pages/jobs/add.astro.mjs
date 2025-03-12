import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_XNv-gxuY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { f as firestore } from '../../chunks/server_CQjZDwHP.mjs';
import { $ as $$Layout, B as Button } from '../../chunks/button_DDiZ5ZSh.mjs';
import { $ as $$Dashboard } from '../../chunks/Dashboard_B2BslEt0.mjs';
import { C as ComponentWrapper } from '../../chunks/component-wrapper_D7thSUGz.mjs';
import { L as Label, I as Input } from '../../chunks/label_Cc3lLN36.mjs';
import { T as Textarea } from '../../chunks/textarea_DUTmtNbP.mjs';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, e as SelectRole } from '../../chunks/select-role_BmQBCmKs.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
export { renderers } from '../../renderers.mjs';

function SelectStatus({ status, name, value }) {
  return /* @__PURE__ */ jsxs(Select, { name, defaultValue: value ?? "", children: [
    /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select Status" }) }),
    /* @__PURE__ */ jsx(SelectContent, { children: status.map((state) => /* @__PURE__ */ jsx(SelectItem, { value: state.status, children: state.status }, state.id)) })
  ] });
}

const $$Add = createComponent(async ($$result, $$props, $$slots) => {
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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Add New Job" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Dashboard", $$Dashboard, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "ComponentWrapper", ComponentWrapper, { "name": "Add New Job", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/ui/component-wrapper", "client:component-export": "ComponentWrapper" }, { "default": async ($$result4) => renderTemplate` ${maybeRenderHead()}<form method="post" action="/api/jobs" class="w-full"> <div class="flex flex-col gap-y-8"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "title", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Title` })} ${renderComponent($$result4, "Input", Input, { "type": "text", "id": "title", "name": "title", "placeholder": "Insert the Job title here..." })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "smallDescription" }, { "default": async ($$result5) => renderTemplate`Small Description` })} ${renderComponent($$result4, "Textarea", Textarea, { "id": "textarea", "name": "smallDescription", "placeholder": "Insert small job description here..." })} </div> <div class="grid grid-cols-2 gap-x-4"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "roles", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Pool` })} ${renderComponent($$result4, "SelectRole", SelectRole, { "roles": limitedRoles, "name": "roles", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-role.tsx", "client:component-export": "SelectRole" })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "status", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Status` })} ${renderComponent($$result4, "SelectStatus", SelectStatus, { "status": status, "name": "status", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-status.tsx", "client:component-export": "SelectStatus" })} </div> </div> ${renderComponent($$result4, "Button", Button, { "type": "submit" }, { "default": async ($$result5) => renderTemplate`Add New job` })} </div> </form> ` })} ` })} ` })}`;
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
