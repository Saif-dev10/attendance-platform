import { request, ApiError } from "./_core";
import { settingsStore } from "@/lib/mock/admin/settings";
import { addAuditEvent } from "@/lib/mock/admin/auditEvents";
import { validateAll, anyErrors, SETTINGS_SECTIONS } from "@/lib/admin/settingsValidation";

export function getSettings() {
  return request({ path: "/settings" }, () => ({
    values: settingsStore.values,
    version: settingsStore.version,
    maintenance: settingsStore.maintenance,
  }));
}

/** Saves all sections at once. Re-validates server-side (never trust the client). */
export function saveSettings(values, { expectedVersion } = {}) {
  return request({ path: "/settings", method: "PUT", body: { values, expectedVersion } }, () => {
    if (expectedVersion && expectedVersion !== settingsStore.version)
      throw new ApiError("Settings were changed elsewhere. Reload and try again.", { status: 409 });
    const errors = validateAll(values);
    if (anyErrors(errors)) throw new ApiError("Fix the highlighted fields before saving.", { fields: errors });

    const changed = SETTINGS_SECTIONS.filter((s) => JSON.stringify(values[s]) !== JSON.stringify(settingsStore.values[s]));
    if (changed.length) {
      settingsStore.values = JSON.parse(JSON.stringify(values));
      settingsStore.version += 1;
      addAuditEvent({ category: "config", scope: "global", title: "Global Policy Updated", detail: `Changed: ${changed.join(", ")}` });
    }
    return { values: settingsStore.values, version: settingsStore.version, changed };
  });
}

export function setMaintenance({ enabled }) {
  return request({ path: "/settings/maintenance", method: "PUT", body: { enabled } }, () => {
    settingsStore.maintenance = enabled
      ? { enabled: true, since: Date.now(), enabledBy: "Adewale O." }
      : { enabled: false, since: null, enabledBy: null };
    addAuditEvent({
      category: "config",
      scope: "system",
      title: enabled ? "Maintenance Mode Enabled" : "Maintenance Mode Disabled",
      detail: enabled ? "User sessions terminated; offline notice displayed" : "Platform access restored",
      result: enabled ? "warning" : "success",
    });
    return { maintenance: settingsStore.maintenance };
  });
}