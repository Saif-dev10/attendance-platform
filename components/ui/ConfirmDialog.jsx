"use client";
import { useState } from "react";
import Modal from "./Modal";
import Input from "./Input";
import AdminButton from "@/components/admin/shared/AdminButton";

/**
 * Confirmation step for destructive/disruptive actions.
 * Pass `requireText` (e.g. "MAINTENANCE") to force the user to type it before confirming.
 */
export default function ConfirmDialog({
  open,
  title,
  message,
  consequences = [],
  confirmLabel = "Confirm",
  tone = "danger",
  requireText,
  loading = false,
  onConfirm,
  onCancel,
}) {
  const [typed, setTyped] = useState("");
  const blocked = requireText && typed.trim() !== requireText;
  const handleCancel = () => {
    setTyped("");
    onCancel?.();
  };
  const handleConfirm = () => {
    setTyped("");
    onConfirm?.();
  };

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      title={title}
      size="sm"
      footer={
        <>
          <AdminButton variant="secondary" onClick={handleCancel}>Cancel</AdminButton>
          <AdminButton variant={tone === "danger" ? "danger" : "primary"} disabled={blocked} loading={loading} onClick={handleConfirm}>
            {confirmLabel}
          </AdminButton>
        </>
      }
    >
      <p className="text-[14px] text-[#0b1a30]">{message}</p>
      {consequences.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-[13px] text-[#6b7587]">
          {consequences.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      )}
      {requireText && (
        <Input
          className="mt-4"
          label={`Type ${requireText} to confirm`}
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          autoFocus
        />
      )}
    </Modal>
  );
}