import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_XNv-gxuY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { c as cn, $ as $$Layout, B as Button } from '../../chunks/button_DDiZ5ZSh.mjs';
import { $ as $$Dashboard } from '../../chunks/Dashboard_B2BslEt0.mjs';
import { L as Label, I as Input } from '../../chunks/label_Cc3lLN36.mjs';
import { jsx } from 'react/jsx-runtime';
import 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';
import { C as ComponentWrapper } from '../../chunks/component-wrapper_D7thSUGz.mjs';
export { renderers } from '../../renderers.mjs';

function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CheckboxPrimitive.Root,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        CheckboxPrimitive.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-3.5" })
        }
      )
    }
  );
}

const $$Add = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Add a new User" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Dashboard", $$Dashboard, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "ComponentWrapper", ComponentWrapper, { "name": "Add a new User" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<form method="post" action="/api/users"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "name" }, { "default": ($$result5) => renderTemplate`Name` })} ${renderComponent($$result4, "Input", Input, { "type": "text", "id": "name", "name": "name", "placeholder": "Name" })} <label for="age">Age</label> <input type="number" id="age" name="age"> <label for="isBestFriend">Is best friend?</label> <input type="checkbox" id="isBestFriend" name="isBestFriend"> <div class="flex items-center space-x-2"> ${renderComponent($$result4, "Checkbox", Checkbox, { "id": "isBestFriend", "name": "isBestFriend" })} <label htmlFor="isBestFriend" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
Is best friend?
</label> </div> ${renderComponent($$result4, "Button", Button, { "type": "submit" }, { "default": ($$result5) => renderTemplate`Add New User` })} </form> ` })} ` })} ` })}`;
}, "D:/apps/erlenhof-resource-pool/src/pages/users/add.astro", void 0);

const $$file = "D:/apps/erlenhof-resource-pool/src/pages/users/add.astro";
const $$url = "/users/add";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Add,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
