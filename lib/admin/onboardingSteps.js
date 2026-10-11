import * as v from "./validation";

/* ---- Option lists ---- */
export const INSTITUTION_TYPES = [
  { value: "federal", label: "Federal University" },
  { value: "state", label: "State University" },
  { value: "private", label: "Private University" },
];
export const REGIONS = ["North West", "North East", "North Central", "South West", "South South", "South East"];
export const SESSION_TYPES = [
  { value: "2-semesters", label: "2 Semesters (Standard Academic Year)" },
  { value: "3-trimesters", label: "3 Trimesters" }, // inferred option
  { value: "4-quarters", label: "4 Quarters" }, // inferred option
];
export const STORAGE_REGIONS = [
  { value: "ng-lagos", label: "Nigeria (Lagos - AWS af-south-1)" },
  { value: "eu-ireland", label: "Europe (Ireland - AWS eu-west-1)" }, // inferred option
];
export const SETUP_METHODS = [
  { value: "import", label: "Bulk import", description: "Upload CSV or XLSX files for academic structure, lecturers and students." },
  { value: "manual", label: "Manual setup", description: "Build the academic structure by hand from the institution dashboard after activation." },
  { value: "later", label: "Decide later", description: "Activate now and load academic data when the institution is ready." },
];
export const IMPORT_FILE_TYPES = [
  { value: "academic_structure", label: "Academic structure" },
  { value: "lecturers", label: "Lecturers" },
  { value: "students", label: "Students" },
];

/* ---- Steps ---- */
export const ONBOARDING_STEPS = [
  { n: 1, key: "info", label: "Institution Info", title: "Step 1: Institution Information", intro: "Basic details used to identify the institution on the platform." },
  { n: 2, key: "tenant", label: "Tenant Setup", title: "Step 2: Tenant Configuration" },
  { n: 3, key: "branding", label: "Branding", title: "Step 3: Branding", intro: "How the institution appears to its students, lecturers and administrators." },
  { n: 4, key: "admin", label: "Initial Admin", title: "Step 4: Initial Administrator", intro: "The first user who will manage this institution's dashboard." },
  { n: 5, key: "method", label: "Setup Method", title: "Step 5: Setup Method", intro: "Choose how academic data will be loaded for this tenant." },
  { n: 6, key: "imports", label: "Data Import", title: "Step 6: Data Import", intro: "Attach the files that will seed this institution." },
  { n: 7, key: "validation", label: "Validation", title: "Step 7: Validation", intro: "Run pre-activation checks on the configuration and attached files." },
  { n: 8, key: "readiness", label: "Readiness", title: "Step 8: Readiness Review", intro: "Review the checklist before activation." },
  { n: 9, key: "activation", label: "Activation", title: "Step 9: Activation", intro: "Go live and notify the initial administrator." },
];
export const TOTAL_STEPS = ONBOARDING_STEPS.length;
export const getStep = (n) => ONBOARDING_STEPS.find((s) => s.n === Number(n));
export const stepProgress = (n) => Math.round((n / TOTAL_STEPS) * 100);
export const continueLabel = (n) =>
  n >= TOTAL_STEPS ? "Activate Institution" : `Continue to ${ONBOARDING_STEPS[n].label}`;

/* ---- Values ---- */
export function emptyValues() {
  return {
    info: { name: "", institutionType: "federal", region: "", state: "", officialEmail: "" },
    tenant: { code: "", slug: "", sessionType: "2-semesters", storageRegion: "ng-lagos", strictEnrolment: true, legacyImport: false },
    branding: { displayName: "", primaryColor: "#071a33", accentColor: "#f5c400", logoFileName: "" },
    admin: { fullName: "", email: "", title: "", sendInvite: true },
    method: { choice: "import" },
    imports: { files: [] }, // [{ type, fileName, rows }]  rows may be null (e.g. XLSX not parsed in browser)
    validation: { ranAt: null, checked: 0, errors: [], warnings: [] },
    readiness: { acknowledged: false },
    activation: { confirmed: false, mode: "immediate", date: "" },
  };
}

const HEX = /^#[0-9a-fA-F]{6}$/;

/** Returns { fieldName: message } for the step. Empty object means valid. `ctx.slugStatus` comes from the async availability check. */
export function validateStep(n, values, ctx = {}) {
  const e = {};
  switch (Number(n)) {
    case 1: {
      const { name, region, state, officialEmail } = values.info;
      e.name = v.required(name, "Institution name") || (name.trim().length < 3 ? "Name must be at least 3 characters." : "");
      e.region = v.required(region, "Region");
      e.state = v.required(state, "State");
      e.officialEmail = v.email(officialEmail);
      break;
    }
    case 2: {
      e.slug = v.slug(values.tenant.slug);
      if (!e.slug && ctx.slugStatus === "taken") e.slug = "This slug is already in use.";
      if (!e.slug && ctx.slugStatus === "reserved") e.slug = "This slug is reserved.";
      e.code = v.required(values.tenant.code, "Institution code");
      break;
    }
    case 3: {
      e.displayName = v.required(values.branding.displayName, "Display name");
      if (!HEX.test(values.branding.primaryColor)) e.primaryColor = "Use a 6-digit hex colour.";
      if (!HEX.test(values.branding.accentColor)) e.accentColor = "Use a 6-digit hex colour.";
      break;
    }
    case 4: {
      e.fullName = v.required(values.admin.fullName, "Full name");
      e.email = v.email(values.admin.email);
      e.title = v.required(values.admin.title, "Job title");
      break;
    }
    case 5:
      e.choice = v.required(values.method.choice, "Setup method");
      break;
    case 6:
      if (values.method.choice === "import" && values.imports.files.length === 0)
        e.files = "Attach at least one import file, or change the setup method.";
      break;
    case 7:
      if (!values.validation.ranAt) e.validation = "Run validation before continuing.";
      else if (values.validation.errors.length > 0)
        e.validation = `Resolve ${values.validation.errors.length} blocking error(s), then run validation again.`;
      break;
    case 8:
      if (!values.readiness.acknowledged) e.acknowledged = "Confirm you have reviewed the checklist.";
      break;
    case 9:
      if (!values.activation.confirmed) e.confirmed = "Confirm that you want to activate this institution.";
      if (values.activation.mode === "scheduled") e.date = v.required(values.activation.date, "Activation date");
      break;
  }
  return Object.fromEntries(Object.entries(e).filter(([, msg]) => msg));
}

export function computeReadiness(values) {
  const { info, tenant, branding, admin, method, imports, validation } = values;
  const importSkipped = method.choice !== "import";
  return [
    { key: "identity", label: "Institution identity", ok: !!(info.name && info.region), detail: info.name || "Missing" },
    { key: "tenant", label: "Tenant URL reserved", ok: !!tenant.slug, detail: tenant.slug ? `${tenant.slug}.skul.edu.ng` : "Missing slug" },
    { key: "branding", label: "Branding configured", ok: !!branding.displayName, detail: branding.displayName || "Missing" },
    { key: "admin", label: "Initial administrator", ok: !!(admin.fullName && admin.email), detail: admin.email || "Missing" },
    {
      key: "data",
      label: "Academic data",
      ok: importSkipped || imports.files.length > 0,
      detail: importSkipped ? "Skipped by chosen setup method" : `${imports.files.length} file(s) attached`,
    },
    {
      key: "validation",
      label: "Pre-activation validation",
      ok: !!validation.ranAt && validation.errors.length === 0,
      detail: validation.ranAt ? `${validation.errors.length} error(s), ${validation.warnings.length} warning(s)` : "Not run",
    },
  ];
}