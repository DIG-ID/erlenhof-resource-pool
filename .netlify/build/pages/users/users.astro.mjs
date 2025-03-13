import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../../chunks/astro/server_XNv-gxuY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { f as firestore } from '../../chunks/server_CQjZDwHP.mjs';
import { $ as $$Layout, B as Button } from '../../chunks/button_CCLrlRa5.mjs';
import { $ as $$Dashboard } from '../../chunks/Dashboard_C_dfWHBk.mjs';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from '../../chunks/table_CKF-O5Z0.mjs';
import { C as ComponentWrapper } from '../../chunks/component-wrapper_Ce3lN9O0.mjs';
import { A as AlertDialogDelete } from '../../chunks/alert-dialog-delete_CXVcyg-b.mjs';
import { B as Badge } from '../../chunks/badge_nJX-N8aB.mjs';
import { Pencil, Plus } from 'lucide-react';
export { renderers } from '../../renderers.mjs';

const $$Users = createComponent(async ($$result, $$props, $$slots) => {
  const usersRef = firestore.collection("users");
  const usersSnapshot = await usersRef.get();
  const users = usersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Users" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Dashboard", $$Dashboard, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "ComponentWrapper", ComponentWrapper, { "name": "users" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "Table", Table, {}, { "default": async ($$result5) => renderTemplate` ${renderComponent($$result5, "TableHeader", TableHeader, {}, { "default": async ($$result6) => renderTemplate` ${renderComponent($$result6, "TableRow", TableRow, {}, { "default": async ($$result7) => renderTemplate` ${renderComponent($$result7, "TableHead", TableHead, { "className": "w-[100px]" }, { "default": async ($$result8) => renderTemplate`ID` })} ${renderComponent($$result7, "TableHead", TableHead, {}, { "default": async ($$result8) => renderTemplate`Name` })} ${renderComponent($$result7, "TableHead", TableHead, {}, { "default": async ($$result8) => renderTemplate`Email` })} ${renderComponent($$result7, "TableHead", TableHead, {}, { "default": async ($$result8) => renderTemplate`Pool` })} ${renderComponent($$result7, "TableHead", TableHead, {}, { "default": async ($$result8) => renderTemplate`Profile Status` })} ${renderComponent($$result7, "TableHead", TableHead, { "className": "text-right" })} ` })} ` })} ${renderComponent($$result5, "TableBody", TableBody, {}, { "default": async ($$result6) => renderTemplate`${users.map((user) => renderTemplate`${renderComponent($$result6, "TableRow", TableRow, { "key": user.id }, { "default": async ($$result7) => renderTemplate` ${renderComponent($$result7, "TableCell", TableCell, { "className": "font-medium" }, { "default": async ($$result8) => renderTemplate`${user.id}` })} ${renderComponent($$result7, "TableCell", TableCell, {}, { "default": async ($$result8) => renderTemplate`${maybeRenderHead()}<a${addAttribute(`/users/${user.id}`, "href")}>${user.name} ${user.surname}</a>` })} ${renderComponent($$result7, "TableCell", TableCell, {}, { "default": async ($$result8) => renderTemplate`${user.email}` })} ${renderComponent($$result7, "TableCell", TableCell, {}, { "default": async ($$result8) => renderTemplate`${user.role}` })} ${renderComponent($$result7, "TableCell", TableCell, {}, { "default": async ($$result8) => renderTemplate`${user.isActive ? renderTemplate`${renderComponent($$result8, "Badge", Badge, {}, { "default": async ($$result9) => renderTemplate`Active` })}` : renderTemplate`${renderComponent($$result8, "Badge", Badge, { "variant": "secondary" }, { "default": async ($$result9) => renderTemplate`Inactive` })}`}` })} ${renderComponent($$result7, "TableCell", TableCell, { "className": "text-right" }, { "default": async ($$result8) => renderTemplate` ${renderComponent($$result8, "Button", Button, {}, { "default": async ($$result9) => renderTemplate`<a${addAttribute(`/users/edit/${user.id}`, "href")}>${renderComponent($$result9, "Pencil", Pencil, {})}</a>` })} ${renderComponent($$result8, "AlertDialogDelete", AlertDialogDelete, { "id": user.id, "resourceType": "users", "client:load": true, "triggerText": "", "title": "Are you sure you want to delete this Job?", "description": "This will permanently delete the job from the database.", "cancelText": "No, cancel", "actionText": "Yes, delete", "client:component-hydration": "load", "client:component-path": "@/components/alert-dialog-delete", "client:component-export": "AlertDialogDelete" })} ` })} ` })}`)}` })} ` })} ` })} ${renderComponent($$result3, "Button", Button, { "className": "self-end" }, { "default": async ($$result4) => renderTemplate`${renderComponent($$result4, "Plus", Plus, {})}<a${addAttribute(`/jobs/add`, "href")}>Add New User</a>` })} ` })} ` })}`;
}, "D:/apps/erlenhof-resource-pool/src/pages/users/users.astro", void 0);

const $$file = "D:/apps/erlenhof-resource-pool/src/pages/users/users.astro";
const $$url = "/users/users";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Users,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
