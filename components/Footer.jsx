import Link from "next/link";

const columns = [
  {
    heading: "Platform",
    links: [
      { href: "/platform", label: "Overview" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/features", label: "Features" },
    ],
  },
  {
    heading: "Audience",
    links: [
      { href: "/platform#lecturers", label: "For Lecturers" },
      { href: "/platform#students", label: "For Students" },
      { href: "/platform#administrators", label: "For Administrators" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/#institutions", label: "For Institutions" },
      { href: "/#contact", label: "Request a Demo" },
      { href: "/#contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-charcoal text-cream/80">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="font-display text-2xl font-medium text-cream">
              Presently<span className="text-bronze-soft">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
              A calmer way to run attendance — session check-in, live activity,
              and organized records, built for university teaching.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cream/45">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/70 transition-colors duration-200 hover:text-bronze-soft"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/10 pt-8 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Presently. Built for university teaching teams.</p>
          <div className="flex gap-6">
            <Link href="/#" className="hover:text-cream/70">
              Privacy
            </Link>
            <Link href="/#" className="hover:text-cream/70">
              Accessibility
            </Link>
            <Link href="/#" className="hover:text-cream/70">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
