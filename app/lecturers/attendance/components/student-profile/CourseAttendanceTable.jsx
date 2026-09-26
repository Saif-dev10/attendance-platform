import { isBelowThreshold } from "@/lib/mock/attendanceUtils";

export default function CourseAttendanceTable({ courses = [], loading = false }) {
  if (loading) {
    return <div aria-busy="true" className="h-48 animate-pulse rounded-md bg-cream" />;
  }

  const headerClass = "px-3 py-2 text-left text-xs font-medium text-graphite-soft";

  return (
    <section aria-labelledby="course-attendance-heading" className="rounded-md border border-line bg-paper p-4">
      <h2 id="course-attendance-heading" className="text-sm font-semibold text-charcoal">
        Course-wise Attendance
      </h2>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <caption className="sr-only">Attendance rate by course</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className={headerClass}>Course</th>
              <th scope="col" className={headerClass}>Level</th>
              <th scope="col" className={`${headerClass} text-right`}>Sessions</th>
              <th scope="col" className={`${headerClass} text-right`}>Present</th>
              <th scope="col" className={`${headerClass} text-right`}>Late</th>
              <th scope="col" className={`${headerClass} text-right`}>Absent</th>
              <th scope="col" className={`${headerClass} text-right`}>Rate</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => {
              const below = isBelowThreshold(course.rate);
              return (
                <tr key={course.code} className="border-b border-line last:border-b-0">
                  <td className="px-3 py-2.5">
                    <p className="font-medium text-charcoal">{course.code}</p>
                    <p className="text-xs text-graphite-soft">{course.title}</p>
                  </td>
                  <td className="px-3 py-2.5 text-graphite">{course.level}</td>
                  <td className="px-3 py-2.5 text-right text-graphite">{course.sessions}</td>
                  <td className="px-3 py-2.5 text-right text-graphite">{course.present}</td>
                  <td className="px-3 py-2.5 text-right text-graphite">{course.late}</td>
                  <td className="px-3 py-2.5 text-right text-graphite">{course.absent}</td>
                  <td className="px-3 py-2.5 text-right">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        below ? "bg-clay/10 text-clay" : "bg-moss/10 text-moss"
                      }`}
                    >
                      {course.rate}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}