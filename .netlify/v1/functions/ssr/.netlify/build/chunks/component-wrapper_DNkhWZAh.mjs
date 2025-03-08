import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { c as cn } from './utils_B05Dmz_H.mjs';

function ComponentWrapper({
  className,
  name,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(ComponentErrorBoundary, { name, children: /* @__PURE__ */ jsxs(
    "div",
    {
      id: name,
      "data-name": name.toLowerCase(),
      className: cn(
        "flex w-full scroll-mt-16 flex-col rounded-lg border",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("div", { className: "border-b px-4 py-3", children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: getComponentName(name) }) }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-1 items-center gap-2 p-4", children })
      ]
    }
  ) });
}
class ComponentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error(`Error in component ${this.props.name}:`, error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxs("div", { className: "p-4 text-red-500", children: [
        "Something went wrong in component: ",
        this.props.name
      ] });
    }
    return this.props.children;
  }
}
function getComponentName(name) {
  return name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export { ComponentWrapper as C };
