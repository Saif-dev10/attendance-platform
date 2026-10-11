import Icon from "./Icon";

// Every status has text + a distinct glyph, so meaning never depends on colour alone.
const MAP = {
  active: { label: "Active", cls: "bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]", dot: true },
  onboarding: { label: "Onboarding", cls: "bg-[#eff6ff] text-[#1d4ed8] border-[#bfdbfe]", dot: true },
  suspended: { label: "Suspended", cls: "bg-[#fffbeb] text-[#b45309] border-[#fde68a]", dot: true },
  success: { label: "Success", cls: "bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]" },
  warning: { label: "Warning", cls: "bg-[#fffbeb] text-[#b45309] border-[#fde68a]" },
  error: { label: "Error", cls: "bg-[#fef2f2] text-[#b91c1c] border-[#fecaca]", icon: "xCircle" },
  validating: { label: "Validating", cls: "bg-[#fef9c3] text-[#854d0e] border-[#fde68a]", icon: "spinner", spin: true },
  failed: { label: "Failed", cls: "bg-[#fef2f2] text-[#b91c1c] border-[#fecaca]", icon: "xCircle" },
  completed: { label: "Completed", cls: "bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]", icon: "checkCircle" },
  completed_with_errors: { label: "Completed*", cls: "bg-[#fffbeb] text-[#b45309] border-[#fde68a]", icon: "alert" },
  flagged: { label: "Flagged", cls: "bg-[#fffbeb] text-[#b45309] border-[#fde68a]", icon: "warning" },
  suspended_account: { label: "Suspended", cls: "bg-[#fef2f2] text-[#b91c1c] border-[#fecaca]", icon: "xCircle" },
  healthy: { label: "System Healthy", cls: "bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]", dot: true },
};

export default function StatusBadge({ status, label, className = "" }) {
  const m = MAP[status] || { label: status, cls: "bg-[#f3f5f9] text-[#6b7587] border-[#e5e8ee]" };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide ${m.cls} ${className}`}>
      {m.dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {m.icon && <Icon name={m.icon} size={11} className={m.spin ? "skul-spin" : ""} />}
      {label || m.label}
    </span>
  );
}