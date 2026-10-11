export default function AccessDenied({ message = "You do not have permission to view this page." }) {
  return <div role="alert" className="rounded-2xl border border-line bg-paper p-8 text-center"><h1 className="text-xl font-semibold">Access denied</h1><p className="mt-2 text-sm text-graphite-soft">{message}</p></div>;
}
