"use client";

import { useCallback, useEffect, useState } from "react";
import { getStudentProfile } from "@/lib/services/attendanceService";

export default function useStudentAttendance(studentId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getStudentProfile(studentId);
      setData(result);
    } catch {
      setError("Could not load this student's attendance record. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    student: data?.student ?? null,
    overall: data?.overall ?? null,
    quickStats: data?.quickStats ?? null,
    courses: data?.courses ?? [],
    trend: data?.trend ?? [],
    timeline: data?.timeline ?? [],
    loading,
    error,
    retry: load,
  };
}