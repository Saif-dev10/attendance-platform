import RouteCard from "./RouteCard";

export default function ShuttleRoutes({ routes }) {
  return (
    <section className="bg-white rounded-xl border border-line p-5">
      <p className="text-[11px] font-bold tracking-wider text-graphite-soft uppercase mb-4">
        Shuttle Routes
      </p>
      <div className="space-y-2">
        {routes.map((route) => (
          <RouteCard key={route.id} route={route} />
        ))}
      </div>
    </section>
  );
}