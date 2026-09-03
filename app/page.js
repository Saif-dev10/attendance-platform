import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import SessionMockup from "@/components/SessionMockup";
import LiveActivityMockup from "@/components/LiveActivityMockup";
import FeatureCard from "@/components/FeatureCard";
import { photos } from "@/lib/photos";
import {
  IconSession,
  IconQR,
  IconLocation,
  IconActivity,
  IconRecords,
  IconArrowRight,
  IconClock,
  IconShield,
} from "@/components/icons";

const coreBenefits = [
  {
    icon: <IconClock className="h-5 w-5" />,
    title: "Seconds, not minutes",
    description:
      "A session starts with one tap and a code appears on screen. No paper registers, no calling names.",
  },
  {
    icon: <IconLocation className="h-5 w-5" />,
    title: "Check-ins that hold up",
    description:
      "Every scan is validated against a live session token and the student's enrollment, so duplicate or stale check-ins are rejected automatically.",
  },
  {
    icon: <IconActivity className="h-5 w-5" />,
    title: "Visibility while it matters",
    description:
      "Lecturers watch attendance build in real time during the session, not the next morning in a spreadsheet.",
  },
  {
    icon: <IconRecords className="h-5 w-5" />,
    title: "Records worth trusting",
    description:
      "Every session is organized automatically into clean, exportable records for courses, cohorts, and terms.",
  },
];

const howItWorksPreview = [
  { step: "01", title: "Start a session", description: "Lecturer selects the course and opens attendance." },
  { step: "02", title: "Display the code", description: "A session-specific QR code appears for the room." },
  { step: "03", title: "Students check in", description: "Each scan is verified against the live session token." },
];

const featurePreview = [
  {
    icon: <IconSession className="h-5 w-5" />,
    title: "Session control",
    description: "Start, pause, and close attendance for any class in a couple of taps.",
  },
  {
    icon: <IconQR className="h-5 w-5" />,
    title: "Session QR codes",
    description: "A fresh, session-specific code for every class — nothing reused, nothing guessed.",
  },
  {
    icon: <IconLocation className="h-5 w-5" />,
    title: "Secure token verification",
    description: "Check-ins are checked against the active session token and confirmed automatically.",
  },
  {
    icon: <IconActivity className="h-5 w-5" />,
    title: "Live activity",
    description: "Watch attendance update in real time as students check in.",
  },
  {
    icon: <IconRecords className="h-5 w-5" />,
    title: "Records & reports",
    description: "Organized, exportable attendance history by course, cohort, or term.",
  },
  {
    icon: <IconShield className="h-5 w-5" />,
    title: "Built for trust",
    description: "A consistent, fair process every student and lecturer can rely on.",
  },
];

export default function Home() {
  return (
    <>
      {/* The landing page introduces the attendance workflow before visitors enter the app. */}
      <Nav />
      <main id="main">
        {/* Hero: the product promise and primary entry point. */}
        <section className="relative overflow-hidden border-b border-line">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:px-10 lg:pb-28 lg:pt-24">
            <div>
              <Reveal>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-6 font-display text-[2.75rem] leading-[1.08] tracking-tight text-charcoal sm:text-6xl">
                  Attendance that runs itself, so class time stays{" "}
                  <span className="italic text-bronze-deep">class time.</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-graphite">
                  Presently gives lecturers a one-tap way to open attendance, gives
                  students an instant way to check in, and gives institutions a
                  record they can actually rely on.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Button href="/how-it-works" variant="primary">
                    See how it works
                    <IconArrowRight className="h-4 w-4" />
                  </Button>
                  <Button href="/platform" variant="secondary">
                    Explore the platform
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={320}>
                <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-7">
                  <div>
                    <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-graphite-soft">
                      For
                    </dt>
                    <dd className="mt-1 font-display text-base text-charcoal">Lecturers</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-graphite-soft">
                      For
                    </dt>
                    <dd className="mt-1 font-display text-base text-charcoal">Students</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-graphite-soft">
                      For
                    </dt>
                    <dd className="mt-1 font-display text-base text-charcoal">Administrators</dd>
                  </div>
                </dl>
              </Reveal>
            </div>

            <Reveal delay={200} className="lg:pl-6">
              <SessionMockup />
            </Reveal>
          </div>
        </section>

        {/* The attendance problem this platform is designed to remove. */}
        <section className="border-b border-line bg-paper">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
            <Reveal>
              <Eyebrow>The problem</Eyebrow>
              <h2 className="mt-5 font-display text-3xl leading-snug text-charcoal sm:text-4xl">
                Attendance is still running on paper habits and Friday-afternoon
                spreadsheets.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-6 text-graphite">
                <p className="leading-relaxed">
                  Sign-in sheets get passed down the row and signed for a friend.
                  Manual registers eat into teaching time. And by the time
                  attendance is typed up, the moment to act on a struggling
                  student&apos;s absence has already passed.
                </p>
                <p className="leading-relaxed">
                  Departments end up with attendance data that is inconsistent
                  between courses, hard to audit, and rarely ready when a report
                  is actually needed.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* The core workflow, from opening a session to reviewing records. */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
              <Reveal>
                <Eyebrow>The solution</Eyebrow>
                <h2 className="mt-5 font-display text-3xl leading-snug text-charcoal sm:text-4xl">
                  One session code. One quick scan. One reliable record.
                </h2>
                <p className="mt-6 max-w-lg leading-relaxed text-graphite">
                  Presently replaces the register with a session-specific QR
                  code that refreshes automatically and a token-verified
                  check-in. Lecturers see attendance build in real time, and
                  every session flows straight into organized, reportable
                  records — automatically.
                </p>
                <div className="mt-8">
                  <Button href="/platform" variant="ghost">
                    See the full platform
                    <IconArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={140}>
                <LiveActivityMockup />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Product benefits for everyday attendance work. */}
        <section className="border-b border-line bg-paper">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <Reveal className="max-w-xl">
              <Eyebrow>Core benefits</Eyebrow>
              <h2 className="mt-5 font-display text-3xl leading-snug text-charcoal sm:text-4xl">
                Built around the moment attendance actually happens.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {coreBenefits.map((benefit, i) => (
                <Reveal key={benefit.title} delay={i * 80}>
                  <FeatureCard {...benefit} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* A short preview of the three-step check-in flow. */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Reveal className="max-w-lg">
                <Eyebrow>How it works</Eyebrow>
                <h2 className="mt-5 font-display text-3xl leading-snug text-charcoal sm:text-4xl">
                  From an empty room to a verified record, in three moves.
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <Button href="/how-it-works" variant="secondary">
                  Walk through the full process
                  <IconArrowRight className="h-4 w-4" />
                </Button>
              </Reveal>
            </div>

            <div className="mt-14 grid gap-10 md:grid-cols-3">
              {howItWorksPreview.map((item, i) => (
                <Reveal key={item.step} delay={i * 100}>
                  <div className="border-t border-line-strong pt-6">
                    <span className="font-display text-3xl text-bronze-deep/80">
                      {item.step}
                    </span>
                    <h3 className="mt-4 font-display text-xl text-charcoal">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-graphite">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Feature preview with the main tools users interact with. */}
        <section className="border-b border-line bg-paper">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <Reveal className="max-w-xl">
              <Eyebrow>Feature preview</Eyebrow>
              <h2 className="mt-5 font-display text-3xl leading-snug text-charcoal sm:text-4xl">
                Everything attendance touches, organized in one place.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featurePreview.map((feature, i) => (
                <Reveal key={feature.title} delay={i * 60}>
                  <FeatureCard {...feature} />
                </Reveal>
              ))}
            </div>
            <Reveal delay={200}>
              <div className="mt-10">
                <Button href="/features" variant="ghost">
                  See all features
                  <IconArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Institutional outcomes and administration-focused messaging. */}
        <section id="institutions" className="border-b border-line">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
            <Reveal className="relative order-2 aspect-[4/5] overflow-hidden rounded-2xl border border-line-strong lg:order-1">
              <Image
                src={photos.campusCourtyard.src}
                alt={photos.campusCourtyard.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={100} className="order-1 lg:order-2">
              <Eyebrow>For institutions</Eyebrow>
              <h2 className="mt-5 font-display text-3xl leading-snug text-charcoal sm:text-4xl">
                A consistent standard across every department, course, and campus.
              </h2>
              <p className="mt-6 max-w-lg leading-relaxed text-graphite">
                Presently gives every course the same dependable attendance
                process — so records are comparable across departments, easy to
                review, and ready whenever the institution needs a clear picture
                of engagement.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "One consistent check-in experience across every course",
                  "Organized records that are simple to review and export",
                  "A process staff and students learn once and trust",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-graphite">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-deep" />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <Button href="#contact" variant="secondary">
                  Talk to our team
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Final call to action and contact path. */}
        <section id="contact" className="bg-charcoal text-cream">
          <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
            <Reveal>
              <Eyebrow>Get started</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
                Give your lecture halls a better way to take attendance.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-6 max-w-xl leading-relaxed text-cream/70">
                See how session check-in, live activity, and organized records
                come together for your department.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button href="/how-it-works" variant="inverse">
                  See how it works
                </Button>
                <Button href="/platform" variant="secondary" className="border-cream/30 text-cream hover:border-bronze-soft hover:text-bronze-soft">
                  Explore the platform
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
