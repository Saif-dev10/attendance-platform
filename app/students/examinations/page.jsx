'use client';

import { useState } from 'react';
import Link from 'next/link';
import Topbar from '@/components/layout/Topbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';

import {
  PiCaretDownBold,
  PiTrendUp,
  PiBookOpen,
  PiMapPinFill,
  PiArrowRight,
} from 'react-icons/pi';

const SESSIONS = ['2025/2026', '2024/2025', '2023/2024', '2022/2023', '2021/2022', '2020/2021'];

const GRADE_POINTS = { A: 5, B: 4, C: 3, D: 2, F: 0 };

const RESULTS = {
  '2025/2026': {
    semesterGpa: '4.50',
    cgpa: '4.32',
    standing: 'Second Class Upper',
    courses: [
      { code: 'ITC 401', title: 'Software Engineering', units: 3, score: 78, grade: 'A' },
      { code: 'ITC 403', title: 'Database Systems II', units: 3, score: 71, grade: 'B' },
      { code: 'ITC 405', title: 'Human-Computer Interaction', units: 2, score: 82, grade: 'A' },
      { code: 'ITC 407', title: 'Computer Networks', units: 3, score: 64, grade: 'C' },
      { code: 'GST 401', title: 'Entrepreneurship Studies', units: 2, score: 58, grade: 'D' },
      { code: 'ITC 409', title: 'Mobile Application Development', units: 3, score: 88, grade: 'A' },
    ],
  },
};

const HALL_ASSIGNMENTS = [
  {
    course: 'CSC301',
    title: 'Advanced Algorithms',
    date: 'Sept 24, 2026',
    time: '10:00 AM',
    hall: 'New Computer Science Hall',
    seat: 'B-24',
    locationNote: 'Ground floor, opposite the Faculty of Computing entrance.',
  },
  {
    course: 'MAT311',
    title: 'Linear Algebra II',
    date: 'Sept 25, 2026',
    time: '08:00 AM',
    hall: 'Exam Hall 2',
    seat: 'A-11',
    locationNote: 'Behind the main library, second block.',
  },
  {
    course: 'GST301',
    title: 'Entrepreneurship',
    date: 'Sept 26, 2026',
    time: '01:00 PM',
    hall: 'LT-01',
    seat: 'C-07',
    locationNote: 'Main lecture theatre complex, ground floor.',
  },
];

const GRADE_STYLES = {
  A: 'bg-bronze-deep/10 text-bronze-deep',
  B: 'bg-paper text-charcoal border border-line-strong',
  C: 'bg-paper text-graphite border border-line',
  D: 'bg-paper text-graphite-soft border border-line',
  F: 'bg-red-50 text-red-600 border border-red-200',
};

function GradeBadge({ grade }) {
  return (
    <span
      className={`inline-flex h-7 w-9 items-center justify-center rounded-lg text-sm font-bold ${
        GRADE_STYLES[grade] || GRADE_STYLES.D
      }`}
    >
      {grade}
    </span>
  );
}

export default function ExaminationsPage() {
  const [session, setSession] = useState(SESSIONS[0]);
  const [sessionOpen, setSessionOpen] = useState(false);
  const [openLocation, setOpenLocation] = useState(null);

  const data = RESULTS[session] || RESULTS[SESSIONS[0]];
  const totalUnits = data.courses.reduce((sum, c) => sum + c.units, 0);

  return (
    <main className="min-h-screen bg-paper text-charcoal overflow-x-hidden">
      <Sidebar />

      <Topbar title="Examinations">
        <div className="relative">
          <button
            type="button"
            onClick={() => setSessionOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-line-strong bg-cream px-4 py-2 text-xs font-bold text-charcoal transition-colors hover:border-bronze-deep/40 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            {session}
            <PiCaretDownBold
              className={`text-graphite-soft transition-transform ${sessionOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {sessionOpen && (
            <div className="absolute right-0 z-20 mt-2 w-64 overflow-hidden rounded-xl border border-line bg-white shadow-xl">
              {SESSIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSession(s);
                    setSessionOpen(false);
                  }}
                  className={`block w-full px-4 py-3 text-left text-sm font-medium transition-colors ${
                    s === session
                      ? 'bg-bronze-deep/10 text-bronze-deep'
                      : 'text-graphite hover:bg-cream'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </Topbar>

      <section className="ml-0 md:ml-[280px] min-h-screen pt-[72px]">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-graphite-soft">
                Semester GPA
              </p>
              <p className="mt-2 font-display text-4xl font-bold text-charcoal">
                {data.semesterGpa}
              </p>
              <p className="mt-1 flex items-center gap-1 text-sm text-bronze-deep">
                <PiTrendUp /> This session
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-graphite-soft">
                CGPA
              </p>
              <p className="mt-2 font-display text-4xl font-bold text-charcoal">{data.cgpa}</p>
              <p className="mt-1 text-sm text-graphite">Across {totalUnits} units this session</p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-graphite-soft">
                Current Standing
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-charcoal">{data.standing}</p>
              <p className="mt-1 text-sm text-graphite">Based on cumulative record</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-line bg-cream px-4 py-3 text-xs text-graphite-soft">
            GPA and CGPA shown here are illustrative placeholders. The calculation
            method will be finalized when this page is connected to real academic
            records.
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white">
            <div className="flex items-center gap-2 border-b border-line px-6 py-4">
              <PiBookOpen className="text-graphite-soft" />
              <h2 className="font-display text-lg font-semibold text-charcoal">Course Results</h2>
            </div>

            <div className="divide-y divide-line">
              {data.courses.map((course) => {
                const point = GRADE_POINTS[course.grade] ?? 0;
                const remark = course.grade === 'F' ? 'Fail' : 'Pass';

                return (
                  <div
                    key={course.code}
                    className="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-charcoal">{course.code}</p>
                      <p className="truncate text-sm text-graphite">{course.title}</p>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-5">
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider text-graphite-soft">Units</p>
                        <p className="text-sm font-semibold text-charcoal">{course.units}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider text-graphite-soft">Score</p>
                        <p className="text-sm font-semibold text-charcoal">{course.score}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider text-graphite-soft">Point</p>
                        <p className="text-sm font-semibold text-charcoal">{point}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider text-graphite-soft">Remark</p>
                        <p
                          className={`text-sm font-semibold ${
                            remark === 'Fail' ? 'text-red-600' : 'text-charcoal'
                          }`}
                        >
                          {remark}
                        </p>
                      </div>
                      <GradeBadge grade={course.grade} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-white px-6 py-5">
            <p className="text-sm text-graphite">
              Think one of these scores is wrong? You can raise it formally.
            </p>
            <Link
              href="/complaints"
              className="flex shrink-0 items-center gap-1.5 text-sm font-bold text-bronze-deep hover:text-bronze-soft"
            >
              File an examination complaint
              <PiArrowRight />
            </Link>
          </div>

          <div className="mt-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-display text-lg font-semibold text-charcoal">
                Exam Hall &amp; Seat
              </h2>
              <Link
                href="/timetable"
                className="flex items-center gap-1.5 text-sm font-bold text-bronze-deep hover:text-bronze-soft"
              >
                View exam schedule
                <PiArrowRight />
              </Link>
            </div>

            <div className="mt-4 space-y-4">
              {HALL_ASSIGNMENTS.map((assignment) => (
                <div
                  key={assignment.course}
                  className="rounded-2xl border border-line bg-white p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-graphite-soft">
                        {assignment.course}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-bold text-charcoal">
                        {assignment.title}
                      </h3>
                      <p className="mt-1 text-sm text-graphite">
                        {assignment.date} &middot; {assignment.time}
                      </p>
                    </div>

                    <div className="flex gap-6">
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider text-graphite-soft">Hall</p>
                        <p className="text-sm font-bold text-charcoal">{assignment.hall}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider text-graphite-soft">Seat</p>
                        <p className="text-sm font-bold text-bronze-deep">{assignment.seat}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setOpenLocation((prev) =>
                        prev === assignment.course ? null : assignment.course
                      )
                    }
                    className="mt-4 flex items-center gap-1.5 text-sm font-bold text-charcoal hover:text-bronze-deep"
                  >
                    <PiMapPinFill />
                    View hall location
                  </button>

                  {openLocation === assignment.course && (
                    <p className="mt-2 rounded-xl bg-paper px-4 py-3 text-sm text-graphite">
                      {assignment.locationNote}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MobileBottomNav active="academic" />
    </main>
  );
}