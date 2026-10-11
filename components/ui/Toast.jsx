"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import Icon from "@/components/admin/shared/Icon";

const ToastCtx = createContext({ push: () => {} });
export const useToast = () => useContext(ToastCtx);

const TONES = {
  success: { icon: "checkCircle", cls: "text-[#059669]" },
  error: { icon: "xCircle", cls: "text-[#dc2626]" },
  warning: { icon: "warning", cls: "text-[#b45309]" },
  info: { icon: "info", cls: "text-[#2563eb]" },
};

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);

  const dismiss = useCallback((id) => setItems((xs) => xs.filter((x) => x.id !== id)), []);
  const push = useCallback(
    ({ tone = "success", title, message, duration = 4500 }) => {
      const id = `${Date.now()}-${Math.random()}`;
      setItems((xs) => [...xs, { id, tone, title, message }]);
      setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );
  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2" aria-live="polite">
        {items.map((t) => (
          <div key={t.id} className="pointer-events-auto flex items-start gap-3 rounded-xl border border-[#e5e8ee] bg-white p-3.5 shadow-lg">
            <Icon name={TONES[t.tone].icon} size={18} className={`mt-0.5 ${TONES[t.tone].cls}`} />
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-semibold text-[#0b1a30]">{t.title}</p>
              {t.message && <p className="mt-0.5 text-[12.5px] text-[#6b7587]">{t.message}</p>}
            </div>
            <button onClick={() => dismiss(t.id)} aria-label="Dismiss" className="text-[#8a93a3] hover:text-[#0b1a30]">
              <Icon name="x" size={15} />
            </button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}