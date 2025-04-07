import type { UserData } from "@/lib/types"
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LogOut,
  User,
  GraduationCap,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  useSidebar,
} from "@/components/ui/sidebar"

interface Props {
  user: UserData;
}

export function NavUserHeader({ user }: Props) {
  const { isMobile } = useSidebar()

  // Verifica se name e surname existem e pega as primeiras letras
  const fallbackText =
    user?.name && user?.surname
      ? `${user.name[0]}${user.surname[0]}`.toUpperCase() // Se ambos existirem, pega a primeira letra de cada um
      : user?.displayName
      ? user.displayName[0].toUpperCase() // Se não, usa a primeira letra do displayName
      : "U" // Se nada estiver disponível, coloca um "U" (User)

  return (
    <div className="ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user?.avatar} alt={user?.displayName} />
              <AvatarFallback className="rounded-full bg-slate-800 text-slate-50 text-xs">{fallbackText}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{`${user?.name} ${user?.surname}`}</span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          side={isMobile ? "bottom" : "bottom"}
          align="end"
          sideOffset={12}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={user?.avatar} alt={user?.displayName} />
                <AvatarFallback className="rounded-lg bg-slate-800 text-slate-50 text-xs">{fallbackText}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{`${user?.name} ${user?.surname}`}</span>
                <span className="truncate text-xs">{user?.email}</span>
                
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgeCheck /> <span className="truncate">Role: {user?.role.name}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <GraduationCap /> <span className="truncate">Education: {user?.education.name}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User />
              <a href="/account">Account</a>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            
            <form action="/api/auth/signout" className="flex items-center gap-2">
              <LogOut />
              <button type="submit" className="cursor-pointer">Log out</button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

  )
}
