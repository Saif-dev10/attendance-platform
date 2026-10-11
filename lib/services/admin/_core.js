import { ADMIN_CONFIG } from "@/lib/admin/config";

export class ApiError extends Error {
  constructor(message, { status = 400, fields = {} } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fields = fields;
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const clone = (v) => (v === undefined ? v : JSON.parse(JSON.stringify(v)));
const tag = (data, source) => (data && typeof data === "object" && !Array.isArray(data) ? { ...data, source } : data);

/**
 * Single entry point for every admin data call.
 *  - mock mode: runs `mock()` against in-memory stores (nothing is persisted to a server).
 *  - live mode: calls `${apiBase}${path}` with fetch.
 * Object responses carry `source: "mock" | "live"` so the UI can label sample data honestly.
 */
export async function request({ path, method = "GET", query, body }, mock) {
  if (ADMIN_CONFIG.useMock) {
    await sleep(ADMIN_CONFIG.mockLatencyMs);
    return tag(clone(await mock()), "mock");
  }

  const qs = new URLSearchParams(
    Object.entries(query || {}).filter(([, v]) => v !== undefined && v !== null && v !== "")
  ).toString();

  const res = await fetch(`${ADMIN_CONFIG.apiBase}${path}${qs ? `?${qs}` : ""}`, {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!res.ok) {
    let payload = {};
    try {
      payload = await res.json();
    } catch {}
    throw new ApiError(payload.message || `Request failed (${res.status})`, { status: res.status, fields: payload.fields || {} });
  }
  return tag(await res.json(), "live");
}