"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Fingerprint } from "lucide-react"

export function ComponentWrapper({
  className,
  name,
  children,
  id,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { name: string; id?: string;  }) {
  return (
    <ComponentErrorBoundary name={name}>
      <div
        id={name}
        data-name={name.toLowerCase()}
        className={cn(
          "flex w-full scroll-mt-16 flex-col rounded-lg border font-sans",
          className
        )}
        {...props}
      >
        <div className="border-b px-4 py-3 font-sans">

          {id ? (
            <div className="flex flex-col lg:flex-row justify-items-start items-start lg:items-center gap-x-4 gap-y-2 lg:gap-y-0"><h1 className="text-sm font-medium inline-block break-all">{getComponentName(name)}</h1><span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium flex items-center gap-x-2"><Fingerprint size={16}/> {getComponentName(id)}</span></div>
            ) : (
              <div className="text-sm font-medium font-sans">{getComponentName(name)}</div>
            )}

        </div>
        <div className="flex flex-1 items-center gap-2 p-4">{children}</div>
      </div>
    </ComponentErrorBoundary>
  )
}

class ComponentErrorBoundary extends React.Component<
  { children: React.ReactNode; name: string; id?: string; },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; name: string; id?: string; }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Error in component ${this.props.name}:`, error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-500">
          Something went wrong in component: {this.props.name}
        </div>
      )
    }

    return this.props.children
  }
}

function getComponentName(name: string) {
  return name
    .replace(/-/g, " ")
    .split(" ")
    .map(word =>
      // toLocaleUpperCase vai lidar bem com ÿ, Ü, Å, Ç, etc
      word.charAt(0).toLocaleUpperCase() + word.slice(1)
    )
    .join(" ");
}