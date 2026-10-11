"use client";
import { useState } from "react";

/**
 * Multi-series line chart with optional right axis.
 * series: [{ name, color, values, axis: "left" | "right", dashed? }]
 * Right-axis series (e.g. attendance %) are scaled independently so they stay readable.
 */
export default function LineChart({ labels, series, leftMax, rightMax = 100, ticks = 6, formatLeft = (v) => v, formatRight = (v) => `${v}%`, height = 300, ariaLabel = "Line chart" }) {
  const [hover, setHover] = useState(null);
  const hasRight = series.some((s) => s.axis === "right");
  const W = 700, H = height, L = 48, R = hasRight ? 44 : 16, T = 12, B = 30;
  const plotW = W - L - R, plotH = H - T - B;
  const lMax = leftMax || Math.max(...series.filter((s) => s.axis !== "right").flatMap((s) => s.values), 1);
  const x = (i) => L + (plotW / (labels.length - 1)) * i;
  const y = (v, axis) => T + plotH - (v / (axis === "right" ? rightMax : lMax)) * plotH;
  const tickVals = Array.from({ length: ticks + 1 }, (_, i) => i / ticks);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={ariaLabel} onMouseLeave={() => setHover(null)}>
      {tickVals.map((t) => (
        <g key={t}>
          <line x1={L} x2={W - R} y1={T + plotH - t * plotH} y2={T + plotH - t * plotH} stroke="#eef0f4" />
          <text x={L - 8} y={T + plotH - t * plotH + 4} textAnchor="end" fontSize="11" fill="#6b7587">{formatLeft(Math.round(lMax * t))}</text>
          {hasRight && <text x={W - R + 8} y={T + plotH - t * plotH + 4} fontSize="11" fill="#a16207">{formatRight(Math.round(rightMax * t))}</text>}
        </g>
      ))}
      {labels.map((l, i) => (
        <g key={l}>
          <rect x={x(i) - plotW / labels.length / 2} y={T} width={plotW / labels.length} height={plotH} fill="transparent" onMouseEnter={() => setHover(i)} />
          <text x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="#6b7587">{l}</text>
        </g>
      ))}
      {hover !== null && <line x1={x(hover)} x2={x(hover)} y1={T} y2={T + plotH} stroke="#cfd5df" strokeDasharray="3 3" />}
      {series.map((s) => (
        <g key={s.name}>
          <polyline fill="none" stroke={s.color} strokeWidth="2" strokeDasharray={s.dashed ? "2 4" : undefined} strokeLinecap="round" points={s.values.map((v, i) => `${x(i)},${y(v, s.axis)}`).join(" ")} />
          {s.values.map((v, i) => (
            <circle key={i} cx={x(i)} cy={y(v, s.axis)} r={hover === i ? 5 : 3} fill={s.color} />
          ))}
        </g>
      ))}
      {hover !== null && (
        <g>
          <rect x={Math.min(x(hover) + 10, W - 150)} y={T + 6} width="140" height={18 + series.length * 16} rx="6" fill="#0b1a30" />
          <text x={Math.min(x(hover) + 20, W - 140)} y={T + 22} fontSize="11" fontWeight="700" fill="#fff">{labels[hover]}</text>
          {series.map((s, k) => (
            <text key={s.name} x={Math.min(x(hover) + 20, W - 140)} y={T + 38 + k * 16} fontSize="11" fill="#fff">
              {s.name}: {s.axis === "right" ? formatRight(s.values[hover]) : s.values[hover].toLocaleString()}
            </text>
          ))}
        </g>
      )}
    </svg>
  );
}