import { e as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BqO5gSP-.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_B_vOyhg2.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import 'react';
import { CircleDashed, ChartLineIcon, ChartBarIcon, ChartPieIcon } from 'lucide-react';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, f as SelectGroup, g as SelectLabel, d as SelectItem, e as SelectRole } from '../chunks/select-role_DCEsiCJR.mjs';
import { a as app } from '../chunks/server_1hFA-0b5.mjs';
import { getFirestore } from 'firebase-admin/firestore';
export { renderers } from '../renderers.mjs';

function SelectDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start gap-4", children: [
    /* @__PURE__ */ jsxs(Select, { children: [
      /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[180px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a fruit" }) }),
      /* @__PURE__ */ jsx(SelectContent, { children: /* @__PURE__ */ jsxs(SelectGroup, { children: [
        /* @__PURE__ */ jsx(SelectLabel, { children: "Fruits" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "apple", children: "Apple" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "banana", children: "Banana" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "blueberry", children: "Blueberry" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "grapes", disabled: true, children: "Grapes" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "pineapple", children: "Pineapple" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(Select, { children: [
      /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[180px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Large List" }) }),
      /* @__PURE__ */ jsx(SelectContent, { children: Array.from({ length: 100 }).map((_, i) => /* @__PURE__ */ jsxs(SelectItem, { value: `item-${i}`, children: [
        "Item ",
        i
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxs(Select, { disabled: true, children: [
      /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[180px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Disabled" }) }),
      /* @__PURE__ */ jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsx(SelectItem, { value: "apple", children: "Apple" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "banana", children: "Banana" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "blueberry", children: "Blueberry" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "grapes", disabled: true, children: "Grapes" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "pineapple", children: "Pineapple" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Select, { children: [
      /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[180px]", children: /* @__PURE__ */ jsx(
        SelectValue,
        {
          placeholder: /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(CircleDashed, { className: "text-muted-foreground" }),
            "With Icon"
          ] })
        }
      ) }),
      /* @__PURE__ */ jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsxs(SelectItem, { value: "line", children: [
          /* @__PURE__ */ jsx(ChartLineIcon, {}),
          "Line"
        ] }),
        /* @__PURE__ */ jsxs(SelectItem, { value: "bar", children: [
          /* @__PURE__ */ jsx(ChartBarIcon, {}),
          "Bar"
        ] }),
        /* @__PURE__ */ jsxs(SelectItem, { value: "pie", children: [
          /* @__PURE__ */ jsx(ChartPieIcon, {}),
          "Pie"
        ] })
      ] })
    ] })
  ] });
}

const $$Testing = createComponent(async ($$result, $$props, $$slots) => {
  const db = getFirestore(app);
  const rolesRef = db.collection("roles");
  const rolesSnapshot = await rolesRef.get();
  const roles = rolesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Testing" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-4xl font-bold">Testing</h1> <p class="text-lg text-gray-500">This is a test page</p> <div class="flex flex-col items-center justify-center h-screen"> ${renderComponent($$result2, "SelectRole", SelectRole, { "roles": roles, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-role", "client:component-export": "SelectRole" })} ${renderComponent($$result2, "SelectDemo", SelectDemo, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-demo", "client:component-export": "SelectDemo" })} <form action="/api/create-job" method="POST"> <label for="title">Job Title:</label> <input type="text" id="title" name="title" required> <button type="submit">Create Job</button> </form> </div> ` })}`;
}, "D:/apps/erlenhof-resource-pool/src/pages/testing.astro", void 0);

const $$file = "D:/apps/erlenhof-resource-pool/src/pages/testing.astro";
const $$url = "/testing";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Testing,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
