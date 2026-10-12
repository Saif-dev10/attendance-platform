"use client";
import AdminTopbar, { PageBody } from "@/components/admin/shared/AdminTopbar";
import AdminButton from "@/components/admin/shared/AdminButton";
import ErrorState from "@/components/admin/shared/ErrorState";
import LoadingState from "@/components/admin/shared/LoadingState";
import { useShell } from "@/components/admin/shared/AdminShell";
import useAsync from "@/lib/admin/useAsync";
import { InferredNote } from "./Tag";

export function Fact({ label, children }) {
  return (
    <div>
      <dt className="skul-eyebrow">{label}</dt>
      <dd className="mt-1 text-[14px] text-[#0b1a30]">{children}</dd>
    </div>
  );
}

const resolve = (v, data) => (typeof v === "function" ? v(data) : v);

/** Detail page shell. `breadcrumb` and `title` may be functions of the loaded data. `children` is a render function. */
export default function RecordPage({ breadcrumb, title, load, deps, backHref, backLabel, children }) {
  const { openMenu } = useShell();
  const { data, loading, error, reload } = useAsync(load, deps);
  return (
    <>
      <AdminTopbar
        onMenu={openMenu}
        breadcrumb={resolve(breadcrumb, data)}
        title={resolve(title, data)}
        actions={<AdminButton icon="arrowLeft" href={backHref}>{backLabel}</AdminButton>}
      />
      <PageBody narrow>
        <InferredNote />
        {error ? (
          <div className="skul-card"><ErrorState error={error} onRetry={reload} /></div>
        ) : loading && !data ? (
          <div className="skul-card"><LoadingState rows={5} /></div>
        ) : (
          children(data)
        )}
      </PageBody>
    </>
  );
}