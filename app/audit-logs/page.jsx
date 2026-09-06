import Sidebar from "@/components/layout/Sidebar";

const auditEntries = [
	{
		action: "Attendance record updated",
		actor: "David Okafor",
		time: "Today, 10:42 AM",
	},
	{
		action: "Campus ride booking created",
		actor: "David Okafor",
		time: "Today, 9:15 AM",
	},
];

export default function AuditLogsPage() {
	return (
		<div className="min-h-screen bg-paper">
			<Sidebar />
			<main className="min-h-screen px-5 py-8 md:ml-[280px] sm:px-8">
				<div className="mx-auto max-w-5xl">
					<header className="mb-6">
						<h1 className="text-2xl font-bold text-charcoal">Audit Logs</h1>
						<p className="mt-1 text-sm text-graphite-soft">
							Recent activity across your account.
						</p>
					</header>

					<section className="overflow-hidden rounded-xl border border-line bg-white">
						<div className="divide-y divide-line">
							{auditEntries.map((entry) => (
								<div key={`${entry.action}-${entry.time}`} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
									<div>
										<p className="text-sm font-semibold text-charcoal">{entry.action}</p>
										<p className="text-xs text-graphite-soft">By {entry.actor}</p>
									</div>
									<p className="text-xs text-graphite-soft">{entry.time}</p>
								</div>
							))}
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}
