'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import Topbar from '@/components/layout/Topbar';

import {
  PiFileTextFill,
  PiCertificateFill,
  PiIdentificationCardFill,
  PiEnvelopeSimpleOpenFill,
  PiClockFill,
  PiCheckCircleFill,
  PiPackageFill,
  PiDownloadSimpleBold,
} from 'react-icons/pi';

const DOCUMENT_TYPES = [
  {
    id: 'transcript',
    icon: PiFileTextFill,
    title: 'Official Transcript',
    description: 'A certified record of every course and grade on file.',
    lastRequest: 'Requested 3 weeks ago',
  },
  {
    id: 'certificate',
    icon: PiCertificateFill,
    title: 'Certificate of Attendance',
    description: 'Confirms your current enrollment status for the session.',
    lastRequest: null,
  },
  {
    id: 'admission-letter',
    icon: PiEnvelopeSimpleOpenFill,
    title: 'Admission Letter',
    description: 'A reissued copy of your original letter of admission.',
    lastRequest: null,
  },
  {
    id: 'id-replacement',
    icon: PiIdentificationCardFill,
    title: 'Student ID Replacement',
    description: 'Request a new ID card if yours is lost or damaged.',
    lastRequest: 'Requested 4 months ago',
  },
];

const REQUEST_STAGES = ['Requested', 'Processing', 'Ready', 'Collected'];

const RECENT_REQUESTS = [
  { id: 'DOC-2201', title: 'Official Transcript', stage: 2, date: 'Sept 2, 2026' },
  { id: 'DOC-2088', title: 'Student ID Replacement', stage: 3, date: 'May 14, 2026' },
];

function StageTracker({ stage }) {
  return (
    <div className="flex items-center gap-2">
      {REQUEST_STAGES.map((label, i) => {
        const reached = i <= stage;
        const isLast = i === REQUEST_STAGES.length - 1;

        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span
                className={`h-2 w-2 rounded-full ${
                  reached ? 'bg-bronze-deep' : 'bg-line-strong'
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  reached ? 'text-charcoal' : 'text-graphite-soft'
                }`}
              >
                {label}
              </span>
            </div>
            {!isLast && <span className="h-px w-6 bg-line-strong" />}
          </div>
        );
      })}
    </div>
  );
}

export default function DocumentsPage() {
  const [pendingId, setPendingId] = useState(null);

  const handleRequest = (id) => {
    setPendingId(id);
    setTimeout(() => setPendingId(null), 1800);
  };

  return (
    <div>
      <Sidebar />
      <MobileBottomNav active="more" />
      <Topbar
        title="Documents"
        subtitle="Request official documents and track them through to collection."
      />
      <main className="min-h-screen bg-cream md:ml-[280px]">
        <div className="mx-auto max-w-6xl px-6 pb-28 pt-[104px] lg:px-10 md:pb-14">
          <div className="grid gap-5 sm:grid-cols-2">
            {DOCUMENT_TYPES.map((doc) => {
              const Icon = doc.icon;
              const isPending = pendingId === doc.id;

              return (
                <div
                  key={doc.id}
                  className="flex flex-col justify-between rounded-2xl border border-line bg-paper p-6"
                >
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-charcoal text-cream">
                      <Icon className="text-lg" />
                    </div>
                    <h2 className="mt-4 font-display text-lg font-semibold text-charcoal">
                      {doc.title}
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-graphite">
                      {doc.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-xs text-graphite-soft">
                      {doc.lastRequest || 'No previous requests'}
                    </p>
                    <Button
                      type="button"
                      onClick={() => handleRequest(doc.id)}
                      disabled={isPending}
                      className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                        isPending
                          ? 'bg-graphite text-cream cursor-not-allowed'
                          : 'bg-charcoal text-cream hover:bg-charcoal/90 cursor-pointer'
                      }`}
                    >
                      {isPending ? 'Requesting…' : 'Request'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <h2 className="font-display text-lg font-semibold text-charcoal">Recent requests</h2>

            <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-paper">
              <div className="divide-y divide-line">
                {RECENT_REQUESTS.map((req) => {
                  const isReady = req.stage === 2;
                  const isCollected = req.stage === 3;

                  return (
                    <div
                      key={req.id}
                      className="flex flex-wrap items-center justify-between gap-4 px-6 py-5"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-xs font-mono text-graphite-soft">
                          <PiPackageFill />
                          {req.id}
                        </div>
                        <p className="mt-1 font-semibold text-charcoal">{req.title}</p>
                        <p className="text-sm text-graphite">Requested {req.date}</p>
                      </div>

                      <div className="flex items-center gap-6">
                        <StageTracker stage={req.stage} />

                        {isReady && (
                          <span className="flex items-center gap-1.5 rounded-full bg-bronze-deep/10 px-3 py-1 text-xs font-bold text-bronze-deep">
                            <PiClockFill /> Ready for pickup
                          </span>
                        )}

                        {isCollected && (
                          <button
                            type="button"
                            className="flex items-center gap-1.5 text-sm font-bold text-charcoal hover:text-bronze-deep"
                          >
                            <PiDownloadSimpleBold />
                            Receipt
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}