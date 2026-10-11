export default function ChartLegend({ items }) {
  return (
    <ul className="flex flex-wrap items-center gap-4 text-[12px] text-[#6b7587]">
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: i.color }} />
          {i.label}
        </li>
      ))}
    </ul>
  );
}