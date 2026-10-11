"use client";
import { useState } from "react";
import Icon from "@/components/admin/shared/Icon";
import AdminButton from "@/components/admin/shared/AdminButton";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useToast } from "@/components/ui/Toast";
import { ADMIN_CONFIG } from "@/lib/admin/config";
import { formatDateTime } from "@/lib/admin/format";

/**
 * onToggle(enabled) => Promise. Applies immediately; it is NOT part of "Save Changes".
 * `hasUnsaved` only adds a reassurance line to the confirmation.
 */
export default function MaintenanceCard({ maintenance, onToggle, hasUnsaved }) {
  const toast = useToast();
  const [pending, setPending] = useState(null); // "enable" | "disable"
  const [busy, setBusy] = useState(false);
  const enabled = maintenance.enabled;
  const enabling = pending === "enable";

  const confirm = async () => {
    setBusy(true);
    try {
      await onToggle(enabling);
      toast.push(
        enabling
          ? { tone: "warning", title: "Maintenance mode enabled", message: ADMIN_CONFIG.useMock ? "Sample mode: no real sessions were terminated." : "All user sessions were terminated." }
          : { title: "Maintenance mode disabled", message: "Platform access is restored." }
      );
      setPending(null);
    } catch (err) {
      toast.push({ tone: "error", title: "Maintenance state not changed", message: err.message });
    } finally {
      setBusy(false);
    }
  };

  const consequences = enabling
    ? [
        "All active student and lecturer sessions end immediately.",
        "A system-wide offline notice is shown to every institution.",
        "Platform administrators keep access.",
        ...(hasUnsaved ? ["Your unsaved configuration changes stay in the form but are not saved by this action."] : []),
      ]
    : ["Students and lecturers can sign in again.", "The offline notice is removed."];

  return (
    <>
      <div role="status" className="rounded-2xl border border-[#fecaca] bg-[#fef2f2] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-[#991b1b]">
            <Icon name="alert" size={20} />
            <div>
              <p className="text-[14px] font-bold">
                Maintenance state is currently {enabled ? "ENABLED" : "DISABLED"}
              </p>
              {enabled && maintenance.since && (
                <p className="text-[12px] font-medium">Since {formatDateTime(maintenance.since)} by {maintenance.enabledBy}</p>
              )}
            </div>
          </div>
          {enabled ? (
            <AdminButton variant="secondary" onClick={() => setPending("disable")}>Disable Maintenance Mode</AdminButton>
          ) : (
            <AdminButton variant="danger" onClick={() => setPending("enable")}>Enable Maintenance Mode</AdminButton>
          )}
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-[#b91c1c]">
          Enabling maintenance mode will immediately terminate all active student and lecturer sessions and display a system-wide offline notice. Platform administrators will retain access.
        </p>
      </div>

      <ConfirmDialog
        open={!!pending}
        title={enabling ? "Enable maintenance mode?" : "Disable maintenance mode?"}
        message={enabling ? "This takes the platform offline for every student and lecturer right now." : "This brings the platform back online for all users."}
        consequences={consequences}
        confirmLabel={enabling ? "Enable maintenance mode" : "Disable maintenance mode"}
        tone={enabling ? "danger" : "primary"}
        requireText={enabling ? "MAINTENANCE" : undefined}
        loading={busy}
        onConfirm={confirm}
        onCancel={() => !busy && setPending(null)}
      />
    </>
  );
}