import Icon from "./Icon";
import AdminButton from "./AdminButton";

export default function ErrorState({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center" role="alert">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fef2f2] text-[#dc2626]">
        <Icon name="alert" size={20} />
      </span>
      <p className="mt-3 text-[14px] font-semibold text-[#0b1a30]">Something went wrong</p>
      <p className="mt-1 max-w-sm text-[13px] text-[#6b7587]">{error?.message || "The data could not be loaded."}</p>
      {onRetry && <AdminButton className="mt-4" size="sm" onClick={onRetry}>Try again</AdminButton>}
    </div>
  );
}