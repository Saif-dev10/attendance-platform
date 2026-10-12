import Icon from "@/components/admin/shared/Icon";

const TONES = {
  green: "bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]",
  amber: "bg-[#fffbeb] text-[#b45309] border-[#fde68a]",
  red: "bg-[#fef2f2] text-[#b91c1c] border-[#fecaca]",
  blue: "bg-[#eff6ff] text-[#1d4ed8] border-[#bfdbfe]",
  gray: "bg-[#f3f5f9] text-[#4b5565] border-[#e5e8ee]",
};

/** Text label plus an optional icon, so status never relies on colour alone. */
export default function Tag({ tone = "gray", icon, children }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide ${TONES[tone]}`}>
      {icon && <Icon name={icon} size={11} />}
      {children}
    </span>
  );
}

export function InferredNote() {
  return (
    <p className="mb-4 flex items-center gap-1.5 text-[11.5px] text-[#8a93a3]">
      <Icon name="info" size={13} /> Inferred layout: no reference screen was supplied for this page. Sample data.
    </p>
  );
}