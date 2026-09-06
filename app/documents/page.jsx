import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function DocumentsPage() {
  return (
    <main className="min-h-screen bg-paper px-5 pb-[calc(84px+1.5rem)] pt-8 md:pb-8 md:pl-[320px] md:pr-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-line bg-white p-6 text-center shadow-sm sm:p-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-bronze-deep">
          Documents
        </p>
        <h1 className="mt-3 text-2xl font-bold text-charcoal">Documents are coming soon</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-graphite-soft">
          We are preparing a simple way to access and manage your campus documents.
          For now, please contact your department office for urgent assistance.
        </p>
      </div>
      <MobileBottomNav active="support" />
    </main>
  );
}
