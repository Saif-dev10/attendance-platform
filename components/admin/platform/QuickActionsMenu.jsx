"use client";
import DropdownMenu from "@/components/admin/shared/DropdownMenu";
import AdminButton from "@/components/admin/shared/AdminButton";

const ITEMS = [
  { label: "New Institution", icon: "plusCircle", href: "/admin/platform/onboarding" },
  { label: "New Global Import", icon: "upload", href: "/admin/platform/data-imports" },
  { label: "View Activity Log", icon: "history", href: "/admin/platform/audit-logs" },
  { label: "Global Configuration", icon: "settings", href: "/admin/platform/system-settings" },
  { divider: true },
  { label: "Open University Dashboard", icon: "building", href: "/admin/university" },
];

export default function QuickActionsMenu() {
  return (
    <DropdownMenu
      items={ITEMS}
      renderTrigger={({ open, toggle }) => (
        <AdminButton variant="secondary" iconRight="chevronDown" onClick={toggle} aria-haspopup="menu" aria-expanded={open}>
          Quick Actions
        </AdminButton>
      )}
    />
  );
}