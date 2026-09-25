"use client";

import { useCallback, useEffect, useState } from "react";
import { correctRecord, getAuditTrail, getSessionRecord } from "@/lib/services/attendanceService";

// Loads one session's full record and owns the manual-correction flow for it.
export default function useSessionRecord(sessionId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [auditEntries, setAuditEntries] = useState([]);
  const [auditLoading, setAuditLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getSessionRecord(sessionId);
      setData(result);
    } catch {
      setError("Could not load this session's record. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    load();
  }, [load]);

  const selectedRecord = data?.records.find((record) => record.id === selectedRecordId) ?? null;

  const openCorrection = async (recordId) => {
    setSelectedRecordId(recordId);
    setAuditLoading(true);
    try {
      setAuditEntries(await getAuditTrail(sessionId, recordId));
    } finally {
      setAuditLoading(false);
    }
  };

  const closeCorrection = () => {
    setSelectedRecordId(null);
    setAuditEntries([]);
  };

  const saveCorrection = async ({ status, reason }) => {
    if (!selectedRecordId) return;

    setSaving(true);
    try {
      const { record, auditEntry } = await correctRecord(sessionId, selectedRecordId, { status, reason });
      setData((previous) => ({
        ...previous,
        records: previous.records.map((r) => (r.id === record.id ? record : r)),
      }));
      setAuditEntries((previous) => [auditEntry, ...previous]);
      closeCorrection();
    } finally {
      setSaving(false);
    }
  };

  return {
    session: data?.session ?? null,
    summary: data?.summary ?? null,
    records: data?.records ?? [],
    exceptions: data?.exceptions ?? [],
    loading,
    error,
    retry: load,
    selectedRecord,
    auditEntries,
    auditLoading,
    saving,
    openCorrection,
    closeCorrection,
    saveCorrection,
  };
}
