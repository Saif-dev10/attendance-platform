"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ActiveQRSession from "../components/qr/ActiveQRSession";
import QRSessionSetup from "../components/qr/QRSessionSetup";
import useQRSession from "../hooks/useQRSession";
import { attendanceRoutes } from "@/lib/attendanceRoutes";

import Sidebar, { lecturerSections } from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function QRAttendancePage() {
  const qr = useQRSession();

  return (
    <div className="min-h-screen">
      <Topbar
        title="QR Attendance"
        subtitle="Generate and manage QR codes for student check-ins."
        leading={
          <Link
            href={attendanceRoutes.overview}
            aria-label="Back to Attendance overview"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-paper text-graphite transition-colors hover:bg-cream hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep/40 sm:h-10 sm:w-10"
          >
            <ArrowLeft
              size={18}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Link>
        }
      />

      <Sidebar
        sections={lecturerSections}
        dashboardHref="/lecturers"
        user={{
          name: "Dr. Ibrahim",
          role: "Lecturer",
          avatar: "/avatar-placeholder.svg",
        }}
      />

      <main className="ml-0 pt-20 pb-18 md:ml-[280px]">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-5xl">
            <div className="grid gap-4 lg:grid-cols-2">
              <QRSessionSetup
                courses={qr.courses}
                setup={qr.setup}
                onChange={qr.setSetup}
                onStart={qr.onStart}
                starting={qr.starting}
                error={qr.startError}
              />

              <ActiveQRSession
                session={qr.session}
                secondsRemaining={qr.secondsRemaining}
                refreshing={qr.refreshing}
                ending={qr.ending}
                onRefresh={qr.onRefresh}
                onEnd={qr.onEnd}
              />
            </div>
          </div>
        </div>
      </main>

      <MobileBottomNav active="academic" />
    </div>
  );
}
