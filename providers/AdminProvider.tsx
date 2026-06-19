'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthContext } from './AuthProvider';

interface AdminContextType {
  isAdmin: boolean;
}

const AdminContext = createContext<AdminContextType>({ isAdmin: false });

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!user && pathname !== '/admin/login') {
      router.replace('/admin/login');
    }

    if (user && pathname === '/admin/login') {
      router.replace('/admin/dashboard');
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#C9A84C] text-sm mt-4 tracking-widest uppercase">Authenticating...</p>
      </div>
    );
  }

  // Prevent rendering protected content if not logged in (unless on login page)
  if (!user && pathname !== '/admin/login') {
    return null;
  }

  return (
    <AdminContext.Provider value={{ isAdmin: !!user }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
