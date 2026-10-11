"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminTopbar, { PageBody } from "@/components/admin/shared/AdminTopbar";
import AdminButton from "@/components/admin/shared/AdminButton";
import ErrorState from "@/components/admin/shared/ErrorState";
import LoadingState from "@/components/admin/shared/LoadingState";
import { useShell } from "@/components/admin/shared/AdminShell";
import { useToast } from "@/components/ui/Toast";
import useAsync from "@/lib/admin/useAsync";
import { getImport, retryImport } from "@/lib/services/admin/importsService";
import ImportDetailPanel from "@/components/admin/platform/imports/ImportDetailPanel";
import ErrorReviewPanel from "@/components/admin/platform/imports/ErrorReviewPanel";

export default function ImportDetailPage() {
  const { importId } = useParams();
  const { openMenu } = useShell();
  const toast = useToast();
  const [tick, setTick] = useState(0);
  const [retrying, setRetrying] = useState(false);
  const { data, loading, error, reload } = useAsync(() => getImport(importId), [importId, tick]);
  const job = data?.job;

  useEffect(() => {
    if (job?.status !== "validating") return;
    const t = setInterval(() => setTick((x) => x + 1), 3000);
    return () => clearInterval(t);
  }, [job?.status]);

  // Honour the #errors anchor once content has rendered.
  useEffect(() => {
    if (job?.failed > 0 && window.location.hash === "#errors") document.getElementById("errors")?.scrollIntoView({ behavior: "smooth" });
  }, [job?.id, job?.failed]);

  const retry = async () => {
    setRetrying(true);
    try {
      await retryImport(importId);
      toast.push({ title: "Retry started", message: "The file is being validated again." });
      setTick((x) => x + 1);
    } catch (err) {
      toast.push({ tone: "error", title: "Could not retry", message: err.message });
    } finally {
      setRetrying(false);
    }
  };

  return (
    <>
      <AdminTopbar
        onMenu={openMenu}
        breadcrumb={[
          { label: "Platform Admin", href: "/admin/platform" },
          { label: "Data Imports", href: "/admin/platform/data-imports" },
          { label: job?.fileName || "Import" },
        ]}
        title="Import details"
        actions={
          <>
            <AdminButton icon="arrowLeft" href="/admin/platform/data-imports">Back to queue</AdminButton>
            {job?.status === "failed" && <AdminButton variant="primary" icon="activity" loading={retrying} onClick={retry}>Retry import</AdminButton>}
          </>
        }
      />
      <PageBody narrow>
        {error ? (
          <div className="skul-card">
            <ErrorState error={error} onRetry={reload} />
          </div>
        ) : loading && !job ? (
          <div className="skul-card"><LoadingState rows={5} /></div>
        ) : (
          <div className="space-y-6">
            <ImportDetailPanel job={job} />
            {job.failed > 0 && job.status !== "validating" && <ErrorReviewPanel job={job} />}
          </div>
        )}
      </PageBody>
    </>
  );
}