"use client";

import { useCallback, useEffect, useState } from "react";
import { getCourses, getSessions } from "@/lib/services/attendanceService";

// Powers the "View History" list: every past session for a course, newest first.
export default function useSessionHistory() {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCourses().then((list) => {
      setCourses(list);
      setCourseId((previous) => previous || list[0]?.id || "");
    });
  }, []);

  const load = useCallback(async () => {
    if (!courseId) {
      setSessions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    try {
      setSessions(await getSessions({ courseId }));
    } catch {
      setError("Could not load session history. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    load();
  }, [load]);

  return { courses, courseId, setCourseId, sessions, loading, error, retry: load };
}