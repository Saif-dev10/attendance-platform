export default function Topbar({
  title,
  children,
  className = "",
}) {
  return (
    <header
      className={`
        fixed
        left-[280px]
        top-0
        right-0
        h-[72px]
        bg-white
        border-b
        border-slate-200
        flex
        items-center
        justify-between
        px-8
        shrink-0
        z-10
        ${className}
      `}
    >
      {/* Title */}
      <h1 className="text-xl font-bold text-[#0c426e]">
        {title}
      </h1>

      {/* Page-specific content */}
      <div className="flex items-center gap-3">
        {children}
      </div>
    </header>
  );
}