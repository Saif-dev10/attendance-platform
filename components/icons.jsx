const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconSession(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
      <path d="M8 14h3" />
      <circle cx="16.5" cy="14.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconQR(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM19 14h2M14 19h2M19 19h2" />
    </svg>
  );
}

export function IconScan(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 0-1-1h-3M4 16v3a1 1 0 0 0 1 1h3M20 16v3a1 1 0 0 1-1 1h-3" />
      <path d="M4 12h16" strokeDasharray="1.5 3" />
    </svg>
  );
}

export function IconLocation(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </svg>
  );
}

export function IconActivity(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M3 12h4l2-7 4 14 2-7h6" />
    </svg>
  );
}

export function IconRecords(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M15 3v4h4" />
      <path d="M9 13h6M9 17h6M9 9h2" />
    </svg>
  );
}

export function IconClock(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function IconLayers(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </svg>
  );
}

export function IconShield(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function IconArrowRight(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M4 12h16M13 5l7 7-7 7" />
    </svg>
  );
}

export function IconUsers(props) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.7-3 2.8-4.6 5.5-4.6s4.8 1.6 5.5 4.6" />
      <circle cx="17" cy="8.5" r="2.4" />
      <path d="M15.5 14.6c2.2.4 3.7 1.9 4.2 4.4" />
    </svg>
  );
}
