"use client";
import { createContext, useContext, useMemo, useState } from "react";
import AdminSidebar from "./AdminSidebar";

const ShellCtx = createContext({ openMenu: () => {} });
/** Pages call useShell().openMenu to wire the mobile hamburger in their topbar. */
export const useShell = () => useContext(ShellCtx);

export default function AdminShell({ nav, theme, brand, footer, progress, children }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ openMenu: () => setOpen(true) }), []);

  return (
    <ShellCtx.Provider value={value}>
      <div className="flex min-h-screen">
        <AdminSidebar nav={nav} theme={theme} brand={brand} footer={footer} progress={progress} open={open} onClose={() => setOpen(false)} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </ShellCtx.Provider>
  );
}