"use client";
import Link from "next/link";
import AdminShell from "@/components/admin/shared/AdminShell";
import { SidebarProfile } from "@/components/admin/shared/AdminSidebar";
import Icon from "@/components/admin/shared/Icon";
import useAsync from "@/lib/admin/useAsync";
import { getUniversityProfile } from "@/lib/services/admin/metricsService";
import { UNIVERSITY_NAV } from "./nav";

function UniversityBrand({ profile }) {
  return (
    <Link href="/admin/university" aria-label="University overview" className="flex min-w-0 items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#071a33] text-[#f5c400]">
        <Icon name="student" size={20} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[12.5px] font-extrabold uppercase tracking-wide text-[#0b1a30]">
          {profile?.name || "Bayero University"}
        </span>
        <span className="block text-[9.5px] font-extrabold uppercase tracking-[0.12em] text-[#d9a800]">SKUL Dashboard</span>
      </span>
    </Link>
  );
}

export default function UniversityShell({ children }) {
  const { data } = useAsync(() => getUniversityProfile(), []);
  const profile = data?.profile;
  return (
    <AdminShell
      nav={UNIVERSITY_NAV}
      theme="light"
      brand={<UniversityBrand profile={profile} />}
      footer={
        <div>
          <Link href="/admin" className="mx-5 mb-2 flex items-center gap-2 text-[12px] font-semibold text-[#6b7587] hover:text-[#0b1a30]">
            <Icon name="arrowLeft" size={14} /> Switch environment
          </Link>
          <SidebarProfile name={profile?.admin.name || "Prof. Ibrahim S."} role={profile?.admin.role || "Vice Chancellor"} dark={false} />
        </div>
      }
    >
      {children}
    </AdminShell>
  );
}