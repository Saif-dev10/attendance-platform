import { IconLocation, IconShield } from "./icons";

export default function AreaVerifiedMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-paper p-8 shadow-[0_24px_50px_-28px_rgba(32,30,27,0.3)]">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-moss-soft text-moss">
          <IconLocation className="h-5 w-5" />
        </span>
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-graphite-soft">
            Check-in status
          </p>
          <h3 className="font-display text-base text-charcoal">Room 4.12, ENGR 214</h3>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-cream p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-charcoal">S. Novak</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-moss-soft px-2.5 py-1 text-xs font-medium text-moss">
            <IconShield className="h-3.5 w-3.5" />
            Verified check-in
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-graphite">
          Attendance is only confirmed once a scan is validated against an
          active session token, the student&apos;s enrollment, and hasn&apos;t
          already been recorded for this session.
        </p>
      </div>
    </div>
  );
}
