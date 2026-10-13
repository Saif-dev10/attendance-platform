"use client";
import AdminTopbar, { PageBody } from "@/components/admin/shared/AdminTopbar";
import ErrorState from "@/components/admin/shared/ErrorState";
import LoadingState from "@/components/admin/shared/LoadingState";
import Icon from "@/components/admin/shared/Icon";
import { useShell } from "@/components/admin/shared/AdminShell";
import useAsync from "@/lib/admin/useAsync";
import Tag, { InferredNote } from "@/components/admin/university/Tag";
import { getStructure } from "@/lib/services/admin/universityServices";

export default function AcademicStructurePage() {
  const { openMenu } = useShell();
  const { data, loading, error, reload } = useAsync(() => getStructure(), []);

  return (
    <>
      <AdminTopbar onMenu={openMenu} breadcrumb={[{ label: "Academic Management" }, { label: "Academic Structure" }]} title="Academic Structure" />
      <PageBody narrow>
        <InferredNote />
        {error ? (
          <div className="skul-card"><ErrorState error={error} onRetry={reload} /></div>
        ) : loading && !data ? (
          <div className="skul-card"><LoadingState rows={5} /></div>
        ) : (
          <div className="space-y-4">
            {data.faculties.map((f, i) => (
              <details key={f.name} open={i === 0} className="skul-card group overflow-hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-6 py-4">
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f3f5f9] text-[#4b5565]"><Icon name="structure" size={18} /></span>
                    <span>
                      <span className="skul-heading block text-[15px] font-semibold text-[#0b1a30]">{f.name}</span>
                      <span className="block text-[12px] text-[#6b7587]">{f.departments.length} department{f.departments.length === 1 ? "" : "s"}</span>
                    </span>
                  </span>
                  <Icon name="chevronDown" size={16} className="text-[#6b7587] transition-transform group-open:rotate-180" />
                </summary>
                <ul className="divide-y divide-[#eef0f4] border-t border-[#eef0f4]">
                  {f.departments.map((d) => (
                    <li key={d.code} className="px-6 py-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-[14px] font-semibold text-[#0b1a30]">
                          {d.name} <span className="ml-1 rounded bg-[#f3f5f9] px-1.5 py-0.5 font-mono text-[11px] font-bold text-[#6b7587]">{d.code}</span>
                        </p>
                        <p className="text-[12px] text-[#6b7587]">{d.lecturers} lecturers · {d.courses} courses</p>
                      </div>
                      {d.programmes.length > 0 && (
                        <ul className="mt-2.5 flex flex-wrap gap-2">
                          {d.programmes.map((p) => (
                            <li key={p.id}><Tag tone={p.type === "postgraduate" ? "blue" : "gray"}>{p.name}</Tag></li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        )}
      </PageBody>
    </>
  );
}