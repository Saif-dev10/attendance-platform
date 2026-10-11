"use client";
import { useState } from "react";
import AdminTopbar, { PageBody } from "@/components/admin/shared/AdminTopbar";
import AdminButton from "@/components/admin/shared/AdminButton";
import ErrorState from "@/components/admin/shared/ErrorState";
import LoadingState from "@/components/admin/shared/LoadingState";
import Icon from "@/components/admin/shared/Icon";
import { useShell } from "@/components/admin/shared/AdminShell";
import Tabs from "@/components/ui/Tabs";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useToast } from "@/components/ui/Toast";
import { ADMIN_CONFIG } from "@/lib/admin/config";
import useSettingsForm, { useUnsavedGuard } from "@/components/admin/platform/settings/useSettingsForm";
import PolicyTab from "@/components/admin/platform/settings/PolicyTab";
import SecurityTab from "@/components/admin/platform/settings/SecurityTab";
import StorageApiTab from "@/components/admin/platform/settings/StorageApiTab";
import EmailTemplatesTab from "@/components/admin/platform/settings/EmailTemplatesTab";

const TAB_LABELS = { policy: "Platform Policy", security: "Security & Auth", storage: "Storage & API", email: "Email Templates" };

export default function SystemSettingsPage() {
  const { openMenu } = useShell();
  const toast = useToast();
  const form = useSettingsForm();
  const [tab, setTab] = useState("policy");
  const [confirmDiscard, setConfirmDiscard] = useState(false);

  useUnsavedGuard(form.dirty);

  const onSave = async () => {
    const r = await form.save();
    if (r.ok) {
      toast.push(
        r.changed.length
          ? { title: "Configuration saved", message: ADMIN_CONFIG.useMock ? "Saved to local sample state; nothing was sent to a server." : `Updated: ${r.changed.map((s) => TAB_LABELS[s]).join(", ")}` }
          : { tone: "info", title: "No changes to save" }
      );
    } else if (r.invalidSection) {
      setTab(r.invalidSection);
      toast.push({ tone: "error", title: "Fix the highlighted fields", message: `Check the ${TAB_LABELS[r.invalidSection]} tab before saving.` });
    } else {
      toast.push({ tone: "error", title: "Could not save", message: [r.error.message, ...Object.values(r.error.fields?.[Object.keys(r.error.fields || {})[0]] || {})].filter(Boolean).slice(0, 2).join(" ") });
    }
  };

  const doDiscard = () => {
    form.discard();
    setConfirmDiscard(false);
    toast.push({ tone: "info", title: "Changes discarded", message: "The form was reset to the last saved values." });
  };

  const tabs = Object.keys(TAB_LABELS).map((id) => ({ id, label: TAB_LABELS[id], dirty: form.dirtyBySection[id] }));
  const firstBad = form.values && Object.keys(TAB_LABELS).find((s) => Object.keys(form.errors[s] || {}).length > 0);

  const actions = (
    <>
      {form.dirty && <span className="hidden text-[12px] font-semibold text-[#b45309] sm:inline">● Unsaved changes</span>}
      <AdminButton variant="ghost" disabled={!form.dirty || form.saving} onClick={() => setConfirmDiscard(true)}>Discard Changes</AdminButton>
      <AdminButton variant="primary" disabled={!form.dirty} loading={form.saving} onClick={onSave}>Save Changes</AdminButton>
    </>
  );

  return (
    <>
      <AdminTopbar
        onMenu={openMenu}
        breadcrumb={[{ label: "Platform Admin", href: "/admin/platform" }, { label: "System Settings" }]}
        title="Global Configuration"
        actions={form.phase === "ready" ? actions : null}
      />
      <PageBody narrow>
        {form.phase === "error" ? (
          <div className="skul-card"><ErrorState error={form.error} onRetry={form.reload} /></div>
        ) : form.phase === "loading" ? (
          <div className="skul-card"><LoadingState rows={6} /></div>
        ) : (
          <>
            <Tabs tabs={tabs} value={tab} onChange={setTab} className="overflow-x-auto" />

            {form.errorCount > 0 && (
              <div role="alert" className="mt-6 flex items-start gap-2.5 rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-[13px] text-[#991b1b]">
                <Icon name="alert" size={17} className="mt-0.5 shrink-0" />
                <span>
                  {form.errorCount} field{form.errorCount > 1 ? "s need" : " needs"} attention
                  {firstBad && firstBad !== tab ? <> (see <button className="font-semibold underline" onClick={() => setTab(firstBad)}>{TAB_LABELS[firstBad]}</button>)</> : null}. Saving is blocked until they are fixed.
                </span>
              </div>
            )}

            <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="mt-8">
              {tab === "policy" && (
                <PolicyTab
                  values={form.values.policy}
                  errors={form.errors.policy}
                  onChange={(p) => form.update("policy", p)}
                  maintenance={form.maintenance}
                  onToggleMaintenance={form.toggleMaintenance}
                  hasUnsaved={form.dirty}
                />
              )}
              {tab === "security" && <SecurityTab values={form.values.security} errors={form.errors.security} onChange={(p) => form.update("security", p)} />}
              {tab === "storage" && <StorageApiTab values={form.values.storage} errors={form.errors.storage} onChange={(p) => form.update("storage", p)} />}
              {tab === "email" && (
                <EmailTemplatesTab
                  templates={form.values.email.templates}
                  savedTemplates={form.saved.email.templates}
                  errors={form.errors.email}
                  onChangeTemplate={form.updateTemplate}
                />
              )}
            </div>

            {form.source === "mock" && (
              <p className="mt-10 text-center text-[11.5px] text-[#8a93a3]">Sample data: settings are held in memory and reset on reload. Security, Storage and Email tabs are inferred layouts.</p>
            )}
          </>
        )}
      </PageBody>

      <ConfirmDialog
        open={confirmDiscard}
        title="Discard unsaved changes?"
        message="Every change you made since the last save will be lost."
        confirmLabel="Discard changes"
        tone="danger"
        onConfirm={doDiscard}
        onCancel={() => setConfirmDiscard(false)}
      />
    </>
  );
}