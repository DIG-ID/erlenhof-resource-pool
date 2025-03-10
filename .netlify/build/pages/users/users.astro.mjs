import { e as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_BqO5gSP-.mjs';
import 'kleur/colors';
import 'html-escaper';
import { a as app } from '../../chunks/server_1hFA-0b5.mjs';
import { getFirestore } from 'firebase-admin/firestore';
import { $ as $$Dashboard } from '../../chunks/Dashboard_FtT8_ORt.mjs';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from '../../chunks/table_B_UvbGKH.mjs';
import { C as ComponentWrapper } from '../../chunks/component-wrapper_DNkhWZAh.mjs';
import { B as Button } from '../../chunks/button_PAnIewiZ.mjs';
import { jsx } from 'react/jsx-runtime';
import 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { c as cn } from '../../chunks/utils_B05Dmz_H.mjs';
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
  const db = getFirestore(app);
  const usersRef = db.collection("users");
  const usersSnapshot = await usersRef.get();
  const users = usersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "Users" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ComponentWrapper", ComponentWrapper, { "name": "users-list" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Table", Table, {}, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "TableHeader", TableHeader, {}, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "TableRow", TableRow, {}, { "default": ($$result6) => renderTemplate` ${renderComponent($$result6, "TableHead", TableHead, { "className": "w-[100px]" }, { "default": ($$result7) => renderTemplate`ID` })} ${renderComponent($$result6, "TableHead", TableHead, {}, { "default": ($$result7) => renderTemplate`Name` })} ${renderComponent($$result6, "TableHead", TableHead, {}, { "default": ($$result7) => renderTemplate`Role` })} ${renderComponent($$result6, "TableHead", TableHead, {}, { "default": ($$result7) => renderTemplate`Profile Status` })} ${renderComponent($$result6, "TableHead", TableHead, { "className": "text-right" })} ` })} ` })} ${renderComponent($$result4, "TableBody", TableBody, {}, { "default": ($$result5) => renderTemplate`${users.map((user) => renderTemplate`${renderComponent($$result5, "TableRow", TableRow, { "key": user.id }, { "default": ($$result6) => renderTemplate` ${renderComponent($$result6, "TableCell", TableCell, { "className": "font-medium" }, { "default": ($$result7) => renderTemplate`${user.id}` })} ${renderComponent($$result6, "TableCell", TableCell, {}, { "default": ($$result7) => renderTemplate`${maybeRenderHead()}<a${addAttribute(`/friends/${user.id}`, "href")}>${user.name}</a>` })} ${renderComponent($$result6, "TableCell", TableCell, {}, { "default": ($$result7) => renderTemplate`${user.role}` })} ${renderComponent($$result6, "TableCell", TableCell, {}, { "default": ($$result7) => renderTemplate`${user.isActive ? renderTemplate`${renderComponent($$result7, "Badge", Badge, {}, { "default": ($$result8) => renderTemplate`Active` })}` : renderTemplate`${renderComponent($$result7, "Badge", Badge, { "variant": "secondary" }, { "default": ($$result8) => renderTemplate`Inactive` })}`}` })} ${renderComponent($$result6, "TableCell", TableCell, { "className": "text-right" }, { "default": ($$result7) => renderTemplate`${renderComponent($$result7, "Button", Button, {}, { "default": ($$result8) => renderTemplate`<a${addAttribute(`/users/edit/${user.id}`, "href")}>Edit</a>` })}` })} ` })}`)}` })} ` })} ` })} ` })}`;
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
