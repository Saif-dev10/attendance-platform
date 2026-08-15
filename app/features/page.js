import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import FeatureCard from "@/components/FeatureCard";
import LiveActivityMockup from "@/components/LiveActivityMockup";
import RecordsMockup from "@/components/RecordsMockup";
import {
  IconSession,
  IconQR,
  IconScan,
  IconLocation,
  IconActivity,
  IconRecords,
  IconClock,
  IconLayers,
  IconShield,
  IconUsers,
  IconArrowRight,
} from "@/components/icons";

export const metadata = {
  title: "Features — Presently",
  description:
    "Explore every part of Presently's attendance workflow — session control, QR check-in, secure token verification, live activity, and organized reporting.",
};

const groups = [
  {
    label: "Running a session",
    heading: "Give lecturers control without the overhead",
    features: [
      {
        icon: <IconSession className="h-5 w-5" />,
        title: "One-tap session control",
        description: "Start, pause, or close attendance for any scheduled class in a couple of taps.",
      },
      {
        icon: <IconClock className="h-5 w-5" />,
        title: "Scheduled or ad-hoc sessions",
        description: "Open attendance for a timetabled class, or start one on the spot for a rescheduled session.",
      },
      {
        icon: <IconLayers className="h-5 w-5" />,
        title: "Multiple course support",
        description: "Switch between courses and sessions cleanly, with no mixing of records between classes.",
      },
    ],
  },
  {
    label: "Checking in",
    heading: "A check-in that takes seconds, not a queue",
    features: [
      {
        icon: <IconQR className="h-5 w-5" />,
        title: "Session-specific QR codes",
        description: "A fresh code is generated for every session, displayed only for the room and time it belongs to.",
      },
      {
        icon: <IconScan className="h-5 w-5" />,
        title: "Instant scan and confirm",
        description: "Students scan from their own phone and get immediate confirmation their check-in was received.",
      },
      {
        icon: <IconLocation className="h-5 w-5" />,
        title: "Secure token verification",
        description: "Each scan is checked against the active session token and confirmed only once per student, so check-ins can't be reused or duplicated.",
      },
    ],
  },
];

const additionalFeatures = [
  {
    icon: <IconUsers className="h-5 w-5" />,
    title: "Role-based views",
    description: "Lecturers, students, and administrators each get a view built around what they need to do.",
  },
  {
    icon: <IconShield className="h-5 w-5" />,
    title: "A consistent, fair process",
    description: "The same check-in standard applies to every course, so attendance is comparable across a department.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* INTRO */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-10 lg:py-28">
            <Reveal>
              <Eyebrow>Features</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-4xl leading-tight text-charcoal sm:text-5xl">
                Everything attendance needs, nothing it doesn&apos;t.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-graphite">
                Each feature is built around a single moment in the attendance
                workflow — from opening a session to reviewing the final
                record.
              </p>
            </Reveal>
          </div>
        </section>

        {/* FEATURE GROUPS */}
        {groups.map((group, gi) => (
          <section
            key={group.label}
            className={`border-b border-line ${gi % 2 === 1 ? "bg-paper" : ""}`}
          >
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
              <Reveal className="max-w-xl">
                <Eyebrow>{group.label}</Eyebrow>
                <h2 className="mt-5 font-display text-3xl leading-snug text-charcoal sm:text-4xl">
                  {group.heading}
                </h2>
              </Reveal>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.features.map((feature, i) => (
                  <Reveal key={feature.title} delay={i * 80}>
                    <FeatureCard {...feature} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* LIVE ACTIVITY HIGHLIGHT */}
        <section className="border-b border-line">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
            <Reveal>
              <Eyebrow>Watching it happen</Eyebrow>
              <h2 className="mt-5 font-display text-3xl leading-snug text-charcoal sm:text-4xl">
                Live activity, visible the moment it happens
              </h2>
              <p className="mt-6 max-w-lg leading-relaxed text-graphite">
                As students check in, the lecturer&apos;s session view updates in
                real time — a clear, running count of who has checked in and
                who hasn&apos;t, without ever leaving the front of the room.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <LiveActivityMockup />
            </Reveal>
          </div>
        </section>

        {/* RECORDS HIGHLIGHT */}
        <section className="border-b border-line bg-paper">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
            <Reveal delay={140} className="order-2 lg:order-1">
              <RecordsMockup />
            </Reveal>
            <Reveal className="order-1 lg:order-2">
              <Eyebrow>After the session</Eyebrow>
              <h2 className="mt-5 font-display text-3xl leading-snug text-charcoal sm:text-4xl">
                Organized records and reports, automatically
              </h2>
              <div className="mt-6 flex max-w-lg items-start gap-3">
                <IconRecords className="mt-1 h-5 w-5 shrink-0 text-bronze-deep" />
                <p className="leading-relaxed text-graphite">
                  Every session is filed into a clean, structured record —
                  searchable by course, cohort, or teaching period, and ready
                  to export as PDF, Excel, or CSV whenever a report is needed.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ADDITIONAL */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
            <Reveal className="max-w-xl">
              <Eyebrow>Also included</Eyebrow>
              <h2 className="mt-5 font-display text-3xl leading-snug text-charcoal sm:text-4xl">
                Details that make the process easy to trust
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {additionalFeatures.map((feature, i) => (
                <Reveal key={feature.title} delay={i * 80}>
                  <FeatureCard {...feature} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-charcoal text-cream">
          <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
            <Reveal>
              <h2 className="font-display text-4xl leading-tight sm:text-5xl">
                See these features in a real workflow.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button href="/how-it-works" variant="inverse">
                  Walk through How It Works
                  <IconArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  href="/platform"
                  variant="secondary"
                  className="border-cream/30 text-cream hover:border-bronze-soft hover:text-bronze-soft"
                >
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
