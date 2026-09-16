import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * A single navigable settings entry. Renders as a Link when `href` is
 * given, otherwise as a button (for in-page actions in the future).
 */
export default function SettingsRow({
  icon: Icon,
  label,
  description,
  href,
  onClick,
  last = false,
}) {
  const content = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cream text-graphite-soft transition-colors group-hover:text-bronze-deep">
        <Icon size={17} strokeWidth={1.8} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-charcoal">{label}</p>
        <p className="mt-0.5 truncate text-xs text-graphite-soft">
          {description}
        </p>
      </div>

      <ChevronRight
        size={17}
        className="shrink-0 text-graphite-soft transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-charcoal"
      />
    </>
  );

  const rowClassName = `group flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-bronze sm:px-5 ${
    last ? "" : "border-b border-line"
  }`;

  if (href) {
    return (
      <Link href={href} className={rowClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={rowClassName}>
      {content}
    </button>
  );
}