import Link from 'next/link';
import { ArrowLeft, BookOpen, CalendarClock, ClipboardCheck, FileText, MessageSquare, ShieldCheck } from 'lucide-react';
import SettingsPageShell from '@/components/features/settings/SettingsPageShell';
import { getAppInfo } from '@/lib/services/settings';

const capabilities = [
  ['Academic information', 'Keep key academic identity and progress information together.', BookOpen],
  ['Courses and assignments', 'Review course materials, coursework and submission details.', FileText],
  ['Timetable and attendance', 'See scheduled activities and use QR-based attendance services.', CalendarClock],
  ['Examination information', 'Review examination schedules, halls, seats and results when released.', ClipboardCheck],
  ['Documents and support', 'Request student documents and track complaints or support issues.', MessageSquare],
];

export default function AboutPage() {
  const appInfo = getAppInfo();

  return (
    <SettingsPageShell title="About SKUL" subtitle="Platform information" description="SKUL brings important parts of the student university experience into one place.">
      <div className="space-y-6">
        <section className="rounded-2xl border border-line bg-white p-5 sm:p-7">
          <div className="flex items-start gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-charcoal text-cream"><ShieldCheck size={20} /></span><div><h2 className="text-lg font-bold text-charcoal">What is SKUL?</h2><p className="mt-2 text-sm leading-relaxed text-graphite">{appInfo.description} It is designed to make everyday student services easier to find, understand and use.</p></div></div>
        </section>

        <section>
          <h2 className="mb-3 px-1 text-[11px] font-bold uppercase tracking-widest text-graphite-soft">What you can do with SKUL</h2>
          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            {capabilities.map(([title, description, Icon], index) => (
              <div key={title} className={`flex items-start gap-3 px-4 py-4 sm:px-5 ${index === capabilities.length - 1 ? '' : 'border-b border-line'}`}><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cream text-graphite-soft"><Icon size={17} /></span><div><h3 className="text-sm font-semibold text-charcoal">{title}</h3><p className="mt-0.5 text-xs leading-relaxed text-graphite-soft">{description}</p></div></div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-cream px-5 py-5 sm:px-6"><h2 className="text-sm font-bold text-charcoal">Built for the student experience</h2><p className="mt-2 text-sm leading-relaxed text-graphite">SKUL is intended to give students a clearer view of the information and services they use throughout university life, while keeping important records connected to the institution that provides them.</p></section>

        <div className="flex items-center justify-between border-t border-line px-1 pt-4 text-xs text-graphite-soft"><span>{appInfo.version}</span><Link href="/students/settings/help" className="inline-flex items-center gap-1 font-semibold text-bronze-deep hover:underline"><ArrowLeft size={13} /> Help & Feedback</Link></div>
      </div>
    </SettingsPageShell>
  );
}
