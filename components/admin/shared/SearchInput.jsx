export default function SearchInput({ value, onChange, placeholder = "Search…", className = "" }) {
  return <label className={`block ${className}`}><span className="sr-only">{placeholder}</span><input type="search" value={value} onChange={(event) => onChange?.(event.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-line-strong bg-paper px-4 py-2.5 text-sm text-charcoal placeholder:text-graphite-soft focus:border-bronze focus:outline-none"/></label>;
}
