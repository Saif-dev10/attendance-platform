"use client";
import Link from "next/link";
import AdminShell from "@/components/admin/shared/AdminShell";
import { SkulLogo, SidebarProfile } from "@/components/admin/shared/AdminSidebar";
import useAsync from "@/lib/admin/useAsync";
import { getPlatformAdmin } from "@/lib/services/admin/metricsService";
import { PLATFORM_NAV } from "./nav";

export function PlatformBrand() {
  return (
    <Link href="/admin/platform" className="flex items-center gap-3" aria-label="SKUL platform overview">
      <SkulLogo />
      <span className="skul-heading text-[20px] font-bold text-white">SKUL</span>
    </Link>
  );
}

export default function PlatformShell({ children }) {
  const { data } = useAsync(() => getPlatformAdmin(), []);
  const admin = data?.admin;
  return (
    <AdminShell
      nav={PLATFORM_NAV}
      theme="dark"
      brand={<PlatformBrand />}
      footer={<SidebarProfile name={admin?.name || "Adewale Okonkwo"} role={admin?.role || "Platform Admin"} dark />}
    >
      {children}
    </AdminShell>
  );
}