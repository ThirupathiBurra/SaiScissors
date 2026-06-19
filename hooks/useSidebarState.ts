'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'saiscissors_sidebar_collapsed';

export function useSidebarState() {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const syncState = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored !== null) setCollapsed(JSON.parse(stored));
      } catch {}
    };

    syncState();

    window.addEventListener('sidebar-toggle', syncState);
    return () => window.removeEventListener('sidebar-toggle', syncState);
  }, []);

  const toggle = () => {
    setCollapsed(prev => {
      const next = !prev;
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      window.dispatchEvent(new Event('sidebar-toggle'));
      return next;
    });
  };

  return { collapsed, toggle, mounted };
}
