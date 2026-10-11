"use client";
import { useParams, notFound } from "next/navigation";
import AdminTopbar, { PageBody } from "@/components/admin/shared/AdminTopbar";
import EmptyState from "@/components/admin/shared/EmptyState";
import AdminButton from "@/components/admin/shared/AdminButton";
import { useShell } from "@/components/admin/shared/AdminShell";
import { PLACEHOLDER_SECTIONS } from "@/components/admin/platform/nav";

/** Navigation target for sections that appear in the references' sidebar but have no supplied screen. */
export default function PlatformSectionPlaceholder() {
  const { section } = useParams();
  const { openMenu } = useShell();
  const title = PLACEHOLDER_SECTIONS[section];
  if (!title) notFound();

  return (
    <>
      <AdminTopbar onMenu={openMenu} breadcrumb={[{ label: "Platform Admin", href: "/admin/platform" }, { label: title }]} title={title} />
      <PageBody>
        <div className="skul-card">
          <EmptyState
            icon="layers"
            title={`${title} is not part of the supplied references`}
            message="This entry exists in the reference navigation, but no screen was provided for it, so no layout has been invented. It is a navigation placeholder only."
            action={<AdminButton variant="primary" href="/admin/platform">Back to overview</AdminButton>}
          />
        </div>
      </PageBody>
    </>
  );
}