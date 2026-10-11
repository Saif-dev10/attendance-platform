import Icon from "./Icon";

export default function EmptyState({ icon = "search", title, message, action }) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f3f5f9] text-[#6b7587]">
        <Icon name={icon} size={20} />
      </span>
      <p className="mt-3 text-[14px] font-semibold text-[#0b1a30]">{title}</p>
      {message && <p className="mt-1 max-w-sm text-[13px] text-[#6b7587]">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}