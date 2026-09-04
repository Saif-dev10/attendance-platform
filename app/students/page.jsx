import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function Student() {
  return (
    <>
      <main className="min-h-screen bg-paper pb-24 md:pb-0">
        {/**
         * Student dashboard shell.
         * This page serves as the landing hub for the student workspace and will
         * eventually host quick links, upcoming deadlines, and summary widgets.
         */}
      </main>
      <MobileBottomNav active="profile" />
    </>
  );
}