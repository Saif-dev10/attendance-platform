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
  title: "How It Works — SKUL",
  description:
    "Follow the full SKUL attendance workflow, from selecting a course to reviewing organized records.",
};

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <main id="main" className="overflow-x-hidden">
        <section className="border-b border-line">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-10 lg:py-28">
            <Reveal>
              <Eyebrow>How it works</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-4xl leading-tight text-charcoal sm:text-5xl">
                Seven steps, from class start to final record.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-graphite">
                From the moment a lecturer opens a class to the moment attendance is ready
                to review, here&apos;s exactly how SKUL connects academic work, student services,
                and campus operations — including Campus Ride — into one clearer experience.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="border-b border-line bg-paper">
          <div className="mx-auto min-w-0 max-w-6xl px-6 py-6 lg:px-10">
            <Reveal>
              <ProcessStep
                number={1}
                audience="Lecturer"
                title="Select a course"
                description="From a list of scheduled classes, the lecturer chooses the course and session they are about to teach."
              >
                <CourseListMockup />
              </ProcessStep>
            </Reveal>

            <Reveal>
              <ProcessStep
                number={2}
                audience="Lecturer"
                title="Start the session"
                description="One tap opens attendance for the room. The session is now active and ready to accept check-ins."
              >
                <div className="flex flex-col items-start gap-4 rounded-2xl border border-line-strong bg-paper p-8 shadow-[0_24px_50px_-28px_rgba(32,30,27,0.3)]">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-graphite-soft">
                    ENGR 214 &middot; Lecture 09
                  </p>
                  <h3 className="font-display text-xl text-charcoal">Structural Analysis</h3>
                  <StatusPill label="Session live" />
                  <p className="text-sm leading-relaxed text-graphite">
                    Attendance is now open for this room and ready for check-ins.
                  </p>
                </div>
              </ProcessStep>
            </Reveal>

            <Reveal>
              <ProcessStep
                number={3}
                audience="Lecturer"
                title="Display the class QR code"
                description="A session-specific code appears on screen and refreshes automatically, so it only works for this class, in this room, at this time."
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
                description="Each student opens their phone and scans the displayed code to begin checking in to the class."
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
                description="Before a check-in is confirmed, SKUL verifies the session is active, the student is enrolled, the code is valid, and they have not already checked in."
              >
                <AreaVerifiedMockup />
              </ProcessStep>
            </Reveal>

            <Reveal>
              <ProcessStep
                number={6}
                audience="Lecturer"
                title="Attendance updates live for the lecturer"
                description="Verified check-ins appear as they happen, giving the lecturer a running view of who is present and who may still need attention."
              >
                <LiveActivityMockup />
              </ProcessStep>
            </Reveal>

            <Reveal>
              <ProcessStep
                number={7}
                audience="Administrator"
                title="Records are reviewed and managed"
                description="Once the session ends, attendance is organized automatically into records that can be reviewed, filtered, and exported at any time."
              >
                <RecordsMockup />
              </ProcessStep>
            </Reveal>
          </div>
        </section>

        <section className="bg-charcoal text-cream">
          <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
            <Reveal>
              <h2 className="font-display text-4xl leading-tight sm:text-5xl">
                See how SKUL fits your department.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mx-auto mt-6 max-w-xl leading-relaxed text-cream/70">
                Explore the full feature set and take a closer look at what each role experiences day to day.
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
