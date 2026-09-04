/**
 * Small label component used above section headings to create a consistent visual
 * hierarchy in the landing pages and product story sections.
 */
export default function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-bronze-deep">
      <span className="h-px w-6 bg-bronze-deep/60" aria-hidden="true" />
      {children}
    </span>
  );
}
