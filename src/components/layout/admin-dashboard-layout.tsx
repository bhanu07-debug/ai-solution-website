
"use client";

import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./admin-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Bell, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('aisolutions-auth');
    router.push('/admin/login');
  };
    
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-secondary/50">
        <Sidebar>
          <AdminSidebar />
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
              <SidebarTrigger className="md:hidden"/>
              <div className="w-full flex justify-end items-center gap-4">
                  <Button variant="ghost" size="icon">
                      <Bell className="h-5 w-5"/>
                      <span className="sr-only">Notifications</span>
                  </Button>
                  <Avatar>
                      <AvatarImage src="https://placehold.co/40x40.png" alt="Admin"/>
                      <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                      <LogOut className="h-5 w-5"/>
                      <span className="sr-only">Logout</span>
                  </Button>
              </div>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
