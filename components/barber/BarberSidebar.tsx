'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, CalendarDays, UserCircle, LogOut, Clock, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSidebarState } from '@/hooks/useSidebarState';

export default function BarberSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { collapsed, toggle, mounted } = useSidebarState();

  const links = [
    { name: 'Workspace',       href: '/barber/dashboard',     icon: LayoutDashboard },
    { name: 'My Appointments', href: '/barber/appointments',  icon: CalendarDays },
    { name: 'My Availability', href: '/barber/availability',  icon: Clock },
    { name: 'My Profile',      href: '/barber/profile',       icon: UserCircle },
  ];

  const NavLinks = ({ onLinkClick, showLabels = true }: { onLinkClick?: () => void; showLabels?: boolean }) => (
    <>
      <nav className="flex-1 py-4 px-2 flex flex-col gap-1 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={onLinkClick}
              title={!showLabels ? link.name : undefined}
              className={`flex items-center gap-3 rounded-lg text-sm font-medium transition-all ${
                showLabels ? 'px-3 py-2.5' : 'px-2.5 py-2.5 justify-center'
              } ${
                isActive
                  ? 'bg-[rgba(201,168,76,0.1)] text-[#C9A84C] border border-[rgba(201,168,76,0.2)]'
                  : 'text-[#9CA3AF] hover:text-white hover:bg-[#1a1a1a]'
              }`}
            >
              <link.icon size={18} className="shrink-0" />
              {showLabels && <span className="truncate">{link.name}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="p-2 border-t border-[#222]">
        <button
          onClick={() => {
            onLinkClick?.();
            window.location.href = '/admin/dashboard';
          }}
          title={!showLabels ? 'Exit Portal' : undefined}
          className={`flex items-center gap-3 rounded-lg text-sm font-medium text-[#9CA3AF] hover:text-white hover:bg-[#1a1a1a] transition-all w-full ${
            showLabels ? 'px-3 py-2.5' : 'px-2.5 py-2.5 justify-center'
          }`}
        >
          <LogOut size={18} className="shrink-0" />
          {showLabels && <span>Exit Portal</span>}
        </button>
      </div>
    </>
  );

  const sidebarWidth = mounted && collapsed ? 'w-16' : 'w-64';

  return (
    <>
      {/* ── Desktop Sidebar (md+) ─────────────────────── */}
      <motion.aside
        layout
        className={`hidden md:flex ${sidebarWidth} bg-[#111] border-r border-[#222] min-h-screen flex-col fixed top-0 left-0 z-40 transition-[width] duration-300`}
      >
        <div className={`flex items-center border-b border-[#222] ${collapsed && mounted ? 'px-3 py-4 justify-center' : 'px-5 py-4 justify-between'}`}>
          {(!collapsed || !mounted) && (
            <h1 className="text-xl font-heading font-bold text-white whitespace-nowrap overflow-hidden">
              Barber <span className="text-[#C9A84C]">Portal</span>
            </h1>
          )}
          <button
            onClick={toggle}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:text-white hover:bg-[rgba(255,255,255,0.08)] transition-all shrink-0"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {mounted && collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        </div>
        <NavLinks showLabels={!collapsed || !mounted} />
      </motion.aside>

      {/* ── Mobile top bar ────────────────────────────── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#111] border-b border-[#222] flex items-center justify-between px-4 h-14">
        <h1 className="text-base font-heading font-bold text-white">
          Barber <span className="text-[#C9A84C]">Portal</span>
        </h1>
        <button
          onClick={() => setMobileOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:text-white hover:bg-white/10 transition-all"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ── Mobile Drawer ─────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-72 z-50 bg-[#111] border-r border-[#222] flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#222]">
                <h1 className="text-lg font-heading font-bold text-white">
                  Barber <span className="text-[#C9A84C]">Portal</span>
                </h1>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:text-white hover:bg-white/10 transition-all"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>
              <NavLinks onLinkClick={() => setMobileOpen(false)} showLabels />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
