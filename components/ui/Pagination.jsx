"use client";
import Icon from "@/components/admin/shared/Icon";

/** Previous / Next footer: "Showing 1-5 of 24 institutions". */
export function PrevNext({ page, pageSize, total, noun = "items", onChange, nextLabel = "Next" }) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e5e8ee] bg-[#f8f9fb] px-6 py-3.5 text-[12.5px] text-[#6b7587]">
      <p>
        Showing <b className="text-[#0b1a30]">{from}-{to}</b> of <b className="text-[#0b1a30]">{total.toLocaleString()}</b> {noun}
      </p>
      <div className="flex gap-2">
        <button disabled={page <= 1} onClick={() => onChange(page - 1)} className="h-8 rounded-lg border border-[#e5e8ee] bg-white px-3 font-semibold text-[#0b1a30] disabled:text-[#b4bbc8]">
          Previous
        </button>
        <button disabled={page >= pageCount} onClick={() => onChange(page + 1)} className="h-8 rounded-lg border border-[#e5e8ee] bg-white px-3 font-semibold text-[#0b1a30] disabled:text-[#b4bbc8]">
          {nextLabel}
        </button>
      </div>
    </div>
  );
}

function windowPages(page, count) {
  if (count <= 5) return Array.from({ length: count }, (_, i) => i + 1);
  const pages = new Set([1, 2, 3, page - 1, page, page + 1, count]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= count).sort((a, b) => a - b);
  const out = [];
  sorted.forEach((p, i) => {
    if (i && p - sorted[i - 1] > 1) out.push("…");
    out.push(p);
  });
  return out;
}

/** Numbered pagination: "Page 1 of 480  ‹ 1 2 3 … ›   Showing 20 items per page". */
export function NumberedPagination({ page, pageCount, pageSize, pageSizes = [10, 20, 50], onChange, onPageSize }) {
  const btn = "flex h-8 min-w-8 items-center justify-center rounded-lg border px-2 text-[12.5px] font-semibold";
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e5e8ee] bg-[#f8f9fb] px-6 py-3.5 text-[12.5px] text-[#6b7587]">
      <div className="flex flex-wrap items-center gap-3">
        <span>Page <b className="text-[#0b1a30]">{page}</b> of {pageCount.toLocaleString()}</span>
        <nav aria-label="Pagination" className="flex items-center gap-1.5">
          <button aria-label="Previous page" disabled={page <= 1} onClick={() => onChange(page - 1)} className={`${btn} border-[#e5e8ee] bg-white disabled:text-[#b4bbc8]`}>
            <Icon name="chevronLeft" size={15} />
          </button>
          {windowPages(page, Math.min(pageCount, 999999)).map((p, i) =>
            p === "…" ? (
              <span key={`e${i}`} className={`${btn} border-[#e5e8ee] bg-white`}>…</span>
            ) : (
              <button key={p} aria-current={p === page ? "page" : undefined} onClick={() => onChange(p)} className={`${btn} ${p === page ? "border-[#cfd5df] bg-white text-[#0b1a30] shadow-sm" : "border-[#e5e8ee] bg-white"}`}>
                {p}
              </button>
            )
          )}
          <button aria-label="Next page" disabled={page >= pageCount} onClick={() => onChange(page + 1)} className={`${btn} border-[#e5e8ee] bg-white disabled:text-[#b4bbc8]`}>
            <Icon name="chevronRight" size={15} />
          </button>
        </nav>
      </div>
      <label className="flex items-center gap-2">
        Showing
        <select value={pageSize} onChange={(e) => onPageSize(Number(e.target.value))} className="h-8 rounded-lg border border-[#e5e8ee] bg-white px-2 font-semibold text-[#0b1a30]">
          {pageSizes.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        items per page
      </label>
    </div>
  );
}