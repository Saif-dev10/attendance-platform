export { REGIONS } from "@/lib/admin/onboardingSteps";

const REF = [
  { id: "inst_buk", name: "Bayero University Kano", abbr: "BUK", code: "BUK-001", slug: "buk", status: "active", students: 32450, lecturers: 1240, progress: 100, region: "North West", state: "Kano", type: "federal" },
  { id: "inst_abu", name: "Ahmadu Bello University", abbr: "ABU", code: "ABU-002", slug: "abu", status: "active", students: 45120, lecturers: 2105, progress: 100, region: "North West", state: "Kaduna", type: "federal" },
  { id: "inst_uab", name: "University of Abuja", abbr: "UAB", code: "UAB-003", slug: "uniabuja", status: "onboarding", students: null, lecturers: null, progress: 75, onboardingStep: 7, region: "North Central", state: "FCT", type: "federal" },
  { id: "inst_lgx", name: "University of Lagos", abbr: "LGX", code: "LGX-004", slug: "unilag", status: "active", students: 52300, lecturers: 2480, progress: 100, region: "South West", state: "Lagos", type: "federal" },
  { id: "inst_del", name: "Delta State University", abbr: "DEL", code: "DEL-005", slug: "delsu", status: "suspended", students: 18900, lecturers: 890, progress: 100, region: "South South", state: "Delta", type: "state" },
];

// The draft shown in the Step 2 reference screen (code UI-001, slug not yet chosen).
const IBADAN = { id: "inst_ui", name: "University of Ibadan", abbr: "UI", code: "UI-001", slug: "", status: "onboarding", students: null, lecturers: null, progress: 22, onboardingStep: 2, region: "South West", state: "Oyo", type: "federal" };

// [name, abbr, slug, region, state, status, students, lecturers, onboardingStep, progress]
const MORE = [
  ["University of Nigeria Nsukka", "UNN", "unn", "South East", "Enugu", "active", 38400, 1980],
  ["Obafemi Awolowo University", "OAU", "oauife", "South West", "Osun", "active", 29800, 1620],
  ["University of Ilorin", "UIL", "unilorin", "North Central", "Kwara", "active", 41200, 1850],
  ["University of Benin", "UNB", "uniben", "South South", "Edo", "active", 36700, 1740],
  ["University of Port Harcourt", "UPH", "uniport", "South South", "Rivers", "active", 33100, 1560],
  ["Federal University of Technology Minna", "FUM", "futminna", "North Central", "Niger", "active", 19400, 980],
  ["Usmanu Danfodiyo University", "UDU", "udusok", "North West", "Sokoto", "active", 27800, 1310],
  ["Nnamdi Azikiwe University", "NAU", "unizik", "South East", "Anambra", "active", 31500, 1490],
  ["Lagos State University", "LSU", "lasu", "South West", "Lagos", "active", 35900, 1670],
  ["Rivers State University", "RSU", "rsu", "South South", "Rivers", "suspended", 14200, 720],
  ["Covenant University", "COV", "covenant", "South West", "Ogun", "active", 9800, 540],
  ["Federal University Dutse", "FUD", "fud", "North West", "Jigawa", "onboarding", null, null, 4, 44],
  ["University of Jos", "UJ", "unijos", "North Central", "Plateau", "active", 26300, 1240],
  ["Kaduna State University", "KSU", "kasu", "North West", "Kaduna", "active", 17600, 830],
  ["Federal University Oye-Ekiti", "FOE", "fuoye", "South West", "Ekiti", "active", 15200, 760],
  ["Abubakar Tafawa Balewa University", "ATB", "atbu", "North East", "Bauchi", "active", 21700, 1020],
  ["Federal University Lokoja", "FUL", "fulokoja", "North Central", "Kogi", "onboarding", null, null, 5, 55],
  ["Federal University of Agriculture Abeokuta", "FAA", "funaab", "South West", "Ogun", "active", 16900, 810],
];

let seq = 5;
const expand = ([name, abbr, slug, region, state, status, students, lecturers, onboardingStep, progress]) => {
  seq += 1;
  return {
    id: `inst_${slug}`,
    name,
    abbr,
    code: `${abbr}-${String(seq).padStart(3, "0")}`,
    slug,
    status,
    students,
    lecturers,
    progress: progress ?? 100,
    onboardingStep: onboardingStep ?? null,
    region,
    state,
    type: /Covenant/.test(name) ? "private" : /State/.test(name) ? "state" : "federal",
  };
};

// Mutable in-memory store. Resets on page reload (mock only).
export const institutionStore = {
  items: [...REF.map((i) => ({ onboardingStep: null, ...i })), IBADAN, ...MORE.map(expand)],
};