// Service boundary for the Settings feature.
//
// Every function below returns mock data today. A backend developer can
// replace the bodies of these functions with real API calls (fetch/axios/
// server actions) without touching any Settings UI component — the
// components only ever call these functions, never read mock data directly.

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ------------------------------------------------------------------ */
/* Notification preferences                                            */
/* ------------------------------------------------------------------ */

let mockNotificationPreferences = {
  assignmentReminders: true,
  courseAnnouncements: true,
  attendanceReminders: true,
  attendanceUpdates: true,
  examTimetableUpdates: true,
  examSeatUpdates: true,
  resultUpdates: true,
  supportUpdates: true,
  generalAnnouncements: false,
};

export async function getNotificationPreferences() {
  await delay(400);
  return { ...mockNotificationPreferences };
}

export async function updateNotificationPreference(key, value) {
  await delay(300);
  mockNotificationPreferences = {
    ...mockNotificationPreferences,
    [key]: value,
  };
  return { ...mockNotificationPreferences };
}

/* ------------------------------------------------------------------ */
/* Password                                                             */
/* ------------------------------------------------------------------ */

// Intentionally not wired to real authentication. SKUL's auth system
// (Firebase/Auth.js) owns password changes; this function is the single
// place a backend developer needs to call into that system from.
export async function changePassword({ currentPassword, newPassword }) {
  await delay(600);
  return {
    success: false,
    message:
      "Password changes aren't connected to SKUL's authentication system yet. This screen is ready for that integration.",
  };
}

/* ------------------------------------------------------------------ */
/* Help & feedback                                                      */
/* ------------------------------------------------------------------ */

export async function submitFeedback(message) {
  await delay(500);
  return {
    success: false,
    message: "Feedback submission is not connected to the support service yet.",
  };
}

/* ------------------------------------------------------------------ */
/* About                                                                */
/* ------------------------------------------------------------------ */

export function getAppInfo() {
  return {
    name: "SKUL",
    description:
      "SKUL is your university's student portal for academics, examinations, attendance and campus services.",
    version: "Version information",
    termsAvailable: false,
    privacyAvailable: false,
  };
}