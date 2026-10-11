"use client";
// INFERRED LAYOUT: no reference screenshot for Email Templates.
import { useId, useState } from "react";
import Input from "@/components/ui/Input";
import AdminButton from "@/components/admin/shared/AdminButton";
import Icon from "@/components/admin/shared/Icon";

const SAMPLE = {
  first_name: "Zainab",
  student_name: "Zainab Usman",
  institution_name: "Bayero University Kano",
  reset_link: "https://buk.skul.edu.ng/reset/abc123",
  course_code: "CSC 301",
  attendance_percent: "62",
  file_name: "students_2025_batch_a.csv",
  success_count: "412",
  failed_count: "3",
};
const preview = (text) => text.replace(/\{\{\s*(\w+)\s*\}\}/g, (m, k) => SAMPLE[k] ?? m);

function Textarea({ label, value, onChange, error, rows = 8 }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="skul-eyebrow mb-1.5 block">{label}</label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        className={`w-full rounded-lg border bg-white px-3.5 py-3 font-mono text-[13px] leading-relaxed text-[#0b1a30] ${error ? "border-[#dc2626]" : "border-[#e5e8ee]"}`}
      />
      {error && <p role="alert" className="mt-1.5 text-[11.5px] text-[#dc2626]">{error}</p>}
    </div>
  );
}

export default function EmailTemplatesTab({ templates, savedTemplates, errors, onChangeTemplate }) {
  const [selectedId, setSelectedId] = useState(templates[0].id);
  const t = templates.find((x) => x.id === selectedId) || templates[0];
  const savedT = savedTemplates.find((x) => x.id === t.id);
  const edited = (x) => {
    const s = savedTemplates.find((y) => y.id === x.id);
    return !!s && (s.subject !== x.subject || s.body !== x.body);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <ul className="space-y-1.5" aria-label="Email templates">
        {templates.map((x) => {
          const bad = errors[`${x.id}.subject`] || errors[`${x.id}.body`];
          const active = x.id === t.id;
          return (
            <li key={x.id}>
              <button
                onClick={() => setSelectedId(x.id)}
                aria-current={active ? "true" : undefined}
                className={`flex w-full items-center justify-between gap-2 rounded-lg border px-3.5 py-2.5 text-left text-[13.5px] font-medium ${
                  active ? "border-[#071a33] bg-white text-[#071a33] shadow-sm" : "border-[#e5e8ee] bg-white text-[#4b5565] hover:bg-[#f8f9fb]"
                }`}
              >
                <span className="truncate">{x.name}</span>
                {bad ? (
                  <span className="flex items-center gap-1 text-[10.5px] font-bold uppercase text-[#dc2626]"><Icon name="alert" size={12} />Fix</span>
                ) : edited(x) ? (
                  <span className="text-[10.5px] font-bold uppercase text-[#b45309]">Edited</span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="space-y-5">
        <div>
          <h2 className="skul-heading text-[18px] font-semibold text-[#0b1a30]">{t.name}</h2>
          <p className="mt-1 text-[13px] text-[#6b7587]">Sent automatically by the platform. Use placeholders such as {"{{first_name}}"}.</p>
        </div>

        <Input
          label="Subject"
          value={t.subject}
          onChange={(e) => onChangeTemplate(t.id, { subject: e.target.value })}
          error={errors[`${t.id}.subject`]}
          hint={`${t.subject.length}/120 characters`}
        />
        <Textarea label="Body" value={t.body} onChange={(e) => onChangeTemplate(t.id, { body: e.target.value })} error={errors[`${t.id}.body`]} />

        <div>
          <p className="skul-eyebrow mb-2">Required placeholders</p>
          <ul className="flex flex-wrap gap-2">
            {t.required.map((tok) => {
              const ok = t.body.includes(tok);
              return (
                <li key={tok} className={`flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[11.5px] font-semibold ${ok ? "border-[#a7f3d0] bg-[#ecfdf5] text-[#047857]" : "border-[#fecaca] bg-[#fef2f2] text-[#b91c1c]"}`}>
                  <Icon name={ok ? "check" : "x"} size={12} />
                  {tok}
                  <span className="sr-only">{ok ? "present" : "missing"}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className="skul-eyebrow mb-2">Preview (sample values)</p>
          <div className="rounded-xl border border-[#e5e8ee] bg-white p-4">
            <p className="text-[13.5px] font-semibold text-[#0b1a30]">{preview(t.subject)}</p>
            <p className="mt-2 whitespace-pre-line text-[13px] leading-relaxed text-[#4b5565]">{preview(t.body)}</p>
          </div>
        </div>

        <AdminButton
          size="sm"
          variant="ghost"
          disabled={!savedT || !edited(t)}
          onClick={() => onChangeTemplate(t.id, { subject: savedT.subject, body: savedT.body })}
        >
          Revert this template
        </AdminButton>
      </div>
    </div>
  );
}