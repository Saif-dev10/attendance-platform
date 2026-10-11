import { request, ApiError } from "./_core";
import { institutionStore } from "@/lib/mock/admin/institutions";
import { addAuditEvent } from "@/lib/mock/admin/auditEvents";

const sortValue = (i, key) => (key === "name" ? i.name.toLowerCase() : i[key] ?? -1);

/** status: all | active | onboarding | suspended. sort: { key: name|students|lecturers|progress, dir: asc|desc } */
export function listInstitutions({ q = "", status = "all", region = "all", sort, page = 1, pageSize = 5 } = {}) {
  return request(
    { path: "/institutions", query: { q, status, region, sortKey: sort?.key, sortDir: sort?.dir, page, pageSize } },
    () => {
      const needle = q.trim().toLowerCase();
      let rows = [...institutionStore.items];
      if (needle) rows = rows.filter((i) => [i.name, i.code, i.slug].some((f) => f && f.toLowerCase().includes(needle)));
      if (status !== "all") rows = rows.filter((i) => i.status === status);
      if (region !== "all") rows = rows.filter((i) => i.region === region);
      if (sort?.key) {
        const dir = sort.dir === "desc" ? -1 : 1;
        rows.sort((a, b) => (sortValue(a, sort.key) > sortValue(b, sort.key) ? dir : -dir));
      }
      const start = (page - 1) * pageSize;
      return { items: rows.slice(start, start + pageSize), total: rows.length, page, pageSize };
    }
  );
}

export function getInstitutionCounts() {
  return request({ path: "/institutions/counts" }, () => {
    const items = institutionStore.items;
    return {
      all: items.length,
      active: items.filter((i) => i.status === "active").length,
      onboarding: items.filter((i) => i.status === "onboarding").length,
      suspended: items.filter((i) => i.status === "suspended").length,
    };
  });
}

export function getInstitution(id) {
  return request({ path: `/institutions/${id}` }, () => {
    const inst = institutionStore.items.find((i) => i.id === id);
    if (!inst) throw new ApiError("Institution not found.", { status: 404 });
    return { institution: inst };
  });
}

/** Only active <-> suspended is allowed. Onboarding institutions must be activated through the onboarding workflow. */
export function setInstitutionStatus(id, status) {
  return request({ path: `/institutions/${id}/status`, method: "PATCH", body: { status } }, () => {
    const inst = institutionStore.items.find((i) => i.id === id);
    if (!inst) throw new ApiError("Institution not found.", { status: 404 });
    if (inst.status === "onboarding") throw new ApiError("Finish onboarding before changing this institution's status.");
    if (!["active", "suspended"].includes(status)) throw new ApiError("Unsupported status.");
    inst.status = status;
    addAuditEvent({
      category: "config",
      scope: "institution",
      institution: inst,
      title: status === "suspended" ? "Institution Suspended" : "Institution Reactivated",
      detail: status === "suspended" ? "Access suspended by a platform administrator" : "Access restored by a platform administrator",
      result: status === "suspended" ? "warning" : "success",
    });
    return { institution: inst };
  });
}