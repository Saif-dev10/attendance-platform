"use client";
import TableToolbar, { SearchInput } from "@/components/admin/shared/TableToolbar";
import AdminButton from "@/components/admin/shared/AdminButton";
import Select from "@/components/ui/Select";
import { IMPORT_TYPES } from "@/lib/mock/admin/imports";

/** Draft values are edited freely; they only take effect on Apply (or Enter), as in the reference. */
export default function ImportFilters({ draft, onDraft, onApply, onReset }) {
  return (
    <TableToolbar className="!flex-nowrap max-md:!flex-wrap">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          onApply();
        }}
        className="flex w-full flex-wrap items-center gap-3"
      >
        <SearchInput className="min-w-[200px] flex-1 sm:max-w-[360px]" value={draft.q} onChange={(q) => onDraft({ ...draft, q })} placeholder="Search by filename or institution..." />
        <Select compact aria-label="Import type" className="min-w-[170px]" options={IMPORT_TYPES} value={draft.type} onChange={(e) => onDraft({ ...draft, type: e.target.value })} />
        <div className="ml-auto flex items-center gap-2">
          <AdminButton variant="ghost" onClick={onReset}>Reset</AdminButton>
          <AdminButton variant="primary" type="submit">Apply Filters</AdminButton>
        </div>
      </form>
    </TableToolbar>
  );
}