"use client";
import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import AdminButton from "@/components/admin/shared/AdminButton";
import { useToast } from "@/components/ui/Toast";
import useAsync from "@/lib/admin/useAsync";
import { parseCsv, downloadText } from "@/lib/admin/csv";
import { IMPORT_FILE_TYPES } from "@/lib/admin/onboardingSteps";
import { listInstitutions } from "@/lib/services/admin/institutionsService";
import { createImport, IMPORT_TEMPLATES, buildTemplateCsv } from "@/lib/services/admin/importsService";

const MAX_BYTES = 10 * 1024 * 1024;

/** Render conditionally ({open && <NewImportModal/>}) so state resets on each open. */
export default function NewImportModal({ onClose, onCreated }) {
  const toast = useToast();
  const { data: insts, loading: loadingInsts } = useAsync(() => listInstitutions({ pageSize: 1000 }), []);
  const [institutionId, setInstitutionId] = useState("");
  const [type, setType] = useState("students");
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState(null); // { rows, estimated } | null
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  // Re-inspect when the file or the selected type changes.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setInfo(null);
      setFileError("");
      if (!file) return;
      if (!/\.(csv|xlsx)$/i.test(file.name)) return setFileError("Attach a .csv or .xlsx file.");
      if (file.size > MAX_BYTES) return setFileError("File must be 10 MB or smaller.");
      if (/\.xlsx$/i.test(file.name)) {
        // XLSX is not parsed in the browser. The count is estimated (sample mode only).
        return setInfo({ rows: Math.max(1, Math.round(file.size / 90)), estimated: true });
      }
      const parsed = parseCsv(await file.text());
      if (cancelled) return;
      const missing = IMPORT_TEMPLATES[type].headers.filter((h) => !parsed.headers.includes(h));
      if (missing.length) return setFileError(`Missing required column(s): ${missing.join(", ")}.`);
      if (!parsed.rows.length) return setFileError("The file contains no records.");
      setInfo({ rows: parsed.rows.length, estimated: false });
    })();
    return () => {
      cancelled = true;
    };
  }, [file, type]);

  const options = [
    { value: "", label: "Select institution" },
    ...(insts?.items || []).filter((i) => i.status !== "suspended").map((i) => ({ value: i.id, label: `${i.name} (${i.code})` })),
  ];

  const submit = async () => {
    const local = {};
    if (!institutionId) local.institutionId = "Select an institution.";
    if (!file) local.file = "Choose a file to import.";
    else if (fileError) local.file = fileError;
    setErrors(local);
    if (Object.keys(local).length) return;

    setBusy(true);
    try {
      const { job } = await createImport({ institutionId, type, fileName: file.name, rows: info.rows });
      toast.push({ title: "Import queued", message: `${job.fileName} is being validated.` });
      onCreated?.(job);
      onClose();
    } catch (err) {
      setErrors(err.fields && Object.keys(err.fields).length ? err.fields : { form: err.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="New Global Import"
      subtitle="Upload a CSV or XLSX file for an institution."
      footer={
        <>
          <AdminButton onClick={onClose}>Cancel</AdminButton>
          <AdminButton variant="primary" icon="upload" loading={busy} onClick={submit}>Start import</AdminButton>
        </>
      }
    >
      <div className="space-y-5">
        {errors.form && <p role="alert" className="rounded-lg bg-[#fef2f2] px-3 py-2 text-[13px] text-[#991b1b]">{errors.form}</p>}
        <Select label="Institution" options={options} value={institutionId} onChange={(e) => setInstitutionId(e.target.value)} error={errors.institutionId} disabled={loadingInsts} />
        <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto]">
          <Select label="Import type" options={IMPORT_FILE_TYPES} value={type} onChange={(e) => setType(e.target.value)} error={errors.type} />
          <AdminButton icon="download" onClick={() => downloadText(IMPORT_TEMPLATES[type].fileName, buildTemplateCsv(type))}>Template</AdminButton>
        </div>
        <div>
          <label htmlFor="new-import-file" className="skul-eyebrow mb-1.5 block">File</label>
          <input id="new-import-file" type="file" accept=".csv,.xlsx" onChange={(e) => setFile(e.target.files?.[0] || null)} className="block w-full text-[13px] file:mr-3 file:rounded-lg file:border file:border-[#e5e8ee] file:bg-[#f3f5f9] file:px-3 file:py-2 file:text-[12.5px] file:font-semibold" />
          {(fileError || errors.file) && <p role="alert" className="mt-1.5 text-[12.5px] text-[#dc2626]">{errors.file || fileError}</p>}
          {info && (
            <p className="mt-1.5 text-[12.5px] text-[#047857]">
              {info.estimated ? `≈ ${info.rows.toLocaleString()} records (estimated from file size; XLSX is counted on the server)` : `${info.rows.toLocaleString()} records found`}
            </p>
          )}
          {errors.rows && <p role="alert" className="mt-1.5 text-[12.5px] text-[#dc2626]">{errors.rows}</p>}
        </div>
        <p className="text-[11.5px] italic text-[#8a93a3]">Sample mode: the file is read in your browser only and nothing is uploaded to a server.</p>
      </div>
    </Modal>
  );
}