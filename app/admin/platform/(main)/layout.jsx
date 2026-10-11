import PlatformShell from "@/components/admin/platform/PlatformShell";

// Route group: wraps every platform page that uses the standard sidebar.
// Onboarding lives outside this group because it has its own step sidebar.
export default function PlatformMainLayout({ children }) {
  return <PlatformShell>{children}</PlatformShell>;
}