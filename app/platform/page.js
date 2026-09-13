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
  title: "Platform — SKUL",
  description:
    "See how SKUL supports lecturers, students, and administrators with one connected campus attendance experience.",
};

export default function PlatformPage() {
  return (
    <>
      <Nav />
      <main id="main" className="overflow-x-hidden">
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
                SKUL is built around the people who use it each day — the lecturer
                opening a session, the student checking in, and the administrator
                reviewing what happened afterward.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="lecturers" className="scroll-mt-24 border-b border-line bg-paper">
          <div className="mx-auto grid min-w-0 max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
            <Reveal>
              <Eyebrow>For lecturers</Eyebrow>
              <h2 className="mt-5 font-display text-3xl leading-snug text-charcoal sm:text-4xl">
                Start attendance without breaking the rhythm of the lesson.
              </h2>
              <p className="mt-6 max-w-lg leading-relaxed text-graphite">
                Select the course, open the session, and the room code is ready on
                screen before the first slide goes up. Attendance builds itself in the
                background while teaching continues.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Start, pause, or close a session in a couple of taps",
                  "A fresh, room-specific QR code appears for the class",
                  "Watch attendance update live without leaving the front of the room",
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
                Check in from your own phone in just a few seconds.
              </h2>
              <p className="mt-6 max-w-lg leading-relaxed text-graphite">
                Scan the code your lecturer displays, and your attendance is confirmed
                once the check-in is verified against the active session and your
                enrollment — no queue at the front, no extra device, no waiting. SKUL also
                keeps other day-to-day student services connected, including Campus Ride for
                route discovery, booking, and trip tracking.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Scan directly from a phone — no additional hardware needed",
                  "Instant confirmation when your check-in is verified",
                  "A clear view of your own attendance history over time",
                  "Check available campus routes, nearby shuttles, and ride details in the same student experience",
                  "Book a ride, track an active trip, and manage wallet information without leaving SKUL",
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

        <section id="administrators" className="scroll-mt-24 border-b border-line bg-paper">
          <div className="mx-auto grid min-w-0 max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
            <Reveal>
              <Eyebrow>For administrators</Eyebrow>
              <h2 className="mt-5 font-display text-3xl leading-snug text-charcoal sm:text-4xl">
                Records that are organized before you even ask for them.
              </h2>
              <p className="mt-6 max-w-lg leading-relaxed text-graphite">
                Every session flows automatically into clean, structured records — searchable
                by course, cohort, or teaching period and ready to export whenever reporting is needed.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "One consistent record format across every department",
                  "Simple filtering by course, module, or teaching period",
                  "Export-ready reports for reviews, panels, and audits",
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

        <section className="bg-charcoal text-cream">
          <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
            <Reveal>
              <h2 className="font-display text-4xl leading-tight sm:text-5xl">
                Ready to see the full workflow?
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mx-auto mt-6 max-w-xl leading-relaxed text-cream/70">
                Walk through exactly what happens from opening a session to reviewing the final record.
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
