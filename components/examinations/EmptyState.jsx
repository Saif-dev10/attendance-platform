import { ClipboardX } from "lucide-react";
import Button from "@/components/Button";

export default function EmptyState({ onRetry, loading }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line bg-paper px-5 py-10 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bronze-deep/10 text-bronze-deep">
        <ClipboardX size={20} />
      </span>

      <div className="max-w-sm">
        <p className="text-sm font-bold text-charcoal">
          Examination allocation not available
        </p>
        <p className="mt-1.5 text-sm text-graphite">
          Your examination hall and seat assignment have not been released
          yet. Please check again when your examination allocation is
          published.
        </p>
      </div>

      <Button onClick={onRetry} disabled={loading} className="mt-2">
        {loading ? "Checking..." : "Check Again"}
      </Button>
    </div>
  );
}