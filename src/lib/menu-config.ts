import {
  BriefcaseBusiness,
  Users,
  MessageCircleQuestion,
  LifeBuoy,
  Send,
  GraduationCap,
  Brain,
} from "lucide-react";
import type { UserRole } from "@/lib/types";

export const menuConfig: Record<UserRole, { navMain: any[]; utils: any[]; navSecondary: any[] }> = {
  super_admin: {
    navMain: [
      {
        title: "Jobs",
        url: "/jobs/all",
        icon: BriefcaseBusiness,
        isActive: true,
        items: [
          { title: "Offene Jobs", url: "/jobs/open" },
          { title: "Bevorstehende zugewiesene Jobs", url: "/jobs/upcoming" },
          { title: "Archivierte Jobs", url: "/jobs/archive" },
          { title: "Neuen Job hinzufügen", url: "/jobs/add" },
        ],
      },
      {
        title: "Benutzer",
        url: "/users/all",
        icon: Users,
        items: [
          { title: "Alle Benutzer anzeigen", url: "/users/users" },
          { title: "Alle Wohngruppen anzeigen", url: "/users/properties" },
          { title: "Neuen Benutzer hinzufügen", url: "/users/add" },
        ],
      },
    ],
    utils: [
      { name: "Ausbildung", url: "/education/education", icon: GraduationCap },
      { name: "Fähigkeiten", url: "/skills/skills", icon: Brain },
    ],
    navSecondary: [
      { title: "FAQ", url: "/faq", icon: MessageCircleQuestion },
    ],
  },
  property: {
    navMain: [
      {
        title: "Jobs",
        url: "/jobs/property/open",
        icon: BriefcaseBusiness,
        isActive: true,
        items: [
          { title: "Offene Jobs", url: "/jobs/property/open" },
          { title: "Bevorstehende zugewiesene Jobs", url: "/jobs/property/upcoming" },
          { title: "Archivierte Jobs", url: "/jobs/property/archive" },
          { title: "Neuen Job hinzufügen", url: "/jobs/add" },
        ],
      },
    ],
    utils: [],
    navSecondary: [
      { title: "FAQ", url: "/faq", icon: MessageCircleQuestion },
    ],
  },
  user: {
    navMain: [
      {
        title: "Jobs",
        url: "/dashboard",
        icon: BriefcaseBusiness,
        isActive: true,
        items: [
          { title: "Zugewiesene Jobs", url: "/jobs/user/assigned" },
          { title: "Archivierte Jobs", url: "/jobs/user/archive" },
        ],
      },
    ],
    utils: [], // O user normal não vê utils
    navSecondary: [
      { title: "FAQ", url: "/faq", icon: MessageCircleQuestion },
    ],
  },
};
