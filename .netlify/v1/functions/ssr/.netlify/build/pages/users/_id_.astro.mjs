import { f as createComponent, g as createAstro, j as renderComponent, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../../chunks/astro/server_XNv-gxuY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { b as getUserData } from '../../chunks/get-data_Cy4mUGTJ.mjs';
import { $ as $$Layout, B as Button } from '../../chunks/button_CGSdtx1P.mjs';
import { $ as $$Dashboard, S as Separator } from '../../chunks/Dashboard_nOu31tXu.mjs';
import { A as AlertDialogDelete } from '../../chunks/alert-dialog-delete_Ch5r2t7X.mjs';
import { Fingerprint, GalleryVerticalEnd, Award, Pencil } from 'lucide-react';
import { B as Badge } from '../../chunks/badge_Dmz1Ij-q.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  if (!id) {
    return Astro2.redirect("/404");
  }
  const user = await getUserData(id);
  if (!user) {
    return Astro2.redirect("/404");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${user.name} ${user.surname}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Dashboard", $$Dashboard, {}, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="flex justify-end"> <div class="flex items-center gap-2 text-xs text-muted-foreground"> <p class="leading-7"><span class="font-medium">Email Verified:</span> ${user.emailVerified ? renderTemplate`<span>Yes</span>` : renderTemplate`<span>No</span>`} </p> <p class="leading-7"><span class="font-medium">Last Signin:</span> ${user.lastSignInTime}</p> <p class="leading-7"><span class="font-medium">Created:</span> ${user.creationTime}</p> </div> </div> <div class="flex w-full scroll-mt-16 flex-col rounded-lg border"> <div class="border-b px-4 py-3 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-y-6 lg:gap-y-0"> <div class="flex flex-col lg:flex-row justify-items-start items-start lg:items-center gap-x-4 gap-y-2 lg:gap-y-0"><h1 class="text-sm font-medium inline-block break-all">${user.name} ${user.surname}</h1><span class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium flex items-center gap-x-2">${renderComponent($$result3, "Fingerprint", Fingerprint, { "size": 16 })} ${id}</span></div> <div class="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 gap-x-3 text-xs"> <span class="flex items-center gap-x-1">${renderComponent($$result3, "GalleryVerticalEnd", GalleryVerticalEnd, { "size": 16 })} <span class="font-medium">Pool:</span> ${user.role} </span> <span class="flex items-center gap-x-1">${renderComponent($$result3, "Award", Award, { "size": 16 })} <span class="font-medium">Status:</span> ${user.isActive ? renderTemplate`${renderComponent($$result3, "Badge", Badge, {}, { "default": async ($$result4) => renderTemplate`Active` })}` : renderTemplate`${renderComponent($$result3, "Badge", Badge, { "variant": "secondary" }, { "default": async ($$result4) => renderTemplate`Inactive` })}`}</span> </div> </div> <div class="flex flex-1 items-center gap-2 p-6"> <div class="flex flex-col w-full"> <div class="grid grid-cols-1 lg:grid-cols-6 gap-6 w-full"> <div class="col-span-1"> <p class="font-medium">Display Name</p> ${renderComponent($$result3, "Separator", Separator, { "className": "my-2" })} <p>${user.displayName}</p> </div> <div class="col-span-1"> <p class="font-medium">Name</p> ${renderComponent($$result3, "Separator", Separator, { "className": "my-2" })} <p>${user.name}</p> </div> <div class="col-span-1"> <p class="font-medium">Surname</p> ${renderComponent($$result3, "Separator", Separator, { "className": "my-2" })} <p>${user.surname}</p> </div> <div class="col-span-1"> <p class="font-medium">Email</p> ${renderComponent($$result3, "Separator", Separator, { "className": "my-2" })} <p>${user.email}</p> </div> </div> <div class="flex justify-end gap-x-4 [&:not(:first-child)]:mt-6"> ${renderComponent($$result3, "Button", Button, {}, { "default": async ($$result4) => renderTemplate`${renderComponent($$result4, "Pencil", Pencil, {})}<a${addAttribute(`/users/edit/${id}`, "href")}> Edit User</a>` })} ${renderComponent($$result3, "AlertDialogDelete", AlertDialogDelete, { "id": user.id, "resourceType": "users", "client:load": true, "triggerText": "Delete User", "title": "Are you sure you want to delete this User?", "description": "This will permanently delete the user from the database.", "cancelText": "No, cancel", "actionText": "Yes, delete", "client:component-hydration": "load", "client:component-path": "@/components/alert-dialog-delete", "client:component-export": "AlertDialogDelete" })} </div> </div> </div> </div> ` })} ` })}`;
}, "D:/apps/erlenhof-resource-pool/src/pages/users/[id].astro", void 0);

const $$file = "D:/apps/erlenhof-resource-pool/src/pages/users/[id].astro";
const $$url = "/users/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
