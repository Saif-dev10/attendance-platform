import Link from "next/link";
import Icon from "@/components/admin/shared/Icon";

const row = "flex w-full items-center gap-3 rounded-xl bg-[#f8f9fb] px-4 py-3.5 text-left text-[13.5px] font-semibold text-[#0b1a30] hover:bg-[#f0f2f6]";

export default function QuickActions({ onAddStudent, onBulkEnrollment }) {
  return (
    <section className="skul-card p-5" aria-labelledby="qa-title">
      <h2 id="qa-title" className="skul-heading text-[12.5px] font-bold uppercase tracking-[0.12em] text-[#0b1a30]">Quick Actions</h2>
      <div className="mt-4 space-y-2.5">
        <button onClick={onAddStudent} className={row}>
          <Icon name="plusCircle" size={18} className="text-[#4b5565]" /> Add Student
        </button>
        {/* Lecturer records are managed in the Lecturer Directory, so this opens it. */}
        <Link href="/admin/university/lecturers" className={row}>
          <Icon name="userPlus" size={18} className="text-[#4b5565]" /> Add Lecturer
        </Link>
        <button onClick={onBulkEnrollment} className={row}>
          <Icon name="import" size={18} className="text-[#4b5565]" /> Bulk Enrollment
        </button>
      </div>
    </section>
  );
}