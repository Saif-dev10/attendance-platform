import Icon from "./Icon";

const CHIP = {
  positive: "bg-[#ecfdf5] text-[#047857]",
  neutral: "bg-[#f3f5f9] text-[#6b7587]",
  negative: "bg-[#fef2f2] text-[#b91c1c]",
  warning: "bg-[#fffbeb] text-[#b45309]",
};
const BORDER = { danger: "border-l-4 border-l-[#dc2626]", warning: "border-l-4 border-l-[#f5c400]" };
const ICON_BG = {
  blue: "bg-[#eff6ff] text-[#2563eb]",
  green: "bg-[#ecfdf5] text-[#059669]",
  red: "bg-[#fef2f2] text-[#dc2626]",
  yellow: "bg-[#fef9c3] text-[#a16207]",
  neutral: "bg-[#f3f5f9] text-[#4b5565]",
};

/**
 * Two layouts:
 *  variant="platform": value + label below; chip top-right (Platform Overview)
 *  variant="detail":   eyebrow label top-right, value, caption below (Imports + University)
 */
export default function KpiCard({ icon, iconTone = "neutral", label, value, caption, captionTone, chip, chipTone = "neutral", accent, variant = "platform" }) {
  const captionCls = { positive: "text-[#047857]", danger: "text-[#b91c1c]", warning: "text-[#b45309]" }[captionTone] || "text-[#6b7587]";
  return (
    <div className={`skul-card p-5 ${accent ? BORDER[accent] : ""}`}>
      <div className="flex items-start justify-between">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${ICON_BG[iconTone]}`}>
          <Icon name={icon} size={20} />
        </span>
        {variant === "detail" ? (
          <span className="skul-eyebrow">{label}</span>
        ) : (
          chip && <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${CHIP[chipTone]}`}>{chip}</span>
        )}
      </div>
      <p className="skul-heading mt-4 text-[28px] font-bold leading-none text-[#0b1a30]">{value}</p>
      <p className={`mt-1.5 text-[13px] ${variant === "detail" ? captionCls : "text-[#6b7587]"}`}>
        {variant === "detail" ? caption : label}
      </p>
    </div>
  );
}