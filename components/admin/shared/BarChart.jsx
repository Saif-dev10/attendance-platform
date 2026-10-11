"use client";
import { useState } from "react";

/** Inline-SVG bar chart. data: [{ label, value }]. Hover/focus shows exact value. */
export default function BarChart({ data, yMax, ticks = 4, formatY = (v) => v, height = 300, color = "#071a33", ariaLabel = "Bar chart" }) {
  const [hover, setHover] = useState(null);
  const W = 640, H = height, L = 44, R = 12, T = 12, B = 30;
  const max = yMax || Math.max(...data.map((d) => d.value), 1);
  const plotW = W - L - R, plotH = H - T - B;
  const band = plotW / data.length, barW = band * 0.74;
  const tickVals = Array.from({ length: ticks + 1 }, (_, i) => (max / ticks) * i);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={ariaLabel}>
      {tickVals.map((t) => {
        const y = T + plotH - (t / max) * plotH;
        return (
          <g key={t}>
            <line x1={L} x2={W - R} y1={y} y2={y} stroke="#eef0f4" />
            <text x={L - 8} y={y + 4} textAnchor="end" fontSize="11" fill="#6b7587">{formatY(t)}</text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const h = (d.value / max) * plotH;
        const x = L + i * band + (band - barW) / 2;
        const y = T + plotH - h;
        return (
          <g key={d.label} tabIndex={0} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(i)} onBlur={() => setHover(null)}>
            <rect x={x} y={y} width={barW} height={Math.max(h, 1)} fill={color} opacity={hover === null || hover === i ? 1 : 0.55} rx="1" />
            <text x={x + barW / 2} y={H - 10} textAnchor="middle" fontSize="11" fill="#6b7587">{d.label}</text>
            {hover === i && (
              <g>
                <rect x={x + barW / 2 - 34} y={Math.max(y - 28, 0)} width="68" height="22" rx="5" fill="#0b1a30" />
                <text x={x + barW / 2} y={Math.max(y - 13, 15)} textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">
                  {d.value.toLocaleString()}
                </text>
              </g>
            )}
          </g>
        );
      })}
      <line x1={L} x2={W - R} y1={T + plotH} y2={T + plotH} stroke="#0b1a30" />
    </svg>
  );
}