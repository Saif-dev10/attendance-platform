"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  endSession,
  getCourses,
  getOverview,
  getSessionRecords,
} from "@/lib/services/attendanceService";

const DEFAULT_LEVEL = 300;
const DEFAULT_SEMESTER = "2nd Semester";
const EMPTY = [];

const matches = (course, level, semester) => course.level === level && course.semester === semester;

// Owns the Course/Level/Semester selection and everything loaded for it.
// All data comes through attendanceService, so the page doesn't know it's mock data.
export default function useAttendanceOverview() {
  const [courses, setCourses] = useState([]);
  const [coursesReady, setCoursesReady] = useState(false);
  const [level, setLevel] = useState(DEFAULT_LEVEL);
  const [semester, setSemester] = useState(DEFAULT_SEMESTER);
  const [courseId, setCourseId] = useState("");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const [ending, setEnding] = useState(false);
  const [actionError, setActionError] = useState("");

  // Level and semester narrow the course list; the course select only shows what's left.
  const visibleCourses = useMemo(
    () => courses.filter((course) => matches(course, level, semester)),
    [courses, level, semester]
  );

  const loadCourses = useCallback(async () => {
    try {
      const list = await getCourses();
      setCourses(list);
      setCourseId(
        (previous) => previous || list.find((c) => matches(c, DEFAULT_LEVEL, DEFAULT_SEMESTER))?.id || ""
      );
      setCoursesReady(true);
      setError("");
    } catch {
      setError("Could not load your courses. Check your connection and try again.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  useEffect(() => {
    if (!coursesReady) return undefined;

    if (!courseId) {
      setData(null);
      setLoading(false);
      return undefined;
    }

    // The flag stops a slow response for a previous course from overwriting the current one.
    let cancelled = false;
    setLoading(true);
    setError("");

    (async () => {
      try {
        const overview = await getOverview({ courseId });
        const records = overview.session ? await getSessionRecords(overview.session.id) : EMPTY;
        if (!cancelled) setData({ ...overview, records });
      } catch {
        if (!cancelled) setError("Could not load attendance data. Check your connection and try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [coursesReady, courseId, reloadKey]);

  const changeLevel = (nextLevel) => {
    setLevel(nextLevel);
    setCourseId(courses.find((c) => matches(c, nextLevel, semester))?.id ?? "");
  };

  const changeSemester = (nextSemester) => {
    setSemester(nextSemester);
    setCourseId(courses.find((c) => matches(c, level, nextSemester))?.id ?? "");
  };

  const retry = () => {
    if (!coursesReady) loadCourses();
    else setReloadKey((key) => key + 1);
  };

  const endCurrentSession = async () => {
    if (!data?.session) return;

    setEnding(true);
    setActionError("");
    try {
      const result = await endSession(data.session.id);
      // Use the status the server returned. With a real API, refetch here so the
      // numbers reflect whatever the server does when a session closes.
      setData((previous) => ({
        ...previous,
        session: { ...previous.session, status: result.status },
      }));
    } catch {
      setActionError("Could not end the session. Please try again.");
    } finally {
      setEnding(false);
    }
  };

  return {
    courses: visibleCourses,
    courseId,
    level,
    semester,
    selectCourse: setCourseId,
    changeLevel,
    changeSemester,
    session: data?.session ?? null,
    summary: data?.summary ?? null,
    trend: data?.trend ?? EMPTY,
    teaching: data?.teaching ?? null,
    records: data?.records ?? EMPTY,
    loading,
    error,
    retry,
    ending,
    actionError,
    endCurrentSession,
  };
}