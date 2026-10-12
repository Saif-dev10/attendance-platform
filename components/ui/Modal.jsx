"use client";
import { useEffect, useRef } from "react";
import Icon from "@/components/admin/shared/Icon";

const WIDTHS = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-3xl" };
const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

export default function Modal({ open, onClose, title, subtitle, size = "md", footer, children }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);

  // Always call the latest onClose without re-running the setup effect below.
  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const root = ref.current;
    const previouslyFocused = document.activeElement;
    // Respect autoFocus: only focus the dialog itself if focus is not already inside it.
    if (root && !root.contains(document.activeElement)) root.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") {
        closeRef.current?.();
        return;
      }
      if (e.key !== "Tab" || !root) return;
      const nodes = [...root.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null);
      if (nodes.length === 0) {
        e.preventDefault();
        root.focus();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === root)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#071a33]/50 p-4"
      onMouseDown={() => closeRef.current?.()}
    >
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
          <button onClick={() => closeRef.current?.()} aria-label="Close dialog" className="rounded-lg p-1.5 text-[#6b7587] hover:bg-[#f3f5f9]">
            <Icon name="x" size={18} />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 rounded-b-2xl border-t border-[#e5e8ee] bg-[#f8f9fb] px-6 py-3.5">{footer}</div>}
      </div>
    </div>
  );
}