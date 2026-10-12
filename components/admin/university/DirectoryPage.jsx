"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTopbar, { PageBody } from "@/components/admin/shared/AdminTopbar";
import AdminButton from "@/components/admin/shared/AdminButton";
import TableToolbar, { SearchInput } from "@/components/admin/shared/TableToolbar";
import DataTable from "@/components/admin/shared/DataTable";
import EmptyState from "@/components/admin/shared/EmptyState";
import { useShell } from "@/components/admin/shared/AdminShell";
import Select from "@/components/ui/Select";
import SegmentedControl from "@/components/ui/SegmentedControl";
import { PrevNext } from "@/components/ui/Pagination";
import useAsync from "@/lib/admin/useAsync";
import { InferredNote } from "./Tag";

/**
 * Searchable, filterable, paginated list page.
 * load({ q, filter, tab, page, pageSize }) => Promise<{ items, total }>
 * filter: { label, options }   tabs: [{ value, label }]   (both optional)
 */
export default function DirectoryPage({ breadcrumb, title, actions, searchPlaceholder, filter, tabs, load, columns, rowHref, noun, pageSize = 10, emptyIcon = "search" }) {
  const router = useRouter();
  const { openMenu } = useShell();
  const [q, setQ] = useState("");
  const [dq, setDq] = useState("");
  const [fv, setFv] = useState("all");
  const [tv, setTv] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => {
      setDq(q);
      setPage(1);
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  const { data, loading, error, reload } = useAsync(() => load({ q: dq, filter: fv, tab: tv, page, pageSize }), [dq, fv, tv, page]);
  const filtered = !!dq || fv !== "all" || tv !== "all";
  const clear = () => { setQ(""); setDq(""); setFv("all"); setTv("all"); setPage(1); };

  return (
    <>
      <AdminTopbar onMenu={openMenu} breadcrumb={breadcrumb} title={title} actions={actions} />
      <PageBody>
        <InferredNote />
        <TableToolbar>
          <SearchInput className="min-w-[200px] flex-1 sm:max-w-[340px]" value={q} onChange={setQ} placeholder={searchPlaceholder} />
          {filter && <Select compact aria-label={filter.label} options={filter.options} value={fv} onChange={(e) => { setFv(e.target.value); setPage(1); }} />}
          {tabs && (
            <div className="ml-auto">
              <SegmentedControl label={`Filter ${noun}`} options={tabs} value={tv} onChange={(v) => { setTv(v); setPage(1); }} />
            </div>
          )}
        </TableToolbar>

        <div className={loading && data ? "opacity-60 transition-opacity" : ""}>
          <DataTable
            columns={columns}
            rows={data?.items || []}
            loading={loading && !data}
            error={error}
            onRetry={reload}
            onRowClick={rowHref ? (r) => router.push(rowHref(r)) : undefined}
            minWidth={820}
            empty={
              <EmptyState
                icon={emptyIcon}
                title={`No ${noun} found`}
                message={filtered ? "Nothing matches your search or filters." : `There are no ${noun} yet.`}
                action={filtered ? <AdminButton size="sm" onClick={clear}>Clear filters</AdminButton> : null}
              />
            }
            footer={data ? <PrevNext page={page} pageSize={pageSize} total={data.total} noun={noun} onChange={setPage} /> : null}
          />
        </div>
      </PageBody>
    </>
  );
}