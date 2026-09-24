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

const matches = (course, level, semester) =>
  course.level === level && course.semester === semester;

// Owns the Course/Level/Semester selection and everything loaded for it.
// All data comes through attendanceService, so the page does not need to
// know whether the data comes from mock data or a real API.
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

  // Only show courses belonging to the selected level and semester.
  const visibleCourses = useMemo(() => {
    return courses.filter((course) => matches(course, level, semester));
  }, [courses, level, semester]);

  // Load the lecturer's courses.
  const loadCourses = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const list = await getCourses();

      // Make sure the service always gives us an array.
      const nextCourses = Array.isArray(list) ? list : [];

      setCourses(nextCourses);

      // Keep the current course if it still exists.
      // Otherwise select the first course matching the current
      // level and semester.
      setCourseId((previousCourseId) => {
        const currentCourseStillExists = nextCourses.some(
          (course) =>
            course.id === previousCourseId &&
            matches(course, level, semester)
        );

        if (currentCourseStillExists) {
          return previousCourseId;
        }

        return (
          nextCourses.find((course) =>
            matches(course, level, semester)
          )?.id ?? ""
        );
      });

      setCoursesReady(true);
    } catch (err) {
      console.error("Failed to load attendance courses:", err);

      setCourses([]);
      setCourseId("");
      setCoursesReady(true);
      setError(
        "Could not load your courses. Check your connection and try again."
      );
    }
  }, [level, semester]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  // Load attendance data whenever the selected course changes.
  useEffect(() => {
    if (!coursesReady) {
      return undefined;
    }

    if (!courseId) {
      setData(null);
      setLoading(false);
      return undefined;
    }

    let cancelled = false;

    const loadOverview = async () => {
      setLoading(true);
      setError("");
      setActionError("");

      // Don't keep displaying the previous course's data while the
      // new course is loading.
      setData(null);

      try {
        const overview = await getOverview({ courseId });

        if (cancelled) return;

        const records = overview?.session
          ? await getSessionRecords(overview.session.id)
          : EMPTY;

        if (cancelled) return;

        setData({
          ...overview,
          records: Array.isArray(records) ? records : EMPTY,
        });
      } catch (err) {
        if (cancelled) return;

        console.error("Failed to load attendance overview:", err);

        setData(null);
        setError(
          "Could not load attendance data. Check your connection and try again."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadOverview();

    // Prevent a slower request from an older course from overwriting
    // the data for the course currently selected.
    return () => {
      cancelled = true;
    };
  }, [coursesReady, courseId, reloadKey]);

  // Select a different level and automatically select the first
  // available course for that level and the current semester.
  const changeLevel = useCallback(
    (nextLevel) => {
      setLevel(nextLevel);

      const nextCourse = courses.find((course) =>
        matches(course, nextLevel, semester)
      );

      setCourseId(nextCourse?.id ?? "");
    },
    [courses, semester]
  );

  // Select a different semester and automatically select the first
  // available course for that semester and the current level.
  const changeSemester = useCallback(
    (nextSemester) => {
      setSemester(nextSemester);

      const nextCourse = courses.find((course) =>
        matches(course, level, nextSemester)
      );

      setCourseId(nextCourse?.id ?? "");
    },
    [courses, level]
  );

  // Manually select a course from the course selector.
  const selectCourse = useCallback((nextCourseId) => {
    setCourseId(nextCourseId ?? "");
  }, []);

  // Reload either the course list or the currently selected course data.
  const retry = useCallback(() => {
    if (!coursesReady) {
      loadCourses();
      return;
    }

    setReloadKey((key) => key + 1);
  }, [coursesReady, loadCourses]);

  // End the currently active attendance session.
  const endCurrentSession = useCallback(async () => {
    if (!data?.session?.id) {
      return;
    }

    setEnding(true);
    setActionError("");

    try {
      const result = await endSession(data.session.id);

      // Keep the returned server status.
      // With a real backend, a full refetch can be performed here
      // if ending a session also changes attendance statistics.
      setData((previous) => {
        if (!previous?.session) {
          return previous;
        }

        return {
          ...previous,
          session: {
            ...previous.session,
            status: result?.status ?? "ended",
          },
        };
      });
    } catch (err) {
      console.error("Failed to end attendance session:", err);

      setActionError(
        "Could not end the session. Please try again."
      );
    } finally {
      setEnding(false);
    }
  }, [data?.session?.id]);

  return {
    // Course selectors
    courses: visibleCourses,
    courseId,
    level,
    semester,
    selectCourse,
    changeLevel,
    changeSemester,

    // Attendance data
    session: data?.session ?? null,
    summary: data?.summary ?? null,
    trend: data?.trend ?? EMPTY,
    teaching: data?.teaching ?? null,
    records: data?.records ?? EMPTY,

    // Loading/error state
    loading,
    error,
    retry,

    // Session actions
    ending,
    actionError,
    endCurrentSession,
  };
}