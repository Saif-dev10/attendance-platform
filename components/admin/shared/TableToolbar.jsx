"use client";
import Icon from "./Icon";

/** White toolbar card above tables: search on the left, filters in the middle, extras on the right. */
export function SearchInput({ value, onChange, placeholder, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <Icon name="search" size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8a93a3]" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-10 w-full rounded-lg border border-transparent bg-[#f3f5f9] pl-9 pr-3 text-[13.5px] placeholder:text-[#8a93a3]"
      />
    </div>
  );
}

export default function TableToolbar({ children, className = "" }) {
  return <div className={`skul-card mb-5 flex flex-wrap items-center gap-3 px-4 py-3.5 ${className}`}>{children}</div>;
}