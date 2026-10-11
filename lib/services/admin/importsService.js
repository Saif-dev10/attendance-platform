import { request, ApiError } from "./_core";
import { importStore, buildErrors, IMPORT_TEMPLATES, buildTemplateCsv } from "@/lib/mock/admin/imports";
import { institutionStore } from "@/lib/mock/admin/institutions";
import { addAuditEvent } from "@/lib/mock/admin/auditEvents";

export { IMPORT_TEMPLATES, buildTemplateCsv };

const { delta } = importStore;

function settle(id) {
  const job = importStore.jobs.find((j) => j.id === id);
  if (!job || job.status !== "validating") return;
  // Deterministic mock outcome. First attempt depends on row count; retries clear most errors.
  let failed;
  if (job.attempts > 0) failed = Math.floor((job.lastFailed ?? 0) * 0.2);
  else failed = job.total % 9 === 0 ? Math.ceil(job.total * 0.3) : job.total % 4 === 0 ? Math.max(1, Math.round(job.total * 0.02)) : 0;

  job.failed = failed;
  job.success = job.total - failed;
  job.status = failed === 0 ? "completed" : failed >= job.total * 0.25 ? "failed" : "completed_with_errors";
  job.attempts += 1;
  importStore.errors[id] = failed ? buildErrors(job, failed) : [];

  delta.processing -= 1;
  if (job.status === "failed") delta.failed += 1;
  else delta.success += 1;

  addAuditEvent({
    category: "import",
    scope: "institution",
    institution: job.institution,
    actor: job.uploadedBy,
    title: job.status === "completed" ? "Import Completed" : job.status === "failed" ? "Import Failed" : "Partial Import Success",
    detail: job.status === "failed" ? `${failed} validation errors blocked ${job.fileName}` : `${job.success} of ${job.total} records imported from ${job.fileName}`,
    result: job.status === "completed" ? "success" : job.status === "failed" ? "failure" : "warning",
  });
}

// Mock "server" finishing validation after a short delay.
const scheduleSettle = (id) => typeof window !== "undefined" && setTimeout(() => settle(id), 6000);

export function listImports({ q = "", type = "all", status = "all", page = 1, pageSize = 8 } = {}) {
  return request({ path: "/imports", query: { q, type, status, page, pageSize } }, () => {
    const needle = q.trim().toLowerCase();
    let rows = [...importStore.jobs].sort((a, b) => b.uploadedAt - a.uploadedAt);
    if (needle) rows = rows.filter((j) => [j.fileName, j.institution.name, j.institution.code].some((f) => f.toLowerCase().includes(needle)));
    if (type !== "all") rows = rows.filter((j) => j.type === type);
    if (status !== "all") rows = rows.filter((j) => j.status === status);
    const start = (page - 1) * pageSize;
    return { items: rows.slice(start, start + pageSize), total: rows.length, page, pageSize };
  });
}

export function getImportSummary() {
  return request({ path: "/imports/summary" }, () => {
    const { base } = importStore;
    const total = base.total + delta.total;
    const success = base.success + delta.success;
    return {
      total,
      success,
      failed: base.failed + delta.failed,
      processing: base.processing + delta.processing,
      successRate: (Math.floor((success / total) * 1000) / 10).toFixed(1),
    };
  });
}

export function getImport(id) {
  return request({ path: `/imports/${id}` }, () => {
    const job = importStore.jobs.find((j) => j.id === id);
    if (!job) throw new ApiError("Import not found.", { status: 404 });
    return { job };
  });
}

export function getImportErrors(id, { page = 1, pageSize = 10 } = {}) {
  return request({ path: `/imports/${id}/errors`, query: { page, pageSize } }, () => {
    const job = importStore.jobs.find((j) => j.id === id);
    if (!job) throw new ApiError("Import not found.", { status: 404 });
    const all = importStore.errors[id] || [];
    const items = pageSize === "all" ? all : all.slice((page - 1) * pageSize, page * pageSize);
    return { items, total: all.length, errorCount: job.failed, truncated: job.failed > all.length, page, pageSize };
  });
}

export function createImport({ institutionId, type, fileName, rows, uploadedBy = "Adewale O." }) {
  return request({ path: "/imports", method: "POST", body: { institutionId, type, fileName, rows } }, () => {
    const fields = {};
    const inst = institutionStore.items.find((i) => i.id === institutionId);
    if (!inst) fields.institutionId = "Select an institution.";
    if (!type) fields.type = "Select an import type.";
    if (!/\.(csv|xlsx)$/i.test(fileName || "")) fields.file = "Attach a .csv or .xlsx file.";
    if (!(rows > 0)) fields.rows = "File must contain at least one record.";
    if (Object.keys(fields).length) throw new ApiError("Please correct the highlighted fields.", { fields });

    const job = {
      id: `imp_${Date.now()}`,
      institution: { id: inst.id, name: inst.name, code: inst.code },
      fileName, type, status: "validating", total: rows, success: 0, failed: 0,
      uploadedBy, sizeKb: Math.max(1, Math.round(rows * 0.12)), uploadedAt: Date.now(), attempts: 0,
    };
    importStore.jobs.unshift(job);
    delta.total += 1;
    delta.processing += 1;
    addAuditEvent({ category: "import", scope: "institution", institution: inst, actor: uploadedBy, title: "Import Started", detail: `${fileName} queued (${rows} records)` });
    scheduleSettle(job.id);
    return { job };
  });
}

export function retryImport(id) {
  return request({ path: `/imports/${id}/retry`, method: "POST" }, () => {
    const job = importStore.jobs.find((j) => j.id === id);
    if (!job) throw new ApiError("Import not found.", { status: 404 });
    if (job.status !== "failed") throw new ApiError("Only failed imports can be retried.");
    job.lastFailed = job.failed;
    job.status = "validating";
    job.success = 0;
    job.failed = 0;
    importStore.errors[id] = [];
    delta.failed -= 1;
    delta.processing += 1;
    scheduleSettle(id);
    return { job };
  });
}