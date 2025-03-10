import { e as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_BqO5gSP-.mjs';
import 'kleur/colors';
import 'html-escaper';
import { a as app } from '../../chunks/server_1hFA-0b5.mjs';
import { getFirestore } from 'firebase-admin/firestore';
import { $ as $$Dashboard } from '../../chunks/Dashboard_Cm3E3qRQ.mjs';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from '../../chunks/table_Dapgd7vD.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { c as cn, b as buttonVariants, B as Button } from '../../chunks/button_CnbqMR9w.mjs';
import { Trash2, Pencil, Plus } from 'lucide-react';
import { C as ComponentWrapper } from '../../chunks/component-wrapper_Br55UD9U.mjs';
export { renderers } from '../../renderers.mjs';

function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(AlertDialogPrimitive.Root, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(AlertDialogPrimitive.Trigger, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(AlertDialogPrimitive.Portal, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Overlay,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsx(
      AlertDialogPrimitive.Content,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Title,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Description,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}

function AlertDialogDJ({
  triggerText,
  title,
  description,
  cancelText,
  actionText,
  onAction
}) {
  return /* @__PURE__ */ jsxs(AlertDialog, { children: [
    /* @__PURE__ */ jsx(AlertDialogTrigger, { children: /* @__PURE__ */ jsxs(Button, { variant: "destructive", size: "sm", children: [
      /* @__PURE__ */ jsx(Trash2, {}),
      " ",
      triggerText
    ] }) }),
    /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: title }),
        /* @__PURE__ */ jsx(AlertDialogDescription, { children: description })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: cancelText }),
        /* @__PURE__ */ jsx(AlertDialogAction, { onClick: onAction, children: /* @__PURE__ */ jsxs(Button, { variant: "destructive", size: "sm", children: [
          /* @__PURE__ */ jsx(Trash2, {}),
          " ",
          actionText
        ] }) })
      ] })
    ] })
  ] });
}

const $$Jobs = createComponent(async ($$result, $$props, $$slots) => {
  const db = getFirestore(app);
  const jobsRef = db.collection("jobs");
  const jobsSnapshot = await jobsRef.get();
  const jobs = jobsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1e3);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "Jobs" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ComponentWrapper", ComponentWrapper, { "name": "jobs-list" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Table", Table, {}, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "TableHeader", TableHeader, {}, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "TableRow", TableRow, {}, { "default": ($$result6) => renderTemplate` ${renderComponent($$result6, "TableHead", TableHead, {}, { "default": ($$result7) => renderTemplate`Title` })} ${renderComponent($$result6, "TableHead", TableHead, {}, { "default": ($$result7) => renderTemplate`Description` })} ${renderComponent($$result6, "TableHead", TableHead, {}, { "default": ($$result7) => renderTemplate`Pool` })} ${renderComponent($$result6, "TableHead", TableHead, {}, { "default": ($$result7) => renderTemplate`Status` })} ${renderComponent($$result6, "TableHead", TableHead, {}, { "default": ($$result7) => renderTemplate`Created:` })} ${renderComponent($$result6, "TableHead", TableHead, { "className": "text-right" })} ` })} ` })} ${renderComponent($$result4, "TableBody", TableBody, {}, { "default": ($$result5) => renderTemplate`${jobs.map((job) => renderTemplate`${renderComponent($$result5, "TableRow", TableRow, { "key": job.id }, { "default": ($$result6) => renderTemplate` ${renderComponent($$result6, "TableCell", TableCell, { "className": "font-medium" }, { "default": ($$result7) => renderTemplate`${maybeRenderHead()}<a${addAttribute(`/jobs/${job.id}`, "href")}>${job.title}</a>` })} ${renderComponent($$result6, "TableCell", TableCell, {}, { "default": ($$result7) => renderTemplate`${job.smallDescription}` })} ${renderComponent($$result6, "TableCell", TableCell, {}, { "default": ($$result7) => renderTemplate`${job.roles}` })} ${renderComponent($$result6, "TableCell", TableCell, {}, { "default": ($$result7) => renderTemplate`${job.status}` })} ${renderComponent($$result6, "TableCell", TableCell, {}, { "default": ($$result7) => renderTemplate`${formatDate(job.createdAt)}` })} ${renderComponent($$result6, "TableCell", TableCell, { "className": "text-right" }, { "default": ($$result7) => renderTemplate` ${renderComponent($$result7, "Button", Button, { "size": "sm" }, { "default": ($$result8) => renderTemplate`<a${addAttribute(`/jobs/edit/${job.id}`, "href")}>${renderComponent($$result8, "Pencil", Pencil, {})}</a>` })} ${renderComponent($$result7, "AlertDialogDJ", AlertDialogDJ, { "client:idle": true, "triggerText": "", "title": "Are you sure you want to delete this job?", "description": "This will permanently delete the job from the database.", "cancelText": "No, cancel", "actionText": "Yes, delete", "onAction": () => alert("Job deleted!"), "client:component-hydration": "idle", "client:component-path": "@/components/alert-dialog-del-job", "client:component-export": "AlertDialogDJ" })} ` })} ` })}`)}` })} ` })} ` })} ${renderComponent($$result2, "Button", Button, { "className": "self-end" }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "Plus", Plus, {})}<a${addAttribute(`/jobs/add`, "href")}>Add New Job</a>` })} ` })}`;
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
