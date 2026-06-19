'use client';

import BarberSidebar from '@/components/barber/BarberSidebar';
import { useSidebarState } from '@/hooks/useSidebarState';

function BarberLayoutContent({ children }: { children: React.ReactNode }) {
  const { collapsed, mounted } = useSidebarState();
  const sidebarWidth = mounted && collapsed ? 'md:ml-16' : 'md:ml-64';

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      <BarberSidebar />
      {/* pt-14 on mobile accounts for the fixed mobile top bar height */}
      <main className={`flex-1 ${sidebarWidth} p-4 md:p-8 pt-14 md:pt-8 transition-[margin] duration-300`}>
        {/* Impersonation Banner */}
        <div className="mb-6 bg-[rgba(201,168,76,0.1)] border border-[#C9A84C] rounded-lg p-3 flex justify-between items-center">
          <p className="text-[#C9A84C] text-sm font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse"></span>
            Admin Impersonation Mode: Barber Workspace
          </p>
        </div>
        
        {children}
      </main>
    </div>
  );
}

export default function BarberLayout({ children }: { children: React.ReactNode }) {
  return <BarberLayoutContent>{children}</BarberLayoutContent>;
}
