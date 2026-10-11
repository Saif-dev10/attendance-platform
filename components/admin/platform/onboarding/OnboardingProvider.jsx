"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { createDraft, openDraftForInstitution, saveDraft, checkSlug, activateDraft } from "@/lib/services/admin/onboardingService";
import { emptyValues, validateStep, computeReadiness } from "@/lib/admin/onboardingSteps";
import { slug as slugRule } from "@/lib/admin/validation";

const Ctx = createContext(null);
export function useOnboarding() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useOnboarding must be used inside <OnboardingProvider>");
  return c;
}

// Editing any of these invalidates a previous validation run and the readiness/activation confirmations.
const RESET_ON = ["info", "tenant", "branding", "admin", "method", "imports"];

/**
 * Holds the whole onboarding draft in one place. Because it is mounted in the onboarding layout,
 * values survive navigation between steps (Previous, Continue, sidebar links).
 */
export function OnboardingProvider({ children }) {
  const [draft, setDraft] = useState(null);
  const [phase, setPhase] = useState("idle"); // idle | loading | ready | error
  const [loadError, setLoadError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState({});
  const [slugStatus, setSlugStatus] = useState("idle"); // idle | checking | available | taken | reserved | invalid

  const start = useCallback(async (institutionId) => {
    setPhase("loading");
    setLoadError(null);
    try {
      const { draft: d } = institutionId ? await openDraftForInstitution(institutionId) : await createDraft();
      setDraft(d);
      setPhase("ready");
      return d;
    } catch (err) {
      setLoadError(err);
      setPhase("error");
      return null;
    }
  }, []);

  /* Debounced slug availability check */
  const slug = draft?.values.tenant.slug;
  const draftId = draft?.id;
  useEffect(() => {
    if (!draftId) return undefined;

    let cancelled = false;
    let checkTimer = null;
    const start = () => {
      if (!slug) {
        setSlugStatus("idle");
        return;
      }
      if (slugRule(slug)) {
        setSlugStatus("invalid");
        return;
      }
      setSlugStatus("checking");
      checkTimer = setTimeout(async () => {
        if (cancelled) return;
        try {
          const r = await checkSlug(slug, { draftId });
          if (!cancelled) setSlugStatus(r.status);
        } catch {
          if (!cancelled) setSlugStatus("idle");
        }
      }, 400);
    };

    const timer = setTimeout(() => {
      if (!cancelled) start();
    }, 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (checkTimer) clearTimeout(checkTimer);
    };
  }, [slug, draftId]);

  const setValues = useCallback((section, patch) => {
    setDraft((d) => {
      const values = { ...d.values, [section]: { ...d.values[section], ...patch } };
      if (RESET_ON.includes(section)) {
        values.validation = emptyValues().validation;
        values.readiness = { acknowledged: false };
        values.activation = { ...values.activation, confirmed: false };
      }
      return { ...d, values };
    });
    setErrors((e) => {
      const n = { ...e };
      Object.keys(patch).forEach((k) => delete n[k]);
      delete n.validation;
      delete n.checklist;
      return n;
    });
  }, []);

  const validate = useCallback(
    (n) => {
      const d = draft;
      if (!d) return {};
      const errs = validateStep(n, d.values, { slugStatus });
      if (n === 2 && !errs.slug && slugStatus === "checking") errs.slug = "Still checking availability. Try again in a moment.";
      if (n === 8 && computeReadiness(d.values).some((i) => !i.ok)) errs.checklist = "Complete every checklist item before continuing.";
      return errs;
    },
    [draft, slugStatus]
  );

  const persist = useCallback(async (patch, opts) => {
    setBusy(true);
    try {
      const current = draft;
      const { draft: d } = await saveDraft({ ...current, ...patch }, opts);
      setDraft(d);
      return d;
    } finally {
      setBusy(false);
    }
  }, [draft]);

  /** Validate step n, save, and advance the draft. Returns { ok }. */
  const next = useCallback(
    async (n) => {
      const errs = validate(n);
      if (Object.keys(errs).length) {
        setErrors(errs);
        return { ok: false };
      }
      setErrors({});
      const d = draft;
      await persist(
        { currentStep: n + 1, furthestStep: Math.max(d.furthestStep, n + 1) },
        n >= d.furthestStep ? { completedStep: n } : undefined // log "step completed" only the first time
      );
      return { ok: true };
    },
    [draft, validate, persist]
  );

  const saveExit = useCallback(
    async (viewStep) => {
      if (!draft?.values.info.name.trim()) return { saved: false };
      await persist({ currentStep: viewStep });
      return { saved: true };
    },
    [draft, persist]
  );

  /** Returns the activated institution, or null if validation failed (errors are set). Throws on service errors. */
  const activate = useCallback(async () => {
    const errs = validate(9);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return null;
    }
    setErrors({});
    const d = await persist({ currentStep: 9, furthestStep: 9 });
    setBusy(true);
    try {
      const r = await activateDraft(d.id);
      return r.institution;
    } finally {
      setBusy(false);
    }
  }, [validate, persist]);

  const value = {
    draft,
    values: draft?.values,
    phase,
    loadError,
    busy,
    errors,
    slugStatus,
    start,
    setValues,
    next,
    saveExit,
    activate,
    clearErrors: useCallback(() => setErrors({}), []),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}