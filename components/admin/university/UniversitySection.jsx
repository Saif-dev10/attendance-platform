"use client";
import { notFound, useParams } from "next/navigation";
import SectionPlaceholder from "@/components/admin/shared/SectionPlaceholder";
import { UNIVERSITY_SECTIONS } from "@/lib/admin/universitySections";

/** `detailParam` (e.g. "lecturerId") marks a detail route and reads that id from the URL. */
export default function UniversitySection({ section, detailParam }) {
  const params = useParams();
  const meta = UNIVERSITY_SECTIONS[section];
  if (!meta) notFound();

  const listHref = `/admin/university/${section}`;
  const detailId = detailParam ? params?.[detailParam] : null;
  const crumbs = [{ label: meta.group }, detailId ? { label: meta.title, href: listHref } : { label: meta.title }];
  if (detailId) crumbs.push({ label: String(detailId) });

  return (
    <SectionPlaceholder
      breadcrumb={crumbs}
      title={detailId ? meta.detailTitle || `${meta.title} record` : meta.title}
      description={detailId ? `Record ${detailId}. This detail view has no reference screen.` : meta.description}
      planned={detailId ? [] : meta.planned}
      links={
        detailId
          ? [{ label: `Back to ${meta.title}`, href: listHref, icon: "arrowLeft" }]
          : [
              { label: "University overview", href: "/admin/university", icon: "overview" },
              { label: "Student Directory", href: "/admin/university/students", icon: "student" },
            ]
      }
    />
  );
}