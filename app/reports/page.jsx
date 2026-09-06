/**
 * Reports workspace.
 * This screen is intended for attendance summaries, export actions, and
 * aggregated academic reporting for staff and administrators.
 */
import Sidebar from "@/components/layout/Sidebar";

export default function ReportsPage() {
	return (
		<div className="min-h-screen bg-paper">
			<Sidebar />
			<main className="min-h-screen px-5 py-8 md:ml-[280px] sm:px-8">
				<div className="mx-auto max-w-5xl">
					<h1 className="text-2xl font-bold text-charcoal">Reports</h1>
					<p className="mt-1 text-sm text-graphite-soft">
						Attendance summaries and academic reports will appear here.
					</p>
					<div className="mt-6 rounded-xl border border-line bg-white p-6 text-sm text-graphite-soft">
						No reports are available yet.
					</div>
				</div>
			</main>
		</div>
	);
}
