/**
 * Reusable feature card for the landing pages.
 * It keeps presentation consistent while highlighting a single product benefit.
 */
export default function FeatureCard({ icon, title, description, className = "" }) {
  return (
    <div
      className={`group rounded-2xl border border-line-strong bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:border-bronze/50 hover:shadow-[0_20px_40px_-24px_rgba(32,30,27,0.35)] ${className}`}
    >
      {icon && (
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-charcoal text-cream transition-colors duration-300 group-hover:bg-bronze-deep">
          {icon}
        </div>
      )}
      <h3 className="font-display text-lg text-charcoal">{title}</h3>
      <p className="mt-2.5 text-[0.925rem] leading-relaxed text-graphite">{description}</p>
    </div>
  );
}
