export default function AdminPageHeader({ title, description, actions }) {
  return <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-bronze">SKUL administration</p><h1 className="text-3xl font-semibold tracking-tight text-charcoal">{title}</h1>{description && <p className="mt-2 max-w-2xl text-sm text-graphite-soft">{description}</p>}</div>{actions && <div className="flex gap-2">{actions}</div>}</div>;
}
