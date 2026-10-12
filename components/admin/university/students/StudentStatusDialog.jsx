"use client";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useToast } from "@/components/ui/Toast";
import { setStudentStatus } from "@/lib/services/admin/studentsService";

function copyFor(student, status) {
  const n = student.fullName;
  if (status === "flagged")
    return { title: `Flag ${n}?`, message: "The account is highlighted for attendance follow-up. The student can still sign in.", consequences: [], confirm: "Flag account", tone: "primary", done: "Account flagged" };
  if (status === "suspended_account")
    return {
      title: `Suspend ${n}?`,
      message: "The student will no longer be able to sign in or scan attendance QR codes.",
      consequences: ["Records and attendance history are kept.", "The account can be reactivated at any time."],
      confirm: "Suspend account",
      tone: "danger",
      done: "Account suspended",
    };
  const clearing = student.status === "flagged";
  return {
    title: clearing ? `Clear flag on ${n}?` : `Reactivate ${n}?`,
    message: clearing ? "The account returns to normal status." : "The student regains access to the platform.",
    consequences: [],
    confirm: clearing ? "Clear flag" : "Reactivate account",
    tone: "primary",
    done: clearing ? "Flag cleared" : "Account reactivated",
  };
}

/** pending: { student, status } | null */
export default function StudentStatusDialog({ pending, onClose, onDone }) {
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const c = pending ? copyFor(pending.student, pending.status) : null;

  const confirm = async () => {
    setBusy(true);
    try {
      await setStudentStatus(pending.student.id, pending.status);
      toast.push({ tone: pending.status === "suspended_account" ? "warning" : "success", title: c.done, message: pending.student.fullName });
      onDone?.();
      onClose();
    } catch (err) {
      toast.push({ tone: "error", title: "Status not changed", message: err.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <ConfirmDialog
      open={!!pending}
      title={c?.title || ""}
      message={c?.message || ""}
      consequences={c?.consequences || []}
      confirmLabel={c?.confirm || "Confirm"}
      tone={c?.tone || "primary"}
      loading={busy}
      onConfirm={confirm}
      onCancel={() => !busy && onClose()}
    />
  );
}