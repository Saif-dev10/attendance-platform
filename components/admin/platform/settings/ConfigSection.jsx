export default function ConfigSection({ title, description, divider = false, children }) {
  return (
    <section className={divider ? "border-t border-[#e5e8ee] pt-9" : ""}>
      <h2 className="skul-heading text-[18px] font-semibold text-[#0b1a30]">{title}</h2>
      {description && <p className="mt-1 text-[14px] text-[#6b7587]">{description}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

export const FieldGrid = ({ children }) => <div className="grid gap-5 sm:grid-cols-2">{children}</div>;