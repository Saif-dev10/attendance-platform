// All values here are SAMPLE data. The UI labels them as such; none are live production metrics.
export const platformKpiBase = [
  { id: "institutions", label: "Total Institutions", icon: "institutions", chip: "+2 this mo", chipTone: "positive" },
  { id: "students", label: "Total Active Students", value: "142.5k", icon: "student", chip: "↗ 3.1%", chipTone: "positive" },
  { id: "staff", label: "Faculty & Staff", value: "12.8k", icon: "lecturer", chip: "Stable", chipTone: "neutral" },
  { id: "subscriptions", label: "Active Subscriptions", value: "92%", icon: "activity", chip: "Healthy", chipTone: "positive" },
];

export const platformActivity = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  logins: [4200, 4800, 5100, 4900, 5600, 5300, 6100],
  attendance: [82, 85, 88, 84, 87, 71, 64], // percent; plotted on a secondary axis
};

export const resourceSample = {
  cpu: { percent: 42, note: "Peak: 68% at 10:00 AM" },
  memory: { percent: 61, note: "Total: 128GB Cluster" },
  db: { used: 842, max: 2000 },
};

export const alertStore = {
  items: [
    { id: "alr_gateway", severity: "critical", title: "Gateway Timeout Spike", message: "Paystack returned 504 errors (14x)." },
    { id: "alr_storage", severity: "warning", title: "Storage Warning", message: "UNILAG at 88% capacity." },
  ],
};