"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Button from "@/components/ui/Button";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  FileText,
  GraduationCap,
  Lock,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  UserCircle,
  X,
} from "lucide-react";

const student = {
  name: "David Okafor",
  role: "Student • 300L",
  studentId: "BUK/CSC/23/0142",
  programme: "B.Sc. Computer Science",
  department: "Computer Science",
  faculty: "Computing",
  level: "300 Level",
  session: "2025/2026",
  semester: "Second Semester",
  admissionYear: "2023",

  cgpa: "4.21",
  attendance: "87%",
  courses: "8",
  credits: "54 / 120",

  dateOfBirth: "12 March 2004",
  gender: "Male",
  email: "david.okafor@example.com",
  phone: "+234 801 234 5678",
  address: "Kano, Nigeria",

  emergencyName: "Mary Okafor",
  emergencyRelationship: "Mother",
  emergencyPhone: "+234 802 987 6543",
};

const documents = [
  {
    name: "Admission Letter",
    description: "University admission document",
  },
  {
    name: "Student ID Card",
    description: "Current student identification",
  },
  {
    name: "Academic Transcript",
    description: "Academic record",
  },
];

export default function StudentProfilePage() {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper text-charcoal">
      <Sidebar />

      <Topbar
        title="Student Profile"
        subtitle="Personal information and academic identity"
        leading={
          <Link
            href="/dashboard"
            aria-label="Back to dashboard"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line text-graphite-soft transition-all hover:bg-cream hover:text-charcoal"
          >
            <ArrowLeft size={17} />
          </Link>
        }
      />

      <main className="min-h-screen overflow-y-auto bg-paper px-3 pb-28 pt-[92px] sm:px-6 md:ml-[280px] md:pb-10">
        <div className="mx-auto max-w-[1400px] space-y-6">

          {/* Profile Header */}
          <section className="overflow-hidden rounded-2xl border border-line bg-white">
            <div className="h-24 bg-charcoal" />

            <div className="px-5 pb-7 sm:px-7 lg:px-9">
              <div className="-mt-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-8">
                
                {/* Avatar */}
                <Image
                  src="/avatar-placeholder.svg"
                  alt={student.name}
                  width={104}
                  height={104}
                  className="h-24 w-24 shrink-0 rounded-2xl border-4 border-white bg-paper object-cover shadow-md"
                />

                {/* Main Identity */}
                <div className="min-w-0 flex-1 pb-1 lg:translate-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="text-2xl font-bold tracking-tight text-charcoal lg:text-[27px]">
                      {student.name}
                    </h1>

                    <span className="rounded-full bg-bronze-deep/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-bronze-deep">
                      Active Student
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-graphite-soft">
                    {student.role}
                    <span className="mx-2 text-line">•</span>
                    {student.programme}
                  </p>
                </div>

                {/* Student Record */}
                <div className="grid shrink-0 grid-cols-2 gap-x-8 gap-y-2 border-l border-line pl-6 pb-1 lg:min-w-[330px]">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-graphite-soft">
                      Student ID
                    </p>
                    <p className="mt-1 text-xs font-bold text-charcoal">
                      {student.studentId}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-graphite-soft">
                      Department
                    </p>
                    <p className="mt-1 text-xs font-bold text-charcoal">
                      {student.department}
                    </p>
                  </div>
                </div>

                {/* Action */}
                <div className="shrink-0 pb-1">
                  <Button
                    type="button"
                    onClick={() => setEditOpen(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-charcoal px-5 py-3 text-xs font-bold text-cream transition-colors hover:bg-bronze-deep lg:w-auto"
                  >
                    <Pencil size={14} />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Academic Snapshot */}
          <section>
            <SectionHeading title="Academic Snapshot" />

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <StatCard label="CGPA" value={student.cgpa} />
              <StatCard label="Attendance" value={student.attendance} />
              <StatCard label="Current Level" value="300L" />
              <StatCard label="Courses" value={student.courses} />
            </div>
          </section>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {/* Academic Information */}
            <section>
              <SectionHeading title="Academic Information" />

              <InfoCard>
                <InfoRow
                  label="Programme"
                  value={student.programme}
                  icon={GraduationCap}
                />
                <InfoRow
                  label="Department"
                  value={student.department}
                />
                <InfoRow label="Faculty" value={student.faculty} />
                <InfoRow label="Level" value={student.level} />
                <InfoRow
                  label="Academic Session"
                  value={student.session}
                />
                <InfoRow
                  label="Current Semester"
                  value={student.semester}
                />
                <InfoRow
                  label="Admission Year"
                  value={student.admissionYear}
                  last
                />
              </InfoCard>
            </section>

            {/* Personal Information */}
            <section>
              <div className="mb-4 flex items-center justify-between gap-3">
                <SectionHeading title="Personal Information" noMargin />

                <Button
                  type="button"
                  onClick={() => setEditOpen(true)}
                  className="flex items-center gap-1.5 !bg-transparent px-2 py-1 text-xs font-bold !text-bronze-deep !shadow-none hover:!bg-cream"
                >
                  <Pencil size={13} />
                  Edit
                </Button>
              </div>

              <InfoCard>
                <InfoRow
                  label="Full Name"
                  value={student.name}
                  icon={UserCircle}
                />
                <InfoRow
                  label="Date of Birth"
                  value={student.dateOfBirth}
                  icon={CalendarDays}
                />
                <InfoRow label="Gender" value={student.gender} />
                <InfoRow
                  label="Email Address"
                  value={student.email}
                  icon={Mail}
                />
                <InfoRow
                  label="Phone Number"
                  value={student.phone}
                  icon={Phone}
                />
                <InfoRow
                  label="Address"
                  value={student.address}
                  icon={MapPin}
                  last
                />
              </InfoCard>
            </section>

            {/* Contact Information */}
            <section>
              <SectionHeading title="Contact Information" />

              <InfoCard>
                <InfoRow
                  label="Email"
                  value={student.email}
                  icon={Mail}
                />
                <InfoRow
                  label="Phone"
                  value={student.phone}
                  icon={Phone}
                />

                <div className="border-b border-line px-4 py-4 sm:px-5">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-graphite-soft">
                    Emergency Contact
                  </p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-graphite-soft">
                        Name
                      </p>
                      <p className="mt-1 text-sm font-semibold text-charcoal">
                        {student.emergencyName}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-graphite-soft">
                        Relationship
                      </p>
                      <p className="mt-1 text-sm font-semibold text-charcoal">
                        {student.emergencyRelationship}
                      </p>
                    </div>

                    <div className="sm:col-span-2">
                      <p className="text-xs text-graphite-soft">
                        Emergency Phone
                      </p>
                      <p className="mt-1 text-sm font-semibold text-charcoal">
                        {student.emergencyPhone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-cream px-4 py-3.5 sm:px-5">
                  <p className="text-[11px] leading-relaxed text-graphite-soft">
                    Keep your emergency contact information up to date so
                    the university can reach the right person when needed.
                  </p>
                </div>
              </InfoCard>
            </section>

            {/* Student Documents */}
            <section>
              <SectionHeading title="Student Documents" />

              <div className="overflow-hidden rounded-2xl border border-line bg-white">
                {documents.map((document, index) => (
                  <Link
                    href="/documents"
                    key={document.name}
                    className={`group flex items-center gap-3 px-4 py-4 transition-colors hover:bg-paper sm:px-5 ${
                      index !== documents.length - 1
                        ? "border-b border-line"
                        : ""
                    }`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream text-graphite-soft">
                      <FileText size={18} strokeWidth={1.8} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-charcoal">
                        {document.name}
                      </p>
                      <p className="mt-0.5 text-xs text-graphite-soft">
                        {document.description}
                      </p>
                    </div>

                    <ChevronRight
                      size={17}
                      className="shrink-0 text-graphite-soft transition-transform group-hover:translate-x-0.5 group-hover:text-charcoal"
                    />
                  </Link>
                ))}

                <Link
                  href="/documents"
                  className="flex items-center justify-center gap-2 border-t border-line bg-cream px-4 py-3 text-xs font-bold text-bronze-deep transition-colors hover:bg-paper"
                >
                  View All Documents
                  <ChevronRight size={14} />
                </Link>
              </div>
            </section>
          </div>

          {/* Account & Security */}
          <section>
            <SectionHeading title="Account & Security" />

            <div className="overflow-hidden rounded-2xl border border-line bg-white">
              <SecurityRow
                icon={Mail}
                label="Email Address"
                description={student.email}
                action={
                  <span className="flex items-center gap-1.5 rounded-full bg-bronze-deep/10 px-2.5 py-1 text-[10px] font-bold text-bronze-deep">
                    <CheckCircle2 size={12} />
                    Verified
                  </span>
                }
              />

              <SecurityRow
                icon={Lock}
                label="Password"
                description="••••••••••••"
                action={
                  <button
                    type="button"
                    className="text-xs font-bold text-bronze-deep hover:underline"
                  >
                    Change
                  </button>
                }
              />

              <SecurityRow
                icon={ShieldCheck}
                label="Two-Factor Authentication"
                description="Add an extra layer of protection to your account."
                action={
                  <button
                    type="button"
                    className="text-xs font-bold text-bronze-deep hover:underline"
                  >
                    Manage
                  </button>
                }
                last
              />
            </div>
          </section>
        </div>
      </main>

      {/* Edit Profile Modal */}
      {editOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-charcoal/35 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setEditOpen(false);
            }
          }}
        >
          <div className="w-full max-w-lg rounded-t-3xl border border-line bg-paper shadow-2xl sm:rounded-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-base font-bold text-charcoal">
                  Edit Profile
                </h2>
                <p className="mt-0.5 text-xs text-graphite-soft">
                  Update your personal contact information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditOpen(false)}
                aria-label="Close edit profile"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white text-graphite-soft transition-colors hover:bg-cream hover:text-charcoal"
              >
                <X size={17} />
              </button>
            </div>

            <div className="space-y-4 px-5 py-5 sm:px-6">
              <FormField
                label="Phone Number"
                defaultValue={student.phone}
              />

              <FormField
                label="Address"
                defaultValue={student.address}
              />

              <FormField
                label="Emergency Contact"
                defaultValue={student.emergencyName}
              />

              <FormField
                label="Emergency Phone"
                defaultValue={student.emergencyPhone}
              />

              <div className="rounded-xl border border-line bg-cream px-4 py-3">
                <p className="text-[11px] leading-relaxed text-graphite-soft">
                  Your Student ID, programme, department, faculty, level,
                  and academic results are managed by the university and
                  cannot be edited here.
                </p>
              </div>
            </div>

            <div className="flex gap-3 border-t border-line px-5 py-4 sm:justify-end sm:px-6">
              <Button
                type="button"
                onClick={() => setEditOpen(false)}
                className="flex-1 rounded-xl border border-line !bg-white px-4 py-2.5 text-xs font-bold !text-graphite hover:!bg-cream sm:flex-none"
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={() => setEditOpen(false)}
                className="flex-1 rounded-xl bg-charcoal px-4 py-2.5 text-xs font-bold text-cream hover:bg-bronze-deep sm:flex-none"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionHeading({ title, noMargin = false }) {
  return (
    <h2
      className={`${
        noMargin ? "" : "mb-4"
      } text-sm font-bold uppercase tracking-widest text-charcoal`}
    >
      {title}
    </h2>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-line bg-white px-4 py-4 sm:px-5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-graphite-soft">
        {label}
      </p>
      <p className="mt-2 text-xl font-bold tracking-tight text-charcoal sm:text-2xl">
        {value}
      </p>
    </div>
  );
}

function InfoCard({ children }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      {children}
    </div>
  );
}

function InfoRow({
  label,
  value,
  icon: Icon,
  last = false,
}) {
  return (
    <div
      className={`flex items-start gap-3 px-4 py-4 sm:px-5 ${
        last ? "" : "border-b border-line"
      }`}
    >
      {Icon && (
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cream text-graphite-soft">
          <Icon size={15} strokeWidth={1.8} />
        </span>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-graphite-soft">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-semibold text-charcoal">
          {value}
        </p>
      </div>
    </div>
  );
}

function SecurityRow({
  icon: Icon,
  label,
  description,
  action,
  last = false,
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-4 sm:px-5 ${
        last ? "" : "border-b border-line"
      }`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream text-graphite-soft">
        <Icon size={17} strokeWidth={1.8} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-charcoal">{label}</p>
        <p className="mt-0.5 truncate text-xs text-graphite-soft">
          {description}
        </p>
      </div>

      <div className="shrink-0">{action}</div>
    </div>
  );
}

function FormField({ label, defaultValue }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-charcoal">
        {label}
      </span>

      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-graphite-soft focus:border-bronze-deep focus:ring-2 focus:ring-bronze-deep/10"
      />
    </label>
  );
}