import { ADMIN_CONFIG } from "@/lib/admin/config";
import { request, ApiError } from "./_core";
import { institutionStore } from "@/lib/mock/admin/institutions";
import { addAuditEvent } from "@/lib/mock/admin/auditEvents";
import { emptyValues, validateStep, stepProgress, ONBOARDING_STEPS } from "@/lib/admin/onboardingSteps";
import { slug as slugRule } from "@/lib/admin/validation";

const RESERVED = ["www", "admin", "api", "app", "mail", "support", "status", "platform", "skul", "dashboard", "login"];
const drafts = new Map(); // in-memory (mock only)

const pad = (n) => String(n).padStart(3, "0");

function nextCode(name) {
  const stop = new Set(["of", "the", "and", "for"]);
  let abbr = name
    .split(/\s+/)
    .filter((w) => w && !stop.has(w.toLowerCase()))
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 5);
  if (abbr.length < 2) abbr = name.replace(/[^a-zA-Z]/g, "").slice(0, 3).toUpperCase() || "INS";
  const used = new Set(institutionStore.items.map((i) => i.code));
  let seq = Math.max(0, ...institutionStore.items.map((i) => Number(i.code.split("-")[1]) || 0)) + 1;
  while (used.has(`${abbr}-${pad(seq)}`)) seq++;
  return `${abbr}-${pad(seq)}`;
}

function slugState(value, institutionId) {
  if (slugRule(value)) return { status: "invalid", message: slugRule(value) };
  if (RESERVED.includes(value)) return { status: "reserved", message: "This slug is reserved." };
  const taken = institutionStore.items.some((i) => i.slug === value && i.id !== institutionId);
  return taken ? { status: "taken", message: "This slug is already in use." } : { status: "available", message: "available" };
}

const findDraft = (id) => {
  const d = drafts.get(id);
  if (!d) throw new ApiError("Onboarding draft not found.", { status: 404 });
  return d;
};

export function createDraft() {
  return request({ path: "/onboarding/drafts", method: "POST" }, () => {
    const draft = { id: `draft_${Date.now().toString(36)}`, institutionId: null, currentStep: 1, furthestStep: 1, values: emptyValues(), updatedAt: Date.now() };
    drafts.set(draft.id, draft);
    return { draft };
  });
}

export function getDraft(id) {
  return request({ path: `/onboarding/drafts/${id}` }, () => ({ draft: findDraft(id) }));
}

// Placeholder values for earlier steps of seeded onboarding institutions (SAMPLE data).
function seedValues(inst) {
  const v = emptyValues();
  v.info = { name: inst.name, institutionType: inst.type || "federal", region: inst.region, state: inst.state, officialEmail: inst.slug ? `info@${inst.slug}.edu.ng` : "" };
  v.tenant = { ...v.tenant, code: inst.code, slug: inst.slug };
  const step = inst.onboardingStep || 1;
  if (step > 3) v.branding.displayName = inst.name;
  if (step > 4) v.admin = { fullName: "Registry Administrator", email: `registry@${inst.slug || "institution"}.edu.ng`, title: "Registrar", sendInvite: true };
  if (step > 6) v.imports.files = [{ type: "academic_structure", fileName: `${inst.slug || "institution"}_structure.csv`, rows: 64 }];
  return v;
}

/** Resume onboarding for an institution already in the list (e.g. the Step 2 reference screen for UI-001). */
export function openDraftForInstitution(institutionId) {
  return request({ path: `/onboarding/institutions/${institutionId}` }, () => {
    const existing = [...drafts.values()].find((d) => d.institutionId === institutionId);
    if (existing) return { draft: existing };
    const inst = institutionStore.items.find((i) => i.id === institutionId);
    if (!inst) throw new ApiError("Institution not found.", { status: 404 });
    if (inst.status !== "onboarding") throw new ApiError("This institution has already completed onboarding.");
    const step = inst.onboardingStep || 1;
    const draft = { id: `draft_${inst.id}`, institutionId, currentStep: step, furthestStep: step, values: seedValues(inst), updatedAt: Date.now() };
    drafts.set(draft.id, draft);
    return { draft };
  });
}


export async function checkSlug(value, { draftId } = {}) {
  // Keep the existing sample workflow available.
  if (ADMIN_CONFIG.onboardingUseMock) {
    if (ADMIN_CONFIG.useMock) {
      return request(
        {
          path: "/onboarding/slug-check",
          query: { slug: value, draftId },
        },
        () => {
          const draft = draftId ? drafts.get(draftId) : null;
          return slugState(value, draft?.institutionId);
        }
      );
    }

    // Preserve onboarding mock behaviour even if other admin
    // modules have been switched to live mode.
    const draft = draftId ? drafts.get(draftId) : null;
    return {
      ...slugState(value, draft?.institutionId),
      source: "mock",
    };
  }

  // Reject invalid and reserved slugs before querying Laravel.
  const validationMessage = slugRule(value);

  if (validationMessage) {
    return {
      status: "invalid",
      message: validationMessage,
      source: "live",
    };
  }

  if (RESERVED.includes(value.toLowerCase())) {
    return {
      status: "reserved",
      message: "This slug is reserved.",
      source: "live",
    };
  }

  const params = new URLSearchParams({ slug: value });

  const response = await fetch(
    `/api/platform/institutions/slug-check?${params.toString()}`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
      credentials: "same-origin",
      cache: "no-store",
    }
  );

  let result;

  try {
    result = await response.json();
  } catch {
    throw new ApiError("The backend returned an invalid slug-check response.", {
      status: response.status,
    });
  }

  if (!response.ok || result.success === false) {
    throw new ApiError(
      result.message ||
        result.error?.message ||
        "Could not check tenant slug availability.",
      { status: response.status }
    );
  }

  const available = result.data?.available;

  if (typeof available !== "boolean") {
    throw new ApiError(
      "The backend response did not include slug availability.",
      { status: response.status }
    );
  }

  return {
    status: available ? "available" : "taken",
    message: available
      ? "This slug is available."
      : "This slug is already in use.",
    source: "live",
  };
}


/**
 * Persists the draft and keeps the institution list in sync.
 * The institution record is created on the first save that has a name (so it shows up in the list as "Onboarding").
 */
export function saveDraft(draft, { completedStep } = {}) {
  return request({ path: `/onboarding/drafts/${draft.id}`, method: "PUT", body: draft }, () => {
    const d = JSON.parse(JSON.stringify(draft));
    d.updatedAt = Date.now();
    d.furthestStep = Math.max(d.furthestStep || 1, d.currentStep);
    const name = d.values.info.name.trim();

    let inst = d.institutionId ? institutionStore.items.find((i) => i.id === d.institutionId) : null;
    if (!inst && name) {
      const code = d.values.tenant.code || nextCode(name);
      d.values.tenant.code = code;
      inst = {
        id: `inst_${Date.now().toString(36)}`,
        name, abbr: code.split("-")[0], code, slug: "", status: "onboarding", students: null, lecturers: null,
        progress: 0, onboardingStep: 1, region: "", state: "", type: "federal",
      };
      institutionStore.items.unshift(inst);
      d.institutionId = inst.id;
    }
    if (inst) {
      inst.name = name || inst.name;
      inst.slug = d.values.tenant.slug;
      inst.region = d.values.info.region || inst.region;
      inst.state = d.values.info.state || inst.state;
      inst.type = d.values.info.institutionType || inst.type;
      inst.onboardingStep = d.currentStep;
      inst.progress = stepProgress(d.currentStep);
    }
    if (completedStep && inst) {
      const label = ONBOARDING_STEPS[completedStep - 1].label;
      addAuditEvent({ category: "onboarding", scope: "institution", institution: inst, title: "Onboarding Step Completed", detail: `Finalized '${label}' (Step ${completedStep} of 9)` });
    }
    drafts.set(d.id, d);
    return { draft: d };
  });
}

/** Mock pre-activation validation. */
export function runValidation(values) {
  return request({ path: "/onboarding/validate", method: "POST", body: values }, () => {
    const errors = [];
    const warnings = [];
    const draftInstId = [...drafts.values()].find((d) => d.values.tenant.code === values.tenant.code)?.institutionId;
    const slugResult = slugState(values.tenant.slug, draftInstId);
    if (slugResult.status !== "available") errors.push({ field: "tenant.slug", message: slugResult.message });
    if (!values.admin.email) errors.push({ field: "admin.email", message: "Initial administrator email is missing." });
    if (!values.branding.logoFileName) warnings.push({ field: "branding.logo", message: "No logo attached. A default SKUL mark will be used." });
    if (values.method.choice === "import" && values.imports.files.some((f) => (f.rows ?? 0) > 5000))
      warnings.push({ field: "imports", message: "Large file detected. The first import may take several minutes." });
    if (values.tenant.legacyImport) warnings.push({ field: "tenant.legacyImport", message: "Legacy import mode relaxes ID format checks." });
    const checked = values.imports.files.reduce((n, f) => n + (f.rows ?? 0), 0);
    return { validation: { ranAt: Date.now(), checked, errors, warnings } };
  });
}

export async function activateDraft(draftId) {
  const d = findDraft(draftId);

  // Validate all nine steps before activation.
  const problems = {};

  for (let n = 1; n <= 9; n++) {
    const first = Object.values(validateStep(n, d.values)).find(Boolean);
    if (first) problems[`step${n}`] = first;
  }

  if (Object.keys(problems).length) {
    throw new ApiError("Complete every step before activating.", {
      fields: problems,
    });
  }

  // Preserve the existing mock activation.
  if (ADMIN_CONFIG.onboardingUseMock) {
    return request(
      {
        path: `/onboarding/drafts/${draftId}/activate`,
        method: "POST",
      },
      () => {
        const inst = institutionStore.items.find(
          (i) => i.id === d.institutionId
        );

        if (!inst) {
          throw new ApiError("Institution record missing.", {
            status: 404,
          });
        }

        inst.status = "active";
        inst.progress = 100;
        inst.onboardingStep = null;
        inst.students = 0;
        inst.lecturers = 0;

        addAuditEvent({
          category: "onboarding",
          scope: "institution",
          institution: inst,
          title: "Institution Activated",
          detail: "Tenant provisioned and initial admin invited",
        });

        return { institution: inst };
      }
    );
  }

  // Build the payload using fields that actually exist in the wizard.
  const { info, tenant, branding, admin } = d.values;

  const payload = {
    name: info.name.trim(),
    short_name: branding.displayName?.trim() || null,
    code: tenant.code.trim(),
    slug: tenant.slug.trim(),
    email: info.officialEmail?.trim() || null,
    primary_color: branding.primaryColor || null,
    accent_color: branding.accentColor || null,
    status: "active",
    admin: {
      username: admin.username.trim(),
      password: admin.password,
    },
  };

  const response = await fetch("/api/platform/institutions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify(payload),
  });

  let result;

  try {
    result = await response.json();
  } catch {
    throw new ApiError("The backend returned an invalid response.", {
      status: response.status,
    });
  }

  if (!response.ok || result.success === false) {
    const validationErrors = result.errors || {};
    const fields = {};

    for (const [key, messages] of Object.entries(validationErrors)) {
      fields[key] = Array.isArray(messages)
        ? messages[0]
        : String(messages);
    }

    throw new ApiError(
      result.message ||
        result.error?.message ||
        "Could not create the institution.",
      {
        status: response.status,
        fields,
      }
    );
  }

  const institution = result.data?.institution;

  if (!institution) {
    throw new ApiError(
      "The backend response did not include the created institution.",
      { status: response.status }
    );
  }

  return {
    institution: {
      ...institution,
      progress: 100,
      onboardingStep: null,
      source: "live",
    },
    admin: result.data.admin,
  };
}
