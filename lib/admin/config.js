// API configuration lives here, never in UI components.
export const ADMIN_CONFIG = {
  // Keep other admin modules on mock data for now.
  useMock: process.env.NEXT_PUBLIC_ADMIN_USE_MOCK !== "false",
  
  // Enable live data only for the Institutions module.
  institutionsUseMock:
  process.env.NEXT_PUBLIC_ADMIN_INSTITUTIONS_USE_MOCK !== "false",

  // Control mock/live data specifically for Institution Onboarding.
  onboardingUseMock: process.env.NEXT_PUBLIC_ADMIN_ONBOARDING_USE_MOCK !== "false",

  apiBase: process.env.NEXT_PUBLIC_ADMIN_API_BASE || "/api/admin",
  mockLatencyMs: 350,
  platformDomain: "skul.edu.ng",
};

export const DATA_SOURCE_LABEL = ADMIN_CONFIG.useMock
  ? "Sample data"
  : "Live data";