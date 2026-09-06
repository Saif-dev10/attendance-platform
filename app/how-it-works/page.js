import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import ProcessStep from "@/components/ProcessStep";
import CourseListMockup from "@/components/CourseListMockup";
import QRGlyph from "@/components/QRGlyph";
import StatusPill from "@/components/StatusPill";
import LiveActivityMockup from "@/components/LiveActivityMockup";
import RecordsMockup from "@/components/RecordsMockup";
import AreaVerifiedMockup from "@/components/AreaVerifiedMockup";
import { photos } from "@/lib/photos";
import { IconArrowRight } from "@/components/icons";

export const metadata = {
  title: "How It Works — Presently",
  description:
    "Follow the full attendance workflow, from selecting a course to reviewing organized records.",
};

export default function HowItWorksPage() {
  return (
    <>
      {/* The sequence mirrors a real class session, from opening attendance to reviewing records. */}
      <Nav />
      <main id="main" className="overflow-x-hidden">
        {/* Intro: set expectations for the full attendance journey. */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-10 lg:py-28">
            <Reveal>
              <Eyebrow>How it works</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-4xl leading-tight text-charcoal sm:text-5xl">
                Seven steps, start to finish.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-graphite">
                From the moment a lecturer opens a class to the moment records
                are ready to review — here&apos;s exactly how attendance flows
                through Presently.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Process steps: the class session from setup through record keeping. */}
        <section className="border-b border-line bg-paper">
          <div className="mx-auto min-w-0 max-w-6xl px-6 py-6 lg:px-10">
            <Reveal>
              <ProcessStep
                number={1}
                audience="Lecturer"
                title="Select a course"
                description="From a list of scheduled classes, the lecturer chooses the course and session they're about to teach."
              >
                <CourseListMockup />
              </ProcessStep>
            </Reveal>

            <Reveal>
              <ProcessStep
                number={2}
                audience="Lecturer"
                title="Start the attendance session"
                description="One tap opens attendance for the room. The session is now active and ready to accept check-ins."
              >
                <div className="flex flex-col items-start gap-4 rounded-2xl border border-line-strong bg-paper p-8 shadow-[0_24px_50px_-28px_rgba(32,30,27,0.3)]">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-graphite-soft">
                    ENGR 214 &middot; Lecture 09
                  </p>
                  <h3 className="font-display text-xl text-charcoal">Structural Analysis</h3>
                  <StatusPill label="Session live" />
                  <p className="text-sm leading-relaxed text-graphite">
                    Attendance is now open for this room and ready for
                    check-ins.
                  </p>
                </div>
              </ProcessStep>
            </Reveal>

            <Reveal>
              <ProcessStep
                number={3}
                audience="Lecturer"
                title="A class QR code is displayed"
                description="A session-specific code appears on screen and refreshes automatically every 30 seconds, so it only works for this session, in this room, right now."
              >
                <div className="flex justify-center rounded-2xl border border-line-strong bg-paper p-8 shadow-[0_24px_50px_-28px_rgba(32,30,27,0.3)]">
                  <QRGlyph size={180} animated />
                </div>
              </ProcessStep>
            </Reveal>

            <Reveal>
              <ProcessStep
                number={4}
                audience="Student"
                title="Students scan the QR code"
                description="Each student opens their phone and scans the displayed code to begin checking in to the session."
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line-strong">
                  <Image
                    src={photos.studentsPhones.src}
                    alt={photos.studentsPhones.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover"
                  />
                </div>
              </ProcessStep>
            </Reveal>

            <Reveal>
              <ProcessStep
                number={5}
                audience="System"
                title="Attendance is validated against the session"
                description="Before a check-in is confirmed, the system checks that the session is active, the student is enrolled, the QR token hasn't expired, and they haven't already checked in — so records stay accurate."
              >
                <AreaVerifiedMockup />
              </ProcessStep>
            </Reveal>

            <Reveal>
              <ProcessStep
                number={6}
                audience="Lecturer"
                title="Attendance updates for the lecturer"
                description="Verified check-ins appear on the lecturer's screen as they happen, giving a live, running view of who has checked in."
              >
                <LiveActivityMockup />
              </ProcessStep>
            </Reveal>

            <Reveal>
              <ProcessStep
                number={7}
                audience="Administrator"
                title="Records can be reviewed and managed"
                description="Once the session ends, attendance is organized automatically into records that can be reviewed, filtered, and exported at any time."
              >
                <RecordsMockup />
              </ProcessStep>
            </Reveal>
          </div>
        </section>

        {/* Closing call to action. */}
        <section className="bg-charcoal text-cream">
          <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
            <Reveal>
              <h2 className="font-display text-4xl leading-tight sm:text-5xl">
                See how it fits your department.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mx-auto mt-6 max-w-xl leading-relaxed text-cream/70">
                Explore the full feature set or take a closer look at what each
                role experiences day to day.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button href="/features" variant="inverse">
                  Explore features
                  <IconArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  href="/platform"
                  variant="secondary"
                  className="border-cream/30 text-cream hover:border-bronze-soft hover:text-bronze-soft"
                >
                  Back to platform
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
