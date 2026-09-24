import { getInitials } from "@/lib/mock/attendanceUtils";

const SIZES = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-9 w-9 text-xs",
  lg: "h-12 w-12 text-sm",
};

// Decorative only: the student's name is always rendered next to it.
export default function StudentAvatar({ name, size = "sm" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-line bg-cream font-semibold text-charcoal ${SIZES[size]}`}
    >
      {getInitials(name)}
    </span>
  );
}