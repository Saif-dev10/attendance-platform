// Each validator returns an error string, or "" when valid.
export const required = (v, label = "This field") =>
  v === undefined || v === null || String(v).trim() === "" ? `${label} is required.` : "";

export const slug = (v) => {
  if (!v) return "University slug is required.";
  if (!/^[a-z0-9]+$/.test(v)) return "Use lowercase letters and numbers only.";
  if (v.length < 3 || v.length > 30) return "Slug must be 3–30 characters.";
  return "";
};

export const email = (v) =>
  !v ? "Email is required." : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address.";

export const intInRange = (v, min, max, label = "Value") => {
  if (v === "" || v === null || v === undefined) return `${label} is required.`;
  const n = Number(v);
  if (!Number.isInteger(n)) return `${label} must be a whole number.`;
  if (n < min || n > max) return `${label} must be between ${min} and ${max}.`;
  return "";
};

export const matric = (v) =>
  !v ? "Matriculation number is required." : /^\d{2}\/[A-Z]{2,4}\/\d{3}$/.test(v) ? "" : "Format: 21/CSC/042";

export const hasErrors = (errors) => Object.values(errors).some(Boolean);