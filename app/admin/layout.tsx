'use client';

import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/providers/AuthProvider';
import { AdminProvider } from '@/providers/AdminProvider';
import { useSidebarState } from '@/hooks/useSidebarState';
import AdminSidebar from '@/components/admin/AdminSidebar';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { collapsed, mounted } = useSidebarState();
  const sidebarWidth = mounted && collapsed ? 'md:ml-16' : 'md:ml-64';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      <AdminSidebar />
      <main className={`flex-1 ${sidebarWidth} bg-[#050505] min-h-screen p-4 md:p-8 pt-14 md:pt-8 transition-[margin] duration-300`}>
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <AuthProvider>
      <AdminProvider>
        {isLoginPage ? (
          <div className="min-h-screen bg-[#0a0a0a] text-white">
            {children}
          </div>
        ) : (
          <AdminLayoutContent>{children}</AdminLayoutContent>
        )}
      </AdminProvider>
    </AuthProvider>
  );
}
