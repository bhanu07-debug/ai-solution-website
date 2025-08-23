
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
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Settings,
  Briefcase,
} from "lucide-react";
import { Logo } from "../icons/logo";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { getFeedback } from "@/lib/firestore";

export function AdminSidebar() {
  const pathname = usePathname();
  const [pendingFeedbackCount, setPendingFeedbackCount] = useState(0);

  useEffect(() => {
    const fetchFeedbackCount = async () => {
      const feedback = await getFeedback();
      const pendingCount = feedback.filter(f => f.status === 'pending').length;
      setPendingFeedbackCount(pendingCount);
    };
    fetchFeedbackCount();
    
    // Optional: Poll for new feedback periodically
    const interval = setInterval(fetchFeedbackCount, 30000); // every 30 seconds
    return () => clearInterval(interval);

  }, [pathname]); // Refetch when path changes


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
    { href: "/admin/careers", label: "Careers", icon: Briefcase },
    { href: "/admin/feedback", label: "Feedback", icon: MessageSquare, badge: pendingFeedbackCount > 0 ? pendingFeedbackCount : undefined },
  ];

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
              <SidebarMenuItem key={item.href || item.label}>
                <SidebarMenuButton asChild isActive={isActive(item.href!)}>
                   <Link href={item.href!}>
                    <item.icon />
                    <span>{item.label}</span>
                    {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                   </Link>
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
                <SidebarMenuButton asChild isActive={isActive('/admin/settings')}>
                    <Link href="/admin/settings">
                        <Settings />
                        <span>Settings</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
