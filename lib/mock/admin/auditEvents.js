const MIN = 60000;
const NOW = Date.now();

function rng(seed) {
  let s = seed;
  return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
}
const pick = (r, arr) => arr[Math.floor(r() * arr.length)];

const INSTS = [
  { name: "Bayero University Kano", code: "BUK-001" },
  { name: "University of Ibadan", code: "UI-001" },
  { name: "Ahmadu Bello University", code: "ABU-002" },
  { name: "University of Abuja", code: "UAB-003" },
  { name: "University of Lagos", code: "LGX-004" },
  { name: "Delta State University", code: "DEL-005" },
];
const ACTORS = ["Adewale O.", "Sarah Jenker", "Musa Bello", "Chioma Eze", "Ibrahim Danjuma", "Ngozi Okafor"];
const CITIES = ["Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt"];
const STEPS = ["Institution Info", "Tenant Setup", "Branding", "Initial Admin", "Setup Method", "Data Import", "Validation", "Readiness", "Activation"];
const TYPES = ["Academic Structure", "Students", "Lecturers"];

export const AUDIT_CATEGORIES = [
  { value: "all", label: "All Actions" },
  { value: "auth", label: "Authentication" },
  { value: "onboarding", label: "Onboarding" },
  { value: "import", label: "Data Imports" },
  { value: "config", label: "Configuration" },
  { value: "user", label: "User Management" },
  { value: "system", label: "System" },
];

const TEMPLATES = [
  { category: "auth", scope: "global", title: "Admin Login Succeeded", detail: (r) => `Login from ${pick(r, CITIES)}, NG (102.89.x.x)`, results: ["success", "success", "success"] },
  { category: "auth", scope: "global", title: "Failed Login Attempt", detail: (r) => `${2 + Math.floor(r() * 4)} consecutive failures from ${pick(r, CITIES)}, NG`, results: ["warning", "failure"] },
  { category: "onboarding", scope: "institution", title: "Onboarding Step Completed", detail: (r) => { const n = 1 + Math.floor(r() * 8); return `Finalized '${STEPS[n - 1]}' (Step ${n} of 9)`; }, results: ["success"] },
  { category: "onboarding", scope: "institution", title: "Institution Activated", detail: () => "Tenant provisioned and initial admin invited", results: ["success"] },
  { category: "import", scope: "institution", title: "Import Completed", detail: (r) => `${40 + Math.floor(r() * 4000)} records imported for '${pick(r, TYPES)}'`, results: ["success", "success"] },
  { category: "import", scope: "institution", title: "Partial Import Success", detail: (r) => { const t = 50 + Math.floor(r() * 400); const f = 1 + Math.floor(r() * 9); return `${t - f} of ${t} records imported for '${pick(r, TYPES)}'`; }, results: ["warning"] },
  { category: "import", scope: "institution", title: "Import Failed", detail: (r) => `${20 + Math.floor(r() * 200)} validation errors blocked the import`, results: ["failure"] },
  { category: "config", scope: "system", title: "Global Storage Limit Updated", detail: () => "Primary cluster cap increased to 2TB", results: ["success"] },
  { category: "config", scope: "global", title: "Global Policy Updated", detail: () => "Default max course credit changed", results: ["success"] },
  { category: "user", scope: "institution", title: "Admin Account Created", detail: (r) => `Invitation sent to ${pick(r, ACTORS).toLowerCase().replace(/[^a-z]/g, ".")}@institution.edu.ng`, results: ["success"] },
  { category: "user", scope: "global", title: "Role Permissions Changed", detail: () => "Platform Admin role scope modified", results: ["warning", "success"] },
  { category: "system", scope: "system", title: "Database Backup Completed", detail: () => "Nightly snapshot verified (128 GB)", results: ["success"] },
  { category: "system", scope: "system", title: "Gateway Timeout Spike", detail: () => "Payment gateway returned 504 errors", results: ["warning", "failure"] },
];

const REFERENCE = [
  { id: "aud_0001", category: "auth", scope: "global", title: "Admin Login Succeeded", detail: "Login from Lagos, NG (102.89.x.x)", institution: null, actor: { name: "Adewale O.", type: "admin" }, result: "success", at: NOW },
  { id: "aud_0002", category: "onboarding", scope: "institution", title: "Onboarding Step Completed", detail: "Finalized 'Tenant Setup' (Step 2 of 9)", institution: INSTS[1], actor: { name: "Sarah Jenker", type: "admin" }, result: "success", at: NOW - 12 * MIN },
  { id: "aud_0003", category: "import", scope: "institution", title: "Partial Import Success", detail: "82 of 85 records imported for 'Academic Structure'", institution: INSTS[0], actor: { name: "Musa Bello", type: "admin" }, result: "warning", at: NOW - 60 * MIN },
  { id: "aud_0004", category: "config", scope: "system", title: "Global Storage Limit Updated", detail: "Primary cluster cap increased to 2TB", institution: null, actor: { name: "System Root", type: "system" }, result: "success", at: NOW - 240 * MIN },
];

function generate(count) {
  const r = rng(20241012);
  const out = [];
  let minutes = 240;
  for (let i = 0; i < count; i++) {
    minutes += 4 + Math.floor(r() * 110);
    const t = pick(r, TEMPLATES);
    let result = pick(r, t.results);
    if (result === "failure" && minutes <= 1440) result = "warning"; // keep the last 24h free of anomalies, matching the reference
    out.push({
      id: `aud_${String(i + 5).padStart(4, "0")}`,
      category: t.category,
      scope: t.scope,
      title: t.title,
      detail: t.detail(r),
      institution: t.scope === "institution" ? pick(r, INSTS) : null,
      actor: t.scope === "system" ? { name: "System Root", type: "system" } : { name: pick(r, ACTORS), type: "admin" },
      result,
      at: NOW - minutes * MIN,
    });
  }
  return out;
}

// Newest first. Mutable in-memory store.
export const auditStore = { events: [...REFERENCE, ...generate(360)] };

/** Other mock services call this so real mock actions appear in the Activity Log. */
export function addAuditEvent({ category, title, detail, scope = "global", institution = null, actor = "Adewale O.", result = "success" }) {
  const event = {
    id: `aud_${Date.now()}_${auditStore.events.length}`,
    category,
    scope,
    title,
    detail,
    institution: institution ? { name: institution.name, code: institution.code } : null,
    actor: { name: actor, type: actor === "System Root" ? "system" : "admin" },
    result,
    at: Date.now(),
  };
  auditStore.events.unshift(event);
  return event;
}

// Platform-wide daily volume shown in the header strip. SAMPLE VALUE, not computed from the list above.
export const MOCK_DAILY_EVENTS = 12402;