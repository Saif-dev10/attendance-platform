export const UG_LEVELS = [100, 200, 300, 400];
export const PG_LEVELS = ["Masters", "PhD", "PGD"];

export const PROGRAMMES = [
  { id: "bsc-csc", name: "B.Sc. Computer Science", dept: "CSC", type: "undergraduate" },
  { id: "beng-eng", name: "B.Eng. Mechanical Engineering", dept: "ENG", type: "undergraduate" },
  { id: "bsc-ift", name: "B.Sc. Information Technology", dept: "IFT", type: "undergraduate" },
  { id: "bsc-acc", name: "B.Sc. Accounting", dept: "ACC", type: "undergraduate" },
  { id: "bsc-bch", name: "B.Sc. Biochemistry", dept: "BCH", type: "undergraduate" },
  { id: "llb-law", name: "LL.B Law", dept: "LAW", type: "undergraduate" },
  { id: "bsc-phy", name: "B.Sc. Physics", dept: "PHY", type: "undergraduate" },
  { id: "bed-edu", name: "B.Ed. Education", dept: "EDU", type: "undergraduate" },
  { id: "msc-csc", name: "M.Sc. Computer Science", dept: "CSC", type: "postgraduate" },
  { id: "mba-mba", name: "MBA Business Administration", dept: "MBA", type: "postgraduate" },
  { id: "med-edu", name: "M.Ed. Educational Management", dept: "EDU", type: "postgraduate" },
  { id: "phd-mth", name: "Ph.D. Mathematics", dept: "MTH", type: "postgraduate" },
];

const COURSE_TITLES = {
  CSC: ["Data Structures", "Operating Systems", "Database Systems", "Software Engineering"],
  ENG: ["Thermodynamics", "Fluid Mechanics", "Engineering Design", "Materials Science"],
  IFT: ["Web Technologies", "Network Fundamentals", "Systems Analysis", "Information Security"],
  ACC: ["Financial Accounting", "Cost Accounting", "Auditing", "Taxation"],
  BCH: ["Enzymology", "Metabolism", "Molecular Biology", "Biostatistics"],
  LAW: ["Constitutional Law", "Contract Law", "Criminal Law", "Land Law"],
  PHY: ["Classical Mechanics", "Electromagnetism", "Quantum Physics", "Optics"],
  EDU: ["Curriculum Studies", "Educational Psychology", "Test and Measurement", "School Administration"],
  MBA: ["Strategic Management", "Corporate Finance", "Marketing Analytics", "Operations"],
  MTH: ["Real Analysis", "Abstract Algebra", "Topology", "Numerical Methods"],
};

function rng(seed) {
  let s = seed;
  return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
}
const pick = (r, a) => a[Math.floor(r() * a.length)];
const clamp = (n) => Math.max(35, Math.min(100, Math.round(n)));

const FIRST = ["Aisha", "Abdullahi", "Amina", "Bashir", "Hauwa", "Ibrahim", "Khadija", "Musa", "Maryam", "Nafisa", "Sadiq", "Usman", "Yusuf", "Chinedu", "Ngozi", "Tunde", "Folake", "Emeka", "Halima", "Sani", "Rabi", "Aliyu"];
const LAST = ["Abubakar", "Bello", "Danjuma", "Garba", "Hassan", "Lawal", "Mohammed", "Sule", "Suleiman", "Umar", "Adamu", "Balarabe", "Idris", "Kabir", "Okafor", "Adeyemi", "Nwosu"];

function courses(prog, level, avg, r) {
  const titles = COURSE_TITLES[prog.dept];
  return titles.slice(0, 3 + Math.floor(r() * 2)).map((title, i) => ({
    code: `${prog.dept} ${typeof level === "number" ? level / 100 : 8}0${i + 1}`,
    title,
    attendance: clamp(avg + (r() * 16 - 8)),
  }));
}

function make(id, fullName, email, matric, prog, level, attendance, status, r) {
  return { id, fullName, email, matric, programmeId: prog.id, programme: prog.name, dept: prog.dept, type: prog.type, level, attendance, status, courses: courses(prog, level, attendance, r) };
}

function build() {
  const r = rng(77031);
  const byId = Object.fromEntries(PROGRAMMES.map((p) => [p.id, p]));
  const items = [
    make("stu_001", "Zainab Usman", "z.usman@buk.edu.ng", "21/CSC/042", byId["bsc-csc"], 300, 94, "active", r),
    make("stu_002", "Muhammad Yusuf", "m.yusuf@buk.edu.ng", "21/CSC/089", byId["bsc-csc"], 300, 82, "active", r),
    make("stu_003", "Fatima S. Ahmed", "f.ahmed@buk.edu.ng", "21/ENG/114", byId["beng-eng"], 400, 62, "flagged", r),
  ];
  const matrics = new Set(items.map((s) => s.matric));
  const emails = new Set(items.map((s) => s.email));

  for (let i = 4; i <= 150; i++) {
    const prog = pick(r, r() < 0.2 ? PROGRAMMES.filter((p) => p.type === "postgraduate") : PROGRAMMES.filter((p) => p.type === "undergraduate"));
    const first = pick(r, FIRST);
    const last = pick(r, LAST);
    const level = prog.type === "undergraduate" ? pick(r, UG_LEVELS) : pick(r, PG_LEVELS);
    let matric;
    do {
      const yy = prog.type === "undergraduate" ? 20 + Math.floor(r() * 5) : 22 + Math.floor(r() * 3);
      matric = `${yy}/${prog.dept}/${String(1 + Math.floor(r() * 400)).padStart(3, "0")}`;
    } while (matrics.has(matric));
    matrics.add(matric);
    let email = `${first[0]}.${last}`.toLowerCase() + "@buk.edu.ng";
    for (let n = 2; emails.has(email); n++) email = `${first[0]}.${last}${n}`.toLowerCase() + "@buk.edu.ng";
    emails.add(email);
    const attendance = clamp(55 + r() * 44);
    const status = r() < 0.03 ? "suspended_account" : attendance < 70 ? "flagged" : "active";
    items.push(make(`stu_${String(i).padStart(3, "0")}`, `${first} ${last}`, email, matric, prog, level, attendance, status, r));
  }
  return items;
}

// Mutable in-memory store (sample of the institution's records, not the full population).
export const studentStore = { items: build(), population: 32450 };