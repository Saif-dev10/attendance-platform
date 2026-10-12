"use client";
import AdminTopbar, { PageBody } from "./AdminTopbar";
import AdminButton from "./AdminButton";
import Icon from "./Icon";
import { useShell } from "./AdminShell";

/** Navigation target for sections that exist in the navigation but have no supplied reference screen. */
export default function SectionPlaceholder({ breadcrumb, title, description, planned = [], links = [], note }) {
  const { openMenu } = useShell();
  return (
    <>
      <AdminTopbar onMenu={openMenu} breadcrumb={breadcrumb} title={title} />
      <PageBody narrow>
        <section className="skul-card p-6">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-[#fde68a] bg-[#fffbeb] px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-[#92400e]">
            <Icon name="info" size={11} /> Inferred · no reference screen supplied
          </span>
          <h2 className="skul-heading mt-4 text-[20px] font-semibold text-[#0b1a30]">{title}</h2>
          <p className="mt-1 text-[14px] text-[#6b7587]">{description}</p>

          {planned.length > 0 && (
            <div className="mt-6 border-t border-[#eef0f4] pt-6">
              <p className="skul-eyebrow mb-3">This section is expected to cover</p>
              <ul className="space-y-2">
                {planned.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-[13.5px] text-[#0b1a30]">
                    <Icon name="check" size={15} className="text-[#8a93a3]" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {note && <p className="mt-5 text-[12.5px] text-[#6b7587]">{note}</p>}

          {links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2.5">
              {links.map((l, i) => (
                <AdminButton key={l.href} variant={i === 0 ? "primary" : "secondary"} icon={l.icon} href={l.href}>{l.label}</AdminButton>
              ))}
            </div>
          )}
        </section>
      </PageBody>
    </>
  );
}