import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../../chunks/astro/server_XNv-gxuY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { f as firestore } from '../../chunks/server_CQjZDwHP.mjs';
import { c as cn, $ as $$Layout, B as Button } from '../../chunks/button_DDiZ5ZSh.mjs';
import { $ as $$Dashboard } from '../../chunks/Dashboard_B2BslEt0.mjs';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from '../../chunks/table_d3gNAqIz.mjs';
import { C as ComponentWrapper } from '../../chunks/component-wrapper_D7thSUGz.mjs';
import { jsx } from 'react/jsx-runtime';
import 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { Pencil, Plus } from 'lucide-react';
export { renderers } from '../../renderers.mjs';

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}

const $$Users = createComponent(async ($$result, $$props, $$slots) => {
  const usersRef = firestore.collection("users");
  const usersSnapshot = await usersRef.get();
  const users = usersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Users" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Dashboard", $$Dashboard, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "ComponentWrapper", ComponentWrapper, { "name": "users-list" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "Table", Table, {}, { "default": async ($$result5) => renderTemplate` ${renderComponent($$result5, "TableHeader", TableHeader, {}, { "default": async ($$result6) => renderTemplate` ${renderComponent($$result6, "TableRow", TableRow, {}, { "default": async ($$result7) => renderTemplate` ${renderComponent($$result7, "TableHead", TableHead, { "className": "w-[100px]" }, { "default": async ($$result8) => renderTemplate`ID` })} ${renderComponent($$result7, "TableHead", TableHead, {}, { "default": async ($$result8) => renderTemplate`Name` })} ${renderComponent($$result7, "TableHead", TableHead, {}, { "default": async ($$result8) => renderTemplate`Email` })} ${renderComponent($$result7, "TableHead", TableHead, {}, { "default": async ($$result8) => renderTemplate`Pool` })} ${renderComponent($$result7, "TableHead", TableHead, {}, { "default": async ($$result8) => renderTemplate`Profile Status` })} ${renderComponent($$result7, "TableHead", TableHead, { "className": "text-right" })} ` })} ` })} ${renderComponent($$result5, "TableBody", TableBody, {}, { "default": async ($$result6) => renderTemplate`${users.map((user) => renderTemplate`${renderComponent($$result6, "TableRow", TableRow, { "key": user.id }, { "default": async ($$result7) => renderTemplate` ${renderComponent($$result7, "TableCell", TableCell, { "className": "font-medium" }, { "default": async ($$result8) => renderTemplate`${user.id}` })} ${renderComponent($$result7, "TableCell", TableCell, {}, { "default": async ($$result8) => renderTemplate`${maybeRenderHead()}<a${addAttribute(`/users/${user.id}`, "href")}>${user.name} ${user.surname}</a>` })} ${renderComponent($$result7, "TableCell", TableCell, {}, { "default": async ($$result8) => renderTemplate`${user.email}` })} ${renderComponent($$result7, "TableCell", TableCell, {}, { "default": async ($$result8) => renderTemplate`${user.role}` })} ${renderComponent($$result7, "TableCell", TableCell, {}, { "default": async ($$result8) => renderTemplate`${user.isActive ? renderTemplate`${renderComponent($$result8, "Badge", Badge, {}, { "default": async ($$result9) => renderTemplate`Active` })}` : renderTemplate`${renderComponent($$result8, "Badge", Badge, { "variant": "secondary" }, { "default": async ($$result9) => renderTemplate`Inactive` })}`}` })} ${renderComponent($$result7, "TableCell", TableCell, { "className": "text-right" }, { "default": async ($$result8) => renderTemplate` ${renderComponent($$result8, "Button", Button, {}, { "default": async ($$result9) => renderTemplate`<a${addAttribute(`/users/edit/${user.id}`, "href")}>${renderComponent($$result9, "Pencil", Pencil, {})}</a>` })} ` })} ` })}`)}` })} ` })} ` })} ${renderComponent($$result3, "Button", Button, { "className": "self-end" }, { "default": async ($$result4) => renderTemplate`${renderComponent($$result4, "Plus", Plus, {})}<a${addAttribute(`/jobs/add`, "href")}>Add New User</a>` })} ` })} ` })}`;
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
