export default function Button({
  children,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center rounded-xl bg-charcoal px-5 py-2.5 text-sm font-bold text-cream transition-colors hover:bg-bronze-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}