import { e as createComponent, f as createAstro, i as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BqO5gSP-.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../../chunks/Layout_CkjtzdsM.mjs';
import { a as app } from '../../chunks/server_1hFA-0b5.mjs';
import { getFirestore } from 'firebase-admin/firestore';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  if (!id) {
    return Astro2.redirect("/404");
  }
  const db = getFirestore(app);
  const usersRef = db.collection("users");
  const userSnapshot = await usersRef.doc(id).get();
  if (!userSnapshot.exists) {
    return Astro2.redirect("/404");
  }
  const user = userSnapshot.data();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": user.name }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>${user.name}</h1> <p>Age: ${user.age}</p> <p>Is best friend: ${user.isBestFriend ? "Yes" : "No"}</p> ` })}`;
}, "D:/apps/erlenhof-resource-pool/src/pages/users/[id].astro", void 0);

const $$file = "D:/apps/erlenhof-resource-pool/src/pages/users/[id].astro";
const $$url = "/users/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
