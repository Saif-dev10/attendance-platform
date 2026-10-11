export function Section({ title, description, children }) {
  return (
    <section>
      <h2 className="skul-heading text-[19px] font-semibold text-[#0b1a30]">{title}</h2>
      {description && <p className="mt-1 text-[14px] text-[#6b7587]">{description}</p>}
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

export const Grid2 = ({ children }) => <div className="grid gap-5 sm:grid-cols-2">{children}</div>;

export function Notice({ tone = "info", title, children }) {
  const T = {
    info: "border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8]",
    success: "border-[#a7f3d0] bg-[#ecfdf5] text-[#047857]",
    warning: "border-[#fde68a] bg-[#fffbeb] text-[#92400e]",
    error: "border-[#fecaca] bg-[#fef2f2] text-[#991b1b]",
  };
  return (
    <div className={`rounded-xl border px-4 py-3.5 text-[13px] ${T[tone]}`}>
      {title && <p className="font-semibold">{title}</p>}
      <div className={title ? "mt-0.5" : ""}>{children}</div>
    </div>
  );
}

export const FieldError = ({ children }) =>
  children ? <p role="alert" className="mt-2 text-[12.5px] text-[#dc2626]">{children}</p> : null;