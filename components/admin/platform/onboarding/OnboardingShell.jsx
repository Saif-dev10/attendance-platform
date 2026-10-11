"use client";
import { createContext, useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/admin/shared/Icon";
import { PlatformBrand } from "@/components/admin/platform/PlatformShell";
import { ONBOARDING_STEPS, stepProgress } from "@/lib/admin/onboardingSteps";
import { useOnboarding } from "./OnboardingProvider";

const MenuCtx = createContext({ openMenu: () => {} });
export const useOnboardingMenu = () => useContext(MenuCtx);

function StepMarker({ state, n }) {
  if (state === "done")
    return (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#10b981] text-white">
        <Icon name="check" size={12} />
      </span>
    );
  return (
    <span
      className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10.5px] font-bold ${
        state === "current" ? "border-2 border-[#f5c400] text-[#f5c400]" : "border-[#3b4d68] text-[#8fa0b8]"
      }`}
    >
      {n}
    </span>
  );
}

function StepsSidebar({ onNavigate }) {
  const pathname = usePathname();
  const { draft } = useOnboarding();
  const match = pathname.match(/onboarding\/(\d)/);
  const view = match ? Number(match[1]) : null;
  const furthest = draft?.furthestStep || 1;
  const pct = stepProgress(view || 1);

  return (
    <div className="flex h-full w-[236px] flex-col bg-[#071a33] text-white">
      <div className="flex h-[65px] shrink-0 items-center px-5">
        <PlatformBrand />
      </div>
      <nav aria-label="Onboarding steps" className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#8fa0b8]">Onboarding Steps</p>
        <ol className="space-y-1.5">
          {ONBOARDING_STEPS.map((s) => {
            const current = s.n === view;
            const done = !current && s.n < furthest;
            const reachable = !!draft && s.n <= furthest;
            const state = current ? "current" : done ? "done" : "todo";
            const cls = current
              ? "bg-[#12294a] text-[#f5c400] font-semibold"
              : done
              ? "bg-[#10233f] text-[#34d399]"
              : "text-[#b8c4d6]";
            const inner = (
              <>
                <StepMarker state={state} n={s.n} />
                <span className="truncate">{s.n}. {s.label}</span>
              </>
            );
            const base = `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] ${cls}`;
            return (
              <li key={s.n}>
                {reachable ? (
                  <Link href={`/admin/platform/onboarding/${s.n}`} onClick={onNavigate} aria-current={current ? "step" : undefined} className={`${base} hover:bg-[#12294a]`}>
                    {inner}
                  </Link>
                ) : (
                  <span aria-disabled="true" className={`${base} cursor-not-allowed opacity-70`}>{inner}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <div className="border-t border-white/10 px-5 py-4">
        <div className="mb-2 flex items-center justify-between text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#8fa0b8]">
          <span>Overall progress</span>
          <span className="text-[13px] font-bold text-[#f5c400]">{pct}%</span>
        </div>
        <div role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Overall onboarding progress" className="h-1.5 overflow-hidden rounded-full bg-[#1b3358]">
          <div className="h-full rounded-full bg-[#f5c400]" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

export default function OnboardingShell({ children }) {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <MenuCtx.Provider value={{ openMenu: () => setOpen(true) }}>
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen shrink-0 lg:block">
          <StepsSidebar />
        </aside>
        {open && (
          <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Onboarding steps">
            <div className="absolute inset-0 bg-[#071a33]/50" onClick={closeMenu} />
            <div className="relative h-full w-[236px]">
              <StepsSidebar onNavigate={closeMenu} />
            </div>
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col">{children}</div>
      </div>
    </MenuCtx.Provider>
  );
}