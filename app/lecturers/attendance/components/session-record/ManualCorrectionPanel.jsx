"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { STATUS, STATUS_LABELS } from "@/lib/mock/attendanceUtils";
import AttendanceStatusBadge from "../shared/AttendanceStatusBadge";
import AuditTrail from "./AuditTrail";

const REASON_MAX = 200;
const STATUS_OPTIONS = [STATUS.PRESENT, STATUS.LATE, STATUS.ABSENT];

// Desktop: a right-side panel. Below lg: a bottom sheet. Same content either way,
// so this owns the local status/reason draft and asks the parent to persist it.
export default function ManualCorrectionPanel({ record, auditEntries, loading, saving, onSave, onClose }) {
  const [nextStatus, setNextStatus] = useState(record?.status ?? STATUS.PRESENT);
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (record) {
      setNextStatus(record.status);
      setReason("");
    }
  }, [record]);

  if (!record) return null;

  const canSave = nextStatus !== record.status && reason.trim().length > 0 && !saving;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-end lg:items-stretch">
      <button
        type="button"
        aria-label="Close manual correction panel"
        onClick={onClose}
        className="absolute inset-0 bg-charcoal/30"
      />

      <div className="relative flex max-h-[85vh] w-full flex-col overflow-y-auto rounded-t-lg border-t border-line bg-paper p-4 shadow-lg lg:h-full lg:max-h-none lg:w-96 lg:rounded-none lg:rounded-l-lg lg:border-l lg:border-t-0">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-charcoal">Manual Correction</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-md text-graphite hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-charcoal">{record.studentName}</p>
          <p className="text-xs text-graphite-soft">{record.matricNumber}</p>
        </div>

        <div className="mt-4">
          <p className="text-xs text-graphite-soft">Current Status</p>
          <div className="mt-1">
            <AttendanceStatusBadge status={record.status} />
          </div>
        </div>

        <fieldset className="mt-4">
          <legend className="mb-1 text-xs text-graphite-soft">New Status</legend>
          <div className="space-y-1.5">
            {STATUS_OPTIONS.map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-2 rounded-md border border-line px-3 py-2 text-sm text-charcoal has-[:checked]:border-bronze-deep has-[:checked]:bg-bronze-deep/5"
              >
                <input
                  type="radio"
                  name="correction-status"
                  value={option}
                  checked={nextStatus === option}
                  onChange={() => setNextStatus(option)}
                  className="h-4 w-4 accent-bronze-deep"
                />
                {STATUS_LABELS[option]}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-4">
          <label htmlFor="correction-reason" className="mb-1 block text-xs text-graphite-soft">
            Reason (required)
          </label>
          <textarea
            id="correction-reason"
            rows={3}
            maxLength={REASON_MAX}
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Explain why this record is being corrected"
            className="w-full resize-none rounded-md border border-line bg-paper p-2 text-sm text-charcoal placeholder:text-graphite-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep"
          />
          <p className="mt-1 text-right text-xs text-graphite-soft">
            {reason.length}/{REASON_MAX}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="h-10 rounded-md border border-line bg-paper text-sm font-medium text-charcoal hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSave}
            onClick={() => onSave({ status: nextStatus, reason: reason.trim() })}
            className="h-10 rounded-md bg-bronze-deep text-sm font-medium text-white hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Updating…" : "Update"}
          </button>
        </div>

        <div className="mt-6 border-t border-line pt-4">
          <AuditTrail entries={auditEntries} loading={loading} />
          <p className="mt-3 text-xs text-graphite-soft">All manual changes are logged and auditable.</p>
        </div>
      </div>
    </div>
  );
}
