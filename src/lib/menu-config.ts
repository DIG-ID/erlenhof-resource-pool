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
        url: "/jobs/jobs",
        icon: BriefcaseBusiness,
        isActive: true,
        items: [
          { title: "View All Jobs", url: "/jobs/jobs" },
          { title: "Add New Job", url: "/jobs/add" },
        ],
      },
      {
        title: "Users",
        url: "/users/users",
        icon: Users,
        items: [
          { title: "View All Users", url: "/users/users" },
          { title: "Add New User", url: "/users/add" },
        ],
      },
    ],
    utils: [
      { name: "Education", url: "/education/education", icon: GraduationCap },
      { name: "Skills", url: "/skills/skills", icon: Brain },
    ],
    navSecondary: [
      { title: "FAQ", url: "/faq", icon: MessageCircleQuestion },
      { title: "Support", url: "/support", icon: LifeBuoy },
      { title: "Feedback", url: "/feedback", icon: Send },
    ],
  },
  property: {
    navMain: [
      {
        title: "Jobs",
        url: "/jobs/jobs",
        icon: BriefcaseBusiness,
        isActive: true,
        items: [
          { title: "View All Jobs", url: "/jobs/jobs" },
          { title: "Add New Job", url: "/jobs/add" },
        ],
      },
    ],
    utils: [
      { name: "Education", url: "/education/education", icon: GraduationCap },
      { name: "Skills", url: "/skills/skills", icon: Brain },
    ],
    navSecondary: [
      { title: "FAQ", url: "/faq", icon: MessageCircleQuestion },
      { title: "Support", url: "/support", icon: LifeBuoy },
      { title: "Feedback", url: "/feedback", icon: Send },
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
          { title: "Assigned Jobs", url: "/jobs/assigned" },
          { title: "Archive Jobs", url: "/jobs/archive" },
        ],
      },
    ],
    utils: [], // O user normal não vê utils
    navSecondary: [
      { title: "FAQ", url: "/faq", icon: MessageCircleQuestion },
      { title: "Support", url: "/support", icon: LifeBuoy },
      { title: "Feedback", url: "/feedback", icon: Send },
    ],
  },
};
