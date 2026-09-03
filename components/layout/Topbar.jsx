export default function Topbar({
  title,
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
      <h1 className="min-w-0 truncate text-sm font-bold text-charcoal md:text-xl">
        {title}
      </h1>

      {/* Page-specific content */}
      <div className="flex shrink-0 items-center gap-2 md:gap-3">
        {children}
      </div>
    </header>
  );
}