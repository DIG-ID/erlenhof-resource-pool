import { e as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BqO5gSP-.mjs';
import 'kleur/colors';
import 'html-escaper';
import { a as app } from '../../chunks/server_1hFA-0b5.mjs';
import { getFirestore } from 'firebase-admin/firestore';
import { $ as $$Dashboard } from '../../chunks/Dashboard_BE-xiYNH.mjs';
import { C as ComponentWrapper } from '../../chunks/component-wrapper_DNkhWZAh.mjs';
import { L as Label, I as Input } from '../../chunks/label_-3OLH1iv.mjs';
import { B as Button } from '../../chunks/button_PAnIewiZ.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import 'react';
import { c as cn } from '../../chunks/utils_B05Dmz_H.mjs';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, e as SelectRole } from '../../chunks/select-role_DCEsiCJR.mjs';
export { renderers } from '../../renderers.mjs';

function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}

function SelectStatus({ status, name }) {
  return /* @__PURE__ */ jsxs(Select, { name, children: [
    /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select Status" }) }),
    /* @__PURE__ */ jsx(SelectContent, { children: status.map((state) => /* @__PURE__ */ jsx(SelectItem, { value: state.status, children: state.status }, state.id)) })
  ] });
}

const $$Add = createComponent(async ($$result, $$props, $$slots) => {
  const db = getFirestore(app);
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
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "Add New Job" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ComponentWrapper", ComponentWrapper, { "name": "Add New Job", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/ui/component-wrapper", "client:component-export": "ComponentWrapper" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<form method="post" action="/api/jobs" class="w-full"> <div class="flex flex-col gap-y-8"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "title", "className": "font-medium" }, { "default": ($$result4) => renderTemplate`Title` })} ${renderComponent($$result3, "Input", Input, { "type": "text", "id": "title", "name": "title", "placeholder": "Insert the Job title here..." })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "smallDescription" }, { "default": ($$result4) => renderTemplate`Small Description` })} ${renderComponent($$result3, "Textarea", Textarea, { "id": "textarea", "name": "smallDescription", "placeholder": "Insert small job description here..." })} </div> <div class="grid grid-cols-2 gap-x-4"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "roles", "className": "font-medium" }, { "default": ($$result4) => renderTemplate`Pool` })} ${renderComponent($$result3, "SelectRole", SelectRole, { "roles": roles, "name": "roles", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-role", "client:component-export": "SelectRole" })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "status", "className": "font-medium" }, { "default": ($$result4) => renderTemplate`Status` })} ${renderComponent($$result3, "SelectStatus", SelectStatus, { "status": status, "name": "status", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-status", "client:component-export": "SelectStatus" })} </div> </div> ${renderComponent($$result3, "Button", Button, { "type": "submit" }, { "default": ($$result4) => renderTemplate`Add New job` })} </div> </form> ` })} ` })}`;
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
