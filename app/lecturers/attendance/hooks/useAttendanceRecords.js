"use client";

import { useMemo, useState } from "react";
import { countByStatus } from "@/lib/mock/attendanceUtils";

const EMPTY = [];

// Search, status filter and paging live here so Live Attendance and the Session Record
// use the exact same rules. Today it filters in memory; if the backend paginates,
// this is the hook that would start passing these values to the service.
export default function useAttendanceRecords(records = EMPTY, { pageSize = 5 } = {}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const counts = useMemo(() => ({ all: records.length, ...countByStatus(records) }), [records]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return records.filter((record) => {
      if (statusFilter !== "all" && record.status !== statusFilter) return false;
      if (!term) return true;
      return (
        record.studentName.toLowerCase().includes(term) ||
        record.matricNumber.toLowerCase().includes(term)
      );
    });
  }, [records, search, statusFilter]);

  // Clamp instead of resetting in an effect, so a shrinking list never leaves us on a missing page.
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const rows = filtered.slice(startIndex, startIndex + pageSize);

  const updateSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const updateStatusFilter = (value) => {
    setStatusFilter(value);
    setPage(1);
  };

  return {
    rows,
    counts,
    search,
    statusFilter,
    startIndex,
    setSearch: updateSearch,
    setStatusFilter: updateStatusFilter,
    pagination: {
      page: currentPage,
      totalPages,
      from: filtered.length ? startIndex + 1 : 0,
      to: startIndex + rows.length,
      total: filtered.length,
      onPageChange: setPage,
    },
  };
}