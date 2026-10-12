"use client";
import { useEffect, useState } from "react";
import AdminTopbar, { PageBody } from "@/components/admin/shared/AdminTopbar";
import AdminButton from "@/components/admin/shared/AdminButton";
import TableToolbar, { SearchInput } from "@/components/admin/shared/TableToolbar";
import { useShell } from "@/components/admin/shared/AdminShell";
import SegmentedControl from "@/components/ui/SegmentedControl";
import useAsync from "@/lib/admin/useAsync";
import { listStudents } from "@/lib/services/admin/studentsService";
import StudentsTable from "@/components/admin/university/students/StudentsTable";
import StudentFormModal from "@/components/admin/university/students/StudentFormModal";
import StudentImportModal from "@/components/admin/university/students/StudentImportModal";
import StudentStatusDialog from "@/components/admin/university/students/StudentStatusDialog";

const PAGE_SIZE = 10;
const LEVEL_TABS = [
  { value: "all", label: "All" },
  { value: "undergraduate", label: "Undergraduate" },
  { value: "postgraduate", label: "Postgraduate" },
];

export default function StudentDirectoryPage() {
  const { openMenu } = useShell();
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [level, setLevel] = useState("all");
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [pending, setPending] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => { setDebouncedQ(q); setPage(1); }, 250);
    return () => clearTimeout(t);
  }, [q]);

  const { data, loading, error, reload } = useAsync(
    () => listStudents({ q: debouncedQ, level, sort, page, pageSize: PAGE_SIZE }),
    [debouncedQ, level, sort, page]
  );

  const cycleSort = (key) => {
    setPage(1);
    setSort((s) => (!s || s.key !== key ? { key, dir: "asc" } : s.dir === "asc" ? { key, dir: "desc" } : null));
  };
  const clearAll = () => { setQ(""); setDebouncedQ(""); setLevel("all"); setSort(null); setPage(1); };
  const afterAdd = () => { clearAll(); reload(); };
  const filtered = !!debouncedQ || level !== "all";

  return (
    <>
      <AdminTopbar
        onMenu={openMenu}
        breadcrumb={[{ label: "Academic Management" }, { label: "Student Directory" }]}
        title="Student Records"
        actions={
          <>
            <AdminButton icon="import" onClick={() => setImportOpen(true)}>
              <span className="hidden sm:inline">Import Students</span>
              <span className="sm:hidden">Import</span>
            </AdminButton>
            <AdminButton variant="primary" icon="plus" onClick={() => setFormOpen(true)}>
              <span className="hidden sm:inline">Add New Student</span>
              <span className="sm:hidden">Add</span>
            </AdminButton>
          </>
        }
      />
      <PageBody>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <TableToolbar className="!mb-0 !p-2.5">
            <SearchInput className="min-w-[200px] sm:w-[320px]" value={q} onChange={setQ} placeholder="Search by name or matriculation number..." />
            <SegmentedControl label="Filter by programme type" options={LEVEL_TABS} value={level} onChange={(v) => { setLevel(v); setPage(1); }} />
          </TableToolbar>
          <div className="text-right" aria-live="polite">
            <p className="skul-eyebrow">Selected results</p>
            <p className="skul-heading text-[24px] font-bold leading-tight text-[#0b1a30]">{data ? data.total.toLocaleString() : "—"}</p>
            {data && <p className="text-[10.5px] text-[#8a93a3]">in sample · {data.population.toLocaleString()} enrolled</p>}
          </div>
        </div>

        <div className={loading && data ? "opacity-60 transition-opacity" : ""}>
          <StudentsTable
            data={data}
            loading={loading && !data}
            error={error}
            onRetry={reload}
            sort={sort}
            onSort={cycleSort}
            page={page}
            pageSize={PAGE_SIZE}
            onPage={setPage}
            onRequestStatus={(student, status) => setPending({ student, status })}
            filtered={filtered}
            onClear={clearAll}
            onAdd={() => setFormOpen(true)}
          />
        </div>
        {data?.source === "mock" && (
          <p className="mt-4 text-center text-[11.5px] text-[#8a93a3]">Sample data: the directory holds a sample of students; changes reset on reload.</p>
        )}
      </PageBody>

      {formOpen && <StudentFormModal onClose={() => setFormOpen(false)} onCreated={afterAdd} />}
      {importOpen && <StudentImportModal onClose={() => setImportOpen(false)} onImported={afterAdd} />}
      <StudentStatusDialog pending={pending} onClose={() => setPending(null)} onDone={reload} />
    </>
  );
}