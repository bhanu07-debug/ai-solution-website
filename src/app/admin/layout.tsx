
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
    // This check runs only on the client-side.
    // In a real app, this should be a robust check against an auth token with a backend.
    const authStatus = localStorage.getItem('aisolutions-auth') === 'true';

    if (pathname === '/admin/login') {
      // If the user is on the login page, let them be.
      // If they are somehow already logged in, redirect them to the dashboard.
      if (authStatus) {
        router.replace('/admin');
      } else {
        setIsLoading(false);
      }
      return;
    }

    // For any other admin page, check for auth.
    if (!authStatus) {
      router.replace('/admin/login');
    } else {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    // Render the login form, potentially with a loader if auth state is still being determined.
    return isLoading ? <LoadingSkeleton /> : <div className="bg-background min-h-screen">{children}</div>;
  }
  
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!isAuthenticated) {
    // This will show the loader while the redirect to login happens.
    return <LoadingSkeleton />;
  }

  // If authenticated and not loading, show the dashboard.
  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}


const LoadingSkeleton = () => (
    <div className="flex h-screen w-full items-center justify-center bg-secondary/50">
        <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    </div>
);
