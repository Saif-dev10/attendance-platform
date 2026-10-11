"use client";
import { useState } from "react";
import Icon from "@/components/admin/shared/Icon";
import EmptyState from "@/components/admin/shared/EmptyState";

const STYLE = {
  critical: { box: "border-[#fecaca] bg-[#fef2f2]", icon: "alert", iconCls: "text-[#dc2626]", text: "text-[#7f1d1d]" },
  warning: { box: "border-[#fde68a] bg-[#fffbeb]", icon: "warning", iconCls: "text-[#b45309]", text: "text-[#78350f]" },
};

export default function CriticalAlerts({ alerts, onAcknowledge }) {
  const [busy, setBusy] = useState(null);

  const ack = async (id) => {
    setBusy(id);
    try {
      await onAcknowledge(id);
    } finally {
      setBusy(null);
    }
  };

  return (
    <section className="skul-card p-6" aria-labelledby="alerts-title">
      <div className="mb-4 flex items-center justify-between">
        <h2 id="alerts-title" className="skul-heading text-[17px] font-semibold text-[#0b1a30]">Critical Alerts</h2>
        {alerts.length > 0 && <span className="rounded-md bg-[#fef2f2] px-2 py-0.5 text-[11px] font-bold text-[#b91c1c]">{alerts.length} active</span>}
      </div>
      {alerts.length === 0 ? (
        <EmptyState icon="checkCircle" title="No active alerts" message="Everything is running normally." />
      ) : (
        <ul className="space-y-3">
          {alerts.map((a) => {
            const s = STYLE[a.severity] || STYLE.warning;
            return (
              <li key={a.id} className={`flex items-start gap-3 rounded-xl border p-3.5 ${s.box}`}>
                <Icon name={s.icon} size={18} className={`mt-0.5 ${s.iconCls}`} />
                <div className="min-w-0 flex-1">
                  <p className={`text-[13.5px] font-semibold ${s.text}`}>{a.title}</p>
                  <p className="text-[12px] text-[#6b7587]">{a.message}</p>
                </div>
                <button
                  onClick={() => ack(a.id)}
                  disabled={busy === a.id}
                  aria-label={`Acknowledge ${a.title}`}
                  className="shrink-0 rounded-md px-2 py-1 text-[11.5px] font-semibold text-[#4b5565] hover:bg-white/70 disabled:opacity-50"
                >
                  Acknowledge
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}