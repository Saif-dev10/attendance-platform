"use client";
import Link from "next/link";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import ProgressBar from "@/components/admin/shared/ProgressBar";
import Icon from "@/components/admin/shared/Icon";
import { formatNumber } from "@/lib/admin/format";
import { formatUploaded } from "@/lib/admin/dates";
import { importTypeLabel } from "@/lib/mock/admin/imports";
import { FileTile } from "./ImportsTable";

function Fact({ label, children }) {
  return (
    <div>
      <dt className="skul-eyebrow">{label}</dt>
      <dd className="mt-1 text-[14px] text-[#0b1a30]">{children}</dd>
    </div>
  );
}

const size = (kb) => (kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`);

const MESSAGE = {
  validating: { icon: "spinner", spin: true, cls: "border-[#fde68a] bg-[#fffbeb] text-[#92400e]", text: "This file is being validated. The page updates automatically when processing finishes." },
  failed: { icon: "xCircle", cls: "border-[#fecaca] bg-[#fef2f2] text-[#991b1b]", text: "Too many records failed validation, so nothing was imported. Review the errors below, fix the source file, then retry or upload a corrected file." },
  completed_with_errors: { icon: "alert", cls: "border-[#fde68a] bg-[#fffbeb] text-[#92400e]", text: "Most records were imported. The failed records were skipped and are listed below." },
  completed: { icon: "checkCircle", cls: "border-[#a7f3d0] bg-[#ecfdf5] text-[#047857]", text: "All records were imported successfully." },
};

export default function ImportDetailPanel({ job }) {
  const m = MESSAGE[job.status];
  const pct = job.total ? (job.success / job.total) * 100 : 0;
  return (
    <section className="skul-card p-6">
      <div className="flex flex-wrap items-center gap-4">
        <FileTile name={job.fileName} failed={job.status === "failed"} />
        <div className="min-w-0 flex-1">
          <h2 className="skul-heading truncate text-[18px] font-semibold text-[#0b1a30]">{job.fileName}</h2>
          <p className="text-[10.5px] font-bold uppercase tracking-wide text-[#6b7587]">{importTypeLabel(job.type)}</p>
        </div>
        <StatusBadge status={job.status} />
      </div>

      <div className={`mt-5 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-[13px] ${m.cls}`}>
        <Icon name={m.icon} size={17} className={`mt-0.5 shrink-0 ${m.spin ? "skul-spin" : ""}`} />
        <span>{m.text}</span>
      </div>

      <dl className="mt-6 grid gap-x-6 gap-y-5 border-t border-[#eef0f4] pt-6 sm:grid-cols-3">
        <Fact label="Institution">
          <Link href={`/admin/platform/institutions/${job.institution.id}`} className="font-semibold hover:underline">{job.institution.name}</Link>
          <span className="block text-[12px] text-[#6b7587]">{job.institution.code}</span>
        </Fact>
        <Fact label="Uploaded">{formatUploaded(job.uploadedAt)}<span className="block text-[12px] text-[#6b7587]">by {job.uploadedBy}</span></Fact>
        <Fact label="File size">{size(job.sizeKb)}</Fact>
        <Fact label="Total records">{formatNumber(job.total)}</Fact>
        <Fact label="Succeeded"><span className="font-semibold text-[#047857]">{job.status === "validating" ? "—" : formatNumber(job.success)}</span></Fact>
        <Fact label="Failed"><span className={`font-semibold ${job.failed ? "text-[#b91c1c]" : ""}`}>{job.status === "validating" ? "—" : formatNumber(job.failed)}</span></Fact>
      </dl>

      {job.status !== "validating" && (
        <div className="mt-6">
          <p className="mb-2 text-[12px] text-[#6b7587]">{pct.toFixed(1)}% of records imported</p>
          <ProgressBar value={pct} tone={job.failed ? "amber" : "green"} height="h-2" label="Import success rate" />
        </div>
      )}
    </section>
  );
}