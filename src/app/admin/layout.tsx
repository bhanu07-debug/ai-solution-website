
"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AdminDashboardLayout } from '@/components/layout/admin-dashboard-layout';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // In a real app, this would be a more robust check (e.g., check token validity with an API call)
    const authStatus = localStorage.getItem('aisolutions-auth') === 'true';
    
    if (!authStatus && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(authStatus);
    }
  }, [pathname, router]);


  if (pathname === '/admin/login') {
    return <div className="bg-background min-h-screen">{children}</div>;
  }
  
  if (isAuthenticated === null) {
     return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
     );
  }

  if (!isAuthenticated) {
    // This state will be briefly hit while the redirect is in flight.
    // Showing the loader prevents any content flash.
     return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
     );
  }

  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}
