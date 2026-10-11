import KpiCard from "@/components/admin/shared/KpiCard";
import { formatNumber } from "@/lib/admin/format";

function Skeleton() {
  return (
    <div className="skul-card p-5" aria-hidden>
      <div className="h-10 w-10 animate-pulse rounded-xl bg-[#eceff4]" />
      <div className="mt-4 h-7 w-20 animate-pulse rounded bg-[#eceff4]" />
      <div className="mt-2 h-3.5 w-32 animate-pulse rounded bg-[#eceff4]" />
    </div>
  );
}

export default function ImportSummaryCards({ summary }) {
  if (!summary) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => <Skeleton key={i} />)}
      </div>
    );
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard variant="detail" icon="activity" iconTone="blue" label="Total" value={formatNumber(summary.total)} caption="Global processed files" />
      <KpiCard variant="detail" icon="checkCircle" iconTone="green" label="Success" value={formatNumber(summary.success)} caption={`${summary.successRate}% success rate`} />
      <KpiCard variant="detail" icon="xCircle" iconTone="red" accent="danger" label="Failed" value={formatNumber(summary.failed)} caption="Requires intervention" captionTone="danger" />
      <KpiCard variant="detail" icon="spinner" iconTone="yellow" accent="warning" label="Processing" value={formatNumber(summary.processing)} caption="In validation queue" />
    </div>
  );
}