import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SettingsPageHeader({ title, description }) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <Link
        href="/students/settings"
        aria-label="Back to settings"
        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line text-graphite-soft transition-all hover:bg-cream hover:text-charcoal"
      >
        <ArrowLeft size={17} />
      </Link>
      <div>
        <h1 className="text-xl font-bold tracking-tight text-charcoal sm:text-2xl">{title}</h1>
        <p className="mt-1 text-sm leading-relaxed text-graphite-soft">{description}</p>
      </div>
    </div>
  );
}
