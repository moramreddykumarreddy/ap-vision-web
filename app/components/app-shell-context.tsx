"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AppShellContextValue = {
  mobileNavOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleMobileNav: () => void;
};

const AppShellContext = createContext<AppShellContextValue | null>(null);

export function AppShellProvider({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);
  const openMobileNav = useCallback(() => setMobileNavOpen(true), []);
  const toggleMobileNav = useCallback(
    () => setMobileNavOpen((open) => !open),
    [],
  );

  useEffect(() => {
    if (!mobileNavOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileNavOpen]);

  return (
    <AppShellContext.Provider
      value={{
        mobileNavOpen,
        openMobileNav,
        closeMobileNav,
        toggleMobileNav,
      }}
    >
      {children}
    </AppShellContext.Provider>
  );
}

export function useAppShell() {
  const ctx = useContext(AppShellContext);
  if (!ctx) {
    throw new Error("useAppShell must be used within AppShellProvider");
  }
  return ctx;
}
