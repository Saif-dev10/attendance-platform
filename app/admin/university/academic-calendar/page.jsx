"use client";
import AdminTopbar, { PageBody } from "@/components/admin/shared/AdminTopbar";
import ErrorState from "@/components/admin/shared/ErrorState";
import LoadingState from "@/components/admin/shared/LoadingState";
import { useShell } from "@/components/admin/shared/AdminShell";
import useAsync from "@/lib/admin/useAsync";
import Tag, { InferredNote } from "@/components/admin/university/Tag";
import { getCalendar } from "@/lib/services/admin/universityServices";

const TYPE = {
  registration: { tone: "blue", label: "Registration", icon: "file" },
  lectures: { tone: "green", label: "Lectures", icon: "book" },
  break: { tone: "gray", label: "Break", icon: "clock" },
  exams: { tone: "amber", label: "Examinations", icon: "alert" },
};
const fmt = (iso) => new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
const range = (e) => (e.start === e.end ? fmt(e.start) : `${fmt(e.start)} – ${fmt(e.end)}`);

export default function AcademicCalendarPage() {
  const { openMenu } = useShell();
  const { data, loading, error, reload } = useAsync(() => getCalendar(), []);

  return (
    <>
      <AdminTopbar onMenu={openMenu} breadcrumb={[{ label: "Academic Management" }, { label: "Academic Calendar" }]} title="Academic Calendar" />
      <PageBody narrow>
        <InferredNote />
        <div className="skul-card overflow-hidden">
          {error ? (
            <ErrorState error={error} onRetry={reload} />
          ) : loading && !data ? (
            <LoadingState rows={6} />
          ) : (
            <>
              <div className="border-b border-[#eef0f4] px-6 py-4">
                <h2 className="skul-heading text-[16px] font-semibold text-[#0b1a30]">Session {data.session}</h2>
                <p className="text-[13px] text-[#6b7587]">{data.semester} and following dates</p>
              </div>
              <ol className="divide-y divide-[#eef0f4]">
                {data.events.map((e) => {
                  const t = TYPE[e.type];
                  return (
                    <li key={e.id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
                      <div>
                        <p className="text-[14px] font-semibold text-[#0b1a30]">{e.title}</p>
                        <p className="text-[12.5px] text-[#6b7587]">{range(e)}</p>
                      </div>
                      <Tag tone={t.tone} icon={t.icon}>{t.label}</Tag>
                    </li>
                  );
                })}
              </ol>
            </>
          )}
        </div>
      </PageBody>
    </>
  );
}