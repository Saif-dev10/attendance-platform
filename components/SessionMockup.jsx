import QRGlyph from "./QRGlyph";
import StatusPill from "./StatusPill";

/**
 * Mock of an active lecture check-in screen.
 * It shows the QR code, a live session status, and a list of students already
 * checked in during the current session.
 */
const checkIns = [
  { name: "A. Okafor", time: "10:02", status: "Verified" },
  { name: "M. Iqbal", time: "10:02", status: "Verified" },
  { name: "S. Novak", time: "10:03", status: "Verified" },
];

export default function SessionMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div
        className="absolute -inset-4 -z-10 rounded-[2rem] bg-charcoal/5 blur-2xl"
        aria-hidden="true"
      />

      <div className="overflow-hidden rounded-[1.75rem] border border-line-strong bg-paper shadow-[0_30px_60px_-30px_rgba(32,30,27,0.35)]">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-graphite-soft">
              ENGR 214 &middot; Lecture 09
            </p>
            <h3 className="font-display text-lg text-charcoal">Structural Analysis</h3>
          </div>
          <StatusPill label="Live" />
        </div>

        <div className="flex flex-col items-start gap-5 px-5 py-6 sm:flex-row sm:items-center sm:px-6">
          <div className="shrink-0 self-center sm:self-auto">
            <QRGlyph size={132} animated />
          </div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.16em] text-graphite-soft">
              Session code
            </p>
            <p className="font-mono text-2xl tracking-[0.14em] text-charcoal">7K2 9QD</p>
            <p className="mt-3 text-sm leading-relaxed text-graphite">
              Displayed to the room and refreshed every 30 seconds. Students scan to check in from their own device.
            </p>
          </div>
        </div>

        <div className="border-t border-line px-6 py-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.16em] text-graphite-soft">
              Checking in now
            </p>
            <p className="font-mono text-xs text-graphite-soft">41 / 58</p>
          </div>
          <ul className="space-y-2.5">
            {checkIns.map((entry) => (
              <li
                key={entry.name}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-cream px-3 py-2 text-sm"
              >
                <span className="text-charcoal">{entry.name}</span>
                <span className="flex flex-wrap items-center gap-2 text-xs text-moss">
                  <span className="h-1.5 w-1.5 rounded-full bg-moss" aria-hidden="true" />
                  {entry.status}
                  <span className="text-graphite-soft">{entry.time}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
