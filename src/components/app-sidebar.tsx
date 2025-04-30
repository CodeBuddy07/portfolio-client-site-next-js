"use client"

import * as React from "react"
import {
  MessageCircle,
  FolderKanban,
  Mail,
  Settings2,
  Network,
  BadgeCheck,
} from "lucide-react";


import { NavMain } from "@/components/nav-main"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"



const navMain = [
  {
    title: "Manage Projects",
    url: "/dashboard",
    icon: FolderKanban, // 🗂️ Project/task visual
  },
  {
    title: "Manage Testimonials",
    url: "/dashboard/testimonials",
    icon: MessageCircle, // 💬 Conversations/testimonials
  },
  {
    title: "Emails",
    url: "/dashboard/emails",
    icon: Mail, // 📧
  },
  {
    title: "General",
    url: "#",
    icon: Settings2, // 👤 Settings-like
    items: [
      {
        title: "Skills",
        url: "#",
        icon: BadgeCheck, // ✅ Validated skills
      },
      {
        title: "Socials",
        url: "#",
        icon: Network, // 🌐 For social links/networks
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2, // ⚙️ Again for nested settings
      },
    ],
  },
]



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
