"use client";

import { useState } from "react";
import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { PrinterIcon, DownloadIcon } from "lucide-react";
import {
  getStudentTimetable,
  getStudentExaminationEvents,
} from "@/lib/services/timetable";

const { days, timeSlots, events } = getStudentTimetable();
const EXAM_EVENTS = getStudentExaminationEvents();

function getExamEventsForDay(dayIndex) {
  return EXAM_EVENTS.filter((event) => event.dayIndex === dayIndex);
}

function getEventsForDay(day) {
  return events.filter((event) => event.day === day.label);
}

function getMinutes(time) {
  if (!time) return 0;

  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

function getEventPosition(startTime, endTime) {
  const timetableStart = 8 * 60;
  const timetableEnd = 16 * 60;
  const timetableDuration = timetableEnd - timetableStart;

  const start = getMinutes(startTime);
  const end = getMinutes(endTime);

  const topMinutes = Math.max(0, start - timetableStart);
  const durationMinutes = Math.max(30, end - start);

  return {
    top: `${(topMinutes / timetableDuration) * 100}%`,
    height: `${(durationMinutes / timetableDuration) * 100}%`,
  };
}

function getEventCardStyle(course) {
  const styles = {
    MAT311: "bg-charcoal text-cream shadow-charcoal/10",
    CSC301: "bg-bronze-deep text-cream shadow-bronze-deep/20",
    GST301: "border border-line bg-cream text-charcoal shadow-sm",
    CSC305: "bg-charcoal text-cream shadow-charcoal/10",
    CSC307: "bg-moss text-cream shadow-moss/10",
  };

  return styles[course] || "bg-bronze-deep text-cream shadow-bronze-deep/20";
}

function getEventMutedTextStyle(course) {
  const lightCards = ["GST301"];

  return lightCards.includes(course)
    ? "text-graphite-soft"
    : "text-cream opacity-60";
}

function getEventHeaderStyle(course) {
  const lightCards = ["GST301"];

  return lightCards.includes(course)
    ? "text-graphite-soft"
    : "text-cream opacity-70";
}

export default function StudentTimetable() {
  const [viewMode, setViewMode] = useState("weekly");
  const [scheduleType, setScheduleType] = useState("class");

  const visibleDays =
    viewMode === "daily"
      ? days.filter((day) => day.active)
      : days;

  return (
    <main className="min-h-screen overflow-x-hidden bg-paper text-charcoal">
      <Sidebar />

      <Topbar
        title={
          scheduleType === "exam"
            ? "Examination Timetable"
            : "Academic Timetable"
        }
      >
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          {/* Schedule type */}
          <div className="flex rounded-xl border border-line bg-cream p-1">
            <button
              type="button"
              aria-pressed={scheduleType === "class"}
              onClick={() => setScheduleType("class")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all sm:px-4 ${
                scheduleType === "class"
                  ? "bg-white text-charcoal shadow-sm"
                  : "text-graphite-soft hover:text-charcoal"
              }`}
            >
              Class
            </button>

            <button
              type="button"
              aria-pressed={scheduleType === "exam"}
              onClick={() => setScheduleType("exam")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all sm:px-4 ${
                scheduleType === "exam"
                  ? "bg-white text-charcoal shadow-sm"
                  : "text-graphite-soft hover:text-charcoal"
              }`}
            >
              Exam Timetable
            </button>
          </div>

          <div className="mx-1 h-7 w-px bg-line sm:mx-2" />

          {/* View mode */}
          <div className="flex rounded-xl border border-line bg-cream p-1">
            <button
              type="button"
              aria-pressed={viewMode === "weekly"}
              onClick={() => setViewMode("weekly")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all sm:px-4 ${
                viewMode === "weekly"
                  ? "bg-white text-charcoal shadow-sm"
                  : "text-graphite-soft hover:text-charcoal"
              }`}
            >
              Weekly
            </button>

            <button
              type="button"
              aria-pressed={viewMode === "daily"}
              onClick={() => setViewMode("daily")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all sm:px-4 ${
                viewMode === "daily"
                  ? "bg-white text-charcoal shadow-sm"
                  : "text-graphite-soft hover:text-charcoal"
              }`}
            >
              Daily
            </button>
          </div>

          <div className="mx-1 h-7 w-px bg-line sm:mx-2" />

          <button
            type="button"
            aria-label="Print timetable"
            onClick={() => window.print()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-graphite-soft transition-colors hover:bg-cream"
          >
            <PrinterIcon size={16} />
          </button>

          <button
            type="button"
            aria-label="Download timetable"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-graphite-soft transition-colors hover:bg-cream"
          >
            <DownloadIcon size={16} />
          </button>
        </div>
      </Topbar>

      <section className="ml-0 min-h-screen pt-[72px] md:ml-[280px]">
        <div className="w-full px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-7">

          {/* =========================================================
              CLASS TIMETABLE
          ========================================================= */}
          {scheduleType === "class" && (
            <div className="mx-auto w-full max-w-[1500px] overflow-x-auto rounded-2xl border border-line bg-white shadow-sm">
              <div
                className={`min-w-0 overflow-hidden ${
                  viewMode === "weekly" ? "min-w-[720px]" : ""
                }`}
              >
                {/* Day header */}
                <div
                  className={`grid border-b border-line bg-cream/80 ${
                    viewMode === "daily"
                      ? "grid-cols-[56px_minmax(0,1fr)] sm:grid-cols-[64px_minmax(0,1fr)]"
                      : "grid-cols-[56px_repeat(5,minmax(0,1fr))] sm:grid-cols-[64px_repeat(5,minmax(0,1fr))]"
                  }`}
                >
                  <div className="border-r border-line" />

                  {visibleDays.map((day, index) => (
                    <div
                      key={day.label}
                      className={`min-w-0 px-2 py-3 text-center sm:px-3 sm:py-4 ${
                        index !== visibleDays.length - 1
                          ? "border-r border-line"
                          : ""
                      } ${day.active ? "bg-bronze-deep/10" : ""}`}
                    >
                      <p
                        className={`mb-1 text-[9px] font-bold uppercase tracking-widest sm:text-[10px] ${
                          day.active
                            ? "text-bronze-deep"
                            : "text-graphite-soft"
                        }`}
                      >
                        {day.label}
                      </p>

                      <p
                        className={`text-base font-black sm:text-lg ${
                          day.active
                            ? "text-bronze-deep"
                            : "text-charcoal"
                        }`}
                      >
                        {day.date}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Timetable body */}
                <div
                  className={`grid ${
                    viewMode === "daily"
                      ? "grid-cols-[56px_minmax(0,1fr)] sm:grid-cols-[64px_minmax(0,1fr)]"
                      : "grid-cols-[56px_repeat(5,minmax(0,1fr))] sm:grid-cols-[64px_repeat(5,minmax(0,1fr))]"
                  }`}
                >
                  {/* Time column */}
                  <div className="border-r border-line bg-cream/30">
                    {timeSlots.map((time) => (
                      <div
                        key={time}
                        className="flex h-[88px] items-start justify-end border-b border-line px-2 pt-3 sm:h-[100px]"
                      >
                        <span className="whitespace-nowrap text-[9px] font-bold uppercase text-graphite-soft sm:text-[10px]">
                          {time}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Day columns */}
                  {visibleDays.map((day, dayIndex) => {
                    const dayEvents = getEventsForDay(day);

                    return (
                      <div
                        key={day.label}
                        className={`relative min-w-0 ${
                          dayIndex !== visibleDays.length - 1
                            ? "border-r border-line"
                            : ""
                        }`}
                      >
                        {/* Grid lines */}
                        {timeSlots.map((_, index) => (
                          <div
                            key={index}
                            className="h-[88px] border-b border-line sm:h-[100px]"
                          />
                        ))}

                        {/* Current day indicator */}
                        {day.active && (
                          <div className="absolute left-0 right-0 top-[220px] z-10 flex items-center">
                            <div className="absolute -left-1 h-2 w-2 rounded-full bg-red-500" />
                            <div className="h-px w-full bg-red-500/50" />
                          </div>
                        )}

                        {/* Events */}
                        {dayEvents.map((event) => {
                          const position = getEventPosition(
                            event.startTime,
                            event.endTime
                          );

                          const cardStyle = getEventCardStyle(event.course);
                          const headerStyle = getEventHeaderStyle(
                            event.course
                          );
                          const mutedStyle = getEventMutedTextStyle(
                            event.course
                          );

                          return (
                            <div
                              key={event.id}
                              className="absolute left-0 right-0 p-1 sm:p-1.5"
                              style={position}
                            >
                              <div
                                className={`h-full w-full overflow-hidden rounded-xl p-2.5 shadow-lg transition-transform hover:scale-[1.01] sm:p-3 ${cardStyle}`}
                              >
                                <div className="mb-1 flex min-w-0 items-start justify-between gap-1">
                                  <p
                                    className={`truncate text-[8px] font-bold uppercase sm:text-[9px] ${headerStyle}`}
                                  >
                                    {event.course} • {event.venue}
                                  </p>

                                  {event.day ===
                                    days.find((item) => item.active)
                                      ?.label &&
                                    event.startTime &&
                                    event.endTime && (
                                      <span className="shrink-0 rounded bg-white/20 px-1 py-0.5 text-[7px] font-bold sm:px-1.5 sm:text-[8px]">
                                        CLASS
                                      </span>
                                    )}
                                </div>

                                <h4 className="truncate text-[10px] font-black sm:text-xs">
                                  {event.title}
                                </h4>

                                <p
                                  className={`mt-1 truncate text-[8px] font-medium sm:text-[9px] ${mutedStyle}`}
                                >
                                  {event.lecturer}
                                </p>

                                <p
                                  className={`mt-1 truncate text-[8px] font-medium sm:text-[9px] ${mutedStyle}`}
                                >
                                  {event.startTime} – {event.endTime}
                                </p>
                              </div>
                            </div>
                          );
                        })}

                        {/* Daily empty state */}
                        {viewMode === "daily" &&
                          dayEvents.length === 0 && (
                            <div className="flex min-h-[400px] items-center justify-center px-4 py-10 text-center">
                              <div>
                                <p className="text-sm font-bold text-charcoal">
                                  No classes scheduled
                                </p>
                                <p className="mt-1 text-xs text-graphite-soft">
                                  There are no classes for {day.label} in
                                  this timetable.
                                </p>
                              </div>
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              EXAMINATION TIMETABLE
          ========================================================= */}
          {scheduleType === "exam" && (
            <div className="mx-auto w-full max-w-[1500px] overflow-x-auto rounded-2xl border border-line bg-white shadow-sm">
              <div
                className={`min-w-0 overflow-hidden ${
                  viewMode === "weekly" ? "min-w-[720px]" : ""
                }`}
              >
                {/* Day header */}
                <div
                  className={`grid border-b border-line bg-cream/80 ${
                    viewMode === "daily"
                      ? "grid-cols-[56px_minmax(0,1fr)] sm:grid-cols-[64px_minmax(0,1fr)]"
                      : "grid-cols-[56px_repeat(5,minmax(0,1fr))] sm:grid-cols-[64px_repeat(5,minmax(0,1fr))]"
                  }`}
                >
                  <div className="border-r border-line" />

                  {visibleDays.map((day, index) => (
                    <div
                      key={day.label}
                      className={`min-w-0 px-2 py-3 text-center sm:px-3 sm:py-4 ${
                        index !== visibleDays.length - 1
                          ? "border-r border-line"
                          : ""
                      } ${day.active ? "bg-bronze-deep/10" : ""}`}
                    >
                      <p
                        className={`mb-1 text-[9px] font-bold uppercase tracking-widest sm:text-[10px] ${
                          day.active
                            ? "text-bronze-deep"
                            : "text-graphite-soft"
                        }`}
                      >
                        {day.label}
                      </p>

                      <p
                        className={`text-base font-black sm:text-lg ${
                          day.active
                            ? "text-bronze-deep"
                            : "text-charcoal"
                        }`}
                      >
                        {day.date}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Exam body */}
                <div
                  className={`grid ${
                    viewMode === "daily"
                      ? "grid-cols-[56px_minmax(0,1fr)] sm:grid-cols-[64px_minmax(0,1fr)]"
                      : "grid-cols-[56px_repeat(5,minmax(0,1fr))] sm:grid-cols-[64px_repeat(5,minmax(0,1fr))]"
                  }`}
                >
                  {/* Time column */}
                  <div className="border-r border-line bg-cream/30">
                    {timeSlots.map((time) => (
                      <div
                        key={time}
                        className="flex h-[88px] items-start justify-end border-b border-line px-2 pt-3 sm:h-[100px]"
                      >
                        <span className="whitespace-nowrap text-[9px] font-bold uppercase text-graphite-soft sm:text-[10px]">
                          {time}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Exam day columns */}
                  {visibleDays.map((day, visibleIndex) => {
                    const originalDayIndex = days.findIndex(
                      (item) => item.label === day.label
                    );

                    const examEvents =
                      getExamEventsForDay(originalDayIndex);

                    return (
                      <div
                        key={day.label}
                        className={`relative min-w-0 ${
                          visibleIndex !== visibleDays.length - 1
                            ? "border-r border-line"
                            : ""
                        }`}
                      >
                        {/* Grid lines */}
                        {timeSlots.map((_, index) => (
                          <div
                            key={index}
                            className="h-[88px] border-b border-line sm:h-[100px]"
                          />
                        ))}

                        {/* Exam events */}
                        {examEvents.map((event) => (
                          <div
                            key={event.code}
                            className="absolute left-0 right-0 p-1 sm:p-1.5"
                            style={{
                              top: event.top || "0%",
                              height: event.height || 200,
                            }}
                          >
                            <div
                              className={`h-full w-full overflow-hidden rounded-xl p-2.5 shadow-lg transition-transform hover:scale-[1.01] sm:p-3 ${
                                event.variant === "primary"
                                  ? "bg-bronze-deep text-cream shadow-bronze-deep/20"
                                  : "bg-charcoal text-cream shadow-charcoal/10"
                              }`}
                            >
                              <div className="mb-1 flex min-w-0 items-start justify-between gap-1">
                                <p className="truncate text-[8px] font-bold uppercase opacity-70 sm:text-[9px]">
                                  {event.code} • {event.hall}
                                </p>

                                <span className="shrink-0 rounded bg-white/20 px-1 py-0.5 text-[7px] font-bold sm:px-1.5 sm:text-[8px]">
                                  EXAM
                                </span>
                              </div>

                              <h4 className="truncate text-[10px] font-black sm:text-xs">
                                {event.title}
                              </h4>

                              <p className="mt-1 truncate text-[8px] font-medium opacity-60 sm:text-[9px]">
                                {event.date} • {event.time}
                              </p>

                              {event.venue && (
                                <p className="mt-1 truncate text-[8px] font-medium opacity-60 sm:text-[9px]">
                                  {event.venue}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}

                        {/* Daily exam empty state */}
                        {viewMode === "daily" &&
                          examEvents.length === 0 && (
                            <div className="flex min-h-[400px] items-center justify-center px-4 py-10 text-center">
                              <div>
                                <p className="text-sm font-bold text-charcoal">
                                  No examination scheduled
                                </p>

                                <p className="mt-1 text-xs text-graphite-soft">
                                  There is no examination scheduled for{" "}
                                  {day.label}.
                                </p>
                              </div>
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <MobileBottomNav active="academic" />
    </main>
  );
}