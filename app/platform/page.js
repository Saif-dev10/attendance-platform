import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import SessionMockup from "@/components/SessionMockup";
import LiveActivityMockup from "@/components/LiveActivityMockup";
import RecordsMockup from "@/components/RecordsMockup";
import { photos } from "@/lib/photos";
import { IconArrowRight } from "@/components/icons";

export const metadata = {
  title: "Platform — Presently",
  description:
    "See how Presently supports lecturers, students, and administrators with one connected attendance experience.",
};

export default function PlatformPage() {
  return (
    <>
      {/* Each section speaks to one role so the platform story stays grounded in daily work. */}
      <Nav />
      <main id="main" className="overflow-x-hidden">
        {/* Intro: frame the platform around its three user roles. */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-10 lg:py-28">
            <Reveal>
              <Eyebrow>Platform</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-4xl leading-tight text-charcoal sm:text-5xl">
                One platform, three points of view.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-graphite">
                Presently is built around the people who actually use it every
                day — the lecturer opening a session, the student checking in,
                and the administrator reviewing what happened afterward.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Lecturer view: opening sessions and tracking attendance in the room. */}
        <section id="lecturers" className="scroll-mt-24 border-b border-line bg-paper">
          <div className="mx-auto grid min-w-0 max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
            <Reveal>
              <Eyebrow>For lecturers</Eyebrow>
              <h2 className="mt-5 font-display text-3xl leading-snug text-charcoal sm:text-4xl">
                Start attendance without breaking your rhythm.
              </h2>
              <p className="mt-6 max-w-lg leading-relaxed text-graphite">
                Select the course, open the session, and a check-in code is on
                screen — ready before the first slide loads. Attendance builds
                itself in the background while you teach.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Start, pause, or close a session in a couple of taps",
                  "A fresh, session-specific QR code displayed for the room",
                  "Watch attendance update live, without checking a separate app",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-graphite">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-deep" />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={140}>
              <SessionMockup />
            </Reveal>
          </div>
        </section>

        {/* Student view: checking in and keeping a personal attendance record. */}
        <section id="students" className="scroll-mt-24 border-b border-line">
          <div className="mx-auto grid min-w-0 max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
            <Reveal className="relative order-2 aspect-[4/5] overflow-hidden rounded-2xl border border-line-strong lg:order-1">
              <Image
                src={photos.studentsPhones.src}
                alt={photos.studentsPhones.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={100} className="order-1 lg:order-2">
              <Eyebrow>For students</Eyebrow>
              <h2 className="mt-5 font-display text-3xl leading-snug text-charcoal sm:text-4xl">
                Check in from your own phone, in a couple of seconds.
              </h2>
              <p className="mt-6 max-w-lg leading-relaxed text-graphite">
                Scan the code your lecturer displays, and your attendance is
                confirmed once your scan is verified against the active
                session and your enrollment — no queueing at the front, no
                separate device, no waiting.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Scan directly from a phone — no extra hardware needed",
                  "Instant confirmation once your check-in is verified",
                  "A clear personal view of your own attendance history",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-graphite">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-deep" />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Administrator view: reviewing records across courses and departments. */}
        <section id="administrators" className="scroll-mt-24 border-b border-line bg-paper">
          <div className="mx-auto grid min-w-0 max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
            <Reveal>
              <Eyebrow>For administrators</Eyebrow>
              <h2 className="mt-5 font-display text-3xl leading-snug text-charcoal sm:text-4xl">
                Records that are organized before you even ask for them.
              </h2>
              <p className="mt-6 max-w-lg leading-relaxed text-graphite">
                Every session flows automatically into clean, structured
                records — searchable by course, cohort, or term, and ready to
                export whenever a report is needed.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "One consistent record format across every department",
                  "Simple filtering by course, module, or teaching period",
                  "Export-ready reports for reviews, panels, or audits",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-graphite">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-deep" />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={140}>
              <RecordsMockup />
            </Reveal>
          </div>
        </section>

        {/* Closing call to action. */}
        <section className="bg-charcoal text-cream">
          <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
            <Reveal>
              <h2 className="font-display text-4xl leading-tight sm:text-5xl">
                Ready to see the full workflow?
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mx-auto mt-6 max-w-xl leading-relaxed text-cream/70">
                Walk through exactly what happens from starting a session to
                reviewing the final record.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button href="/how-it-works" variant="inverse">
                  Walk through How It Works
                  <IconArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
