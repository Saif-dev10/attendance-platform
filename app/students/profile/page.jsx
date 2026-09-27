"use client";

import Image from "next/image";
import StudentShell from "@/components/students/StudentShell";
import { useStudent } from "@/components/students/StudentContext";
import { formatLevel } from "@/lib/students/format";
import { LogOut } from "lucide-react";

function ProfileRow({ label, value }) {
  if (!value) return null;

  return (
    <div className="flex items-start justify-between gap-4 border-b border-line px-4 py-3.5 last:border-b-0">
      <p className="text-xs font-bold uppercase tracking-wider text-graphite-soft">
        {label}
      </p>
      <p className="max-w-[60%] text-right text-sm font-semibold text-charcoal">
        {value}
      </p>
    </div>
  );
}

function ProfileContent() {
  const { profile, logout } = useStudent();

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-4">
        <Image
          src={profile.avatarUrl || "/avatar-placeholder.svg"}
          alt={profile.name || "Student"}
          width={72}
          height={72}
          className="h-[72px] w-[72px] rounded-2xl border border-line object-cover"
        />
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-charcoal">
            {profile.name}
          </h1>
          <p className="mt-1 font-mono text-sm text-graphite-soft">
            {profile.matric_number}
          </p>
        </div>
      </header>

      <section className="overflow-hidden rounded-2xl border border-line bg-white">
        <ProfileRow label="Faculty" value={profile.faculty} />
        <ProfileRow label="Department" value={profile.department} />
        <ProfileRow label="Programme" value={profile.programme} />
        <ProfileRow label="Level" value={formatLevel(profile.level)} />
        <ProfileRow label="Entry session" value={profile.entry_session} />
        <ProfileRow
          label="Graduation session"
          value={profile.graduation_session}
        />
      </section>

      <button
        type="button"
        onClick={logout}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-line bg-white px-4 py-3 text-sm font-bold text-charcoal hover:bg-cream"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
}

export default function StudentProfilePage() {
  return (
    <StudentShell>
      <ProfileContent />
    </StudentShell>
  );
}
