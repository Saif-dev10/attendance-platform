"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { endSession, getCourses, refreshQrToken, startQrSession } from "@/lib/services/attendanceService";

function todayLocalDate() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const DEFAULT_SETUP = {
  courseId: "",
  level: 300,
  date: todayLocalDate(),
  room: "",
  scheduledTime: "",
  attendanceWindow: 10,
  geofenceEnabled: true,
  geofenceRadius: 100,
  method: "qr_location",
};

function secondsUntil(isoString) {
  return Math.max(0, Math.round((new Date(isoString).getTime() - Date.now()) / 1000));
}

// Owns the setup form, the started session, its countdown, and the refresh/end actions.
export default function useQRSession() {
  const [courses, setCourses] = useState([]);
  const [setup, setSetup] = useState(DEFAULT_SETUP);

  const [session, setSession] = useState(null);
  const [starting, setStarting] = useState(false);
  const [startError, setStartError] = useState("");

  const [refreshing, setRefreshing] = useState(false);
  const [ending, setEnding] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  // Guards against a refresh landing after the lecturer already ended the session.
  const sessionIdRef = useRef(null);

  useEffect(() => {
    getCourses().then((list) => {
      setCourses(list);
      setSetup((previous) => (previous.courseId ? previous : { ...previous, courseId: list[0]?.id ?? "" }));
    });
  }, []);

  const handleStart = async () => {
    if (!setup.courseId) return;

    setStarting(true);
    setStartError("");
    try {
      const started = await startQrSession(setup);
      sessionIdRef.current = started.sessionId;
      setSession(started);
      setSecondsRemaining(secondsUntil(started.expiresAt));
    } catch {
      setStartError("Could not start attendance. Please try again.");
    } finally {
      setStarting(false);
    }
  };

  const handleRefresh = async () => {
    if (!session) return;

    setRefreshing(true);
    try {
      const token = await refreshQrToken(session.sessionId);
      if (sessionIdRef.current !== session.sessionId) return; // session ended while this was in flight
      setSession((previous) => ({ ...previous, qrToken: token.qrToken, expiresAt: token.expiresAt }));
      setSecondsRemaining(secondsUntil(token.expiresAt));
    } finally {
      setRefreshing(false);
    }
  };

  const handleEnd = async () => {
    if (!session) return;

    setEnding(true);
    try {
      await endSession(session.sessionId);
      sessionIdRef.current = null;
      setSession(null);
    } finally {
      setEnding(false);
    }
  };

  // Ticks the countdown and auto-refreshes the token when it hits zero, so the
  // QR keeps rotating on its own the way the reference's helper text promises.
  useEffect(() => {
    if (!session) return undefined;

    const interval = setInterval(() => {
      setSecondsRemaining((previous) => {
        if (previous > 1) return previous - 1;
        handleRefresh();
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.sessionId]);

  return useMemo(
    () => ({
      courses,
      setup,
      setSetup,
      session,
      starting,
      startError,
      refreshing,
      ending,
      secondsRemaining,
      onStart: handleStart,
      onRefresh: handleRefresh,
      onEnd: handleEnd,
    }),
    [courses, setup, session, starting, startError, refreshing, ending, secondsRemaining]
  );
}
