"use client";

import { useState } from "react";
import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { PrinterIcon, DownloadIcon } from "lucide-react";

import {
  getLecturerTimetable,
  getLecturerExaminationEvents,
} from "@/lib/services/timetable";

const {
  days,
  timeSlots,
  events: timetableEvents,
} = getLecturerTimetable();

const EXAM_EVENTS = getLecturerExaminationEvents();

const TIMETABLE_START_MINUTES = 8 * 60;
const TIMETABLE_END_MINUTES = 16 * 60;
const TIMETABLE_TOTAL_MINUTES =
  TIMETABLE_END_MINUTES - TIMETABLE_START_MINUTES;

function getMinutes(time) {
  if (!time) return 0;

  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

function getEventPosition(startTime, endTime) {
  const startMinutes = getMinutes(startTime);
  const endMinutes = getMinutes(endTime);

  const topMinutes = Math.max(
    0,
    startMinutes - TIMETABLE_START_MINUTES
  );

  const durationMinutes = Math.max(
    30,
    endMinutes - startMinutes
  );

  return {
    top: `${(topMinutes / TIMETABLE_TOTAL_MINUTES) * 100}%`,
    height: `${(durationMinutes / TIMETABLE_TOTAL_MINUTES) * 100}%`,
  };
}

function getEventsForDay(day) {
  return timetableEvents.filter((event) => event.day === day.label);
}

function getExamEventsForDay(dayIndex) {
  return EXAM_EVENTS.filter((event) => event.dayIndex === dayIndex);
}

function isEventNow(event) {
  if (!event.startTime || !event.endTime) return false;

  const now = new Date();

  const eventDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    event.date
  );

  if (
    now.getFullYear() !== eventDate.getFullYear() ||
    now.getMonth() !== eventDate.getMonth() ||
    now.getDate() !== event.date
  ) {
    return false;
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = getMinutes(event.startTime);
  const endMinutes = getMinutes(event.endTime);

  return (
    currentMinutes >= startMinutes &&
    currentMinutes < endMinutes
  );
}

function getEventCardStyle(event) {
  const courseColors = {
    CSC301: "bg-bronze-deep text-cream shadow-bronze-deep/20",
    MAT311: "bg-charcoal text-cream shadow-charcoal/10",
    GST301: "border border-line bg-cream text-charcoal shadow-sm",
    CSC305: "bg-charcoal text-cream shadow-charcoal/10",
    CSC307: "bg-moss text-cream shadow-moss/10",
    CSC401: "bg-bronze-deep text-cream shadow-bronze-deep/20",
  };

  return (
    courseColors[event.course] ||
    "bg-charcoal text-cream shadow-charcoal/10"
  );
}

export default function LecturerTimetable() {
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
          {scheduleType === "class" && (
            <div className="mx-auto w-full max-w-[1500px] overflow-x-auto rounded-2xl border border-line bg-white shadow-sm">
              <div className="min-w-[720px] overflow-hidden">

                {/* Days */}
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
                      className={`min-w-0 border-r border-line px-2 py-3 text-center sm:px-3 sm:py-4 ${
                        index === visibleDays.length - 1
                          ? "border-r-0"
                          : ""
                      } ${
                        day.active
                          ? "bg-bronze-deep/10"
                          : ""
                      }`}
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

                {/* Timetable */}
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
                    const isLast =
                      dayIndex === visibleDays.length - 1;

                    return (
                      <div
                        key={day.label}
                        className={`relative min-w-0 ${
                          !isLast
                            ? "border-r border-line"
                            : ""
                        } ${
                          day.active
                            ? "bg-bronze-deep/[0.02]"
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

                        {/* Current-time indicator */}
                        {day.active && (
                          <div className="pointer-events-none absolute left-0 right-0 top-[25%] z-20 hidden items-center sm:flex">
                            <div className="absolute -left-1 h-2 w-2 rounded-full bg-red-500" />
                            <div className="h-px w-full bg-red-500/40" />
                          </div>
                        )}

                        {/* Lecturer events */}
                        {dayEvents.map((event) => {
                          const position = getEventPosition(
                            event.startTime,
                            event.endTime
                          );

                          const isNow = isEventNow(event);

                          return (
                            <div
                              key={event.id}
                              className="absolute left-0 right-0 z-10 p-1 sm:p-1.5"
                              style={{
                                top: position.top,
                                height: position.height,
                              }}
                            >
                              <div
                                className={`h-full w-full overflow-hidden rounded-xl p-2.5 transition-transform hover:scale-[1.01] sm:p-3 ${getEventCardStyle(
                                  event
                                )}`}
                              >
                                <div className="mb-1 flex min-w-0 items-start justify-between gap-1">
                                  <p className="truncate text-[8px] font-bold uppercase opacity-70 sm:text-[9px]">
                                    {event.course} •{" "}
                                    {event.venue}
                                  </p>

                                  {isNow && (
                                    <span className="shrink-0 rounded bg-white/20 px-1 py-0.5 text-[7px] font-bold sm:px-1.5 sm:text-[8px]">
                                      NOW
                                    </span>
                                  )}
                                </div>

                                <h4 className="truncate text-[10px] font-black sm:text-xs">
                                  {event.title}
                                </h4>

                                <p className="mt-1 truncate text-[8px] font-medium opacity-70 sm:text-[9px]">
                                  {event.level} •{" "}
                                  {event.students} students
                                </p>

                                <p className="mt-1 truncate text-[8px] font-medium opacity-60 sm:text-[9px]">
                                  {event.startTime} –{" "}
                                  {event.endTime}
                                </p>
                              </div>
                            </div>
                          );
                        })}

                        {/* Empty day */}
                        {dayEvents.length === 0 && (
                          <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
                            <p className="text-[10px] font-medium text-graphite-soft">
                              No classes scheduled.
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {scheduleType === "exam" && (
            <div className="mx-auto w-full max-w-[1500px] overflow-x-auto rounded-2xl border border-line bg-white shadow-sm">
              <div className="min-w-[720px] overflow-hidden">

                {/* Exam days */}
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
                      className={`min-w-0 border-r border-line px-2 py-3 text-center sm:px-3 sm:py-4 ${
                        index === visibleDays.length - 1
                          ? "border-r-0"
                          : ""
                      } ${
                        day.active
                          ? "bg-bronze-deep/10"
                          : ""
                      }`}
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

                {/* Exam grid */}
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

                  {visibleDays.map((day) => {
                    const originalDayIndex = days.findIndex(
                      (item) => item.label === day.label
                    );

                    const examEvents =
                      getExamEventsForDay(
                        originalDayIndex
                      );

                    return (
                      <div
                        key={day.label}
                        className="relative min-w-0 border-r border-line last:border-r-0"
                      >
                        {timeSlots.map((_, index) => (
                          <div
                            key={index}
                            className="h-[88px] border-b border-line sm:h-[100px]"
                          />
                        ))}

                        {examEvents.map((event) => (
                          <div
                            key={`${event.code}-${event.date}`}
                            className="absolute left-0 right-0 p-1 sm:p-1.5"
                            style={{
                              top: event.top,
                              height: 200,
                            }}
                          >
                            <div
                              className={`h-full w-full overflow-hidden rounded-xl p-2.5 shadow-lg transition-transform hover:scale-[1.01] sm:p-3 ${
                                event.variant === "primary"
                                  ? "bg-bronze-deep text-cream shadow-bronze-deep/20"
                                  : "bg-charcoal text-cream shadow-charcoal/10"
                              }`}
                            >
                              <p className="mb-1 truncate text-[8px] font-bold uppercase opacity-70 sm:text-[9px]">
                                {event.code} •{" "}
                                {event.hall}
                              </p>

                              <h4 className="truncate text-[10px] font-black sm:text-xs">
                                {event.title}
                              </h4>

                              <p className="mt-1 truncate text-[8px] font-medium opacity-60 sm:text-[9px]">
                                {event.date} •{" "}
                                {event.time}
                              </p>
                            </div>
                          </div>
                        ))}

                        {examEvents.length === 0 &&
                          viewMode === "daily" &&
                          day.active && (
                            <div className="flex h-full items-center justify-center px-4 py-10 text-center">
                              <p className="text-xs font-medium text-graphite-soft">
                                No examination scheduled
                                for this day.
                              </p>
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