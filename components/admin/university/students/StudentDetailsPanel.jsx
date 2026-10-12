"use client";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import ProgressBar from "@/components/admin/shared/ProgressBar";
import EmptyState from "@/components/admin/shared/EmptyState";
import Icon from "@/components/admin/shared/Icon";
import { StudentInitials, levelLabel, attendanceTone, TONE_TEXT } from "./StudentsTable";

function Fact({ label, children }) {
  return (
    <div>
      <dt className="skul-eyebrow">{label}</dt>
      <dd className="mt-1 text-[14px] text-[#0b1a30]">{children}</dd>
    </div>
  );
}

const BAR = { red: "red", amber: "amber", green: "green", muted: "navy" };

export default function StudentDetailsPanel({ student }) {
  const tone = attendanceTone(student.attendance);
  return (
    <div className="space-y-5">
      <section className="skul-card p-6">
        <div className="flex flex-wrap items-center gap-4">
          <StudentInitials name={student.fullName} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="skul-heading text-[20px] font-semibold text-[#0b1a30]">{student.fullName}</h2>
              <StatusBadge status={student.status} />
            </div>
            <p className="mt-1 text-[13px] text-[#6b7587]">{student.email}</p>
          </div>
        </div>
        <dl className="mt-6 grid gap-x-6 gap-y-5 border-t border-[#eef0f4] pt-6 sm:grid-cols-3">
          <Fact label="Matric number"><span className="rounded bg-[#f3f5f9] px-2 py-1 font-mono text-[12.5px] font-bold text-[#4b5565]">{student.matric}</span></Fact>
          <Fact label="Programme">{student.programme}</Fact>
          <Fact label="Level">{levelLabel(student)}</Fact>
          <Fact label="Department">{student.dept}</Fact>
          <Fact label="Study type"><span className="capitalize">{student.type}</span></Fact>
          <Fact label="Overall attendance">
            <span className={`inline-flex items-center gap-1 font-bold ${TONE_TEXT[tone]}`}>
              {tone === "red" && <Icon name="warning" size={14} />}
              {student.attendance === null ? "—" : `${student.attendance}%`}
            </span>
          </Fact>
        </dl>
      </section>

      <section className="skul-card overflow-hidden">
        <div className="border-b border-[#eef0f4] px-6 py-4">
          <h3 className="skul-heading text-[15px] font-semibold text-[#0b1a30]">Attendance by course</h3>
          <p className="text-[12.5px] text-[#6b7587]">Courses below 70% are marked for follow-up.</p>
        </div>
        {student.courses.length === 0 ? (
          <EmptyState icon="qr" title="No attendance recorded yet" message="Attendance appears here once the student has been enrolled in course offerings and scans in." />
        ) : (
          <ul className="divide-y divide-[#eef0f4]">
            {student.courses.map((c) => {
              const t = attendanceTone(c.attendance);
              return (
                <li key={c.code} className="grid items-center gap-3 px-6 py-3.5 sm:grid-cols-[1fr_220px_70px]">
                  <div>
                    <p className="text-[13.5px] font-semibold text-[#0b1a30]">{c.title}</p>
                    <p className="font-mono text-[11.5px] text-[#6b7587]">{c.code}</p>
                  </div>
                  <ProgressBar value={c.attendance} tone={BAR[t]} label={`${c.title} attendance`} />
                  <p className={`flex items-center justify-end gap-1 text-right text-[13.5px] font-bold ${TONE_TEXT[t]}`}>
                    {t === "red" && <Icon name="warning" size={13} title="Below 70%" />}
                    {c.attendance}%
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}