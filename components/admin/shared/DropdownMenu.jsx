"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";

/**
 * Menu / popover with a fixed-position panel (so it is never clipped by table overflow).
 * Use `items` for a simple action menu, or `children` (node or (close) => node) for custom content.
 * items: [{ label, icon?, href?, onClick?, danger?, disabled?, divider? }]
 */
export default function DropdownMenu({ renderTrigger, items, children, align = "right", width = 224 }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null);
  const wrap = useRef(null);
  const close = useCallback(() => setOpen(false), []);

  const toggle = useCallback(() => {
    if (open) return close();
    const r = wrap.current.getBoundingClientRect();
    const estimate = items ? items.length * 40 + 16 : 300;
    const flip = r.bottom + estimate + 12 > window.innerHeight && r.top > estimate;
    const left = align === "right" ? Math.max(8, r.right - width) : Math.max(8, Math.min(r.left, window.innerWidth - width - 8));
    setPos({
      left,
      top: flip ? undefined : r.bottom + 6,
      bottom: flip ? window.innerHeight - r.top + 6 : undefined,
    });
    setOpen(true);
  }, [align, close, items, open, width]);

  useEffect(() => {
    if (!open) return;
    const inside = (t) => wrap.current?.contains(t) || t?.closest?.("[data-dropdown-panel]");
    const onDown = (e) => !inside(e.target) && close();
    const onKey = (e) => e.key === "Escape" && close();
    const onScroll = (e) => !e.target?.closest?.("[data-dropdown-panel]") && close();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [open, close]);

  const itemCls = (it) =>
    `flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-medium disabled:opacity-40 ${
      it.danger ? "text-[#b91c1c] hover:bg-[#fef2f2]" : "text-[#0b1a30] hover:bg-[#f3f5f9]"
    }`;

  const Trigger = renderTrigger;

  return (
    <div ref={wrap} className="relative inline-block" onClick={(e) => e.stopPropagation()}>
      {Trigger ? <Trigger open={open} toggle={toggle} /> : null}
      {open && pos && (
        <div
          data-dropdown-panel
          role="menu"
          style={{ position: "fixed", left: pos.left, top: pos.top, bottom: pos.bottom, width }}
          className="z-[55] max-h-[70vh] overflow-y-auto rounded-xl border border-[#e5e8ee] bg-white p-1.5 shadow-lg"
        >
          {items
            ? items.map((it, i) =>
                it.divider ? (
                  <div key={`d${i}`} className="my-1 border-t border-[#eef0f4]" />
                ) : it.href ? (
                  <Link key={it.label} href={it.href} role="menuitem" onClick={close} className={itemCls(it)}>
                    {it.icon && <Icon name={it.icon} size={16} className="text-[#6b7587]" />}
                    {it.label}
                  </Link>
                ) : (
                  <button
                    key={it.label}
                    role="menuitem"
                    disabled={it.disabled}
                    onClick={() => {
                      close();
                      it.onClick?.();
                    }}
                    className={itemCls(it)}
                  >
                    {it.icon && <Icon name={it.icon} size={16} className={it.danger ? "" : "text-[#6b7587]"} />}
                    {it.label}
                  </button>
                )
              )
            : typeof children === "function"
            ? children(close)
            : children}
        </div>
      )}
    </div>
  );
}