/** Base action button for the authenticated app shell. */
export default function Button({
  children,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={
        `inline-flex cursor-pointer items-center justify-center rounded-xl bg-charcoal px-5 py-2.5 text-sm font-bold text-cream shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-bronze-deep hover:shadow-md active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm ${className}`
      }
      {...props}
    >
      {children}
    </button>
  );
}