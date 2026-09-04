/**
 * Sample timetable data used to present the course selection experience in a
 * polished mockup without depending on live application data.
 */
const courses = [
  { code: "ENGR 214", name: "Structural Analysis", time: "10:00 – 11:00", active: true },
  { code: "ENGR 108", name: "Materials Science", time: "13:00 – 14:00", active: false },
  { code: "ENGR 331", name: "Fluid Dynamics Lab", time: "15:00 – 17:00", active: false },
];

export default function CourseListMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-paper shadow-[0_24px_50px_-28px_rgba(32,30,27,0.3)]">
      <div className="border-b border-line px-6 py-4">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-graphite-soft">
          Today &middot; Tuesday
        </p>
        <h3 className="font-display text-base text-charcoal">Select a course</h3>
      </div>
      <ul className="divide-y divide-line">
        {courses.map((course) => (
          <li
            key={course.code}
            className={`flex items-center justify-between px-6 py-4 transition-colors duration-200 ${
              course.active ? "bg-cream" : ""
            }`}
          >
            <div>
              <p className="text-sm text-charcoal">{course.name}</p>
              <p className="font-mono text-xs text-graphite-soft">{course.code}</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs text-graphite-soft">{course.time}</p>
              {course.active && (
                <span className="mt-1 inline-block rounded-full bg-bronze/15 px-2.5 py-0.5 text-[0.65rem] font-medium text-bronze-deep">
                  Selected
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
