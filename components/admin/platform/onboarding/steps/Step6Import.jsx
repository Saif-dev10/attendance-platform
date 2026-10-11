"use client";
// INFERRED LAYOUT: no reference screenshot for Step 6.
import { useRef, useState } from "react";
import Select from "@/components/ui/Select";
import AdminButton from "@/components/admin/shared/AdminButton";
import Icon from "@/components/admin/shared/Icon";
import { IMPORT_FILE_TYPES } from "@/lib/admin/onboardingSteps";
import { parseCsv, downloadText } from "@/lib/admin/csv";
import { IMPORT_TEMPLATES, buildTemplateCsv } from "@/lib/services/admin/importsService";
import { useOnboarding } from "../OnboardingProvider";
import { Section, Notice, FieldError } from "./_parts";

const MAX_BYTES = 10 * 1024 * 1024;
const typeLabel = (t) => IMPORT_FILE_TYPES.find((x) => x.value === t)?.label || t;

export default function Step6Import() {
  const { values, errors, setValues } = useOnboarding();
  const files = values.imports.files;
  const [type, setType] = useState("academic_structure");
  const [fileError, setFileError] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef(null);

  if (values.method.choice !== "import") {
    return (
      <Section title="Data Import" description="Attach the files that will seed this institution.">
        <Notice tone="info" title="Skipped by your chosen setup method">
          You selected “{values.method.choice === "manual" ? "Manual setup" : "Decide later"}”, so no import files are needed. You can continue, or go back to Step 5 to choose bulk import.
        </Notice>
      </Section>
    );
  }

  const onFile = async (e) => {
    const f = e.target.files?.[0];
    setFileError("");
    if (!f) return;
    if (!/\.(csv|xlsx)$/i.test(f.name)) return setFileError("Attach a .csv or .xlsx file.");
    if (f.size > MAX_BYTES) return setFileError("File must be 10 MB or smaller.");

    setBusy(true);
    try {
      let rows = null; // XLSX is not parsed in the browser; the server validates it
      if (/\.csv$/i.test(f.name)) {
        const parsed = parseCsv(await f.text());
        const required = IMPORT_TEMPLATES[type].headers;
        const missing = required.filter((h) => !parsed.headers.includes(h));
        if (missing.length) return setFileError(`Missing required column(s): ${missing.join(", ")}. Download the template for the expected format.`);
        if (parsed.rows.length === 0) return setFileError("The file contains no records.");
        rows = parsed.rows.length;
      }
      setValues("imports", { files: [...files.filter((x) => x.type !== type), { type, fileName: f.name, rows }] }); // one file per type
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <Section title="Data Import" description="Attach CSV or XLSX files for this institution. Files are checked in the next step.">
      <div className="rounded-xl border border-[#e5e8ee] bg-white p-4">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <Select label="File type" options={IMPORT_FILE_TYPES} value={type} onChange={(e) => { setType(e.target.value); setFileError(""); }} />
          <AdminButton icon="download" onClick={() => downloadText(IMPORT_TEMPLATES[type].fileName, buildTemplateCsv(type))}>Download template</AdminButton>
        </div>
        <div className="mt-4">
          <label className="skul-eyebrow mb-1.5 block" htmlFor="import-file">Choose file</label>
          <input id="import-file" ref={inputRef} type="file" accept=".csv,.xlsx" onChange={onFile} disabled={busy} className="block w-full text-[13px] file:mr-3 file:rounded-lg file:border file:border-[#e5e8ee] file:bg-[#f3f5f9] file:px-3 file:py-2 file:text-[12.5px] file:font-semibold" />
          <FieldError>{fileError}</FieldError>
        </div>
      </div>

      <div>
        <p className="skul-eyebrow mb-2">Attached files ({files.length})</p>
        {files.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[#cfd5df] px-4 py-6 text-center text-[13px] text-[#6b7587]">No files attached yet.</p>
        ) : (
          <ul className="divide-y divide-[#eef0f4] rounded-xl border border-[#e5e8ee] bg-white">
            {files.map((f) => (
              <li key={f.type} className="flex items-center gap-3 px-4 py-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f3f5f9] text-[#6b7587]"><Icon name="file" size={18} /></span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-semibold text-[#0b1a30]">{f.fileName}</p>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#6b7587]">
                    {typeLabel(f.type)} · {f.rows === null ? "row count checked on server" : `${f.rows.toLocaleString()} records`}
                  </p>
                </div>
                <AdminButton size="sm" variant="ghost" onClick={() => setValues("imports", { files: files.filter((x) => x.type !== f.type) })} aria-label={`Remove ${f.fileName}`}>
                  Remove
                </AdminButton>
              </li>
            ))}
          </ul>
        )}
        <FieldError>{errors.files}</FieldError>
      </div>
    </Section>
  );
}