'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import Topbar from '@/components/layout/Topbar';
import {
  getComplaintCategories,
  getComplaintFormOptions,
  getComplaints,
} from '@/lib/services/complaints';

import {
  PiChatCircleTextFill,
  PiClockFill,
  PiCheckCircleFill,
  PiXCircleFill,
  PiPaperPlaneTiltFill,
  PiMailboxFill,
  PiPhoneCallFill,
  PiGraduationCapFill,
  PiClipboardTextFill,
  PiArrowLeft,
} from 'react-icons/pi';
import { ArrowLeft } from 'lucide-react';

const CATEGORIES = getComplaintCategories();
const { courses: COURSES, sessions: SESSIONS } = getComplaintFormOptions();
const INITIAL_TICKETS = getComplaints();

const STATUS_STYLES = {
  Submitted: { icon: PiPaperPlaneTiltFill, classes: 'bg-bronze-deep/10 text-bronze-deep' },
  'Under Review': {
    icon: PiClockFill,
    classes: 'bg-paper text-graphite border border-line-strong',
  },
  Resolved: { icon: PiCheckCircleFill, classes: 'bg-charcoal text-cream' },
  Rejected: { icon: PiXCircleFill, classes: 'bg-red-50 text-red-600' },
};

function StatusBadge({ status }) {
  const config = STATUS_STYLES[status] || STATUS_STYLES.Submitted;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${config.classes}`}
    >
      <Icon className="text-sm" />
      {status}
    </span>
  );
}

const inputClass =
  'w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm font-medium text-charcoal placeholder:text-graphite-soft focus:outline-none focus:ring-4 focus:ring-bronze-deep/10 focus:border-bronze-soft';
const labelClass = 'block text-[13px] font-bold text-charcoal uppercase tracking-wider mb-2';

function getFormVariant(categoryId, type) {
  if (categoryId === 'academic') {
    return type === 'Attendance issue' ? 'attendance' : 'generic';
  }
  if (categoryId === 'examination') {
    return type === 'Result issue' ? 'examResult' : 'examGeneral';
  }
  if (categoryId === 'campus-ride') return 'campusRide';
  if (categoryId === 'documents') return 'document';
  return 'generic';
}

function defaultFieldsFor(variant) {
  switch (variant) {
    case 'attendance':
      return { course: COURSES[0], session: SESSIONS[0], currentStatus: 'Marked absent', reason: '', additionalInfo: '' };
    case 'examResult':
      return { session: SESSIONS[0], course: COURSES[0], currentScore: '', explanation: '', additionalInfo: '' };
    case 'examGeneral':
      return { course: COURSES[0], description: '', additionalInfo: '' };
    case 'campusRide':
      return { bookingRef: '', route: '', description: '', additionalInfo: '' };
    case 'document':
      return { documentType: 'Official Transcript', referenceNumber: '', description: '' };
    default:
      return { subject: '', description: '' };
  }
}

function buildSubject(categoryId, type, variant, fields) {
  switch (variant) {
    case 'attendance':
      return `Attendance issue — ${fields.course}`;
    case 'examResult':
      return `Result issue — ${fields.course}`;
    case 'examGeneral':
      return `${type} — ${fields.course}`;
    case 'campusRide':
      return fields.route ? `${type} — ${fields.route}` : type;
    case 'document':
      return `${type} — ${fields.documentType}`;
    default:
      return fields.subject || type;
  }
}

function isFormValid(variant, fields) {
  switch (variant) {
    case 'attendance':
      return fields.reason.trim().length > 0;
    case 'examResult':
      return fields.explanation.trim().length > 0;
    case 'examGeneral':
      return fields.description.trim().length > 0;
    case 'campusRide':
      return fields.description.trim().length > 0;
    case 'document':
      return fields.description.trim().length > 0;
    default:
      return fields.subject.trim().length > 0 && fields.description.trim().length > 0;
  }
}

function DynamicFields({ variant, fields, onChange }) {
  const set = (name) => (e) => onChange(name, e.target.value);

  if (variant === 'attendance') {
    return (
      <>
        <div>
          <label className={labelClass}>Course</label>
          <select className={inputClass} value={fields.course} onChange={set('course')}>
            {COURSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Session / Date</label>
          <select className={inputClass} value={fields.session} onChange={set('session')}>
            {SESSIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Current attendance status</label>
          <select className={inputClass} value={fields.currentStatus} onChange={set('currentStatus')}>
            {['Marked absent', 'Marked late', 'Not recorded'].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Reason for correction</label>
          <textarea rows={4} className={`${inputClass} resize-none`} value={fields.reason} onChange={set('reason')} placeholder="Explain why this attendance record needs to be corrected" />
        </div>
        <div>
          <label className={labelClass}>Additional information (optional)</label>
          <textarea rows={3} className={`${inputClass} resize-none`} value={fields.additionalInfo} onChange={set('additionalInfo')} />
        </div>
      </>
    );
  }

  if (variant === 'examResult') {
    return (
      <>
        <div>
          <label className={labelClass}>Session</label>
          <select className={inputClass} value={fields.session} onChange={set('session')}>
            {SESSIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Course</label>
          <select className={inputClass} value={fields.course} onChange={set('course')}>
            {COURSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Result/score currently displayed</label>
          <input type="text" className={inputClass} value={fields.currentScore} onChange={set('currentScore')} placeholder="e.g. 64" />
        </div>
        <div>
          <label className={labelClass}>Explanation</label>
          <textarea rows={4} className={`${inputClass} resize-none`} value={fields.explanation} onChange={set('explanation')} placeholder="Explain what you believe is incorrect" />
        </div>
        <div>
          <label className={labelClass}>Additional information (optional)</label>
          <textarea rows={3} className={`${inputClass} resize-none`} value={fields.additionalInfo} onChange={set('additionalInfo')} />
        </div>
      </>
    );
  }

  if (variant === 'examGeneral') {
    return (
      <>
        <div>
          <label className={labelClass}>Course</label>
          <select className={inputClass} value={fields.course} onChange={set('course')}>
            {COURSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea rows={4} className={`${inputClass} resize-none`} value={fields.description} onChange={set('description')} placeholder="Describe the issue" />
        </div>
        <div>
          <label className={labelClass}>Additional information (optional)</label>
          <textarea rows={3} className={`${inputClass} resize-none`} value={fields.additionalInfo} onChange={set('additionalInfo')} />
        </div>
      </>
    );
  }

  if (variant === 'campusRide') {
    return (
      <>
        <div>
          <label className={labelClass}>Booking reference (optional)</label>
          <input type="text" className={inputClass} value={fields.bookingRef} onChange={set('bookingRef')} placeholder="e.g. RIDE-4821" />
        </div>
        <div>
          <label className={labelClass}>Route</label>
          <input type="text" className={inputClass} value={fields.route} onChange={set('route')} placeholder="e.g. Route B — Hostel to Faculty of Computing" />
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea rows={4} className={`${inputClass} resize-none`} value={fields.description} onChange={set('description')} placeholder="Describe what happened" />
        </div>
        <div>
          <label className={labelClass}>Additional information (optional)</label>
          <textarea rows={3} className={`${inputClass} resize-none`} value={fields.additionalInfo} onChange={set('additionalInfo')} />
        </div>
      </>
    );
  }

  if (variant === 'document') {
    return (
      <>
        <div>
          <label className={labelClass}>Document / request type</label>
          <select className={inputClass} value={fields.documentType} onChange={set('documentType')}>
            {['Official Transcript', 'Student ID Replacement', 'Other'].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Request/reference number (if available)</label>
          <input type="text" className={inputClass} value={fields.referenceNumber} onChange={set('referenceNumber')} placeholder="e.g. DOC-2201" />
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea rows={4} className={`${inputClass} resize-none`} value={fields.description} onChange={set('description')} placeholder="Describe the issue" />
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <label className={labelClass}>Subject</label>
        <input type="text" className={inputClass} value={fields.subject} onChange={set('subject')} placeholder="Short summary of the issue" />
      </div>
      <div>
        <label className={labelClass}>Description</label>
        <textarea rows={5} className={`${inputClass} resize-none`} value={fields.description} onChange={set('description')} placeholder="Explain what happened and what you'd like to see changed" />
      </div>
    </>
  );
}

function ComplaintDetail({ ticket, onBack }) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-bold text-graphite hover:text-charcoal"
      >
        <PiArrowLeft />
        Back to complaints
      </button>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-graphite-soft">{ticket.ref}</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-charcoal">{ticket.subject}</h2>
          <p className="mt-1 text-sm text-graphite">
            {ticket.category} &middot; {ticket.type}
          </p>
        </div>
        <StatusBadge status={ticket.status} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-cream px-4 py-3">
          <p className="text-[10px] uppercase tracking-wider text-graphite-soft">Submitted</p>
          <p className="text-sm font-semibold text-charcoal">{ticket.submitted}</p>
        </div>
        <div className="rounded-xl border border-line bg-cream px-4 py-3">
          <p className="text-[10px] uppercase tracking-wider text-graphite-soft">Assigned to</p>
          <p className="text-sm font-semibold text-charcoal">{ticket.assignedTeam}</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[10px] uppercase tracking-wider text-graphite-soft">Description</p>
        <p className="mt-1 text-sm leading-relaxed text-graphite">{ticket.description}</p>
      </div>

      <div className="mt-8">
        <p className="text-[10px] uppercase tracking-wider text-graphite-soft">Status timeline</p>
        <div className="mt-3 space-y-0">
          {ticket.timeline.map((step, i) => (
            <div key={step.stage} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    step.done ? 'bg-bronze-deep' : 'bg-line-strong'
                  }`}
                />
                {i < ticket.timeline.length - 1 && (
                  <span className={`w-px flex-1 ${step.done ? 'bg-bronze-deep/40' : 'bg-line-strong'}`} style={{ minHeight: 28 }} />
                )}
              </div>
              <div className="pb-6">
                <p className={`text-sm font-semibold ${step.done ? 'text-charcoal' : 'text-graphite-soft'}`}>
                  {step.stage}
                </p>
                <p className="text-xs text-graphite-soft">{step.date || 'Pending'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-2 text-xs text-graphite-soft">
        Direct messaging with your assigned team will be available in a future update.
      </p>
    </div>
  );
}

export default function ComplaintsSupportPage() {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [selectedRef, setSelectedRef] = useState(null);

  const [categoryId, setCategoryId] = useState(null);
  const [type, setType] = useState(null);
  const [fields, setFields] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const category = CATEGORIES.find((c) => c.id === categoryId) || null;
  const variant = category && type ? getFormVariant(categoryId, type) : null;

  const selectedTicket = tickets.find((t) => t.ref === selectedRef) || null;

  const handleSelectCategory = useCallback((cat) => {
    setCategoryId(cat.id);
    setType(cat.types[0]);
    setFields(defaultFieldsFor(getFormVariant(cat.id, cat.types[0])));
    setSubmitted(false);
  }, []);

  const handleSelectType = useCallback((cat, nextType) => {
    setType(nextType);
    setFields(defaultFieldsFor(getFormVariant(cat.id, nextType)));
  }, []);

  const handleFieldChange = useCallback((name, value) => {
    setFields((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleChangeCategory = useCallback(() => {
    setCategoryId(null);
    setType(null);
    setFields({});
    setSubmitted(false);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!category || !type || !isFormValid(variant, fields)) return;

      const subject = buildSubject(category.id, type, variant, fields);
      const ref = `CMP-${1000 + tickets.length + 1}`;

      const newTicket = {
        ref,
        category: category.label,
        type,
        subject,
        status: 'Submitted',
        submitted: 'Just now',
        updated: 'Just now',
        description:
          fields.description || fields.explanation || fields.reason || 'No additional description provided.',
        assignedTeam: category.team,
        timeline: [
          { stage: 'Submitted', date: 'Just now', done: true },
          { stage: 'Under Review', date: null, done: false },
          { stage: 'Resolved', date: null, done: false },
        ],
      };

      setTickets((prev) => [newTicket, ...prev]);
      setSubmitted(true);
      setCategoryId(null);
      setType(null);
      setFields({});

      setTimeout(() => setSubmitted(false), 4000);
    },
    [category, type, variant, fields, tickets.length]
  );

  return (
    <div className="min-h-screen bg-paper text-charcoal">
      <Sidebar />
      <MobileBottomNav active="support" />
      <Topbar
        title="Complaints & Support"
        subtitle="Choose the area your issue relates to, and we&apos;ll ask the right questions for it."
        leading={
          <Link
            href="/dashboard"
            aria-label="Back to dashboard"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line text-graphite-soft transition-all hover:bg-cream hover:text-charcoal"
          >
            <ArrowLeft size={17} />
          </Link>
        }
      />

      <main className="min-h-screen overflow-y-auto bg-paper pb-[calc(84px+1.5rem)] pt-[72px] md:ml-[280px] md:pb-0">
        <div className="mx-auto max-w-6xl px-3 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:px-10">
          {selectedTicket ? (
            <div className="max-w-3xl">
              <ComplaintDetail ticket={selectedTicket} onBack={() => setSelectedRef(null)} />
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
              <div className="rounded-2xl border border-line bg-paper p-6 lg:sticky lg:top-8">
                {!category ? (
                  <>
                    <h2 className="font-display text-lg font-semibold text-charcoal">
                      What&apos;s this about?
                    </h2>
                    <p className="mt-1 text-sm text-graphite">
                      Pick a category to get started.
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => handleSelectCategory(cat)}
                            className="group flex cursor-pointer flex-col items-start gap-3 rounded-xl border border-line bg-cream p-4 text-left transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-bronze-deep/50 hover:bg-paper hover:shadow-sm active:translate-y-0 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze"
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-charcoal text-cream transition-transform duration-200 group-hover:scale-105">
                              <Icon className="text-base transition-transform duration-200 group-hover:rotate-[-4deg]" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-charcoal">{cat.label}</p>
                              <p className="mt-0.5 text-xs text-graphite-soft">{cat.helper}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleChangeCategory}
                      className="flex w-full items-center gap-3 rounded-xl border border-line bg-cream px-4 py-3 text-left transition-colors cursor-pointer hover:border-bronze-deep/40 hover:bg-paper"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-charcoal text-cream">
                        <PiArrowLeft className="text-base" />
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-charcoal">
                          Change category
                        </span>
                        <span className="mt-0.5 block text-xs text-graphite-soft">
                          Choose a different support area
                        </span>
                      </span>
                    </button>

                    <h2 className="mt-3 font-display text-lg font-semibold text-charcoal">
                      {category.label}
                    </h2>
                    <p className="mt-1 text-sm text-graphite">
                      Give as much detail as you can — it helps us resolve it faster.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                      <div>
                        <label className={labelClass}>Complaint type</label>
                        <select
                          className={inputClass}
                          value={type}
                          onChange={(e) => handleSelectType(category, e.target.value)}
                        >
                          {category.types.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>

                      <DynamicFields variant={variant} fields={fields} onChange={handleFieldChange} />

                      {submitted && (
                        <div className="rounded-xl bg-bronze-deep/10 px-4 py-3 text-sm font-medium text-bronze-deep">
                          Complaint submitted. You&apos;ll get a reference number by email.
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full rounded-xl bg-charcoal py-3.5 text-sm font-bold text-cream transition-all hover:bg-charcoal/90"
                      >
                        Submit complaint
                      </Button>
                    </form>
                  </>
                )}
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-charcoal">Your complaints</h2>

                <div className="mt-4 space-y-3">
                  {tickets.map((ticket) => (
                    <button
                      key={ticket.ref}
                      type="button"
                      onClick={() => setSelectedRef(ticket.ref)}
                      className="group flex w-full cursor-pointer flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-paper px-5 py-4 text-left transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-bronze-deep/50 hover:shadow-sm active:translate-y-0 active:scale-[0.995] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-xs font-mono text-graphite-soft">
                          <PiChatCircleTextFill />
                          {ticket.ref}
                        </div>
                        <p className="mt-1 truncate font-semibold text-charcoal">{ticket.subject}</p>
                        <p className="text-sm text-graphite">
                          {ticket.category} &middot; submitted {ticket.submitted} &middot; updated {ticket.updated}
                        </p>
                      </div>

                      <StatusBadge status={ticket.status} />
                    </button>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-line bg-cream px-5 py-5">
                    <PiMailboxFill className="text-xl text-bronze-deep" />
                    <p className="mt-3 font-semibold text-charcoal">Email support</p>
                    <p className="mt-1 text-sm text-graphite">support@uniflow.buk.edu.ng</p>
                    <p className="text-sm text-graphite-soft">Replies within 1 business day</p>
                  </div>

                  <div className="rounded-2xl border border-line bg-cream px-5 py-5">
                    <PiPhoneCallFill className="text-xl text-bronze-deep" />
                    <p className="mt-3 font-semibold text-charcoal">Student affairs desk</p>
                    <p className="mt-1 text-sm text-graphite">Mon–Fri, 9am–4pm</p>
                    <p className="text-sm text-graphite-soft">Admin Block, Ground Floor</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}