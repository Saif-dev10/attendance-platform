"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import AdminTopbar, { PageBody } from "@/components/admin/shared/AdminTopbar";
import AdminButton from "@/components/admin/shared/AdminButton";
import DropdownMenu from "@/components/admin/shared/DropdownMenu";
import ErrorState from "@/components/admin/shared/ErrorState";
import LoadingState from "@/components/admin/shared/LoadingState";
import { useShell } from "@/components/admin/shared/AdminShell";
import useAsync from "@/lib/admin/useAsync";
import { getStudent } from "@/lib/services/admin/studentsService";
import StudentDetailsPanel from "@/components/admin/university/students/StudentDetailsPanel";
import StudentStatusDialog from "@/components/admin/university/students/StudentStatusDialog";
import { studentMenu } from "@/components/admin/university/students/StudentsTable";

export default function StudentRecordPage() {
  const { studentId } = useParams();
  const { openMenu } = useShell();
  const { data, loading, error, reload } = useAsync(() => getStudent(studentId), [studentId]);
  const [pending, setPending] = useState(null);
  const student = data?.student;

  return (
    <>
      <AdminTopbar
        onMenu={openMenu}
        breadcrumb={[
          { label: "Academic Management" },
          { label: "Student Directory", href: "/admin/university/students" },
          { label: student?.fullName || "Student" },
        ]}
        title="Student record"
        actions={
          <>
            <AdminButton icon="arrowLeft" href="/admin/university/students">
              <span className="hidden sm:inline">Back to directory</span>
              <span className="sm:hidden">Back</span>
            </AdminButton>
            {student && (
              <DropdownMenu
                items={studentMenu(student, (s, status) => setPending({ student: s, status }), { view: false })}
                renderTrigger={({ open, toggle }) => (
                  <AdminButton variant="primary" iconRight="chevronDown" onClick={toggle} aria-haspopup="menu" aria-expanded={open}>Actions</AdminButton>
                )}
              />
            )}
          </>
        }
      />
      <PageBody narrow>
        {error ? (
          <div className="skul-card"><ErrorState error={error} onRetry={reload} /></div>
        ) : loading && !student ? (
          <div className="skul-card"><LoadingState rows={5} /></div>
        ) : (
          <StudentDetailsPanel student={student} />
        )}
      </PageBody>
      <StudentStatusDialog pending={pending} onClose={() => setPending(null)} onDone={reload} />
    </>
  );
}