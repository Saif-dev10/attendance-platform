export default function ProcessStep({ number, title, description, audience, children }) {
  return (
    <div className="relative grid gap-8 border-t border-line py-10 md:grid-cols-[auto_1fr_1fr] md:items-start md:gap-12">
      <div className="flex items-baseline gap-4 md:block">
        <span className="font-display text-4xl text-bronze-deep/80 md:text-5xl">
          {String(number).padStart(2, "0")}
        </span>
        {audience && (
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-graphite-soft md:mt-2 md:block">
            {audience}
          </span>
        )}
      </div>

      <div>
        <h3 className="font-display text-2xl text-charcoal">{title}</h3>
        <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-graphite">
          {description}
        </p>
      </div>

      {children && <div className="md:pl-4">{children}</div>}
    </div>
  );
}
