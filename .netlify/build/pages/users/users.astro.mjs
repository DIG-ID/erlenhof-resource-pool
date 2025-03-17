import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../../chunks/astro/server_BqASRGhR.mjs';
import 'kleur/colors';
import 'html-escaper';
import { f as firestore } from '../../chunks/server_CQjZDwHP.mjs';
import { $ as $$Layout, B as Button } from '../../chunks/button_Ya7XLxV-.mjs';
import { $ as $$Dashboard } from '../../chunks/Dashboard_ChiX0c_M.mjs';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from '../../chunks/table_Coxg5YsX.mjs';
import { C as ComponentWrapper } from '../../chunks/component-wrapper_ztjgF99b.mjs';
import { A as AlertDialogDelete } from '../../chunks/alert-dialog-delete_COo3eHnc.mjs';
import { B as Badge } from '../../chunks/badge_BKVEe5gE.mjs';
import { Fingerprint, User, Mail, GalleryVerticalEnd, Award, Eye, Pencil, Plus } from 'lucide-react';
export { renderers } from '../../renderers.mjs';

const $$Users = createComponent(async ($$result, $$props, $$slots) => {
  const usersRef = firestore.collection("users");
  const usersSnapshot = await usersRef.get();
  const users = usersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Users" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Dashboard", $$Dashboard, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "ComponentWrapper", ComponentWrapper, { "name": "users" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "Table", Table, {}, { "default": async ($$result5) => renderTemplate` ${renderComponent($$result5, "TableHeader", TableHeader, {}, { "default": async ($$result6) => renderTemplate` ${renderComponent($$result6, "TableRow", TableRow, {}, { "default": async ($$result7) => renderTemplate` ${renderComponent($$result7, "TableHead", TableHead, {}, { "default": async ($$result8) => renderTemplate`${maybeRenderHead()}<span class="flex items-center gap-2">${renderComponent($$result8, "Fingerprint", Fingerprint, { "size": 16 })} ID</span>` })} ${renderComponent($$result7, "TableHead", TableHead, {}, { "default": async ($$result8) => renderTemplate`<span class="flex items-center gap-2">${renderComponent($$result8, "User", User, { "size": 16 })}Name</span>` })} ${renderComponent($$result7, "TableHead", TableHead, {}, { "default": async ($$result8) => renderTemplate`<span class="flex items-center gap-2">${renderComponent($$result8, "Mail", Mail, { "size": 16 })}Email</span>` })} ${renderComponent($$result7, "TableHead", TableHead, {}, { "default": async ($$result8) => renderTemplate`<span class="flex items-center gap-2">${renderComponent($$result8, "GalleryVerticalEnd", GalleryVerticalEnd, { "size": 16 })}Pool</span>` })} ${renderComponent($$result7, "TableHead", TableHead, {}, { "default": async ($$result8) => renderTemplate`<span class="flex items-center gap-2">${renderComponent($$result8, "Award", Award, { "size": 16 })}Profile Status</span>` })} ${renderComponent($$result7, "TableHead", TableHead, { "className": "text-right" })} ` })} ` })} ${renderComponent($$result5, "TableBody", TableBody, {}, { "default": async ($$result6) => renderTemplate`${users.map((user) => renderTemplate`${renderComponent($$result6, "TableRow", TableRow, { "key": user.id }, { "default": async ($$result7) => renderTemplate` ${renderComponent($$result7, "TableCell", TableCell, { "className": "font-medium" }, { "default": async ($$result8) => renderTemplate`${user.id}` })} ${renderComponent($$result7, "TableCell", TableCell, {}, { "default": async ($$result8) => renderTemplate`${user.name}${ void 0}${user.surname}` })} ${renderComponent($$result7, "TableCell", TableCell, {}, { "default": async ($$result8) => renderTemplate`${user.email}` })} ${renderComponent($$result7, "TableCell", TableCell, {}, { "default": async ($$result8) => renderTemplate`${user.role}` })} ${renderComponent($$result7, "TableCell", TableCell, {}, { "default": async ($$result8) => renderTemplate`${user.isActive ? renderTemplate`${renderComponent($$result8, "Badge", Badge, {}, { "default": async ($$result9) => renderTemplate`Active` })}` : renderTemplate`${renderComponent($$result8, "Badge", Badge, { "variant": "secondary" }, { "default": async ($$result9) => renderTemplate`Inactive` })}`}` })} ${renderComponent($$result7, "TableCell", TableCell, { "className": "text-right" }, { "default": async ($$result8) => renderTemplate` ${renderComponent($$result8, "Button", Button, { "variant": "outline" }, { "default": async ($$result9) => renderTemplate`<a${addAttribute(`/users/${user.id}`, "href")}>${renderComponent($$result9, "Eye", Eye, {})}</a>` })} ${renderComponent($$result8, "Button", Button, {}, { "default": async ($$result9) => renderTemplate`<a${addAttribute(`/users/edit/${user.id}`, "href")}>${renderComponent($$result9, "Pencil", Pencil, {})}</a>` })} ${renderComponent($$result8, "AlertDialogDelete", AlertDialogDelete, { "id": user.id, "resourceType": "users", "client:load": true, "triggerText": "", "title": "Are you sure you want to delete this User?", "description": "This will permanently delete the User from the database.", "cancelText": "No, cancel", "actionText": "Yes, delete", "client:component-hydration": "load", "client:component-path": "@/components/alert-dialog-delete", "client:component-export": "AlertDialogDelete" })} ` })} ` })}`)}` })} ` })} ` })} ${renderComponent($$result3, "Button", Button, { "className": "self-end" }, { "default": async ($$result4) => renderTemplate`${renderComponent($$result4, "Plus", Plus, {})}<a${addAttribute(`/users/add`, "href")}>Add New User</a>` })} ` })} ` })}`;
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
