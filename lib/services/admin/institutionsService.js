import { request, ApiError } from "./_core";
import { institutionStore } from "@/lib/mock/admin/institutions";
import { addAuditEvent } from "@/lib/mock/admin/auditEvents";
import { ADMIN_CONFIG } from "@/lib/admin/config";

const sortValue = (institution, key) =>
  key === "name"
    ? String(institution.name ?? "").toLowerCase()
    : institution[key] ?? -1;

// Returns 0 for ties so the comparator stays consistent.
const compare = (a, b, dir) => (a > b ? dir : a < b ? -dir : 0);

/**
 * List institutions.
 *
 * Mock mode uses the existing in-memory institution store.
 * Live mode uses the Next.js platform proxy, which adds the server-side
 * platform key before forwarding the request to Laravel.
 */
export async function listInstitutions({
  q = "",
  status = "all",
  region = "all",
  sort,
  page = 1,
  pageSize = 5,
} = {}) {
  // Preserve the existing mock implementation when enabled.
  if (ADMIN_CONFIG.institutionsUseMock) {
    return request(
      {
        path: "/institutions",
        query: {
          q,
          status,
          region,
          sortKey: sort?.key,
          sortDir: sort?.dir,
          page,
          pageSize,
        },
      },
      () => {
        const needle = q.trim().toLowerCase();
        let rows = [...institutionStore.items];

        if (needle) {
          rows = rows.filter((institution) =>
            [institution.name, institution.code, institution.slug].some(
              (value) =>
                value &&
                String(value).toLowerCase().includes(needle)
            )
          );
        }

        if (status !== "all") {
          rows = rows.filter(
            (institution) => institution.status === status
          );
        }

        if (region !== "all") {
          rows = rows.filter(
            (institution) => institution.region === region
          );
        }

        if (sort?.key) {
          const dir = sort.dir === "desc" ? -1 : 1;

          rows.sort((a, b) =>
            compare(sortValue(a, sort.key), sortValue(b, sort.key), dir)
          );
        }

        const start = (page - 1) * pageSize;

        return {
          items: rows.slice(start, start + pageSize),
          total: rows.length,
          page,
          pageSize,
        };
      }
    );
  }

  // Laravel pagination uses per_page.
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(pageSize),
  });

  const response = await fetch(
    `/api/platform/institutions?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "same-origin",
      cache: "no-store",
    }
  );

  const payload = await response.json().catch(() => ({}));

  if (!response.ok || payload.success === false) {
    throw new ApiError(
      payload.error?.message ||
        payload.message ||
        `Unable to load institutions (${response.status}).`,
      { status: response.status }
    );
  }

  const institutions = Array.isArray(payload.data) ? payload.data : [];
  const needle = q.trim().toLowerCase();

  // These filters apply to the returned page only. Server-side filtering
  // must be verified before treating results as globally filtered.
  let rows = institutions.filter((institution) => {
    const matchesSearch =
      !needle ||
      [institution.name, institution.code, institution.slug].some(
        (value) =>
          value &&
          String(value).toLowerCase().includes(needle)
      );

    const matchesStatus =
      status === "all" || institution.status === status;

    const matchesRegion =
      region === "all" || institution.region === region;

    return matchesSearch && matchesStatus && matchesRegion;
  });

  if (sort?.key) {
    const dir = sort.dir === "desc" ? -1 : 1;

    rows.sort((a, b) =>
      compare(sortValue(a, sort.key), sortValue(b, sort.key), dir)
    );
  }

  return {
    items: rows,
    total: payload.meta?.total ?? rows.length,
    page: payload.meta?.current_page ?? page,
    pageSize: payload.meta?.per_page ?? pageSize,
    source: "live",
  };
}

/**
 * Institution counts.
 * Still uses the existing shared mock/live request configuration.
 * The live counts endpoint has not yet been verified in Laravel.
 */
export function getInstitutionCounts() {
  return request({ path: "/institutions/counts" }, () => {
    const items = institutionStore.items;

    return {
      all: items.length,
      active: items.filter((institution) => institution.status === "active")
        .length,
      onboarding: items.filter(
        (institution) => institution.status === "onboarding"
      ).length,
      suspended: items.filter(
        (institution) => institution.status === "suspended"
      ).length,
    };
  });
}


/**
 * Retrieve one institution.
 *
 * Mock mode preserves the existing development workflow.
 * Live mode retrieves the institution through the Next.js proxy.
 */
export async function getInstitution(id) {
  if (ADMIN_CONFIG.institutionsUseMock) {
    return request({ path: `/institutions/${id}` }, () => {
      const institution = institutionStore.items.find(
        (item) => String(item.id) === String(id)
      );

      if (!institution) {
        throw new ApiError("Institution not found.", { status: 404 });
      }

      return { institution };
    });
  }

  const response = await fetch(
    `/api/platform/institutions/${encodeURIComponent(id)}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "same-origin",
      cache: "no-store",
    }
  );

  const payload = await response.json().catch(() => ({}));

  if (!response.ok || payload.success === false || !payload.data) {
    throw new ApiError(
      payload.error?.message ||
        payload.message ||
        `Unable to load institution (${response.status}).`,
      { status: response.status }
    );
  }

  return {
    institution: {
      id,
      ...payload.data,
    },
    source: "live",
  };
}


/**
 * Only active <-> suspended is allowed in the existing mock workflow.
 * Do not enable live status changes until a matching backend route exists.
 */

/**
 * Update an institution through the Laravel platform API.
 */

export async function updateInstitution(id, updates) {
  if (ADMIN_CONFIG.institutionsUseMock) {
    return request(
      {
        path: `/institutions/${id}`,
        method: "PATCH",
        body: updates,
      },
      () => {
        const institution = institutionStore.items.find(
          (item) => String(item.id) === String(id)
        );

        if (!institution) {
          throw new ApiError("Institution not found.", {
            status: 404,
          });
        }

        Object.assign(institution, updates);

        return { institution };
      }
    );
  }

  const response = await fetch(
    `/api/platform/institutions/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      cache: "no-store",
      body: JSON.stringify(updates),
    }
  );

  const payload = await response.json().catch(() => ({}));

  if (!response.ok || payload.success === false || !payload.data) {
    const validationErrors = payload.errors
      ? Object.values(payload.errors).flat().join(" ")
      : "";

    throw new ApiError(
      validationErrors ||
        payload.error?.message ||
        payload.message ||
        `Unable to update institution (${response.status}).`,
      { status: response.status }
    );
  }

  const institution = payload.data?.institution ?? payload.data;

  return {
    institution: {
      id,
      ...institution,
    },
    source: "live",
  };
}

export async function setInstitutionStatus(id, status) {
  if (!["active", "inactive", "suspended"].includes(status)) {
    throw new Error("Invalid institution status.");
  }

  if (ADMIN_CONFIG.institutionsUseMock) {
    return request(
      {
        path: `/institutions/${id}/status`,
        method: "PATCH",
        body: { status },
      },
      () => {
        const institution = institutionStore.items.find(
          (item) => String(item.id) === String(id)
        );

        if (!institution) {
          throw new ApiError("Institution not found.", {
            status: 404,
          });
        }

        institution.status = status;

        return { institution };
      }
    );
  }

  // Laravel supports "active" and "inactive", not "suspended".
  const apiStatus = status === "suspended" ? "inactive" : status;

  const response = await fetch(
    `/api/platform/institutions/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      cache: "no-store",
      body: JSON.stringify({ status: apiStatus }),
    }
  );

  const payload = await response.json().catch(() => ({}));

  if (!response.ok || payload.success === false || !payload.data) {
    const validationErrors = payload.errors
      ? Object.values(payload.errors).flat().join(" ")
      : "";

    throw new ApiError(
      validationErrors ||
        payload.error?.message ||
        payload.message ||
        `Unable to change institution status (${response.status}).`,
      { status: response.status }
    );
  }

  const institution = payload.data?.institution ?? payload.data;

  return {
    institution: { id, ...institution },
    source: "live",
  };
}