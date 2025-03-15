import { f as createComponent, g as createAstro, m as maybeRenderHead, i as addAttribute, s as spreadAttributes, j as renderComponent, r as renderTemplate } from '../chunks/astro/server_XNv-gxuY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { B as Button, f as formatDate, $ as $$Layout } from '../chunks/button_CAYqDg-A.mjs';
import { S as Separator, $ as $$Dashboard } from '../chunks/Dashboard_BcgzarxB.mjs';
import { f as firestore } from '../chunks/server_CQjZDwHP.mjs';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent, c as CardDescription, e as CardFooter } from '../chunks/card_Yvhjps1-.mjs';
import { Plus } from 'lucide-react';
import 'clsx';
import { c as getJobsData } from '../chunks/get-data_DDg1WkVO.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$2 = createAstro();
const $$WidgetJobs = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$WidgetJobs;
  const fetchCounts = async () => {
    const jobsCollection = firestore.collection("jobs");
    const openSnapshot = await jobsCollection.where("status", "==", "open").get();
    const openCount = openSnapshot.size;
    const closedSnapshot = await jobsCollection.where("status", "==", "closed").get();
    const closedCount = closedSnapshot.size;
    const totalSnapshot = await jobsCollection.get();
    const totalCount = totalSnapshot.size;
    return { open: openCount, closed: closedCount, total: totalCount };
  };
  const counts = await fetchCounts();
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`flex flex-col gap-6 ${Astro2.props.className || ""}`, "class")}${spreadAttributes(Astro2.props)}> <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight">Jobs Overview</h2> ${renderComponent($$result, "Separator", Separator, {})} <div class="grid grid-cols-3 gap-6"> ${renderComponent($$result, "Card", Card, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", CardTitle, {}, { "default": async ($$result4) => renderTemplate`Add New Job` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "CardDescription", CardDescription, {}, { "default": async ($$result4) => renderTemplate`
Here you can add a new Job.
` })} ` })} ${renderComponent($$result2, "CardFooter", CardFooter, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", Button, { "className": "btn btn-primary cursor-pointer" }, { "default": async ($$result4) => renderTemplate`${renderComponent($$result4, "Plus", Plus, {})} <a href="/jobs/add">Add New Job</a>` })} ` })} ` })} ${renderComponent($$result, "Card", Card, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", CardTitle, {}, { "default": async ($$result4) => renderTemplate`Jobs Overview On Pool - Level 1` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "CardDescription", CardDescription, {}, { "default": async ($$result4) => renderTemplate` <div class=""> <ul> <li><span class="font-medium">Open:</span> ${counts.open}</li> <li><span class="font-medium">Assigned:</span> </li> <li><span class="font-medium">Closed:</span> </li> <li><span class="font-medium">Total:</span> </li> </ul> </div> ` })} ` })} ` })} ${renderComponent($$result, "Card", Card, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", CardTitle, {}, { "default": async ($$result4) => renderTemplate`Jobs Overview On Pool - Level 2` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "CardDescription", CardDescription, {}, { "default": async ($$result4) => renderTemplate` <div class=""> <ul> <li><span class="font-medium">Open:</span> </li> <li><span class="font-medium">Assigned:</span> </li> <li><span class="font-medium">Closed:</span> </li> <li><span class="font-medium">Total:</span> </li> </ul> </div> ` })} ` })} ` })} </div> </div>`;
}, "D:/apps/erlenhof-resource-pool/src/components/widgets/WidgetJobs.astro", void 0);

const $$Astro$1 = createAstro();
const $$WidgetUsers = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$WidgetUsers;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`flex flex-col gap-6 ${Astro2.props.className || ""}`, "class")}${spreadAttributes(Astro2.props)}> <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight">Users Overview</h2> ${renderComponent($$result, "Separator", Separator, {})} <div class="grid grid-cols-3 gap-6"> ${renderComponent($$result, "Card", Card, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", CardTitle, {}, { "default": ($$result4) => renderTemplate`Add New User` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardDescription", CardDescription, {}, { "default": ($$result4) => renderTemplate`
Here you can add a new User.
` })} ` })} ${renderComponent($$result2, "CardFooter", CardFooter, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", Button, { "className": "btn btn-primary cursor-pointer" }, { "default": ($$result4) => renderTemplate`${renderComponent($$result4, "Plus", Plus, {})} <a href="/users/add">Add New User</a>` })} ` })} ` })} ${renderComponent($$result, "Card", Card, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", CardTitle, {}, { "default": ($$result4) => renderTemplate`Jobs Overview On Pool - Level 1` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardDescription", CardDescription, {}, { "default": ($$result4) => renderTemplate` <div class=""> <ul> <li><span class="font-medium">Open:</span> </li> <li><span class="font-medium">Assigned:</span> </li> <li><span class="font-medium">Closed:</span> </li> <li><span class="font-medium">Total:</span> </li> </ul> </div> ` })} ` })} ` })} ${renderComponent($$result, "Card", Card, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", CardTitle, {}, { "default": ($$result4) => renderTemplate`Jobs Overview On Pool - Level 2` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardDescription", CardDescription, {}, { "default": ($$result4) => renderTemplate` <div class=""> <ul> <li><span class="font-medium">Open:</span> </li> <li><span class="font-medium">Assigned:</span> </li> <li><span class="font-medium">Closed:</span> </li> <li><span class="font-medium">Total:</span> </li> </ul> </div> ` })} ` })} ` })} </div> </div>`;
}, "D:/apps/erlenhof-resource-pool/src/components/widgets/WidgetUsers.astro", void 0);

const $$WidgetJobOpen = createComponent(async ($$result, $$props, $$slots) => {
  const jobs = await getJobsData();
  console.log(jobs);
  const filteredJobs = jobs.filter((job) => job.status === "Open" && job.roles === "level_01" && job.assigned === false).sort((a, b) => new Date(a.date.seconds * 1e3) - new Date(b.date.seconds * 1e3));
  return renderTemplate`${maybeRenderHead()}<section class="job-list"> <h2 class="text-xl font-bold mb-4">Available Jobs (Level 01)</h2> ${filteredJobs.length === 0 ? renderTemplate`<p>No open jobs available.</p>` : renderTemplate`<ul class="grid grid-cols-4 gap-6"> ${filteredJobs.map((job) => renderTemplate`<li${addAttribute(job.id, "key")} class="border p-4 rounded-lg mb-4 shadow-md col-span-1"> <h3 class="text-lg font-semibold">${job.title}</h3> <p class="text-gray-600">${job.description}</p> <p class="text-sm text-gray-400">Date: ${formatDate(job.date)}</p> <!-- Formulário para atribuir o job --> <form method="post" action="/api/jobs/assign"> <input type="hidden" name="jobId"${addAttribute(job.id, "value")}> <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
Assign
</button> </form> <!-- Link para ver detalhes do job --> <a${addAttribute(`/jobs/${job.id}`, "href")} class="text-blue-600 underline">View Job</a> </li>`)} </ul>`} </section>`;
}, "D:/apps/erlenhof-resource-pool/src/components/widgets/WidgetJobOpen.astro", void 0);

const $$WidgetJobAssigned = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate``;
}, "D:/apps/erlenhof-resource-pool/src/components/widgets/WidgetJobAssigned.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { userData } = Astro2.locals;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dashboard" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Dashboard", $$Dashboard, {}, { "default": ($$result3) => renderTemplate`${(userData.role === "admin" || userData.role === "super_admin") && renderTemplate`${renderComponent($$result3, "WidgetJobs", $$WidgetJobs, { "class": "mb-12" })}
      ${renderComponent($$result3, "WidgetUsers", $$WidgetUsers, {})}`}${(userData.role === "level_01" || userData.role === "level_02") && renderTemplate`${renderComponent($$result3, "WidgetJobOpen", $$WidgetJobOpen, {})}
      ${renderComponent($$result3, "WidgetJobAssigned", $$WidgetJobAssigned, {})}`}` })} ` })}`;
}, "D:/apps/erlenhof-resource-pool/src/pages/index.astro", void 0);

const $$file = "D:/apps/erlenhof-resource-pool/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
