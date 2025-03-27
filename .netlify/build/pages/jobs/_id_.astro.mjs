import { f as createComponent, g as createAstro, j as renderComponent, r as renderTemplate, m as maybeRenderHead, i as addAttribute, q as Fragment } from '../../chunks/astro/server_CPy7LejW.mjs';
import 'kleur/colors';
import 'html-escaper';
import { f as formatDate } from '../../chunks/utils_BKKnuCgf.mjs';
import { $ as $$Layout, B as Button } from '../../chunks/button_DMjODycf.mjs';
import { $ as $$DashboardWrapper } from '../../chunks/DashboardWrapper_DWCKBEML.mjs';
import { A as AlertDialogDelete } from '../../chunks/alert-dialog-delete_BOeBglWJ.mjs';
import { C as Card, a as CardHeader, d as CardTitle, b as CardContent } from '../../chunks/card_DlG0t7yl.mjs';
import { Fingerprint, GalleryVerticalEnd, Award, CalendarDays, FileText, User, UserCircle, CheckCircle, Pencil } from 'lucide-react';
import { i as getJobSingleData } from '../../chunks/get-data_Ht-nD2iO.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { userData } = Astro2.locals;
  const { id } = Astro2.params;
  if (!id) {
    return Astro2.redirect("/404");
  }
  const job = await getJobSingleData(id);
  if (!job) {
    return Astro2.redirect("/404");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": job.title }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "DashboardWrapper", $$DashboardWrapper, {}, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="flex w-full scroll-mt-16 flex-col rounded-lg border"> <div class="border-b px-4 py-3 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-y-6 lg:gap-y-0"> <div class="flex flex-col lg:flex-row items-start lg:items-center gap-x-4 gap-y-2 lg:gap-y-0"> <h1 class="text-lg font-semibold break-all">${job.title}</h1> <span class="relative rounded bg-muted px-2 py-1 font-mono text-xs font-medium flex items-center gap-x-2"> ${renderComponent($$result3, "Fingerprint", Fingerprint, { "size": 16 })} ${id} </span> </div> <div class="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 gap-x-3 text-sm"> <span class="flex items-center gap-x-1"> ${renderComponent($$result3, "GalleryVerticalEnd", GalleryVerticalEnd, { "size": 16 })} <span class="font-medium">Pool:</span> ${job.pool.name || "Not provided"} </span> <span class="flex items-center gap-x-1"> ${renderComponent($$result3, "Award", Award, { "size": 16 })} <span class="font-medium">Status:</span> ${job.status.name || "Not provided"} </span> <span class="flex items-center gap-x-1"> ${renderComponent($$result3, "CalendarDays", CalendarDays, { "size": 16 })} <span class="font-medium">Job Date:</span> ${formatDate(job.date, "short") ?? "Not provided"} </span> </div> </div> <div class="p-6 grid grid-cols-1 lg:grid-cols-2 gap-4"> ${renderComponent($$result3, "Card", Card, { "className": "shadow-none" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "CardHeader", CardHeader, {}, { "default": async ($$result5) => renderTemplate` ${renderComponent($$result5, "CardTitle", CardTitle, { "className": "flex items-center gap-x-2" }, { "default": async ($$result6) => renderTemplate`${renderComponent($$result6, "FileText", FileText, { "size": 16 })} Descrição` })} ` })} ${renderComponent($$result4, "CardContent", CardContent, {}, { "default": async ($$result5) => renderTemplate` <p>${job.description}</p> ` })} ` })} ${job.notes && renderTemplate`${renderComponent($$result3, "Card", Card, { "className": "shadow-none" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "CardHeader", CardHeader, {}, { "default": async ($$result5) => renderTemplate` ${renderComponent($$result5, "CardTitle", CardTitle, { "className": "flex items-center gap-x-2" }, { "default": async ($$result6) => renderTemplate`${renderComponent($$result6, "FileText", FileText, { "size": 16 })} Notas` })} ` })} ${renderComponent($$result4, "CardContent", CardContent, {}, { "default": async ($$result5) => renderTemplate` <p>${job.notes}</p> ` })} ` })}`} ${renderComponent($$result3, "Card", Card, { "className": "shadow-none" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "CardHeader", CardHeader, {}, { "default": async ($$result5) => renderTemplate` ${renderComponent($$result5, "CardTitle", CardTitle, { "className": "flex items-center gap-x-2" }, { "default": async ($$result6) => renderTemplate`${renderComponent($$result6, "User", User, { "size": 16 })} Atribuído a` })} ` })} ${renderComponent($$result4, "CardContent", CardContent, {}, { "default": async ($$result5) => renderTemplate`${job.assignedTo && job.assignedTo.email ? renderTemplate`<p>${job.assignedTo.name} ${job.assignedTo.surname} (${job.assignedTo.email})</p>` : renderTemplate`<p class="text-muted-foreground">Não atribuído</p>`}` })} ` })} ${job.createdBy && renderTemplate`${renderComponent($$result3, "Card", Card, { "className": "shadow-none" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "CardHeader", CardHeader, {}, { "default": async ($$result5) => renderTemplate` ${renderComponent($$result5, "CardTitle", CardTitle, { "className": "flex items-center gap-x-2" }, { "default": async ($$result6) => renderTemplate`${renderComponent($$result6, "UserCircle", UserCircle, { "size": 16 })} Criado por` })} ` })} ${renderComponent($$result4, "CardContent", CardContent, {}, { "default": async ($$result5) => renderTemplate` <p>${job.createdBy.name} ${job.createdBy.surname} (${job.createdBy.email})</p> <p class="text-sm text-muted-foreground mt-2">${renderComponent($$result5, "CalendarDays", CalendarDays, { "size": 16, "className": "inline-block mr-1" })}${formatDate(job.createdAt)}</p> ` })} ` })}`} </div> <div class="flex justify-end gap-x-4 p-6"> ${(userData.role === "level_01" || userData.role === "level_02") && (!job.assigned ? renderTemplate`<form method="post" action="/api/jobs/assign"> <input type="hidden" name="jobId"${addAttribute(job.id, "value")}> ${renderComponent($$result3, "Button", Button, { "type": "submit", "className": "bg-green-600 text-white cursor-pointer", "size": "sm" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "CheckCircle", CheckCircle, { "size": 16 })} Apply
` })} </form>` : renderTemplate`${renderComponent($$result3, "Button", Button, { "disabled": true, "className": "bg-gray-400 text-white cursor-not-allowed" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "CheckCircle", CheckCircle, { "className": "mr-2", "size": 16 })} Taken
` })}`)} ${(userData.role === "admin" || userData.role === "super_admin") && renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "Button", Button, {}, { "default": async ($$result5) => renderTemplate`${renderComponent($$result5, "Pencil", Pencil, {})}<a${addAttribute(`/jobs/edit/${id}`, "href")}> Edit Job</a>` })} ${renderComponent($$result4, "AlertDialogDelete", AlertDialogDelete, { "id": id, "resourceType": "jobs", "client:load": true, "triggerText": "Delete Job", "title": "Are you sure you want to delete this Job?", "description": "This will permanently delete the job from the database.", "cancelText": "No, cancel", "actionText": "Yes, delete", "client:component-hydration": "load", "client:component-path": "@/components/alert-dialog-delete", "client:component-export": "AlertDialogDelete" })} ` })}`} </div> </div> ` })} ` })}`;
}, "D:/apps/erlenhof-resource-pool/src/pages/jobs/[id].astro", void 0);

const $$file = "D:/apps/erlenhof-resource-pool/src/pages/jobs/[id].astro";
const $$url = "/jobs/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
