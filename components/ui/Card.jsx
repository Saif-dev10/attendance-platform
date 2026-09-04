/**
 * Simple reusable container for grouped UI content.
 * This keeps sections consistent without tying them to a specific layout pattern.
 */
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