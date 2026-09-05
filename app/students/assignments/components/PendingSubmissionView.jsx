// app/students/assignments/_components/PendingSubmissionView.jsx
import { ArrowLeft, Info, Paperclip, FileCode, FileText, UploadCloud, MessageCircle, Send } from "lucide-react";
import Link from "next/link";

export default function PendingSubmissionView({ assignment }) {
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
            {assignment.subject} • Posted by {assignment.postedBy}
          </p>
        </div>
      </header>

      <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Brief */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-line p-6 space-y-6 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center shrink-0">
                <Info size={18} className="text-bronze-deep" />
              </div>
              <div>
                <h2 className="font-semibold text-charcoal">Assignment Brief</h2>
                <p className="text-sm text-graphite-soft">Read carefully before proceeding with your implementation.</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] text-graphite-soft tracking-wide">MAX SCORE</p>
              <p className="text-2xl font-bold text-charcoal">
                {assignment.maxScore}
                <span className="text-sm font-normal text-graphite-soft">pts</span>
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-graphite mb-3">{assignment.description}</p>
            <ul className="space-y-2">
              {assignment.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-graphite">
                  <span className="mt-0.5 w-4 h-4 rounded bg-bronze-deep/10 flex items-center justify-center flex-shrink-0">
                    <span className="w-2 h-2 rounded-sm bg-bronze-deep" />
                  </span>
                  {req}
                </li>
              ))}
            </ul>
            {assignment.note && (
              <div className="mt-4 bg-cream border border-line rounded-lg p-4 text-sm italic text-graphite">
                &quot;{assignment.note}&quot;
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Paperclip size={14} className="text-graphite-soft" />
              <p className="text-sm font-semibold text-charcoal">Reference Materials</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {assignment.materials.map((mat) => (
                <div key={mat.name} className="flex items-center gap-3 border border-line rounded-lg p-3">
                  <div className="w-9 h-9 rounded-lg bg-cream flex items-center justify-center shrink-0">
                    {mat.type === "code" ? (
                      <FileCode size={16} className="text-bronze-deep" />
                    ) : (
                      <FileText size={16} className="text-red-500" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-charcoal truncate">{mat.name}</p>
                    <p className="text-xs text-graphite-soft">{mat.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Submission + Comments */}
        <div className="space-y-6 min-w-0">
          <div className="bg-white rounded-xl border border-line p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-charcoal text-sm">Your Submission</p>
              <span className="text-[10px] font-semibold bg-bronze-deep/10 text-bronze-deep px-2 py-1 rounded-full">
                PENDING
              </span>
            </div>
            <div className="bg-cream rounded-lg p-3 mb-4">
              <p className="text-[10px] text-graphite-soft tracking-wide">DUE DATE</p>
              <p className="text-sm font-semibold text-red-500">{assignment.dueDate}</p>
              <p className="text-xs text-graphite-soft">{assignment.timeRemaining}</p>
            </div>
            <div className="border-2 border-dashed border-line rounded-lg py-8 flex flex-col items-center text-center mb-4">
              <UploadCloud size={22} className="text-graphite-soft mb-2" />
              <p className="text-sm font-semibold text-graphite">Drop submission here</p>
              <p className="text-xs text-graphite-soft">or click to browse your files</p>
              <p className="text-[10px] text-graphite-soft mt-1">MAX SIZE: 25MB (ZIP, PDF, DOCX)</p>
            </div>
            <button className="w-full bg-charcoal hover:bg-charcoal/90 text-cream text-sm font-semibold py-2.5 rounded-lg">
              Submit Assignment
            </button>
          </div>

          <div className="bg-white rounded-xl border border-line p-5">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle size={16} className="text-graphite-soft" />
              <p className="font-semibold text-charcoal text-sm">Private Comments</p>
              <span className="text-xs text-graphite-soft">0</span>
            </div>
            <p className="text-xs text-graphite-soft text-center py-4">
              No private comments yet. Ask your instructor for clarification here.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Write a message..."
                className="flex-1 text-sm px-3 py-2 rounded-lg border border-line text-charcoal placeholder:text-graphite-soft focus:outline-none focus:ring-2 focus:ring-bronze-deep/40"
              />
              <button className="w-9 h-9 rounded-lg bg-charcoal flex items-center justify-center shrink-0">
                <Send size={14} className="text-cream" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}