import Link from "next/link";
export default function AdminBreadcrumbs({ items = [] }) {
  return <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap gap-2 text-sm text-graphite-soft">{items.map((item, index) => <span key={`${item.label}-${index}`}>{index > 0 && <span className="mx-2 text-line-strong">/</span>}{item.href && index < items.length - 1 ? <Link className="hover:text-charcoal" href={item.href}>{item.label}</Link> : <span aria-current="page" className="text-charcoal">{item.label}</span>}</span>)}</nav>;
}
