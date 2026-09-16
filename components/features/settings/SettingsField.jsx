/** Labeled text input, matching the profile Edit Profile form fields. */
export default function SettingsField({
  label,
  type = "text",
  value,
  onChange,
  ...props
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-charcoal">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-graphite-soft focus:border-bronze-deep focus:ring-2 focus:ring-bronze-deep/10"
        {...props}
      />
    </label>
  );
}