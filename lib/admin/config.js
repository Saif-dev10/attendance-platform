// API configuration lives here, never in UI components.
export const ADMIN_CONFIG = {
  // Set NEXT_PUBLIC_ADMIN_USE_MOCK=false to call a real backend.
  useMock: process.env.NEXT_PUBLIC_ADMIN_USE_MOCK !== "false",
  apiBase: process.env.NEXT_PUBLIC_ADMIN_API_BASE || "/api/admin",
  mockLatencyMs: 350,
  platformDomain: "skul.edu.ng",
};

export const DATA_SOURCE_LABEL = ADMIN_CONFIG.useMock ? "Sample data" : "Live data";