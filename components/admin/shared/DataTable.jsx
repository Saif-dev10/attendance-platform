"use client";
import Icon from "./Icon";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

/**
 * columns: [{ key, header, align?: "left"|"right", width?, render?: (row) => node, sortable? }]
 * Supports loading / error / empty states and optional sort via `sort` + `onSort`.
 */
export default function DataTable({
  columns,
  rows,
  rowKey = "id",
  loading = false,
  error = null,
  onRetry,
  onRowClick,
  rowClassName,
  sort,
  onSort,
  empty,
  footer,
  minWidth = 760,
}) {
  return (
    <div className="skul-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left" style={{ minWidth }}>
          <thead>
            <tr className="border-b border-[#e5e8ee] bg-[#f8f9fb]">
              {columns.map((c) => {
                const sorted = sort?.key === c.key;
                return (
                  <th
                    key={c.key}
                    scope="col"
                    aria-sort={sorted ? (sort.dir === "asc" ? "ascending" : "descending") : undefined}
                    style={{ width: c.width }}
                    className={`skul-eyebrow px-5 py-3.5 first:pl-6 last:pr-6 ${c.align === "right" ? "text-right" : ""}`}
                  >
                    {c.sortable && onSort ? (
                      <button onClick={() => onSort(c.key)} className="inline-flex items-center gap-1 uppercase tracking-[0.08em]">
                        {c.header}
                        {sorted && <Icon name="chevronDown" size={12} className={sort.dir === "asc" ? "rotate-180" : ""} />}
                      </button>
                    ) : (
                      c.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          {!loading && !error && rows.length > 0 && (
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row[rowKey]}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={`border-b border-[#eef0f4] last:border-0 ${onRowClick ? "cursor-pointer hover:bg-[#f8f9fb]" : ""} ${rowClassName?.(row) || ""}`}
                >
                  {columns.map((c) => (
                    <td key={c.key} className={`px-5 py-3.5 align-middle text-[13.5px] first:pl-6 last:pr-6 ${c.align === "right" ? "text-right" : ""}`}>
                      {c.render ? c.render(row) : row[c.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {loading && <LoadingState rows={4} />}
      {error && <ErrorState error={error} onRetry={onRetry} />}
      {!loading && !error && rows.length === 0 && (empty || <EmptyState title="No results" message="Try adjusting your search or filters." />)}
      {footer}
    </div>
  );
}