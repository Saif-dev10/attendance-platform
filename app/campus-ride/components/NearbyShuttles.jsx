import ShuttleCard from "./ShuttleCard";

export default function NearbyShuttles({ shuttles }) {
  return (
    <section className="bg-white rounded-xl border border-line p-5">
      <p className="text-[11px] font-bold tracking-wider text-graphite-soft uppercase mb-4">
        Nearby Shuttles
      </p>
      <div className="space-y-3">
        {shuttles.length === 0 ? (
          <p className="text-sm text-graphite-soft text-center py-6">No shuttles nearby right now.</p>
        ) : (
          shuttles.map((shuttle) => <ShuttleCard key={shuttle.id} shuttle={shuttle} />)
        )}
      </div>
    </section>
  );
}