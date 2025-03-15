import { f as createComponent, g as createAstro, j as renderComponent, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../../chunks/astro/server_XNv-gxuY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { f as firestore } from '../../chunks/server_CQjZDwHP.mjs';
import { $ as $$Layout, f as formatDate, B as Button } from '../../chunks/button_CAYqDg-A.mjs';
import { $ as $$Dashboard } from '../../chunks/Dashboard_BcgzarxB.mjs';
import { A as AlertDialogDelete } from '../../chunks/alert-dialog-delete_X036iE55.mjs';
import { Fingerprint, GalleryVerticalEnd, Award, CalendarDays, CheckCircle, FileText, User, UserCircle, Pencil } from 'lucide-react';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  if (!id) {
    return Astro2.redirect("/404");
  }
  const jobsRef = firestore.collection("jobs");
  const jobSnapshot = await jobsRef.doc(id).get();
  if (!jobSnapshot.exists) {
    return Astro2.redirect("/404");
  }
  const job = jobSnapshot.data();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": job.title }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Dashboard", $$Dashboard, {}, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="flex w-full scroll-mt-16 flex-col rounded-lg border"> <div class="border-b px-4 py-3 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-y-6 lg:gap-y-0"> <div class="flex flex-col lg:flex-row items-start lg:items-center gap-x-4 gap-y-2 lg:gap-y-0"> <h1 class="text-lg font-semibold break-all">${job.title}</h1> <span class="relative rounded bg-muted px-2 py-1 font-mono text-xs font-medium flex items-center gap-x-2"> ${renderComponent($$result3, "Fingerprint", Fingerprint, { "size": 16 })} ${id} </span> </div> <div class="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 gap-x-3 text-sm"> <span class="flex items-center gap-x-1"> ${renderComponent($$result3, "GalleryVerticalEnd", GalleryVerticalEnd, { "size": 16 })} <span class="font-medium">Pool:</span> ${job.roles || "Not provided"} </span> <span class="flex items-center gap-x-1"> ${renderComponent($$result3, "Award", Award, { "size": 16 })} <span class="font-medium">Status:</span> ${job.status || "Not provided"} </span> <span class="flex items-center gap-x-1"> ${renderComponent($$result3, "CalendarDays", CalendarDays, { "size": 16 })} <span class="font-medium">Job Date:</span> ${job.date ? formatDate(job.date) : "Not provided"} </span> <span class="flex items-center gap-x-1"> ${renderComponent($$result3, "CalendarDays", CalendarDays, { "size": 16 })} <span class="font-medium">Created:</span> ${job.createdAt ? formatDate(job.createdAt) : "Not provided"} </span> <span class="flex items-center gap-x-1"> ${renderComponent($$result3, "CheckCircle", CheckCircle, { "size": 16 })} <span class="font-medium">Assigned:</span> ${job.assigned ? "Yes" : "No"} </span> </div> </div> <div class="p-6"> <div class="mb-6"> <p class="font-medium flex items-center gap-x-2">${renderComponent($$result3, "FileText", FileText, { "size": 16 })} Description</p> <p class="leading-7 mt-2">${job.description || "Not provided"}</p> </div> <div class="mb-6"> <p class="font-medium flex items-center gap-x-2">${renderComponent($$result3, "FileText", FileText, { "size": 16 })} Notes</p> <p class="leading-7 mt-2">${job.notes || "Not provided"}</p> </div> <div class="mb-6"> <p class="font-medium flex items-center gap-x-2">${renderComponent($$result3, "User", User, { "size": 16 })} Assigned To</p> <p class="leading-7 mt-2"> ${job.assignedTo && job.assignedTo.name && job.assignedTo.email ? `${job.assignedTo.name || "Unknown"} ${job.assignedTo.surname || ""} (${job.assignedTo.email})` : "Not assigned"} </p> </div> <!-- 🔥 Novo bloco para mostrar quem criou o job --> ${job.createdBy && renderTemplate`<div class="mt-8 text-sm text-gray-500 border-t pt-4"> <p class="flex items-center gap-x-2 text-gray-600"> ${renderComponent($$result3, "UserCircle", UserCircle, { "size": 18 })} Created by:
</p> <p class="mt-1">${job.createdBy.name} ${job.createdBy.surname} (${job.createdBy.email})</p> </div>`} <div class="flex justify-end gap-x-4 mt-6"> ${renderComponent($$result3, "Button", Button, {}, { "default": async ($$result4) => renderTemplate`${renderComponent($$result4, "Pencil", Pencil, {})}<a${addAttribute(`/jobs/edit/${id}`, "href")}> Edit Job</a>` })} ${renderComponent($$result3, "AlertDialogDelete", AlertDialogDelete, { "id": id, "resourceType": "jobs", "client:load": true, "triggerText": "Delete Job", "title": "Are you sure you want to delete this Job?", "description": "This will permanently delete the job from the database.", "cancelText": "No, cancel", "actionText": "Yes, delete", "client:component-hydration": "load", "client:component-path": "@/components/alert-dialog-delete", "client:component-export": "AlertDialogDelete" })} </div> </div> </div> ` })} ` })}`;
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
