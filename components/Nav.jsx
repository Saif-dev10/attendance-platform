"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "./Button";

const links = [
  { href: "/platform", label: "Platform" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/features", label: "Features" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur border-line-strong"
          : "bg-cream border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10"
      >
        <Link
          href="/"
          className="font-display text-xl font-medium tracking-tight text-charcoal"
        >
          Home<span className="text-bronze-deep">.</span>
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[0.95rem] text-graphite transition-colors duration-200 hover:text-charcoal"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Button href="/login" variant="ghost" className="px-10 py-2 bg-yellow-300 cursor-ponter active:opacity-75">
            Log in
          </Button>
          <Button href="/platform" variant="primary">
            Explore the platform
          </Button>
        </div>

        <button
          type="button"
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-px w-6 bg-charcoal transition-transform duration-300 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-charcoal transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-px w-6 bg-charcoal transition-transform duration-300 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-cream px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl text-charcoal"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <Button href="/how-it-works" variant="secondary" className="bg-yellow-300" onClick={() => setOpen(false)}>
              Log in
            </Button>
            <Button href="/platform" variant="primary" onClick={() => setOpen(false)}>
              Explore the platform
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
