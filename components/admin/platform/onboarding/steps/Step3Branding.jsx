"use client";
// INFERRED LAYOUT: no reference screenshot for Step 3.
import { useState } from "react";
import Input from "@/components/ui/Input";
import AdminButton from "@/components/admin/shared/AdminButton";
import { useOnboarding } from "../OnboardingProvider";
import { Section, Grid2, FieldError } from "./_parts";

const HEX = /^#[0-9a-fA-F]{6}$/;
const MAX_LOGO_BYTES = 2 * 1024 * 1024;

function ColourField({ label, value, onChange, error }) {
  return (
    <Input
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      mono
      maxLength={7}
      error={error}
      rightSlot={
        <input type="color" aria-label={`${label} picker`} value={HEX.test(value) ? value : "#000000"} onChange={(e) => onChange(e.target.value)} className="h-7 w-7 cursor-pointer rounded border border-[#e5e8ee] bg-transparent p-0" />
      }
    />
  );
}

export default function Step3Branding() {
  const { values, errors, setValues } = useOnboarding();
  const b = values.branding;
  const [logoError, setLogoError] = useState("");
  const set = (patch) => setValues("branding", patch);

  const onLogo = (e) => {
    const f = e.target.files?.[0];
    setLogoError("");
    if (!f) return;
    if (!/^image\/(png|jpeg|svg\+xml)$/.test(f.type)) return setLogoError("Use a PNG, JPG or SVG image.");
    if (f.size > MAX_LOGO_BYTES) return setLogoError("Logo must be 2 MB or smaller.");
    set({ logoFileName: f.name }); // only the file name is kept; nothing is uploaded in sample mode
  };

  const primary = HEX.test(b.primaryColor) ? b.primaryColor : "#071a33";
  const accent = HEX.test(b.accentColor) ? b.accentColor : "#f5c400";

  return (
    <Section title="Branding" description="How the institution appears to its students, lecturers and administrators.">
      <Input label="Display name" value={b.displayName} onChange={(e) => set({ displayName: e.target.value })} placeholder={values.info.name || "Bayero University"} error={errors.displayName} autoFocus />
      <Grid2>
        <ColourField label="Primary colour" value={b.primaryColor} onChange={(v) => set({ primaryColor: v })} error={errors.primaryColor} />
        <ColourField label="Accent colour" value={b.accentColor} onChange={(v) => set({ accentColor: v })} error={errors.accentColor} />
      </Grid2>

      <div>
        <p className="skul-eyebrow mb-1.5">Logo (optional)</p>
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#e5e8ee] bg-white p-3.5">
          <input type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={onLogo} className="text-[13px] file:mr-3 file:rounded-lg file:border file:border-[#e5e8ee] file:bg-[#f3f5f9] file:px-3 file:py-1.5 file:text-[12.5px] file:font-semibold" aria-label="Upload logo" />
          {b.logoFileName && (
            <span className="flex items-center gap-2 text-[12.5px] text-[#4b5565]">
              {b.logoFileName}
              <AdminButton size="sm" variant="ghost" onClick={() => set({ logoFileName: "" })}>Remove</AdminButton>
            </span>
          )}
        </div>
        <FieldError>{logoError}</FieldError>
        <p className="mt-1.5 text-[11.5px] italic text-[#8a93a3]">PNG, JPG or SVG up to 2 MB. In sample mode only the file name is kept.</p>
      </div>

      <div>
        <p className="skul-eyebrow mb-1.5">Preview</p>
        <div className="flex items-center gap-3 rounded-xl px-5 py-4" style={{ background: primary }}>
          <span className="flex h-10 w-10 items-center justify-center rounded-lg text-[13px] font-bold" style={{ background: accent, color: primary }}>
            {(b.displayName || values.info.name || "UN").split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
          </span>
          <div>
            <p className="text-[14px] font-bold text-white">{b.displayName || "Institution name"}</p>
            <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: accent }}>SKUL Dashboard</p>
          </div>
        </div>
      </div>
    </Section>
  );
}