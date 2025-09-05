
"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AdminDashboardLayout } from '@/components/layout/admin-dashboard-layout';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This check runs only on the client-side, which is why we show a loader.
    // In a real app, this should be a robust check against an auth token with a backend service.
    const authStatus = localStorage.getItem('aisolutions-auth') === 'true';

    // If on any page other than the login page, we must verify auth.
    if (pathname !== '/admin/login') {
      if (!authStatus) {
        // If not authenticated, redirect to the login page immediately.
        router.replace('/admin/login');
      } else {
        // If authenticated, allow access and stop loading.
        setIsAuthenticated(true);
        setIsLoading(false);
      }
    } else {
       // If on the login page, check if already logged in.
       if (authStatus) {
            router.replace('/admin');
       } else {
            // Not logged in, so show the login page.
            setIsLoading(false);
       }
    }
  }, [pathname, router]);

  // If we are on the login page, just render the children (the login form).
  // The loading state is handled inside the useEffect to prevent a redirect loop.
  if (pathname === '/admin/login') {
    return isLoading ? <LoadingSkeleton /> : <div className="bg-background min-h-screen">{children}</div>;
  }
  
  // For all other admin routes, show a loader until authentication is confirmed.
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // If authentication is successful, render the protected dashboard layout.
  if (isAuthenticated) {
    return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
  }

  // As a fallback while redirecting, show the loader.
  return <LoadingSkeleton />;
}


const LoadingSkeleton = () => (
    <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-secondary rounded-full">
                 <Skeleton className="h-12 w-12 rounded-full" />
            </div>
            <div className="space-y-2 text-center">
                <Skeleton className="h-4 w-[250px] mx-auto" />
                <Skeleton className="h-4 w-[200px] mx-auto" />
            </div>
        </div>
    </div>
);
