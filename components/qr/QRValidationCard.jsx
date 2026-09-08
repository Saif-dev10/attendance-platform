"use client";

import {
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  User,
} from "lucide-react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function QRValidationCard({
  session,
  isConfirming,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-charcoal">
            QR Code Detected
          </h1>

          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-bronze-deep">
            Attendance Verification
          </p>
        </div>

        <button
          onClick={onCancel}
          className="text-sm text-graphite-soft hover:text-graphite transition-colors"
        >
          Cancel
        </button>
      </div>

      <Card className="rounded-2xl border border-line bg-white p-5">
        <div className="flex items-start gap-3 border-b border-line pb-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bronze-deep/10">
            <BookOpen className="h-5 w-5 text-bronze-deep" />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-graphite-soft">
              Course
            </p>

            <p className="mt-0.5 font-semibold text-charcoal">
              {session.courseCode}: {session.courseTitle}
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-4 pt-4">
          <Field
            icon={<User className="h-3.5 w-3.5" />}
            label="Lecturer"
            value={session.lecturer}
            span
          />

          <Field
            icon={<Calendar className="h-3.5 w-3.5" />}
            label="Date"
            value={session.date}
          />

          <Field
            icon={<Clock className="h-3.5 w-3.5" />}
            label="Time"
            value={session.time}
          />

          <Field
            icon={<MapPin className="h-3.5 w-3.5" />}
            label="Location"
            value={session.location}
            span
          />
        </dl>
      </Card>

      <div className="mt-6 flex flex-col gap-3">
        <Button
          size="lg"
          onClick={onConfirm}
          disabled={isConfirming}
          className="w-full"
        >
          {isConfirming ? "Confirming…" : "Confirm Attendance"}
        </Button>

        <button
          onClick={onCancel}
          disabled={isConfirming}
          className="text-sm font-medium text-graphite-soft hover:text-graphite transition-colors disabled:opacity-50"
        >
          Scan Again
        </button>
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  value,
  span,
}) {
  return (
    <div className={span ? "col-span-2" : undefined}>
      <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-graphite-soft">
        {icon}
        {label}
      </dt>

      <dd className="mt-1 text-sm font-medium text-charcoal">
        {value}
      </dd>
    </div>
  );
}