import { request } from "./_core";
import { institutionStore } from "@/lib/mock/admin/institutions";
import { platformKpiBase, platformActivity, resourceSample, alertStore } from "@/lib/mock/admin/platformMetrics";
import { universityKpis, attendanceSeries, universityStore, ATTENDANCE_RANGES } from "@/lib/mock/admin/universityMetrics";
import { platformAdmin, universityProfile } from "@/lib/mock/admin/profiles";

export { ATTENDANCE_RANGES };

export const getPlatformAdmin = () => request({ path: "/me" }, () => ({ admin: platformAdmin }));
export const getUniversityProfile = () => request({ path: "/university/profile" }, () => ({ profile: universityProfile }));

/** `resources` is a static sample, NOT live telemetry. `isSample` lets the UI say so. */
export function getPlatformOverview() {
  return request({ path: "/overview" }, () => ({
    kpis: platformKpiBase.map((k) => (k.id === "institutions" ? { ...k, value: String(institutionStore.items.length) } : k)),
    activity: platformActivity,
    resources: { ...resourceSample, isSample: true },
    alerts: alertStore.items,
  }));
}

export function acknowledgeAlert(id) {
  return request({ path: `/alerts/${id}/acknowledge`, method: "POST" }, () => {
    alertStore.items = alertStore.items.filter((a) => a.id !== id);
    return { alerts: alertStore.items };
  });
}

export function getUniversityOverview() {
  return request({ path: "/university/overview" }, () => ({
    profile: universityProfile,
    health: "healthy",
    kpis: universityKpis,
    recent: universityStore.recent.slice(0, 5),
  }));
}

export function getAttendanceActivity(range = "7d") {
  return request({ path: "/university/attendance-activity", query: { range } }, () => ({
    range,
    ...(attendanceSeries[range] || attendanceSeries["7d"]),
  }));
}