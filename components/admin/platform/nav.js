// Unified platform navigation (the references show slightly different subsets per screen).
export const PLATFORM_NAV = [
  {
    title: "General",
    items: [
      { label: "Overview", href: "/admin/platform", icon: "overview", exact: true },
      { label: "Institutions", href: "/admin/platform/institutions", icon: "institutions" },
      { label: "Onboarding", href: "/admin/platform/onboarding", icon: "onboarding" },
      { label: "Data Imports", href: "/admin/platform/data-imports", icon: "import" },
      { label: "Academic Structures", href: "/admin/platform/academic-structures", icon: "structure" },
      { label: "User Management", href: "/admin/platform/users", icon: "users" },
      { label: "Audit Logs", href: "/admin/platform/audit-logs", icon: "history" },
    ],
  },
  {
    title: "System",
    items: [
      { label: "System Settings", href: "/admin/platform/system-settings", icon: "settings" },
      { label: "Integrations", href: "/admin/platform/integrations", icon: "integrations" },
      { label: "Security", href: "/admin/platform/security", icon: "security" },
    ],
  },
];

// Sections with no reference screen: rendered by the (main)/[section] placeholder page.
export const PLACEHOLDER_SECTIONS = {
  "academic-structures": "Academic Structures",
  users: "User Management",
  integrations: "Integrations",
  security: "Security",
};