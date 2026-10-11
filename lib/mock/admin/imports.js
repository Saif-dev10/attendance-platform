import { buildCsv } from "@/lib/admin/csv";

const MIN = 60000;
const NOW = Date.now();

export const IMPORT_TYPES = [
  { value: "all", label: "All Import Types" },
  { value: "students", label: "Students Import" },
  { value: "lecturers", label: "Lecturers Import" },
  { value: "academic_structure", label: "Academic Structure" },
];
export const importTypeLabel = (t) => IMPORT_TYPES.find((x) => x.value === t)?.label ?? t;

export const IMPORT_TEMPLATES = {
  students: { fileName: "students_template.csv", headers: ["matric_number", "full_name", "email", "programme", "level"], sample: ["21/CSC/042", "Zainab Usman", "z.usman@buk.edu.ng", "B.Sc. Computer Science", "300"] },
  lecturers: { fileName: "lecturers_template.csv", headers: ["staff_id", "full_name", "email", "department_code", "rank"], sample: ["STF0001", "Dr. Amina Sani", "a.sani@buk.edu.ng", "CSC", "Senior Lecturer"] },
  academic_structure: { fileName: "academic_structure_template.csv", headers: ["faculty_code", "faculty_name", "department_code", "department_name", "programme_name"], sample: ["FOC", "Faculty of Computing", "CSC", "Computer Science", "B.Sc. Computer Science"] },
};
export const buildTemplateCsv = (type) => {
  const t = IMPORT_TEMPLATES[type];
  return buildCsv(t.headers, [t.sample]);
};

/* ---- Deterministic error generation (mock) ---- */
const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const rng = (seed) => {
  let s = seed;
  return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
};

const ERROR_TEMPLATES = {
  students: [
    ["matric_number", "Invalid matriculation format (expected YY/DEP/NNN)", (r) => `${10 + Math.floor(r() * 14)}-CSC-${100 + Math.floor(r() * 800)}`],
    ["email", "Email address is already registered", (r) => `student${Math.floor(r() * 900)}@institution.edu.ng`],
    ["level", "Level must be between 100 and 400", (r) => String(500 + Math.floor(r() * 5) * 100)],
    ["programme", "Programme not found in academic structure", (r) => `PRG-${Math.floor(r() * 99)}`],
  ],
  lecturers: [
    ["staff_id", "Staff ID does not match the standard format", (r) => `STF${Math.floor(r() * 9999)}`],
    ["email", "Invalid email address", (r) => `lecturer${Math.floor(r() * 99)}.example.com`],
    ["department_code", "Department code not found", (r) => `DPT${Math.floor(r() * 99)}`],
    ["rank", "Unrecognised academic rank", () => "Prof (Hon)"],
  ],
  academic_structure: [
    ["department_code", "Duplicate department code in file", (r) => `D${Math.floor(r() * 90)}`],
    ["faculty_code", "Parent faculty not found", (r) => `FX${Math.floor(r() * 90)}`],
    ["programme_name", "Programme name is required", () => ""],
  ],
};

/** Builds up to 200 stored error rows for a job (the full count lives on job.failed). */
export function buildErrors({ id, type, total }, count) {
  const r = rng(hash(id));
  const n = Math.min(count, 200);
  const templates = ERROR_TEMPLATES[type];
  return Array.from({ length: n }, (_, i) => {
    const [field, message, valueFn] = templates[Math.floor(r() * templates.length)];
    return { id: `${id}_e${i}`, row: 2 + Math.floor(((i + 1) * total) / (n + 1)), field, value: valueFn(r), message };
  });
}

/* ---- Seed jobs ---- */
const inst = {
  ui: { id: "inst_ui", name: "University of Ibadan", code: "UI-001" },
  abu: { id: "inst_abu", name: "Ahmadu Bello University", code: "ABU-002" },
  buk: { id: "inst_buk", name: "Bayero University Kano", code: "BUK-001" },
  lgx: { id: "inst_lgx", name: "University of Lagos", code: "LGX-004" },
  uab: { id: "inst_uab", name: "University of Abuja", code: "UAB-003" },
  del: { id: "inst_del", name: "Delta State University", code: "DEL-005" },
};

// [id, institution, fileName, type, status, total, success, failed, uploadedBy, minutesAgo, sizeKb]
const SEED = [
  ["imp_1001", inst.ui, "students_2025_batch_a.csv", "students", "validating", 2450, 0, 0, "Musa Bello", 18, 412],
  ["imp_1002", inst.abu, "abu_lecturers_v2.xlsx", "lecturers", "failed", 412, 284, 128, "Sarah J.", 1700, 96],
  ["imp_1003", inst.buk, "eng_dept_structure.csv", "academic_structure", "completed_with_errors", 85, 82, 3, "System Admin", 3100, 14],
  ["imp_1004", inst.buk, "students_main_2024.csv", "students", "completed", 4120, 4120, 0, "Musa Bello", 5200, 702],
  ["imp_1005", inst.lgx, "lecturers_unilag.xlsx", "lecturers", "completed", 2480, 2480, 0, "Sarah J.", 7400, 388],
  ["imp_1006", inst.uab, "uab_faculties.csv", "academic_structure", "completed", 64, 64, 0, "System Admin", 9800, 9],
  ["imp_1007", inst.del, "delsu_students_q3.csv", "students", "failed", 1890, 1402, 488, "Musa Bello", 12600, 301],
  ["imp_1008", inst.abu, "abu_students_2024.csv", "students", "completed_with_errors", 6310, 6244, 66, "Sarah J.", 15000, 1020],
  ["imp_1009", inst.lgx, "unilag_departments.csv", "academic_structure", "completed", 118, 118, 0, "System Admin", 20000, 17],
  ["imp_1010", inst.buk, "buk_lecturers_new.csv", "lecturers", "completed", 96, 96, 0, "Musa Bello", 26000, 22],
];

const jobs = SEED.map(([id, institution, fileName, type, status, total, success, failed, uploadedBy, ago, sizeKb]) => ({
  id, institution, fileName, type, status, total, success, failed, uploadedBy, sizeKb,
  uploadedAt: NOW - ago * MIN,
  attempts: 0,
}));

export const importStore = {
  jobs,
  errors: Object.fromEntries(jobs.filter((j) => j.failed > 0).map((j) => [j.id, buildErrors(j, j.failed)])),
  // Summary base from the reference. The queue lists only recent jobs; these are platform-wide SAMPLE totals.
  base: { total: 1248, success: 1180, failed: 32, processing: 6 },
  delta: { total: 0, success: 0, failed: 0, processing: 0 },
};