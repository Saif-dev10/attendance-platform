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
      "A class session opens with one tap and the room code appears instantly. No paper registers, no manual follow-up.",
  },
  {
    icon: <IconLocation className="h-5 w-5" />,
    title: "Check-ins that hold up",
    description:
      "Every scan is validated against the live session and the student’s enrollment so duplicate or stale check-ins are rejected automatically.",
  },
  {
    icon: <IconActivity className="h-5 w-5" />,
    title: "Visibility while teaching",
    description:
      "Lecturers watch attendance build in real time during class, without leaving the room or chasing a spreadsheet afterward.",
  },
  {
    icon: <IconRecords className="h-5 w-5" />,
    title: "Records worth trusting",
    description:
      "Each session is organized automatically into structured records for courses, cohorts, and teaching periods.",
  },
];

const howItWorksPreview = [
  {
    step: "01",
    title: "Open the session",
    description: "A lecturer selects the course and starts attendance for the room in seconds.",
  },
  {
    step: "02",
    title: "Display the code",
    description: "A session-specific QR code appears for the class and refreshes automatically.",
  },
  {
    step: "03",
    title: "Students check in",
    description: "Each scan is verified against the live session, ensuring a clean and trusted record.",
  },
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
    description: "A fresh, room-specific code for every class — never reused, never guessed.",
  },
  {
    icon: <IconLocation className="h-5 w-5" />,
    title: "Secure verification",
    description: "Each check-in is validated against the active session and enrollment before it is confirmed.",
  },
  {
    icon: <IconActivity className="h-5 w-5" />,
    title: "Live activity",
    description: "Watch attendance update in real time as students check in and move through the session.",
  },
  {
    icon: <IconRecords className="h-5 w-5" />,
    title: "Records & reports",
    description: "Organized, exportable attendance history by course, cohort, or teaching period.",
  },
  {
    icon: <IconShield className="h-5 w-5" />,
    title: "Built for trust",
    description: "A consistent, fair process students and staff can rely on across every course.",
  },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="overflow-x-hidden">
        <section className="relative overflow-hidden border-b border-line">
          <div className="mx-auto grid min-w-0 max-w-7xl gap-16 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:px-10 lg:pb-28 lg:pt-24">
            <div>
              <Reveal></Reveal>
              <Reveal delay={80}>
                <h1 className="mt-6 font-display text-[2.75rem] leading-[1.08] tracking-tight text-charcoal sm:text-6xl">
                  SKUL keeps attendance moving so class time stays focused on learning.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-graphite">
                  SKUL helps lecturers open a class in seconds, gives students a faster
                  way to check in, and gives institutions a record they can trust.
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

        <section className="border-b border-line bg-paper">
          <div className="mx-auto grid min-w-0 max-w-7xl gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
            <Reveal>
              <Eyebrow>The problem</Eyebrow>
              <h2 className="mt-5 font-display text-3xl leading-snug text-charcoal sm:text-4xl">
                Attendance is still being managed by paper habits and Friday-afternoon spreadsheets.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-6 text-graphite">
                <p className="leading-relaxed">
                  Sign-in sheets circulate down the room and are shared between friends.
                  Manual registers eat into teaching time, and by the time attendance is
                  typed up, the moment to support a student has already passed.
                </p>
                <p className="leading-relaxed">
                  Departments end up with records that are inconsistent from course to
                  course, hard to audit, and rarely ready when a report is actually needed.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-b border-line">
          <div className="mx-auto min-w-0 max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
              <Reveal>
                <Eyebrow>The solution</Eyebrow>
                <h2 className="mt-5 font-display text-3xl leading-snug text-charcoal sm:text-4xl">
                  One live session. One quick scan. One dependable record.
                </h2>
                <p className="mt-6 max-w-lg leading-relaxed text-graphite">
                  SKUL replaces the register with a session-specific QR code and
                  token-verified check-in. Lecturers see attendance build in real time,
                  and each session flows straight into organized, reportable records.
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

        <section className="border-b border-line bg-paper">
          <div className="mx-auto min-w-0 max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <Reveal className="max-w-xl">
              <Eyebrow>Core benefits</Eyebrow>
              <h2 className="mt-5 font-display text-3xl leading-snug text-charcoal sm:text-4xl">
                Built around the moments that matter on campus.
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

        <section className="border-b border-line">
          <div className="mx-auto min-w-0 max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Reveal className="max-w-lg">
                <Eyebrow>How it works</Eyebrow>
                <h2 className="mt-5 font-display text-3xl leading-snug text-charcoal sm:text-4xl">
                  From an empty room to a verified record in three steps.
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
                    <span className="font-display text-3xl text-bronze-deep/80">{item.step}</span>
                    <h3 className="mt-4 font-display text-xl text-charcoal">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-graphite">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-paper">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <Reveal className="max-w-xl">
              <Eyebrow>Feature preview</Eyebrow>
              <h2 className="mt-5 font-display text-3xl leading-snug text-charcoal sm:text-4xl">
                The tools that keep campus check-ins clear, fast, and consistent.
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

        <section className="border-b border-line">
          <div className="mx-auto grid min-w-0 max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
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
              <Eyebrow>Student services</Eyebrow>
              <h2 className="mt-5 font-display text-3xl leading-snug text-charcoal sm:text-4xl">
                Campus Ride is part of the student journey, not a separate app.
              </h2>
              <p className="mt-6 max-w-lg leading-relaxed text-graphite">
                Find a campus route, check available rides, view route information, book an available shuttle,
                track an active trip, and manage ride-wallet details from the same place students already use for
                academic services and campus information.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "View available campus routes and nearby shuttles",
                  "Review route details and current ride information",
                  "Book a ride, track an active trip, and manage wallet details",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-graphite">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-deep" />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <Button href="/campus-ride" variant="secondary">
                  Explore Campus Ride
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="institutions" className="border-b border-line">
          <div className="mx-auto grid min-w-0 max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
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
                SKUL gives every course the same dependable attendance process — making
                records comparable across departments, easier to review, and ready when
                institutional reporting is needed.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "One consistent check-in experience across the campus",
                  "Organized records that are simple to review and export",
                  "A process staff and students can learn once and trust",
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

        <section id="contact" className="bg-charcoal text-cream">
          <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
            <Reveal>
              <Eyebrow>Get started</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
                Give your campus a better way to run attendance.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-6 max-w-xl leading-relaxed text-cream/70">
                See how session check-in, live visibility, and organized records work together.
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
