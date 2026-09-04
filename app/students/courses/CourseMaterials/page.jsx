"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  FileText,
  Presentation,
  BookOpen,
  Download,
} from "lucide-react";

const MATERIAL_TYPES = ["All Types", "Lecture Notes", "Presentation", "Reading Material"];
const SORT_OPTIONS = ["Newest", "Oldest", "A–Z"];

const TYPE_META = {
  "Lecture Notes": { icon: FileText },
  Presentation: { icon: Presentation },
  "Reading Material": { icon: BookOpen },
};

const WEEKS = [
  {
    week: "Week 01",
    topic: "Introduction to Algorithms",
    items: [
      {
        title: "Algorithm Analysis",
        type: "Lecture Notes",
        format: "PDF",
        size: "1.8 MB",
        date: "Aug 12, 2026",
      },
      {
        title: "Complexity Analysis",
        type: "Presentation",
        format: "PPTX",
        size: "2.4 MB",
        date: "Aug 13, 2026",
      },
      {
        title: "Introduction to Advanced Algorithms",
        type: "Reading Material",
        format: "PDF",
        size: "3.1 MB",
        date: "Aug 14, 2026",
      },
    ],
  },
  {
    week: "Week 02",
    topic: "Dynamic Programming",
    items: [
      {
        title: "Dynamic Programming Foundations",
        type: "Lecture Notes",
        format: "PDF",
        size: "2.0 MB",
        date: "Aug 19, 2026",
      },
      {
        title: "Memoization vs Tabulation",
        type: "Presentation",
        format: "PPTX",
        size: "1.6 MB",
        date: "Aug 20, 2026",
      },
    ],
  },
  {
    week: "Week 03",
    topic: "Greedy Algorithms",
    items: [
      {
        title: "Greedy Choice Property",
        type: "Lecture Notes",
        format: "PDF",
        size: "1.4 MB",
        date: "Aug 26, 2026",
      },
      {
        title: "Case Studies in Scheduling Problems",
        type: "Reading Material",
        format: "PDF",
        size: "2.7 MB",
        date: "Aug 27, 2026",
      },
    ],
  },
  {
    week: "Week 04",
    topic: "Graph Algorithms",
    items: [
      {
        title: "Graph Representations & Traversal",
        type: "Lecture Notes",
        format: "PDF",
        size: "2.2 MB",
        date: "Sep 2, 2026",
      },
      {
        title: "Shortest Path Algorithms",
        type: "Presentation",
        format: "PPTX",
        size: "2.9 MB",
        date: "Sep 3, 2026",
      },
    ],
  },
];

function MaterialItem({ item }) {
  const Icon = TYPE_META[item.type]?.icon ?? FileText;

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition-colors hover:border-charcoal/20">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cream text-bronze-deep">
        <Icon size={19} strokeWidth={2} />
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-bold text-charcoal">{item.title}</h4>
        <p className="mt-0.5 truncate text-xs text-graphite-soft">
          {item.type} · {item.format} · {item.size} · Uploaded {item.date}
        </p>
      </div>

      <Button
        type="button"
        className="flex shrink-0 items-center gap-1.5 !bg-transparent px-3 py-2 text-xs font-bold !text-bronze-deep !shadow-none hover:!bg-cream"
      >
        <Download size={14} />
        <span className="hidden sm:inline">Download</span>
      </Button>
    </div>
  );
}

export default function CourseMaterials() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All Types");
  const [sort, setSort] = useState("Newest");

  const filteredWeeks = useMemo(() => {
    return WEEKS.map((week) => {
      const items = week.items.filter((item) => {
        const matchesType = type === "All Types" || item.type === type;
        const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
        return matchesType && matchesQuery;
      });

      const sorted = [...items].sort((a, b) => {
        if (sort === "A–Z") return a.title.localeCompare(b.title);
        if (sort === "Oldest") return new Date(a.date) - new Date(b.date);
        return new Date(b.date) - new Date(a.date);
      });

      return { ...week, items: sorted };
    }).filter((week) => week.items.length > 0);
  }, [query, type, sort]);

  return (
    <>
      <div className="mx-auto max-w-[1000px] space-y-8">
        <div>
          <h2 className="text-lg font-bold text-charcoal">Course Materials</h2>
          <p className="mt-1 text-sm text-graphite-soft">
            All lecture notes, slides, readings and resources for CSC301.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-graphite-soft"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search materials..."
              className="w-full rounded-xl border border-line bg-white py-2.5 pl-10 pr-4 text-sm text-charcoal outline-none placeholder:text-graphite-soft focus:border-bronze-deep"
            />
          </div>

          <div className="relative">
            <SlidersHorizontal
              size={14}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-graphite-soft"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full appearance-none rounded-xl border border-line bg-white py-2.5 pl-9 pr-8 text-sm font-medium text-charcoal outline-none focus:border-bronze-deep sm:w-auto"
            >
              {MATERIAL_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <ArrowUpDown
              size={14}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-graphite-soft"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full appearance-none rounded-xl border border-line bg-white py-2.5 pl-9 pr-8 text-sm font-medium text-charcoal outline-none focus:border-bronze-deep sm:w-auto"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredWeeks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-white py-16 text-center">
            <p className="text-sm text-graphite-soft">No materials match your search.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredWeeks.map((week) => (
              <section key={week.week}>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-graphite-soft">
                  {week.week} — {week.topic}
                </h3>
                <div className="space-y-3">
                  {week.items.map((item) => (
                    <MaterialItem key={item.title} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
      <MobileBottomNav active="academic" />
    </>
  );
}