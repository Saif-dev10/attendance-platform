'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import Topbar from '@/components/layout/Topbar';

import {
  PiCheckCircleFill,
  PiPackageFill,
  PiDownloadSimpleBold,
} from 'react-icons/pi';
import {
  getDocumentTypes,
  getRecentDocumentRequests,
  requestDocument,
} from '@/lib/services/documents';

const DOCUMENT_TYPES = getDocumentTypes();
const REQUEST_STAGES = ['Requested', 'Processing', 'Ready', 'Collected'];
const RECENT_REQUESTS = getRecentDocumentRequests();

function StageTracker({ stage }) {
  return (
    <div className="flex min-w-max items-center gap-1.5">
      {REQUEST_STAGES.map((label, i) => {
        const reached = i <= stage;
        const isCurrent = i === stage;
        const isLast = i === REQUEST_STAGES.length - 1;

        return (
          <div
            key={label}
            className="flex items-center gap-1.5"
          >
            <div className="flex items-center gap-1.5">
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${
                  reached
                    ? 'bg-bronze-deep'
                    : 'bg-line-strong'
                }`}
              />

              <span
                className={`whitespace-nowrap text-xs font-medium ${
                  isCurrent
                    ? 'text-charcoal'
                    : reached
                      ? 'text-graphite'
                      : 'text-graphite-soft'
                }`}
              >
                {label}
              </span>
            </div>

            {!isLast && (
              <span
                className={`h-px w-4 shrink-0 sm:w-6 ${
                  i < stage
                    ? 'bg-bronze-deep/60'
                    : 'bg-line-strong'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function DocumentsPage() {
  const [pendingId, setPendingId] = useState(null);
  const [requestedId, setRequestedId] = useState(null);

  const handleRequest = async (id) => {
    setPendingId(id);

    await requestDocument(id);

    setTimeout(() => {
      setPendingId(null);
      setRequestedId(id);

      setTimeout(() => {
        setRequestedId(null);
      }, 3000);
    }, 1200);
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

          {/* Document request cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {DOCUMENT_TYPES.map((doc) => {
              const Icon = doc.icon;
              const isPending = pendingId === doc.id;
              const wasRequested = requestedId === doc.id;

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

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <p className="text-xs text-graphite-soft">
                      {doc.lastRequest || 'No previous requests'}
                    </p>

                    <Button
                      type="button"
                      onClick={() => handleRequest(doc.id)}
                      disabled={isPending || wasRequested}
                      className={`shrink-0 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                        isPending
                          ? 'cursor-not-allowed bg-graphite text-cream'
                          : wasRequested
                            ? 'cursor-not-allowed bg-bronze-deep/10 text-bronze-deep'
                            : 'cursor-pointer bg-charcoal text-cream hover:bg-charcoal/90'
                      }`}
                    >
                      {isPending
                        ? 'Requesting…'
                        : wasRequested
                          ? 'Request Submitted'
                          : 'Request'}
                    </Button>
                  </div>

                  {wasRequested && (
                    <div className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-xs font-medium text-bronze-deep">
                      <PiCheckCircleFill className="text-sm" />
                      Your request has been submitted successfully.
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Recent requests */}
          <div className="mt-10">
            <h2 className="font-display text-lg font-semibold text-charcoal">
              Recent requests
            </h2>

            <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-paper">
              <div className="divide-y divide-line">
                {RECENT_REQUESTS.map((req) => {
                  const isReady = req.stage === 2;
                  const isCollected = req.stage === 3;

                  return (
                    <div
                      key={req.id}
                      className="px-5 py-5 sm:px-6"
                    >
                      {/* Request information */}
                      <div className="flex min-w-0 items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 text-xs font-mono text-graphite-soft">
                            <PiPackageFill />
                            {req.id}
                          </div>

                          <p className="mt-1 font-semibold text-charcoal">
                            {req.title}
                          </p>

                          <p className="text-sm text-graphite">
                            Requested {req.date}
                          </p>
                        </div>

                        {/* Current status */}
                        {isReady && (
                          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-bronze-deep/10 px-3 py-1 text-xs font-bold text-bronze-deep">
                            <PiPackageFill />
                            <span className="hidden sm:inline">
                              Ready for pickup
                            </span>
                            <span className="sm:hidden">
                              Ready
                            </span>
                          </span>
                        )}

                        {isCollected && (
                          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-graphite/10 px-3 py-1 text-xs font-bold text-graphite">
                            <PiCheckCircleFill />
                            Collected
                          </span>
                        )}
                      </div>

                      {/* Progress tracker */}
                      <div className="mt-5 overflow-x-auto pb-1">
                        <StageTracker stage={req.stage} />
                      </div>

                      {/* Receipt action */}
                      {isCollected && (
                        <div className="mt-4 border-t border-line pt-4">
                          <button
                            type="button"
                            disabled
                            className="flex cursor-not-allowed items-center gap-1.5 text-sm font-bold text-graphite-soft"
                            title="Receipt download will be available once document services are connected."
                          >
                            <PiDownloadSimpleBold />
                            Receipt
                            <span className="text-xs font-normal">
                              (Coming soon)
                            </span>
                          </button>
                        </div>
                      )}
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