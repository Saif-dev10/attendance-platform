"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import AdminButton from "@/components/admin/shared/AdminButton";
import Icon from "@/components/admin/shared/Icon";
import { useToast } from "@/components/ui/Toast";
import { parseCsv, downloadText } from "@/lib/admin/csv";
import { IMPORT_TEMPLATES, buildTemplateCsv } from "@/lib/services/admin/importsService";
import { previewStudentImport, commitStudentImport, PROGRAMMES } from "@/lib/services/admin/studentsService";

const REQUIRED = IMPORT_TEMPLATES.students.headers;
const MAX_ROWS = 5000;

function Stat({ label, value, tone }) {
  const cls = tone === "bad" && value > 0 ? "text-[#dc2626]" : tone === "good" ? "text-[#059669]" : "text-[#0b1a30]";
  return (
    <div className="rounded-xl border border-[#e5e8ee] bg-white px-4 py-3">
      <p className="skul-eyebrow">{label}</p>
      <p className={`skul-heading mt-1 text-[22px] font-bold ${cls}`}>{value.toLocaleString()}</p>
    </div>
  );
}

/** Used by "Import Students" and "Bulk Enrollment". CSV only. Render conditionally so state resets. */
export default function StudentImportModal({ onClose, onImported }) {
  const toast = useToast();
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [committing, setCommitting] = useState(false);

  const onFile = async (e) => {
    const f = e.target.files?.[0];
    setError("");
    setResult(null);
    if (!f) return;
    if (!/\.csv$/i.test(f.name)) return setError("Attach a .csv file. XLSX is not supported for student import.");
    if (f.size > 5 * 1024 * 1024) return setError("File must be 5 MB or smaller.");
    setBusy(true);
    try {
      const parsed = parseCsv(await f.text());
      const missing = REQUIRED.filter((h) => !parsed.headers.includes(h));
      if (missing.length) return setError(`Missing required column(s): ${missing.join(", ")}. Download the template for the expected format.`);
      if (!parsed.rows.length) return setError("The file contains no records.");
      if (parsed.rows.length > MAX_ROWS) return setError(`Import up to ${MAX_ROWS.toLocaleString()} students per file.`);
      setResult({ ...(await previewStudentImport(parsed.rows)), fileName: f.name });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const commit = async () => {
    setCommitting(true);
    try {
      const { imported } = await commitStudentImport(result.valid);
      toast.push({ title: "Students imported", message: `${imported.toLocaleString()} added to sample data from ${result.fileName}.` });
      onImported?.(imported);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setCommitting(false);
    }
  };

  return (
    <Modal
      open
      size="lg"
      onClose={busy || committing ? undefined : onClose}
      title="Import Students"
      subtitle="Upload a CSV file. Valid rows are imported; rows with problems are skipped and listed."
      footer={
        <>
          <AdminButton onClick={onClose} disabled={committing}>Cancel</AdminButton>
          <AdminButton variant="primary" icon="upload" loading={committing} disabled={!result || result.valid.length === 0} onClick={commit}>
            {result ? `Import ${result.valid.length.toLocaleString()} student${result.valid.length === 1 ? "" : "s"}` : "Import"}
          </AdminButton>
        </>
      }
    >
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e5e8ee] bg-[#f8f9fb] p-4">
          <div className="text-[13px] text-[#4b5565]">
            <p className="font-semibold text-[#0b1a30]">Required columns</p>
            <p className="mt-0.5 font-mono text-[11.5px]">{REQUIRED.join(", ")}</p>
            <p className="mt-1 text-[12px] text-[#6b7587]">Programme must match a catalogue name, e.g. {PROGRAMMES[0].name}. Level: 100–400, or Masters / PhD / PGD.</p>
          </div>
          <AdminButton icon="download" onClick={() => downloadText(IMPORT_TEMPLATES.students.fileName, buildTemplateCsv("students"))}>Template</AdminButton>
        </div>

        <div>
          <label htmlFor="student-import-file" className="skul-eyebrow mb-1.5 block">CSV file</label>
          <input id="student-import-file" type="file" accept=".csv" onChange={onFile} disabled={busy || committing} className="block w-full text-[13px] file:mr-3 file:rounded-lg file:border file:border-[#e5e8ee] file:bg-[#f3f5f9] file:px-3 file:py-2 file:text-[12.5px] file:font-semibold" />
          {busy && <p className="mt-2 flex items-center gap-2 text-[12.5px] text-[#6b7587]"><Icon name="spinner" size={14} className="skul-spin" /> Checking rows…</p>}
          {error && <p role="alert" className="mt-2 text-[12.5px] text-[#dc2626]">{error}</p>}
        </div>

        {result && (
          <>
            <div className="grid gap-3 sm:grid-cols-3">
              <Stat label="Rows in file" value={result.total} />
              <Stat label="Ready to import" value={result.valid.length} tone="good" />
              <Stat label="With problems" value={result.invalid.length} tone="bad" />
            </div>
            {result.invalid.length > 0 && (
              <div>
                <p className="skul-eyebrow mb-2">Rows that will be skipped{result.invalid.length > 8 ? ` (first 8 of ${result.invalid.length})` : ""}</p>
                <div className="overflow-x-auto rounded-xl border border-[#e5e8ee]">
                  <table className="w-full min-w-[480px] text-left text-[12.5px]">
                    <thead>
                      <tr className="bg-[#f8f9fb]"><th className="skul-eyebrow px-4 py-2.5">Line</th><th className="skul-eyebrow px-4 py-2.5">Matric</th><th className="skul-eyebrow px-4 py-2.5">Problem</th></tr>
                    </thead>
                    <tbody>
                      {result.invalid.slice(0, 8).map((r) => (
                        <tr key={r.line} className="border-t border-[#eef0f4]">
                          <td className="px-4 py-2.5 font-mono">{r.line}</td>
                          <td className="px-4 py-2.5 font-mono">{r.row.matric_number || "—"}</td>
                          <td className="px-4 py-2.5 text-[#991b1b]">{r.errors.join(" ")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
        <p className="text-[11.5px] italic text-[#8a93a3]">Sample mode: the file is read in your browser and students are added to local sample data only.</p>
      </div>
    </Modal>
  );
}