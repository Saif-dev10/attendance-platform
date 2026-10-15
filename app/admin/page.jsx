import Link from "next/link";
import Icon from "@/components/admin/shared/Icon";
import { SkulLogo } from "@/components/admin/shared/AdminSidebar";

const ENVIRONMENTS = [
  {
    href: "/admin/platform",
    icon: "overview",
    title: "SKUL Platform Administration",
    text: "Manage all universities, onboarding, global imports, audit logs and platform-wide configuration.",
    who: "Platform team",
  },

  {
    href: "/admin/university",
    icon: "building",
    title: "University Administration",
    text: "Run one university: students, lecturers, courses, timetables and attendance. Sample institution: Bayero University Kano.",
    who: "Institution administrators",
  },
];

export default function AdminHome() {
  return (
    <main className="mx-auto flex min-h-screen max-w-[860px] flex-col justify-center px-6 py-12">
      <div className="mb-8 flex items-center gap-3">
        <SkulLogo />
        <span className="skul-heading text-[22px] font-bold text-[#0b1a30]">SKUL</span>
      </div>
      <h1 className="skul-heading text-[26px] font-semibold text-[#0b1a30]">Choose an administrative environment</h1>
      <p className="mt-1 text-[14px] text-[#6b7587]">These are separate experiences with their own navigation and data.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {ENVIRONMENTS.map((e) => (
          <Link key={e.href} href={e.href} className="skul-card group p-6 transition-shadow hover:shadow-md">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#071a33] text-[#f5c400]">
              <Icon name={e.icon} size={22} />
            </span>
            <h2 className="skul-heading mt-4 text-[16px] font-semibold text-[#0b1a30]">{e.title}</h2>
            <p className="mt-1.5 text-[13px] text-[#6b7587]">{e.text}</p>
            <p className="mt-4 flex items-center justify-between text-[12px] font-semibold text-[#071a33]">
              <span className="skul-eyebrow">{e.who}</span>
              <Icon name="arrowRight" size={16} className="transition-transform group-hover:translate-x-0.5" />
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}