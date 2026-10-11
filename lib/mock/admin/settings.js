const defaults = {
  policy: { sessionLengthWeeks: 15, maxCourseCredit: 24, geofencing: true, geofenceRadiusMeters: 100, lowAttendanceAlerts: false, lowAttendanceThreshold: 70 },
  // The three sections below are INFERRED (no reference screenshots).
  security: { minPasswordLength: 10, requireAdminMfa: true, sessionTimeoutMinutes: 30, maxFailedLogins: 5 },
  storage: { maxUploadMb: 25, retentionDays: 365, apiRateLimitPerMinute: 600 },
  email: {
    templates: [
      { id: "welcome", name: "Welcome email", subject: "Welcome to {{institution_name}} on SKUL", body: "Hello {{first_name}},\n\nYour account on {{institution_name}} is ready.", required: ["{{first_name}}", "{{institution_name}}"] },
      { id: "password_reset", name: "Password reset", subject: "Reset your SKUL password", body: "Use the link below to choose a new password:\n{{reset_link}}\n\nThe link expires in 30 minutes.", required: ["{{reset_link}}"] },
      { id: "low_attendance", name: "Low attendance alert", subject: "Attendance warning for {{course_code}}", body: "Hello {{student_name}},\n\nYour attendance in {{course_code}} is {{attendance_percent}}%, below the required threshold.", required: ["{{student_name}}", "{{course_code}}", "{{attendance_percent}}"] },
      { id: "import_report", name: "Import report", subject: "Import report: {{file_name}}", body: "Your import of {{file_name}} has finished.\nSucceeded: {{success_count}}\nFailed: {{failed_count}}", required: ["{{file_name}}"] },
    ],
  },
};

export const settingsStore = {
  values: JSON.parse(JSON.stringify(defaults)),
  version: 1,
  maintenance: { enabled: false, since: null, enabledBy: null },
};