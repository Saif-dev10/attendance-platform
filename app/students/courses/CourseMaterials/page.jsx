"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Button from "@/components/ui/Button";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  FileText,
  Presentation,
  BookOpen,
  Video,
  Link as LinkIcon,
  Download,
} from "lucide-react";
import { getCourseMaterials } from "@/lib/services/courses";

const materialTypes = useMemo(() => {
  const types = materials
    .map((material) => material.type)
    .filter(Boolean);

  return ["All Types", ...new Set(types)];
}, [materials]);

const SORT_OPTIONS = ["Newest", "Oldest", "A–Z"];

const TYPE_META = {
  PDF: {
    icon: FileText,
    label: "PDF",
  },
  Document: {
    icon: FileText,
    label: "Document",
  },
  Slide: {
    icon: Presentation,
    label: "Slide",
  },
  Video: {
    icon: Video,
    label: "Video",
  },
  Link: {
    icon: LinkIcon,
    label: "Link",
  },
};

function MaterialItem({ item }) {
  const meta = TYPE_META[item.type] ?? {
    icon: BookOpen,
    label: item.type || "Material",
  };

  const Icon = meta.icon;

  const handleDownload = () => {
    if (!item.url) return;

    window.open(item.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition-colors hover:border-charcoal/20">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cream text-bronze-deep">
        <Icon size={19} strokeWidth={2} />
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-bold text-charcoal">
          {item.title}
        </h4>

        <p className="mt-0.5 truncate text-xs text-graphite-soft">
          {meta.label}
          {item.description ? ` · ${item.description}` : ""}
        </p>
      </div>

      {item.url && (
        <Button
          type="button"
          onClick={handleDownload}
          className="flex shrink-0 items-center gap-1.5 !bg-transparent px-3 py-2 text-xs font-bold !text-bronze-deep !shadow-none hover:!bg-cream"
        >
          <Download size={14} />
          <span className="hidden sm:inline">
            {item.type === "Link" ? "Open" : "Download"}
          </span>
        </Button>
      )}
    </div>
  );
}

function MaterialSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 animate-pulse"
        >
          <div className="h-11 w-11 shrink-0 rounded-xl bg-cream" />

          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-4 w-2/5 rounded bg-cream" />
            <div className="h-3 w-1/3 rounded bg-cream" />
          </div>

          <div className="h-8 w-20 rounded-xl bg-cream" />
        </div>
      ))}
    </div>
  );
}

export default function CourseMaterials() {
  const params = useParams();
  const courseId = params?.courseId;

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [type, setType] = useState("All Types");
  const [sort, setSort] = useState("A–Z");

  useEffect(() => {
    if (!courseId) return;

    let cancelled = false;

    async function loadMaterials() {
      try {
        setLoading(true);
        setError("");

        const response = await getCourseMaterials(courseId);

        if (cancelled) return;

        const data = response?.data ?? [];

        setMaterials(Array.isArray(data) ? data : []);
      } catch (err) {
        if (cancelled) return;

        console.error("Failed to load course materials:", err);

        setError(
          err?.message ||
            "Unable to load course materials. Please try again."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadMaterials();

    return () => {
      cancelled = true;
    };
  }, [courseId]);

  const filteredMaterials = useMemo(() => {
    const filtered = materials.filter((item) => {
      const matchesType =
        type === "All Types" || item.type === type;

      const searchText = query.trim().toLowerCase();

      const matchesQuery =
        !searchText ||
        item.title?.toLowerCase().includes(searchText) ||
        item.description?.toLowerCase().includes(searchText);

      return matchesType && matchesQuery;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "A–Z") {
        return (a.title || "").localeCompare(b.title || "");
      }

      if (sort === "Oldest") {
        return (
          new Date(a.created_at || 0) -
          new Date(b.created_at || 0)
        );
      }

      return (
        new Date(b.created_at || 0) -
        new Date(a.created_at || 0)
      );
    });
  }, [materials, query, type, sort]);

  return (
    <>
      <div className="mx-auto max-w-[1000px] space-y-8">
        <div>
          <h2 className="text-lg font-bold text-charcoal">
            Course Materials
          </h2>

          <p className="mt-1 text-sm text-graphite-soft">
            Lecture notes, slides, readings and other resources for this
            course.
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
              {materialTypes.map((materialType) => (
                <option
                  key={materialType}
                  value={materialType}
                >
                  {materialType}
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
              {SORT_OPTIONS.map((sortOption) => (
                <option
                  key={sortOption}
                  value={sortOption}
                >
                  {sortOption}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && <MaterialSkeleton />}

        {!loading && error && (
          <div className="rounded-2xl border border-line bg-white py-16 text-center">
            <h3 className="mb-2 text-sm font-bold text-charcoal">
              Unable to load materials
            </h3>

            <p className="mx-auto max-w-md text-sm text-graphite-soft">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && filteredMaterials.length === 0 && (
          <div className="rounded-2xl border border-dashed border-line bg-white py-16 text-center">
            <BookOpen
              size={24}
              className="mx-auto mb-3 text-graphite-soft"
            />

            <p className="text-sm font-bold text-charcoal">
              {materials.length === 0
                ? "No materials available"
                : "No materials match your search"}
            </p>

            <p className="mt-1 text-xs text-graphite-soft">
              {materials.length === 0
                ? "Published course materials will appear here when they are available."
                : "Try a different search term or material type."}
            </p>
          </div>
        )}

        {!loading && !error && filteredMaterials.length > 0 && (
          <div className="space-y-3">
            {filteredMaterials.map((item) => (
              <MaterialItem
                key={item.id}
                item={item}
              />
            ))}
          </div>
        )}
      </div>

    </>
  );
}