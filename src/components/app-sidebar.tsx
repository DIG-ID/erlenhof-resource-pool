import * as React from "react"
import {
  GalleryVerticalEnd,
  LifeBuoy,
  Send,
  Users,
  BriefcaseBusiness,
  MessageCircleQuestion,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUtils } from "@/components/nav-utils"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface Props {
  user: any; // Esperando a propriedade `user`
}

export function AppSidebar({ user, ...props }: Props) {
  // Usando o `user` diretamente, já que foi passado como prop
  const data = {
    user: {
      name: user?.name,  // Acessando o nome do usuário diretamente
      surname: user?.surname, // Pode ser dinâmico ou estático
      displayName: user?.displayName, // Pode ser dinâmico ou estático
      email: user?.email, // Pode ser dinâmico ou estático
      role: user?.role, // Pode ser dinâmico ou estático
      avatar: user?.photoURL, // Pode ser dinâmico ou estático
    },
    navMain: [
      {
        title: "Jobs",
        url: "/jobs/jobs",
        icon: BriefcaseBusiness,
        isActive: true,
        items: [
          {
            title: "Add New Job",
            url: "/jobs/add",
          },
        ],
      },
      {
        title: "Users",
        url: "/users/users",
        icon: Users,
        items: [
          {
            title: "Add New User",
            url: "/users/add",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ],
    utils: [
      {
        name: "FAQ",
        url: "#",
        icon: MessageCircleQuestion,
      },
    ],
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Erlenhof</span>
                  <span className="truncate text-xs">Resource Pool</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavUtils utils={data.utils} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  )
}
