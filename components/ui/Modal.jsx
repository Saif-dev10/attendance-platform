"use client";
import { useEffect, useRef } from "react";
import Icon from "@/components/admin/shared/Icon";

const WIDTHS = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-3xl" };

export default function Modal({ open, onClose, title, subtitle, size = "md", footer, children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="skul-admin fixed inset-0 z-50 flex items-center justify-center bg-[#071a33]/50 p-4" onMouseDown={onClose} style={{ minHeight: 0, background: "rgba(7,26,51,.5)" }}>
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
        className={`flex max-h-[90vh] w-full flex-col rounded-2xl bg-white shadow-xl outline-none ${WIDTHS[size]}`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#e5e8ee] px-6 py-4">
          <div>
            <h2 className="skul-heading text-[17px] font-semibold text-[#0b1a30]">{title}</h2>
            {subtitle && <p className="mt-0.5 text-[13px] text-[#6b7587]">{subtitle}</p>}
          </div>
          <button onClick={onClose} aria-label="Close dialog" className="rounded-lg p-1.5 text-[#6b7587] hover:bg-[#f3f5f9]">
            <Icon name="x" size={18} />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 border-t border-[#e5e8ee] bg-[#f8f9fb] px-6 py-3.5 rounded-b-2xl">{footer}</div>}
      </div>
    </div>
  );
}