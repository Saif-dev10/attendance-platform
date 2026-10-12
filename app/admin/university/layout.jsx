import UniversityShell from "@/components/admin/university/UniversityShell";

// Every /admin/university/* page renders inside this shell, with its own light sidebar and nav.
// It never shares navigation with the platform administration environment.
export default function UniversityLayout({ children }) {
  return <UniversityShell>{children}</UniversityShell>;
}