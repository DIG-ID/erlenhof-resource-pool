import { e as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BqO5gSP-.mjs';
import 'kleur/colors';
import 'html-escaper';
import { a as app } from '../../chunks/server_vHGSuMZV.mjs';
import { getFirestore } from 'firebase-admin/firestore';
import { $ as $$Dashboard } from '../../chunks/Dashboard_DFLy0_1r.mjs';
import { C as ComponentWrapper } from '../../chunks/component-wrapper_Br55UD9U.mjs';
import { L as Label, I as Input } from '../../chunks/label_Cfq7haAI.mjs';
import { B as Button } from '../../chunks/button_CnbqMR9w.mjs';
import { T as Textarea, S as SelectRole, a as SelectStatus } from '../../chunks/select-status_BS3z_MFT.mjs';
export { renderers } from '../../renderers.mjs';

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
