import { request } from "./_core";
import { auditStore, MOCK_DAILY_EVENTS, AUDIT_CATEGORIES } from "@/lib/mock/admin/auditEvents";

export { AUDIT_CATEGORIES };

export const AUDIT_RANGES = [
  { value: "24h", label: "Last 24 Hours", minutes: 1440 },
  { value: "7d", label: "Last 7 Days", minutes: 10080 },
  { value: "30d", label: "Last 30 Days", minutes: 43200 },
];

function filterEvents({ q = "", action = "all", range = "24h" }) {
  const minutes = AUDIT_RANGES.find((r) => r.value === range)?.minutes ?? 1440;
  const since = Date.now() - minutes * 60000;
  const needle = q.trim().toLowerCase();
  const inRange = auditStore.events.filter((e) => e.at >= since);
  const rows = inRange.filter((e) => {
    if (action !== "all" && e.category !== action) return false;
    if (!needle) return true;
    return [e.actor.name, e.institution?.name, e.institution?.code].some((f) => f && f.toLowerCase().includes(needle));
  });
  return { rows, inRange };
}

export function listAuditEvents({ q = "", action = "all", range = "24h", page = 1, pageSize = 20 } = {}) {
  return request({ path: "/audit-events", query: { q, action, range, page, pageSize } }, () => {
    const { rows, inRange } = filterEvents({ q, action, range });
    const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
    const safePage = Math.min(page, pageCount);
    return {
      items: rows.slice((safePage - 1) * pageSize, safePage * pageSize),
      total: rows.length,
      page: safePage,
      pageSize,
      pageCount,
      stats: {
        dailyEvents: MOCK_DAILY_EVENTS, // sample platform-wide volume
        anomalies: inRange.filter((e) => e.result === "failure").length,
      },
    };
  });
}

/** Flat rows for CSV export (all pages of the current filter). */
export function exportAuditEvents(filters) {
  return request({ path: "/audit-events/export", query: filters }, () => ({
    rows: filterEvents(filters).rows.map((e) => ({
      timestamp: new Date(e.at).toISOString(),
      action: e.title,
      details: e.detail,
      institution: e.institution?.name ?? (e.scope === "system" ? "SYSTEM" : "PLATFORM GLOBAL"),
      institution_code: e.institution?.code ?? "",
      actor: e.actor.name,
      result: e.result.toUpperCase(),
    })),
  }));
}