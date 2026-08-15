import Link from "next/link";

const variants = {
  primary:
    "bg-charcoal text-cream hover:bg-bronze-deep hover:text-cream shadow-[0_1px_0_rgba(0,0,0,0.05)]",
  secondary:
    "bg-transparent text-charcoal border border-charcoal/25 hover:border-bronze hover:text-bronze-deep",
  inverse:
    "bg-bronze text-charcoal hover:bg-bronze-soft",
  ghost:
    "bg-transparent text-charcoal/80 hover:text-bronze-deep underline-offset-4 hover:underline",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 ease-out ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
