// A fixed pseudo-random 9x9 bit pattern used purely for visual texture.
const PATTERN = [
  1, 0, 1, 1, 0, 1, 1, 0, 1,
  0, 1, 0, 0, 1, 0, 1, 1, 0,
  1, 1, 0, 1, 1, 0, 0, 1, 1,
  1, 0, 1, 0, 1, 1, 0, 0, 1,
  0, 1, 1, 0, 0, 1, 1, 0, 1,
  1, 0, 0, 1, 1, 0, 1, 1, 0,
  1, 1, 0, 1, 0, 1, 0, 1, 1,
  0, 1, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 1, 0, 1, 1, 0, 1,
];

function Finder({ className = "" }) {
  return (
    <div className={`relative h-[22%] w-[22%] ${className}`}>
      <div className="absolute inset-0 border-[3px] border-charcoal" />
      <div className="absolute inset-[26%] bg-charcoal" />
    </div>
  );
}

/**
 * Decorative, stylized QR-style glyph for product mockups.
 * Not a scannable or functional code — presentational only.
 */
export default function QRGlyph({ size = 168, animated = false, className = "" }) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-xl bg-paper p-3 shadow-inner ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Session check-in code displayed for students to scan"
    >
      <div className="relative h-full w-full">
        <div className="grid h-full w-full grid-cols-9 grid-rows-9 gap-[2px]">
          {PATTERN.map((bit, i) => (
            <span
              key={i}
              className={bit ? "rounded-[1px] bg-charcoal/85" : "bg-transparent"}
            />
          ))}
        </div>
        <Finder className="absolute left-0 top-0" />
        <Finder className="absolute right-0 top-0" />
        <Finder className="absolute bottom-0 left-0" />

        {animated && (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-full bg-bronze/80 shadow-[0_0_10px_1px_rgba(166,124,61,0.6)] animate-scan"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
