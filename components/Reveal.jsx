"use client";

import { useEffect, useRef } from "react";

/**
 * Wraps children in a subtle fade/rise reveal that triggers once the
 * element scrolls into view. Falls back to fully visible content if
 * IntersectionObserver is unavailable or motion is reduced.
 */
export default function Reveal({ children, as: Tag = "div", delay = 0, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add("is-visible");
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
