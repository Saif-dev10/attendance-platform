'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, CalendarClock, ClipboardCheck, FileText, HelpCircle, LockKeyhole, MessageSquare } from 'lucide-react';
import SettingsPageShell from '@/components/features/settings/SettingsPageShell';
import FAQAccordion from '@/components/features/settings/FAQAccordion';
import FeedbackForm from '@/components/features/settings/FeedbackForm';

const quickHelp = [
  ['Account & Security', 'Password and profile information', '/students/settings/password', LockKeyhole],
  ['Academic & Courses', 'Courses, assignments and grades', '/students/courses', BookOpen],
  ['Attendance', 'Check-in and attendance records', '/scan', ClipboardCheck],
  ['Examinations', 'Timetables, results and allocations', '/students/examinations', CalendarClock],
  ['Documents', 'Requests and student records', '/documents', FileText],
  ['Complaints & Support', 'Track an issue or ask for help', '/complaints', MessageSquare],
];

const faqs = [
  { question: 'How do I check my exam timetable?', answer: 'Open Examinations from the Academic section in the sidebar. Your available allocation includes the date, time, hall and seat.' },
  { question: 'Where can I find my exam seat?', answer: 'Open Examinations and select View Examination Details. Your assigned hall and seat appear when the allocation has been released.' },
  { question: 'How do I submit an assignment?', answer: 'Open Assignments, choose the relevant coursework, and use its submission view to provide the required files.' },
  { question: 'How does attendance eligibility work?', answer: 'Attendance check-ins are validated against the active class session and your course enrollment before confirmation.' },
  { question: 'How do I update my password?', answer: 'Open Settings, choose Password, and complete the password form. The final update will be handled by the authentication service when connected.' },
];

export default function HelpPage() {
  return (
    <SettingsPageShell title="Help & Feedback" subtitle="Student support" description="Find answers, report a problem, or share an idea to help us improve SKUL.">
      <div className="space-y-8">
        <section>
          <SectionTitle title="Quick Help" />
          <div className="grid gap-3 sm:grid-cols-2">
            {quickHelp.map(([label, description, href, Icon]) => (
              <Link key={label} href={href} className="group flex items-center gap-3 rounded-2xl border border-line bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-bronze-deep/50 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream text-graphite-soft transition-colors group-hover:text-bronze-deep"><Icon size={18} /></span>
                <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-charcoal">{label}</span><span className="mt-0.5 block text-xs text-graphite-soft">{description}</span></span>
                <ArrowRight size={16} className="shrink-0 text-graphite-soft transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title="Frequently Asked Questions" />
          <FAQAccordion items={faqs} />
        </section>

        <section>
          <SectionTitle title="Report a Problem or Share Feedback" />
          <FeedbackForm />
        </section>

        <section className="rounded-2xl border border-line bg-cream px-5 py-5 sm:px-6">
          <div className="flex items-start gap-3"><HelpCircle className="mt-0.5 shrink-0 text-bronze-deep" size={19} /><div><h2 className="text-sm font-bold text-charcoal">Still need help?</h2><p className="mt-1 text-sm leading-relaxed text-graphite">For urgent university matters, please use the official support process provided by your institution.</p></div></div>
        </section>
      </div>
    </SettingsPageShell>
  );
}

function SectionTitle({ title }) {
  return <h2 className="mb-3 px-1 text-[11px] font-bold uppercase tracking-widest text-graphite-soft">{title}</h2>;
}
