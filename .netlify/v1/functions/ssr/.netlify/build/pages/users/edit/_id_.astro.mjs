import { f as createComponent, g as createAstro, j as renderComponent, k as renderScript, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../../../chunks/astro/server_XNv-gxuY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { f as firestore, a as auth } from '../../../chunks/server_CQjZDwHP.mjs';
import { c as cn, $ as $$Layout, B as Button } from '../../../chunks/button_DDiZ5ZSh.mjs';
import { $ as $$Dashboard } from '../../../chunks/Dashboard_B2BslEt0.mjs';
import { C as ComponentWrapper } from '../../../chunks/component-wrapper_D7thSUGz.mjs';
import { L as Label, I as Input } from '../../../chunks/label_Cc3lLN36.mjs';
import { e as SelectRole } from '../../../chunks/select-role_BmQBCmKs.mjs';
import { jsx } from 'react/jsx-runtime';
import 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
export { renderers } from '../../../renderers.mjs';

function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SwitchPrimitive.Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        SwitchPrimitive.Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background pointer-events-none block size-4 rounded-full ring-0 shadow-lg transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  if (!id) {
    return Astro2.redirect("/404");
  }
  const usersRef = firestore.collection("users");
  const userSnapshot = await usersRef.doc(id).get();
  const rolesRef = firestore.collection("roles");
  const rolesSnapshot = await rolesRef.get();
  const roles = rolesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  if (!userSnapshot.exists) {
    return Astro2.redirect("/404");
  }
  const userAuth = await auth.getUser(id);
  const userFirestore = userSnapshot.data();
  const userData = {
    id: userAuth.uid,
    email: userAuth.email || "",
    displayName: userAuth.displayName || "",
    name: userFirestore.name || "",
    surname: userFirestore.surname || "",
    role: userFirestore.role || "user",
    isActive: userFirestore.isActive || false
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Edit ${userData.name}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Dashboard", $$Dashboard, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "ComponentWrapper", ComponentWrapper, { "name": `Edit ${userData.displayName} | ID - ${userData.id}` }, { "default": async ($$result4) => renderTemplate` ${maybeRenderHead()}<form method="post"${addAttribute(`/api/users/${id}`, "action")} class="w-full"> <div class="flex flex-col gap-y-8"> <div class="grid  grid-cols-2 gap-4"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "name" }, { "default": async ($$result5) => renderTemplate`Name` })} ${renderComponent($$result4, "Input", Input, { "type": "text", "id": "name", "name": "name", "defaultValue": userData.name })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "name" }, { "default": async ($$result5) => renderTemplate`Surname` })} ${renderComponent($$result4, "Input", Input, { "type": "text", "id": "surname", "name": "surname", "defaultValue": userData.surname })} </div> </div> <div class="grid  grid-cols-2 gap-4"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "name" }, { "default": async ($$result5) => renderTemplate`Display Name` })} ${renderComponent($$result4, "Input", Input, { "type": "text", "id": "displayName", "name": "displayName", "defaultValue": userData.displayName })} </div> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "name" }, { "default": async ($$result5) => renderTemplate`Email` })} ${renderComponent($$result4, "Input", Input, { "type": "email", "id": "email", "name": "email", "defaultValue": userData.email })} </div> </div> <div class="grid grid-cols-2 gap-x-4"> <div class="flex flex-col gap-y-4"> ${renderComponent($$result4, "Label", Label, { "htmlFor": "roles", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Pool` })} ${renderComponent($$result4, "SelectRole", SelectRole, { "roles": roles, "name": "roles", "value": userData.role, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/select-role", "client:component-export": "SelectRole" })} </div> <div class="flex items-center gap-x-4"> ${renderComponent($$result4, "Switch", Switch, { "id": "profileStatus", "checked": userData.isActive, "onChange": (event) => {
    document.getElementById("isActiveInput").value = event.target.checked ? "true" : "false";
  }, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/ui/switch", "client:component-export": "Switch" })} ${renderComponent($$result4, "Label", Label, { "htmlFor": "profileStatus", "className": "font-medium" }, { "default": async ($$result5) => renderTemplate`Profile Status` })} <!-- Input hidden para enviar o valor atualizado no form --> <input type="hidden" id="isActiveInput" name="isActive"${addAttribute(userData.isActive, "value")}> </div> </div> <div class="flex gap-x-4 justify-end"> ${renderComponent($$result4, "Button", Button, { "type": "submit" }, { "default": async ($$result5) => renderTemplate`Update User` })} ${renderComponent($$result4, "Button", Button, { "type": "button", "id": "delete-document", "variant": "destructive" }, { "default": async ($$result5) => renderTemplate`Delete User` })} </div> </div> </form> ` })} ` })} ` })} ${renderScript($$result, "D:/apps/erlenhof-resource-pool/src/pages/users/edit/[id].astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/apps/erlenhof-resource-pool/src/pages/users/edit/[id].astro", void 0);

const $$file = "D:/apps/erlenhof-resource-pool/src/pages/users/edit/[id].astro";
const $$url = "/users/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
