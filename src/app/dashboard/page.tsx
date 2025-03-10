interface Props {
  children: React.ReactNode
  defaultSidebarOpen: boolean // remove this if not using cookies for sidebar state
  user: any; // Adicione esta linha para passar o `user`
 }

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { NavUserHeader } from "@/components/nav-user-header"



export default function Page(props: Props) {
  return (
    <SidebarProvider defaultSidebarOpen={props.defaultSidebarOpen}>
      <AppSidebar user={props?.user}/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <NavUserHeader user={props.user}/>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {props.children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
