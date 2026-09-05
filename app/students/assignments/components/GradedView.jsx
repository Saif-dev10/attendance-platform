// app/students/assignments/_components/GradedView.jsx
import { ArrowLeft, MessageSquare, TrendingUp, Calendar, RotateCcw, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function GradedView({ assignment }) {
  return (
    <>
      <header className="flex items-center gap-4 px-5 sm:px-8 py-5 bg-white border-b border-line">
        <Link
          href="/students/assignments"
          className="w-9 h-9 rounded-lg border border-line flex items-center justify-center hover:bg-paper shrink-0"
        >
          <ArrowLeft size={16} className="text-graphite-soft" />
        </Link>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-semibold bg-cream text-graphite px-2 py-0.5 rounded">
              {assignment.course}
            </span>
            <h1 className="font-semibold text-charcoal truncate">{assignment.title}</h1>
          </div>
          <p className="text-xs text-graphite-soft italic">
            {assignment.subject} • Graded on {assignment.gradedDate}
          </p>
        </div>
      </header>

      <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Grade + feedback */}
        <div className="lg:col-span-2 space-y-6 min-w-0">
          <div className="bg-charcoal rounded-xl p-6 relative overflow-hidden">
            <span className="inline-block text-[10px] font-semibold bg-bronze-deep/20 text-cream/90 px-2 py-1 rounded mb-4">
              OFFICIAL GRADE RELEASE
            </span>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-bold text-cream mb-2">
                  Excellent Work, {assignment.studentFirstName}!
                </h2>
                <p className="text-sm text-cream/60 max-w-md mb-4">{assignment.gradeComment}</p>
                <div className="flex gap-3 flex-wrap">
                  <span className="flex items-center gap-1.5 text-xs text-cream/80 bg-cream/10 px-3 py-1.5 rounded-lg">
                    <TrendingUp size={13} /> {assignment.rankBadge}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-cream/80 bg-cream/10 px-3 py-1.5 rounded-lg">
                    <Calendar size={13} /> {assignment.submittedBadge}
                  </span>
                </div>
              </div>
              <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center rounded-full border-4 border-bronze-deep">
                <div>
                  <p className="text-2xl font-bold text-cream text-center">{assignment.score}</p>
                  <p className="text-[10px] text-cream/60 text-center">OF {assignment.maxScore}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-line p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={16} className="text-graphite-soft" />
              <p className="font-semibold text-charcoal">Instructor Feedback</p>
            </div>
            <div className="flex gap-3 mb-6">
              <Image
                src={assignment.instructor.avatar}
                alt={assignment.instructor.name}
                width={36}
                height={36}
                className="rounded-full object-cover shrink-0"
              />
              <div className="bg-cream rounded-lg p-4 flex-1 min-w-0">
                <p className="text-sm text-graphite italic">
                  &quot;{assignment.instructor.comment}&quot;
                </p>
                <div className="flex items-center justify-between mt-3 flex-wrap gap-1">
                  <p className="text-xs font-semibold text-charcoal">{assignment.instructor.name}</p>
                  <p className="text-xs text-graphite-soft">{assignment.instructor.timestamp}</p>
                </div>
              </div>
            </div>

            <p className="text-[11px] font-bold tracking-wider text-graphite-soft uppercase mb-3">
              Grading Criteria
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {assignment.rubric.map((r) => (
                <div key={r.label} className="border border-line rounded-lg p-4 flex justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-charcoal">{r.label}</p>
                    <p className="text-xs text-graphite-soft">{r.description}</p>
                  </div>
                  <p className="text-sm font-bold text-bronze-deep whitespace-nowrap">{r.score}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Submission + next steps */}
        <div className="space-y-6 min-w-0">
          <div className="bg-white rounded-xl border border-line p-5">
            <p className="font-semibold text-charcoal text-sm mb-4">Your Submission</p>
            <div className="flex items-center gap-3 border border-line rounded-lg p-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-red-500 text-[10px] font-bold shrink-0">
                PDF
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-charcoal truncate">{assignment.submission.filename}</p>
                <p className="text-xs text-graphite-soft">Submitted {assignment.submission.date}</p>
              </div>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-graphite-soft">Submission ID</span>
              <span className="font-semibold text-charcoal">{assignment.submission.id}</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-graphite-soft">Plagiarism Score</span>
              <span className="font-semibold text-green-600">{assignment.submission.plagiarism}</span>
            </div>
            <button className="w-full border border-line text-graphite text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-paper">
              <RotateCcw size={14} /> Request Regrade
            </button>
          </div>

          <div className="bg-cream rounded-xl p-5">
            <p className="font-semibold text-charcoal text-sm mb-2">Next Steps</p>
            <p className="text-sm text-graphite mb-3">{assignment.nextSteps}</p>
            <Link href="/students/courses" className="text-sm font-semibold text-bronze-deep flex items-center gap-1">
              View Course Syllabus <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}