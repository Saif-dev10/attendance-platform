import { request, ApiError } from "./_core";
import { studentStore, PROGRAMMES, UG_LEVELS, PG_LEVELS } from "@/lib/mock/admin/students";
import { addUniversityActivity } from "@/lib/mock/admin/universityMetrics";
import * as v from "@/lib/admin/validation";

export { PROGRAMMES, UG_LEVELS, PG_LEVELS };

const norm = (s) => String(s ?? "").toLowerCase();
const findProgramme = (text) => PROGRAMMES.find((p) => norm(p.id) === norm(text) || norm(p.name) === norm(text));

function normaliseLevel(prog, level) {
  if (!prog) return null;
  if (prog.type === "undergraduate") return UG_LEVELS.find((l) => String(l) === String(level)) ?? null;
  return PG_LEVELS.find((l) => norm(l) === norm(level)) ?? null;
}

function validateStudent(input, { ignoreId } = {}) {
  const prog = PROGRAMMES.find((p) => p.id === input.programmeId);
  const e = {
    fullName: v.required(input.fullName, "Full name") || (input.fullName.trim().split(/\s+/).length < 2 ? "Enter first and last name." : ""),
    email: v.email(input.email),
    matric: v.matric((input.matric || "").trim().toUpperCase()),
    programmeId: prog ? "" : "Select a programme.",
    level: prog && normaliseLevel(prog, input.level) === null ? `Invalid level for ${prog.type} programme.` : "",
  };
  const others = studentStore.items.filter((s) => s.id !== ignoreId);
  if (!e.email && others.some((s) => norm(s.email) === norm(input.email))) e.email = "A student with this email already exists.";
  if (!e.matric && others.some((s) => s.matric === input.matric.trim().toUpperCase())) e.matric = "This matriculation number already exists.";
  return Object.fromEntries(Object.entries(e).filter(([, m]) => m));
}

function insert(input) {
  const prog = PROGRAMMES.find((p) => p.id === input.programmeId);
  const student = {
    id: `stu_${Date.now().toString(36)}${studentStore.items.length}`,
    fullName: input.fullName.trim().replace(/\s+/g, " "),
    email: input.email.trim().toLowerCase(),
    matric: input.matric.trim().toUpperCase(),
    programmeId: prog.id, programme: prog.name, dept: prog.dept, type: prog.type,
    level: normaliseLevel(prog, input.level),
    attendance: null, status: "active", courses: [],
  };
  studentStore.items.unshift(student);
  return student;
}

/** level: all | undergraduate | postgraduate. status: all | active | flagged | suspended_account */
export function listStudents({ q = "", level = "all", status = "all", sort, page = 1, pageSize = 10 } = {}) {
  return request({ path: "/students", query: { q, level, status, sortKey: sort?.key, sortDir: sort?.dir, page, pageSize } }, () => {
    const needle = norm(q.trim());
    const stripped = needle.replace(/[\s/]/g, "");
    let rows = [...studentStore.items];
    if (needle)
      rows = rows.filter((s) => norm(s.fullName).includes(needle) || norm(s.matric).includes(needle) || norm(s.matric).replace(/\//g, "").includes(stripped));
    if (level !== "all") rows = rows.filter((s) => s.type === level);
    if (status !== "all") rows = rows.filter((s) => s.status === status);
    if (sort?.key) {
      const dir = sort.dir === "desc" ? -1 : 1;
      const val = (s) => (sort.key === "fullName" ? norm(s.fullName) : s[sort.key] ?? -1);
      rows.sort((a, b) => (val(a) > val(b) ? dir : -dir));
    }
    const start = (page - 1) * pageSize;
    return { items: rows.slice(start, start + pageSize), total: rows.length, page, pageSize, population: studentStore.population };
  });
}

export function getStudent(id) {
  return request({ path: `/students/${id}` }, () => {
    const student = studentStore.items.find((s) => s.id === id);
    if (!student) throw new ApiError("Student not found.", { status: 404 });
    return { student };
  });
}

export function createStudent(input) {
  return request({ path: "/students", method: "POST", body: input }, () => {
    const fields = validateStudent(input);
    if (Object.keys(fields).length) throw new ApiError("Please correct the highlighted fields.", { fields });
    const student = insert(input);
    addUniversityActivity({ title: "Student Added", detail: `${student.fullName} (${student.matric})`, tone: "navy" });
    return { student };
  });
}

export function setStudentStatus(id, status) {
  return request({ path: `/students/${id}/status`, method: "PATCH", body: { status } }, () => {
    const student = studentStore.items.find((s) => s.id === id);
    if (!student) throw new ApiError("Student not found.", { status: 404 });
    if (!["active", "flagged", "suspended_account"].includes(status)) throw new ApiError("Unsupported status.");
    student.status = status;
    return { student };
  });
}

/** Validates parsed CSV rows (headers: matric_number, full_name, email, programme, level). Nothing is saved yet. */
export function previewStudentImport(rows) {
  return request({ path: "/students/import/preview", method: "POST", body: { rows } }, () => {
    const valid = [];
    const invalid = [];
    const seenMatric = new Set();
    const seenEmail = new Set();
    rows.forEach((r, i) => {
      const prog = findProgramme(r.programme);
      const input = { fullName: r.full_name, email: r.email, matric: r.matric_number, programmeId: prog?.id ?? "", level: r.level };
      const errs = Object.values(validateStudent(input));
      if (!prog && r.programme) errs.push(`Unknown programme "${r.programme}".`);
      const m = (r.matric_number || "").toUpperCase();
      if (m && seenMatric.has(m)) errs.push("Duplicate matriculation number in file.");
      if (r.email && seenEmail.has(norm(r.email))) errs.push("Duplicate email in file.");
      seenMatric.add(m);
      seenEmail.add(norm(r.email));
      if (errs.length) invalid.push({ line: i + 2, row: r, errors: [...new Set(errs)] });
      else valid.push(input);
    });
    return { total: rows.length, valid, invalid };
  });
}

export function commitStudentImport(validRows) {
  return request({ path: "/students/import", method: "POST", body: { rows: validRows } }, () => {
    const invalid = validRows.filter((r) => Object.keys(validateStudent(r)).length);
    if (invalid.length) throw new ApiError("Some rows are no longer valid. Re-run the preview.");
    validRows.forEach(insert);
    addUniversityActivity({ title: "Enrolment Import", detail: `${validRows.length} students successfully imported.`, tone: "yellow" });
    return { imported: validRows.length };
  });
}