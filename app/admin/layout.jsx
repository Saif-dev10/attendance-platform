import { ToastProvider } from "@/components/ui/Toast";

export const metadata = { title: "SKUL Admin" };

// Scopes the admin design tokens to /admin/* so the student and lecturer portals are untouched.
export default function AdminLayout({ children }) {
  return (
    <div className="skul-admin">
      <ToastProvider>{children}</ToastProvider>
    </div>
  );
}