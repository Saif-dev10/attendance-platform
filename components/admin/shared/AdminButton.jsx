"use client";
import Link from "next/link";
import Icon from "./Icon";

const VARIANTS = {
  primary: "bg-[#071a33] text-white hover:bg-[#0e2544] border border-[#071a33]",
  accent: "bg-[#f5c400] text-[#071a33] hover:bg-[#e0b400] border border-[#f5c400]",
  secondary: "bg-white text-[#0b1a30] border border-[#e5e8ee] hover:bg-[#f3f5f9]",
  ghost: "bg-transparent text-[#6b7587] hover:text-[#0b1a30] hover:bg-[#f3f5f9] border border-transparent",
  danger: "bg-[#dc2626] text-white hover:bg-[#b91c1c] border border-[#dc2626]",
  dangerSoft: "bg-[#fef2f2] text-[#b91c1c] hover:bg-[#fee2e2] border border-[#fee2e2]",
};
const SIZES = {
  sm: "h-8 px-3 text-[12.5px] gap-1.5",
  md: "h-10 px-4 text-[13.5px] gap-2",
};

export default function AdminButton({
  variant = "secondary",
  size = "md",
  icon,
  iconRight,
  href,
  loading = false,
  disabled = false,
  className = "",
  children,
  type = "button",
  ...rest
}) {
  const cls = `inline-flex items-center justify-center rounded-lg font-semibold transition-colors whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
  const content = (
    <>
      {loading ? <Icon name="spinner" size={16} className="skul-spin" /> : icon ? <Icon name={icon} size={16} /> : null}
      {children}
      {iconRight && !loading ? <Icon name={iconRight} size={16} /> : null}
    </>
  );
  if (href && !disabled) {
    return (
      <Link href={href} className={cls} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} disabled={disabled || loading} {...rest}>
      {content}
    </button>
  );
}