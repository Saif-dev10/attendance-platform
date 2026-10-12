"use client";
import { useState } from "react";
import AdminTopbar, { PageBody } from "@/components/admin/shared/AdminTopbar";
import AdminButton from "@/components/admin/shared/AdminButton";
import ErrorState from "@/components/admin/shared/ErrorState";
import LoadingState from "@/components/admin/shared/LoadingState";
import { useShell } from "@/components/admin/shared/AdminShell";
import Select from "@/components/ui/Select";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useToast } from "@/components/ui/Toast";
import useAsync from "@/lib/admin/useAsync";
import { formatDateTime } from "@/lib/admin/format";
import Tag, { InferredNote } from "@/components/admin/university/Tag";
import TimetableGrid from "@/components/admin/university/TimetableGrid";
import { getTimetable, publishTimetable, TIMETABLE_DEPT_OPTIONS } from "@/lib/services/admin/universityService";

export default function TimetableAdminPage() {
  const { openMenu } = useShell();
  const toast = useToast();
  const [dept, setDept] = useState("CSC");
  const [tick, setTick] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const { data, loading, error, reload } = useAsync(() => getTimetable(dept), [dept, tick]);

  const publish = async () => {
    setBusy(true);
    try {
      await publishTimetable(dept);
      toast.push({ title: "Timetable published", message: `${data.deptName}. Sample mode: nobody was actually notified.` });
      setConfirm(false);
      setTick((t) => t + 1);
    } catch (err) {
      toast.push({ tone: "error", title: "Could not publish", message: err.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <AdminTopbar
        onMenu={openMenu}
        breadcrumb={[{ label: "Operations" }, { label: "Timetable Admin" }]}
        title="Timetable Admin"
        actions={<AdminButton variant="primary" icon="check" disabled={!data} onClick={() => setConfirm(true)}>{data?.published ? "Republish" : "Publish timetable"}</AdminButton>}
      />
      <PageBody>
        <InferredNote />
        <div className="skul-card mb-5 flex flex-wrap items-center gap-4 px-5 py-4">
          <Select compact aria-label="Department" options={TIMETABLE_DEPT_OPTIONS} value={dept} onChange={(e) => setDept(e.target.value)} />
          <p className="text-[13px] text-[#6b7587]">Session 2024/2025 · Semester 1</p>
          <div className="ml-auto">
            {data && (data.published ? <Tag tone="green" icon="checkCircle">Published {formatDateTime(data.published.at)}</Tag> : <Tag tone="amber" icon="clock">Draft · not published</Tag>)}
          </div>
        </div>

        <div className="skul-card overflow-hidden">
          {error ? <ErrorState error={error} onRetry={reload} /> : loading && !data ? <LoadingState rows={5} /> : <TimetableGrid slots={data.slots} />}
        </div>
      </PageBody>

      <ConfirmDialog
        open={confirm}
        title={`Publish timetable for ${data?.deptName || "this department"}?`}
        message="Students and lecturers in this department will see this timetable."
        consequences={["A previously published version is replaced.", "An entry is added to Recent Activity."]}
        confirmLabel="Publish timetable"
        tone="primary"
        loading={busy}
        onConfirm={publish}
        onCancel={() => !busy && setConfirm(false)}
      />
    </>
  );
}