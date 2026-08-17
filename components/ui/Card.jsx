export default function Card({
  title,
  children,
  className = "",
}) {
  return (
    <section className={`min-w-0 ${className}`}>
      {title && (
        <h2 className="text-lg font-semibold mb-4">
          {title}
        </h2>
      )}

      {children}
    </section>
  );
}