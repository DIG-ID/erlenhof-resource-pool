import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../../chunks/astro/server_XNv-gxuY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { f as firestore } from '../../chunks/server_CQjZDwHP.mjs';
import { $ as $$Layout, f as formatDate, B as Button } from '../../chunks/button_CGSdtx1P.mjs';
import { $ as $$Dashboard } from '../../chunks/Dashboard_nOu31tXu.mjs';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from '../../chunks/table_Bixu1QUL.mjs';
import { A as AlertDialogDelete } from '../../chunks/alert-dialog-delete_Ch5r2t7X.mjs';
import { GalleryVerticalEnd, Award, CalendarDays, Eye, Pencil, Plus } from 'lucide-react';
import { C as ComponentWrapper } from '../../chunks/component-wrapper_Ch4w2MbL.mjs';
export { renderers } from '../../renderers.mjs';

const $$Jobs = createComponent(async ($$result, $$props, $$slots) => {
  const jobsRef = firestore.collection("jobs");
  const jobsSnapshot = await jobsRef.get();
  const jobs = jobsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Jobs" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Dashboard", $$Dashboard, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "ComponentWrapper", ComponentWrapper, { "name": "jobs" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "Table", Table, {}, { "default": async ($$result5) => renderTemplate` ${renderComponent($$result5, "TableHeader", TableHeader, {}, { "default": async ($$result6) => renderTemplate` ${renderComponent($$result6, "TableRow", TableRow, {}, { "default": async ($$result7) => renderTemplate` ${renderComponent($$result7, "TableHead", TableHead, {}, { "default": async ($$result8) => renderTemplate`Title` })} ${renderComponent($$result7, "TableHead", TableHead, {}, { "default": async ($$result8) => renderTemplate`Description` })} ${renderComponent($$result7, "TableHead", TableHead, {}, { "default": async ($$result8) => renderTemplate`${maybeRenderHead()}<span class="flex items-center gap-2">${renderComponent($$result8, "GalleryVerticalEnd", GalleryVerticalEnd, { "size": 16 })}Pool</span>` })} ${renderComponent($$result7, "TableHead", TableHead, {}, { "default": async ($$result8) => renderTemplate`<span class="flex items-center gap-2">${renderComponent($$result8, "Award", Award, { "size": 16 })}Status</span>` })} ${renderComponent($$result7, "TableHead", TableHead, {}, { "default": async ($$result8) => renderTemplate`<span class="flex items-center gap-2">${renderComponent($$result8, "CalendarDays", CalendarDays, { "size": 16 })}Job Date:</span>` })} ${renderComponent($$result7, "TableHead", TableHead, {}, { "default": async ($$result8) => renderTemplate`<span class="flex items-center gap-2">${renderComponent($$result8, "CalendarDays", CalendarDays, { "size": 16 })}Created:</span>` })} ${renderComponent($$result7, "TableHead", TableHead, { "className": "text-right" })} ` })} ` })} ${renderComponent($$result5, "TableBody", TableBody, {}, { "default": async ($$result6) => renderTemplate`${jobs.map((job) => renderTemplate`${renderComponent($$result6, "TableRow", TableRow, { "key": job.id }, { "default": async ($$result7) => renderTemplate` ${renderComponent($$result7, "TableCell", TableCell, { "className": "font-medium" }, { "default": async ($$result8) => renderTemplate`${job.title}` })} ${renderComponent($$result7, "TableCell", TableCell, { "className": "truncate max-w-[100px]" }, { "default": async ($$result8) => renderTemplate`${job.description}` })} ${renderComponent($$result7, "TableCell", TableCell, {}, { "default": async ($$result8) => renderTemplate`${job.roles}` })} ${renderComponent($$result7, "TableCell", TableCell, {}, { "default": async ($$result8) => renderTemplate`${job.status}` })} ${renderComponent($$result7, "TableCell", TableCell, {}, { "default": async ($$result8) => renderTemplate`${formatDate(job.date)}` })} ${renderComponent($$result7, "TableCell", TableCell, {}, { "default": async ($$result8) => renderTemplate`${formatDate(job.createdAt)}` })} ${renderComponent($$result7, "TableCell", TableCell, { "className": "text-right" }, { "default": async ($$result8) => renderTemplate` ${renderComponent($$result8, "Button", Button, { "size": "sm" }, { "default": async ($$result9) => renderTemplate`<a${addAttribute(`/jobs/${job.id}`, "href")}>${renderComponent($$result9, "Eye", Eye, {})}</a>` })} ${renderComponent($$result8, "Button", Button, { "size": "sm" }, { "default": async ($$result9) => renderTemplate`<a${addAttribute(`/jobs/edit/${job.id}`, "href")}>${renderComponent($$result9, "Pencil", Pencil, {})}</a>` })} ${renderComponent($$result8, "AlertDialogDelete", AlertDialogDelete, { "id": job.id, "resourceType": "jobs", "client:load": true, "triggerText": "", "title": "Are you sure you want to delete this Job?", "description": "This will permanently delete the job from the database.", "cancelText": "No, cancel", "actionText": "Yes, delete", "client:component-hydration": "load", "client:component-path": "@/components/alert-dialog-delete", "client:component-export": "AlertDialogDelete" })} ` })} ` })}`)}` })} ` })} ` })} ${renderComponent($$result3, "Button", Button, { "className": "self-end" }, { "default": async ($$result4) => renderTemplate`${renderComponent($$result4, "Plus", Plus, {})}<a${addAttribute(`/jobs/add`, "href")}>Add New Job</a>` })} ` })} ` })}`;
}, "D:/apps/erlenhof-resource-pool/src/pages/jobs/jobs.astro", void 0);

const $$file = "D:/apps/erlenhof-resource-pool/src/pages/jobs/jobs.astro";
const $$url = "/jobs/jobs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Jobs,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
