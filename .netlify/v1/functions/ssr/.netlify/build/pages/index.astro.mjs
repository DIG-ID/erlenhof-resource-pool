import { f as createComponent, g as createAstro, m as maybeRenderHead, i as addAttribute, s as spreadAttributes, j as renderComponent, r as renderTemplate } from '../chunks/astro/server_XNv-gxuY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { B as Button, $ as $$Layout } from '../chunks/button_CCLrlRa5.mjs';
import { S as Separator, $ as $$Dashboard } from '../chunks/Dashboard_C_dfWHBk.mjs';
import { f as firestore } from '../chunks/server_CQjZDwHP.mjs';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent, c as CardDescription, e as CardFooter } from '../chunks/card_D-1o7q5q.mjs';
import { Plus } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$WidgetJobs = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
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
}, "D:/apps/erlenhof-resource-pool/src/components/WidgetJobs.astro", void 0);

const $$Astro = createAstro();
const $$WidgetUsers = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$WidgetUsers;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`flex flex-col gap-6 ${Astro2.props.className || ""}`, "class")}${spreadAttributes(Astro2.props)}> <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight">Users Overview</h2> ${renderComponent($$result, "Separator", Separator, {})} <div class="grid grid-cols-3 gap-6"> ${renderComponent($$result, "Card", Card, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", CardTitle, {}, { "default": ($$result4) => renderTemplate`Add New User` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardDescription", CardDescription, {}, { "default": ($$result4) => renderTemplate`
Here you can add a new User.
` })} ` })} ${renderComponent($$result2, "CardFooter", CardFooter, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", Button, { "className": "btn btn-primary cursor-pointer" }, { "default": ($$result4) => renderTemplate`${renderComponent($$result4, "Plus", Plus, {})} <a href="/users/add">Add New User</a>` })} ` })} ` })} ${renderComponent($$result, "Card", Card, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", CardTitle, {}, { "default": ($$result4) => renderTemplate`Jobs Overview On Pool - Level 1` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardDescription", CardDescription, {}, { "default": ($$result4) => renderTemplate` <div class=""> <ul> <li><span class="font-medium">Open:</span> </li> <li><span class="font-medium">Assigned:</span> </li> <li><span class="font-medium">Closed:</span> </li> <li><span class="font-medium">Total:</span> </li> </ul> </div> ` })} ` })} ` })} ${renderComponent($$result, "Card", Card, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", CardTitle, {}, { "default": ($$result4) => renderTemplate`Jobs Overview On Pool - Level 2` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardDescription", CardDescription, {}, { "default": ($$result4) => renderTemplate` <div class=""> <ul> <li><span class="font-medium">Open:</span> </li> <li><span class="font-medium">Assigned:</span> </li> <li><span class="font-medium">Closed:</span> </li> <li><span class="font-medium">Total:</span> </li> </ul> </div> ` })} ` })} ` })} </div> </div>`;
}, "D:/apps/erlenhof-resource-pool/src/components/WidgetUsers.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dashboard" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Dashboard", $$Dashboard, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "WidgetJobs", $$WidgetJobs, { "className": "mb-12" })} ${renderComponent($$result3, "WidgetUsers", $$WidgetUsers, {})} ` })} ` })}`;
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
