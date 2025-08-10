
"use client";

import { usePathname } from "next/navigation";
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  MessageSquare,
  Briefcase,
  FileText,
  GalleryHorizontal,
  Calendar,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { Logo } from "../icons/logo";
import { Separator } from "../ui/separator";

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  {
    label: "Content",
    icon: FileText,
    items: [
      { href: "/admin/services", label: "Services" },
      { href: "/admin/projects", label: "Projects" },
      { href: "/admin/articles", label: "Articles" },
      { href: "/admin/gallery", label: "Gallery" },
      { href: "/admin/events", label: "Events" },
    ],
  },
  { href: "/admin/feedback", label: "Feedback", icon: MessageSquare },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;
  const isSubActive = (items: { href: string }[]) => items.some(item => pathname.startsWith(item.href));


  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <Logo className="w-8 h-8 text-primary"/>
            <span className="font-headline text-xl font-semibold">Admin</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            item.items ? (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton 
                  isActive={isSubActive(item.items)}
                  className="font-semibold"
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {item.items.map(subItem => (
                     <SidebarMenuSubItem key={subItem.label}>
                        <SidebarMenuSubButton href={subItem.href} isActive={isActive(subItem.href)}>
                            {subItem.label}
                        </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            ) : (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton href={item.href} isActive={isActive(item.href)}>
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          ))}
        </SidebarMenu>
      </SidebarContent>
      <Separator className="my-2" />
      <SidebarFooter className="p-2">
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton href="/admin/settings" isActive={isActive('/admin/settings')}>
                    <Settings />
                    <span>Settings</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
