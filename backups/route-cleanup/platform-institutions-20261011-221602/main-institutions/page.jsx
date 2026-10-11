"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AdminTopbar, { PageBody } from "@/components/admin/shared/AdminTopbar";
import AdminButton from "@/components/admin/shared/AdminButton";
import DropdownMenu from "@/components/admin/shared/DropdownMenu";
import Icon from "@/components/admin/shared/Icon";
import TableToolbar, { SearchInput } from "@/components/admin/shared/TableToolbar";
import { useShell } from "@/components/admin/shared/AdminShell";
import SegmentedControl from "@/components/ui/SegmentedControl";
import Select from "@/components/ui/Select";
import useAsync from "@/lib/admin/useAsync";
import { listInstitutions } from "@/lib/services/admin/institutionsService";
import { REGIONS } from "@/lib/admin/onboardingSteps";
import QuickActionsMenu from "@/components/admin/platform/QuickActionsMenu";
import InstitutionsTable from "@/components/admin/platform/institutions/InstitutionsTable";
import StatusChangeDialog from "@/components/admin/platform/institutions/StatusChangeDialog";

const PAGE_SIZE = 5;
const TABS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "onboarding", label: "Onboarding" },
];
const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "onboarding", label: "Onboarding" },
  { value: "suspended", label: "Suspended" },
];
const REGION_OPTIONS = [{ value: "all", label: "All regions" }, ...REGIONS.map((r) => ({ value: r, label: r }))];

function InstitutionsView() {
  const params = useSearchParams();
  const { openMenu } = useShell();
  const [q, setQ] = useState(params.get("q") || "");
  const [debouncedQ, setDebouncedQ] = useState(q);
  const [status, setStatus] = useState(params.get("status") || "all");
  const [region, setRegion] = useState(params.get("region") || "all");
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(1);
  const [pending, setPending] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedQ(q);
      setPage(1);
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  const { data, loading, error, reload } = useAsync(
    () => listInstitutions({ q: debouncedQ, status, region, sort, page, pageSize: PAGE_SIZE }),
    [debouncedQ, status, region, sort, page]
  );

  const updateStatus = (v) => { setStatus(v); setPage(1); };
  const updateRegion = (v) => { setRegion(v); setPage(1); };
  const cycleSort = (key) => {
    setPage(1);
    setSort((s) => (!s || s.key !== key ? { key, dir: "asc" } : s.dir === "asc" ? { key, dir: "desc" } : null));
  };
  const clearAll = () => { setQ(""); setDebouncedQ(""); setStatus("all"); setRegion("all"); setSort(null); setPage(1); };

  const filterCount = (region !== "all" ? 1 : 0) + (status === "suspended" ? 1 : 0);
  const filtered = !!debouncedQ || status !== "all" || region !== "all";

  return (
    <>
      <AdminTopbar
        onMenu={openMenu}
        breadcrumb={[{ label: "Platform Admin", href: "/admin/platform" }, { label: "Institutions" }]}
        title="Institutions Management"
        actions={
          <>
            <span className="hidden sm:block"><QuickActionsMenu /></span>
            <AdminButton variant="primary" icon="plusCircle" href="/admin/platform/onboarding">Create Institution</AdminButton>
          </>
        }
      />
      <PageBody>
        <TableToolbar>
          <SearchInput className="min-w-[200px] flex-1 sm:max-w-[340px]" value={q} onChange={setQ} placeholder="Search by name, code or slug..." />
          <DropdownMenu
            align="left"
            width={280}
            renderTrigger={({ open, toggle }) => (
              <button onClick={toggle} aria-haspopup="dialog" aria-expanded={open} className="flex h-10 items-center gap-2 rounded-lg bg-[#f3f5f9] px-3.5 text-[13.5px] font-medium text-[#4b5565] hover:bg-[#eceff4]">
                <Icon name="filter" size={16} />
                Filters
                {filterCount > 0 && <span className="rounded-full bg-[#071a33] px-1.5 text-[10.5px] font-bold text-white">{filterCount}</span>}
              </button>
            )}
          >
            {() => (
              <div className="space-y-4 p-3">
                <Select label="Region" options={REGION_OPTIONS} value={region} onChange={(e) => updateRegion(e.target.value)} />
                <Select label="Status" options={STATUS_OPTIONS} value={status} onChange={(e) => updateStatus(e.target.value)} />
                <AdminButton size="sm" variant="ghost" className="w-full" onClick={clearAll}>Clear all</AdminButton>
              </div>
            )}
          </DropdownMenu>
          <div className="ml-auto">
            <SegmentedControl label="Filter by status" options={TABS} value={status} onChange={updateStatus} />
          </div>
        </TableToolbar>

        <InstitutionsTable
          data={data}
          loading={loading}
          error={error}
          onRetry={reload}
          sort={sort}
          onSort={cycleSort}
          page={page}
          pageSize={PAGE_SIZE}
          onPage={setPage}
          onRequestStatus={(institution, next) => setPending({ institution, status: next })}
          onClearFilters={clearAll}
          filtered={filtered}
        />
      </PageBody>

      <StatusChangeDialog pending={pending} onClose={() => setPending(null)} onDone={reload} />
    </>
  );
}

// useSearchParams requires a Suspense boundary in the App Router.
export default function InstitutionsPage() {
  return (
    <Suspense fallback={null}>
      <InstitutionsView />
    </Suspense>
  );
}