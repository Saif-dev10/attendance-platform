import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function StudentExaminations() {
  return (
    <>
      <main className="min-h-screen bg-paper pb-24 md:pb-0">
        {/**
         * Examination records screen.
         * This route is reserved for grade summaries, result history, and detailed
         * exam performance views once the student assessment data is wired in.
         */}
      </main>
      <MobileBottomNav active="academic" />
    </>
  );
}
