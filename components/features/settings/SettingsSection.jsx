/** Titled group of settings rows, sharing one bordered surface. */
export default function SettingsSection({ title, children }) {
  return (
    <section>
      <h2 className="mb-3 px-1 text-[11px] font-bold uppercase tracking-widest text-graphite-soft">
        {title}
      </h2>

      <div className="overflow-hidden rounded-2xl border border-line bg-white">
        {children}
      </div>
    </section>
  );
}