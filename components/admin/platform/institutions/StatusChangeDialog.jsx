"use client";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useToast } from "@/components/ui/Toast";
import { setInstitutionStatus } from "@/lib/services/admin/institutionsService";

/** pending: { institution, status: "suspended" | "active" } | null */
export default function StatusChangeDialog({ pending, onClose, onDone }) {
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const suspend = pending?.status === "suspended";
  const name = pending?.institution.name ?? "";

  const confirm = async () => {
    setBusy(true);
    try {
      await setInstitutionStatus(pending.institution.id, pending.status);
      toast.push({
        tone: suspend ? "warning" : "success",
        title: suspend ? "Institution suspended" : "Institution reactivated",
        message: name,
      });
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
      title={suspend ? `Suspend ${name}?` : `Reactivate ${name}?`}
      message={suspend ? "Users of this institution will no longer be able to sign in." : "Users of this institution will regain access."}
      consequences={
        suspend
          ? ["Students and lecturers lose access immediately.", "All data is retained, and access can be restored at any time."]
          : []
      }
      confirmLabel={suspend ? "Suspend institution" : "Reactivate institution"}
      tone={suspend ? "danger" : "primary"}
      loading={busy}
      onConfirm={confirm}
      onCancel={onClose}
    />
  );
}