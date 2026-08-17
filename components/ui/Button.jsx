export default function Button({
  children,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm transition-all shadow-lg shadow-brand-600/20 cursor-pointer active:opacity-75 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}