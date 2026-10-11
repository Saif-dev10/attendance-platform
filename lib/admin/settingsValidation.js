import { intInRange, required } from "./validation";

export function validateSection(section, values) {
  const e = {};
  if (section === "policy") {
    e.sessionLengthWeeks = intInRange(values.sessionLengthWeeks, 8, 26, "Session length");
    e.maxCourseCredit = intInRange(values.maxCourseCredit, 12, 36, "Max course credit");
    if (values.lowAttendanceAlerts) e.lowAttendanceThreshold = intInRange(values.lowAttendanceThreshold, 1, 100, "Threshold");
  }
  if (section === "security") {
    e.minPasswordLength = intInRange(values.minPasswordLength, 8, 64, "Minimum password length");
    e.sessionTimeoutMinutes = intInRange(values.sessionTimeoutMinutes, 5, 480, "Session timeout");
    e.maxFailedLogins = intInRange(values.maxFailedLogins, 3, 10, "Failed login limit");
  }
  if (section === "storage") {
    e.maxUploadMb = intInRange(values.maxUploadMb, 1, 100, "Max upload size");
    e.retentionDays = intInRange(values.retentionDays, 30, 3650, "Retention");
    e.apiRateLimitPerMinute = intInRange(values.apiRateLimitPerMinute, 60, 5000, "API rate limit");
  }
  if (section === "email") {
    values.templates.forEach((t) => {
      e[`${t.id}.subject`] = required(t.subject, "Subject") || (t.subject.length > 120 ? "Subject must be 120 characters or fewer." : "");
      e[`${t.id}.body`] =
        required(t.body, "Body") ||
        t.required.filter((token) => !t.body.includes(token)).map((token) => `Missing ${token}`).join(", ");
    });
  }
  return Object.fromEntries(Object.entries(e).filter(([, m]) => m));
}

export const SETTINGS_SECTIONS = ["policy", "security", "storage", "email"];

export function validateAll(values) {
  return Object.fromEntries(SETTINGS_SECTIONS.map((s) => [s, validateSection(s, values[s])]));
}

export const anyErrors = (all) => Object.values(all).some((section) => Object.keys(section).length > 0);