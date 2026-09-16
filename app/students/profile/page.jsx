"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Button from "@/components/ui/Button";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import {
  getStudentDocuments,
  getStudentProfile,
} from "@/lib/services/profile";
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

const student = getStudentProfile();
const documents = getStudentDocuments();

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
      <MobileBottomNav active="academic" />

      <main className="min-h-screen overflow-y-auto bg-paper px-3 pb-28 pt-[92px] sm:px-6 md:ml-[280px] md:pb-10">
        <div className="mx-auto max-w-[1400px] space-y-6">

          <ProfileHeader student={student} onEdit={() => setEditOpen(true)} />

          <AcademicOverview student={student} />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <InformationSection title="Academic Information">
              <InformationGrid
                fields={[
                  { label: "Programme", value: student.programme, icon: GraduationCap },
                  { label: "Department", value: student.department },
                  { label: "Faculty", value: student.faculty },
                  { label: "Level", value: student.level },
                  { label: "Academic Session", value: student.session },
                  { label: "Current Semester", value: student.semester },
                  { label: "Admission Year", value: student.admissionYear },
                ]}
              />
            </InformationSection>

            <div className="space-y-4">
              <InformationSection
                title="Personal Information"
                action={
                  <Button
                    type="button"
                    onClick={() => setEditOpen(true)}
                    className="flex items-center gap-1.5 !bg-transparent px-2 py-1 text-xs font-bold !text-bronze-deep !shadow-none hover:!bg-cream"
                  >
                    <Pencil size={13} />
                    Edit
                  </Button>
                }
              >
                <InformationGrid
                  fields={[
                    { label: "Full Name", value: student.name, icon: UserCircle },
                    { label: "Date of Birth", value: student.dateOfBirth, icon: CalendarDays },
                    { label: "Gender", value: student.gender },
                    { label: "Email Address", value: student.email, icon: Mail },
                    { label: "Phone Number", value: student.phone, icon: Phone },
                    { label: "Address", value: student.address, icon: MapPin },
                  ]}
                />
              </InformationSection>

              <EmergencyContact student={student} />
            </div>
          </div>

          <StudentDocuments documents={documents} />

          <SecuritySection student={student} />
        </div>
      </main>

      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        student={student}
      />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Profile identity header                                                 */
/* ---------------------------------------------------------------------- */

function ProfileHeader({ student, onEdit }) {
  return (
    <section className="rounded-2xl border border-line bg-white px-5 py-6 sm:px-7 sm:py-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Image
            src="/avatar-placeholder.svg"
            alt={student.name}
            width={88}
            height={88}
            className="h-20 w-20 shrink-0 rounded-xl border border-line bg-cream object-cover sm:h-[88px] sm:w-[88px]"
          />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl font-bold tracking-tight text-charcoal sm:text-2xl">
                {student.name}
              </h1>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-bronze-deep/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-bronze-deep">
                <span className="h-1.5 w-1.5 rounded-full bg-bronze-deep" />
                Active Student
              </span>
            </div>

            <p className="mt-1.5 text-sm text-graphite">
              {student.role}
              <span className="mx-1.5 text-line">•</span>
              {student.programme}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1.5">
              <MetaItem label="Student ID" value={student.studentId} />
              <MetaItem label="Department" value={student.department} />
              {student.faculty && (
                <MetaItem label="Faculty" value={student.faculty} />
              )}
            </div>
          </div>
        </div>

        <Button
          type="button"
          onClick={onEdit}
          className="flex w-full items-center justify-center gap-2 sm:w-auto lg:shrink-0"
        >
          <Pencil size={14} />
          Edit Profile
        </Button>
      </div>
    </section>
  );
}

function MetaItem({ label, value }) {
  return (
    <span className="flex items-baseline gap-1.5 text-xs">
      <span className="font-bold uppercase tracking-wider text-graphite-soft">
        {label}
      </span>
      <span className="font-semibold text-charcoal">{value}</span>
    </span>
  );
}

/* ---------------------------------------------------------------------- */
/* Academic overview strip                                                 */
/* ---------------------------------------------------------------------- */

function AcademicOverview({ student }) {
  const stats = [
    { label: "CGPA", value: student.cgpa },
    { label: "Attendance", value: student.attendance },
    { label: "Current Level", value: student.level },
    { label: "Courses", value: student.courses },
  ];

  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="grid grid-cols-2 divide-y divide-line sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
        {stats.map((stat) => (
          <div key={stat.label} className="px-5 py-4 text-center sm:text-left">
            <p className="text-[10px] font-bold uppercase tracking-widest text-graphite-soft">
              {stat.label}
            </p>
            <p className="mt-1.5 text-lg font-bold tracking-tight text-charcoal sm:text-xl">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Shared information section / grid / field                               */
/* ---------------------------------------------------------------------- */

function SectionHeading({ title, noMargin = false }) {
  return (
    <h2
      className={`${noMargin ? "" : "mb-4"} text-sm font-bold uppercase tracking-widest text-charcoal`}
    >
      {title}
    </h2>
  );
}

function InformationSection({ title, action, children }) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <SectionHeading title={title} noMargin />
        {action}
      </div>

      <div className="rounded-2xl border border-line bg-white px-5 py-5 sm:px-7 sm:py-6">
        {children}
      </div>
    </section>
  );
}

function InformationGrid({ fields }) {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
      {fields
        .filter((field) => field.value)
        .map((field) => (
          <InfoField key={field.label} {...field} />
        ))}
    </div>
  );
}

function InfoField({ label, value, icon: Icon }) {
  return (
    <div className="flex items-start gap-3">
      {Icon && (
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cream text-graphite-soft">
          <Icon size={15} strokeWidth={1.8} />
        </span>
      )}

      <div className="min-w-0">
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

/* ---------------------------------------------------------------------- */
/* Emergency contact                                                       */
/* ---------------------------------------------------------------------- */

function EmergencyContact({ student }) {
  return (
    <section>
      <SectionHeading title="Emergency Contact" />

      <div className="overflow-hidden rounded-2xl border border-line bg-white">
        <div className="grid grid-cols-1 gap-x-10 gap-y-5 px-5 py-5 sm:grid-cols-2 sm:px-7 sm:py-6">
          <InfoField label="Contact Name" value={student.emergencyName} />
          <InfoField label="Relationship" value={student.emergencyRelationship} />
          <InfoField label="Emergency Phone" value={student.emergencyPhone} />
        </div>

        <div className="border-t border-line bg-cream px-5 py-3 sm:px-7">
          <p className="text-[11px] leading-relaxed text-graphite-soft">
            Keep your emergency contact information up to date so the
            university can reach the right person when needed.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Student documents                                                       */
/* ---------------------------------------------------------------------- */

function StudentDocuments({ documents }) {
  return (
    <section>
      <SectionHeading title="Student Documents" />

      <div className="overflow-hidden rounded-2xl border border-line bg-white">
        {documents.map((document, index) => (
          <Link
            href="/documents"
            key={document.name}
            className={`group flex items-center gap-3 px-4 py-4 transition-colors hover:bg-paper sm:px-5 ${
              index !== documents.length - 1 ? "border-b border-line" : ""
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
  );
}

/* ---------------------------------------------------------------------- */
/* Account & security                                                      */
/* ---------------------------------------------------------------------- */

function SecuritySection({ student }) {
  return (
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
  );
}

function SecurityRow({ icon: Icon, label, description, action, last = false }) {
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

/* ---------------------------------------------------------------------- */
/* Edit profile modal                                                      */
/* ---------------------------------------------------------------------- */

function EditProfileModal({ open, onClose, student }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-charcoal/35 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-lg rounded-t-3xl border border-line bg-paper shadow-2xl sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-base font-bold text-charcoal">Edit Profile</h2>
            <p className="mt-0.5 text-xs text-graphite-soft">
              Update your personal contact information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close edit profile"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white text-graphite-soft transition-colors hover:bg-cream hover:text-charcoal"
          >
            <X size={17} />
          </button>
        </div>

        <div className="space-y-4 px-5 py-5 sm:px-6">
          <FormField label="Phone Number" defaultValue={student.phone} />
          <FormField label="Address" defaultValue={student.address} />
          <FormField label="Emergency Contact" defaultValue={student.emergencyName} />
          <FormField label="Emergency Phone" defaultValue={student.emergencyPhone} />

          <div className="rounded-xl border border-line bg-cream px-4 py-3">
            <p className="text-[11px] leading-relaxed text-graphite-soft">
              Your Student ID, programme, department, faculty, level, and
              academic results are managed by the university and cannot be
              edited here.
            </p>
          </div>
        </div>

        <div className="flex gap-3 border-t border-line px-5 py-4 sm:justify-end sm:px-6">
          <Button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-line !bg-white px-4 py-2.5 text-xs font-bold !text-graphite hover:!bg-cream sm:flex-none"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl bg-charcoal px-4 py-2.5 text-xs font-bold text-cream hover:bg-bronze-deep sm:flex-none"
          >
            Save Changes
          </Button>
        </div>
      </div>
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