export default function Topbar({
  title,
  subtitle,
  leading,
  children,
  className = "",
}) {
  return (
    <header
      className={`
        fixed
        top-0
        left-0
        right-0
        h-[72px]
        bg-paper
        border-b
        border-line
        flex
        items-center
        justify-between
        px-4 md:px-8
        shrink-0
        md:left-[280px]
        z-50
        ${className}
      `}
    >
      {/* Title */}
      <div className="flex min-w-0 items-center gap-3">
        {leading}
        <div className="min-w-0">
          <h1 className="truncate text-sm font-bold text-charcoal md:text-xl">
            {title}
          </h1>
          {subtitle && (
            <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-graphite-soft md:text-xs">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Page-specific content */}
      <div className="flex shrink-0 items-center gap-2 md:gap-3">
        {children}
      </div>
    </header>
  );
}