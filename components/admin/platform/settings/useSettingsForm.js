"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getSettings, saveSettings, setMaintenance } from "@/lib/services/admin/settingsService";
import { SETTINGS_SECTIONS, validateSection } from "@/lib/admin/settingsValidation";

const clone = (v) => JSON.parse(JSON.stringify(v));
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/** Digits-only input helper: "" stays empty, otherwise a number (so "15" and 15 never look "dirty"). */
export const digits = (raw) => {
  const s = String(raw).replace(/\D/g, "");
  return s === "" ? "" : Number(s);
};

/** Warns before the user leaves with unsaved changes (tab close/reload and in-app link clicks). */
export function useUnsavedGuard(active, message = "You have unsaved changes. Leave without saving?") {
  useEffect(() => {
    if (!active) return;
    const onBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    const onClick = (e) => {
      const a = e.target.closest?.("a[href]");
      if (!a || a.target === "_blank" || e.defaultPrevented) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      if (!window.confirm(message)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      document.removeEventListener("click", onClick, true);
    };
  }, [active, message]);
}

export default function useSettingsForm() {
  const [phase, setPhase] = useState("loading"); // loading | ready | error
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(null);
  const [draft, setDraft] = useState(null);
  const [version, setVersion] = useState(null);
  const [maintenance, setMaintenanceState] = useState(null);
  const [source, setSource] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setPhase("loading");
    setError(null);
    try {
      const r = await getSettings();
      setSaved(r.values);
      setDraft(clone(r.values));
      setVersion(r.version);
      setMaintenanceState(r.maintenance);
      setSource(r.source);
      setPhase("ready");
    } catch (err) {
      setError(err);
      setPhase("error");
    }
  }, []);

  useEffect(() => {
    let active = true;
    const run = async () => {
      if (!active) return;
      await load();
    };
    void run();
    return () => {
      active = false;
    };
  }, [load]);

  const errors = useMemo(
    () => (draft ? Object.fromEntries(SETTINGS_SECTIONS.map((s) => [s, validateSection(s, draft[s])])) : {}),
    [draft]
  );
  const dirtyBySection = useMemo(
    () => (draft && saved ? Object.fromEntries(SETTINGS_SECTIONS.map((s) => [s, !same(draft[s], saved[s])])) : {}),
    [draft, saved]
  );
  const dirty = Object.values(dirtyBySection).some(Boolean);
  const errorCount = Object.values(errors).reduce((n, e) => n + Object.keys(e).length, 0);

  const update = useCallback((section, patch) => {
    setDraft((d) => ({ ...d, [section]: { ...d[section], ...patch } }));
  }, []);

  const updateTemplate = useCallback((id, patch) => {
    setDraft((d) => ({
      ...d,
      email: { ...d.email, templates: d.email.templates.map((t) => (t.id === id ? { ...t, ...patch } : t)) },
    }));
  }, []);

  /** Returns { ok, changed } | { ok:false, invalidSection } | { ok:false, error } */
  const save = useCallback(async () => {
    if (!dirty) return { ok: true, changed: [] };
    const invalidSection = SETTINGS_SECTIONS.find((s) => Object.keys(errors[s]).length > 0);
    if (invalidSection) return { ok: false, invalidSection };
    setSaving(true);
    try {
      const r = await saveSettings(draft, { expectedVersion: version });
      setSaved(r.values);
      setDraft(clone(r.values));
      setVersion(r.version);
      return { ok: true, changed: r.changed };
    } catch (err) {
      return { ok: false, error: err };
    } finally {
      setSaving(false);
    }
  }, [dirty, errors, draft, version]);

  const discard = useCallback(() => setDraft(clone(saved)), [saved]);

  /** Maintenance is applied immediately and is independent of the draft. */
  const toggleMaintenance = useCallback(async (enabled) => {
    const r = await setMaintenance({ enabled });
    setMaintenanceState(r.maintenance);
    return r.maintenance;
  }, []);

  return {
    phase, error, reload: load, source,
    values: draft, saved, errors, dirtyBySection, dirty, errorCount,
    saving, update, updateTemplate, save, discard,
    maintenance, toggleMaintenance,
  };
}