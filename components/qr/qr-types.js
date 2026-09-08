/**
 * Shared QR helpers + backend boundary for the SKUL QR scanning feature.
 *
 * The scanner is intentionally generic: a raw QR payload is decoded once,
 * then routed by `type`. Attendance is the only type with a full UI today;
 * everything else falls through to a "not supported yet" result so new
 * QR types (campus_ride, event, document_verification) can be added later
 * without touching the scanner itself.
 */

/**
 * TODO: replace with real API call.
 * POST /api/qr/validate
 */
export async function validateQRCode(rawPayload) {
  await new Promise((r) => setTimeout(r, 1400));

  // --- MOCK RESPONSES FOR UI DEMONSTRATION ONLY ---
  if (rawPayload === "INVALID_DEMO") {
    return {
      type: "attendance",
      status: "invalid",
    };
  }

  if (rawPayload === "EXPIRED_DEMO") {
    return {
      type: "attendance",
      status: "expired",
    };
  }

  if (rawPayload === "ALREADY_DEMO") {
    return {
      type: "attendance",
      status: "already_used",
      alreadyMarked: {
        courseCode: "CSC301",
        courseTitle: "Advanced Algorithms",
        timeRegistered: "9:58 AM",
        status: "Present",
      },
    };
  }

  if (rawPayload === "NOT_ELIGIBLE_DEMO") {
    return {
      type: "attendance",
      status: "not_eligible",
      notEligible: {
        courseCode: "CSC301",
        courseTitle: "Advanced Algorithms",
        reason: "You are not registered for this course this semester.",
      },
    };
  }

  return {
    type: "attendance",
    status: "valid",
    session: {
      courseCode: "CSC301",
      courseTitle: "Advanced Algorithms",
      lecturer: "Dr. Yusuf Muhammad",
      date: "September 14, 2026",
      time: "10:00 – 12:00 PM",
      location: "Main Lecture Hall B-04",
    },
  };
}

/**
 * TODO: replace with real API call.
 * POST /api/qr/attendance/confirm
 */
export async function confirmAttendance(payload) {
  await new Promise((r) => setTimeout(r, 1100));

  return {
    courseCode: "CSC301",
    courseTitle: "Advanced Algorithms",
    lecturer: "Dr. Yusuf Muhammad",
    date: "September 14, 2026",
    time: "10:00 – 12:00 PM",
    location: "Main Lecture Hall B-04",
    timeRegistered: new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    }),
    status: "Present",
  };
}