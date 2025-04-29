import {
  GalleryVerticalEnd
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUtils } from "@/components/nav-utils"
import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { menuConfig } from "@/lib/menu-config";
import type { UserRole } from "@/lib/types";

export function AppSidebar({ ...props }) {

  const userRole = (props.user?.role.id as UserRole) || "user";
  
  // Obtém os menus com base no papel do utilizador
  const { navMain = [], utils = [], navSecondary = [] } = menuConfig[userRole] || menuConfig["user"];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <img src="/erlenhof-zentrum-logo.svg" alt="Erlenhof Zentrum Logo" width="150" height="50" />
                  <span className="truncate text-xs">Ressourcenpool</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        {utils.length > 0 && <NavUtils utils={utils} />}
        {navSecondary.length > 0 && <NavSecondary items={navSecondary} className="mt-auto" />}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}