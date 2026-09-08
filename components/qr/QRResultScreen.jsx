"use client";

import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const variantConfig = {
  success: {
    icon: CheckCircle2,
    iconClassName: "text-emerald-700",
    backgroundClassName: "bg-emerald-700/10",
  },
  invalid: {
    icon: XCircle,
    iconClassName: "text-red-700",
    backgroundClassName: "bg-red-700/10",
  },
  expired: {
    icon: Clock3,
    iconClassName: "text-amber-700",
    backgroundClassName: "bg-amber-700/10",
  },
  already_marked: {
    icon: CheckCircle2,
    iconClassName: "text-bronze-deep",
    backgroundClassName: "bg-bronze-deep/10",
  },
  not_eligible: {
    icon: AlertCircle,
    iconClassName: "text-amber-700",
    backgroundClassName: "bg-amber-700/10",
  },
};

export default function QRResultScreen({
  variant = "invalid",
  title,
  description,
  details = [],
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
}) {
  const config = variantConfig[variant] || variantConfig.invalid;
  const Icon = config.icon;

  return (
    <div className="w-full max-w-sm mx-auto">
      <Card className="rounded-2xl border border-line bg-white p-6 text-center">
        <div
          className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${config.backgroundClassName}`}
        >
          <Icon className={`h-7 w-7 ${config.iconClassName}`} />
        </div>

        <h1 className="mt-5 text-xl font-semibold text-charcoal">
          {title}
        </h1>

        <div className="mt-2 text-sm leading-relaxed text-graphite-soft">
          {description}
        </div>

        {details.length > 0 && (
          <dl className="mt-6 space-y-3 border-t border-line pt-4 text-left">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="flex items-start justify-between gap-4"
              >
                <dt className="text-xs font-medium uppercase tracking-wide text-graphite-soft">
                  {detail.label}
                </dt>
                <dd className="text-right text-sm font-medium text-charcoal">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </Card>

      <div className="mt-6 flex flex-col gap-3">
        {primaryLabel && (
          <Button size="lg" onClick={onPrimary} className="w-full">
            {primaryLabel}
          </Button>
        )}

        {secondaryLabel && (
          <button
            onClick={onSecondary}
            className="text-sm font-medium text-graphite-soft transition-colors hover:text-graphite"
          >
            {secondaryLabel}
          </button>
        )}
      </div>
    </div>
  );
}