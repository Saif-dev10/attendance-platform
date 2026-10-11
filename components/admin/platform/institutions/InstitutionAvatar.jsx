const TONE = {
  active: "bg-[#f3f5f9] text-[#0b1a30]",
  onboarding: "bg-[#eff6ff] text-[#2563eb]",
  suspended: "bg-[#fffbeb] text-[#b45309]",
};
const SIZE = {
  md: "h-9 w-9 rounded-md text-[11px]",
  lg: "h-14 w-14 rounded-xl text-[15px]",
};

export default function InstitutionAvatar({ abbr, status = "active", size = "md" }) {
  return (
    <span aria-hidden className={`flex shrink-0 items-center justify-center font-bold ${TONE[status] || TONE.active} ${SIZE[size]}`}>
      {abbr}
    </span>
  );
}