'use client';

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import SettingsPageShell from '@/components/features/settings/SettingsPageShell';
import SettingsSection from '@/components/features/settings/SettingsSection';
import SettingsToggleRow from '@/components/features/settings/SettingsToggleRow';
import { getNotificationPreferences, updateNotificationPreference } from '@/lib/services/settings';

const sections = [
  {
    title: 'Academic Updates',
    items: [
      ['assignmentReminders', 'Assignment reminders', 'Get reminders before coursework deadlines.'],
      ['courseAnnouncements', 'Course announcements', 'Stay informed about updates from your courses.'],
    ],
  },
  {
    title: 'Attendance',
    items: [
      ['attendanceReminders', 'Attendance reminders', 'Receive reminders about scheduled attendance activities.'],
      ['attendanceUpdates', 'Attendance status updates', 'Be notified when attendance status or eligibility changes.'],
    ],
  },
  {
    title: 'Examinations',
    items: [
      ['examTimetableUpdates', 'Exam timetable updates', 'Receive changes to examination dates and times.'],
      ['examSeatUpdates', 'Exam seat and hall updates', 'Know when your examination venue or seat is available.'],
      ['resultUpdates', 'Result updates', 'Be notified when examination results are published.'],
    ],
  },
  {
    title: 'Support & General',
    items: [
      ['supportUpdates', 'Complaint and support updates', 'Stay informed about submitted complaints and support requests.'],
      ['generalAnnouncements', 'Important university announcements', 'Receive important notices relevant to students.'],
    ],
  },
];

export default function NotificationsPage() {
  const [preferences, setPreferences] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getNotificationPreferences().then(setPreferences);
  }, []);

  async function handleChange(key, value) {
    setPreferences((current) => ({ ...current, [key]: value }));
    await updateNotificationPreference(key, value);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  return (
    <SettingsPageShell
      title="Notification Preferences"
      subtitle="Manage notifications"
      description="Choose the types of updates you would like to receive from SKUL."
    >
      <div className="space-y-6">
        {sections.map((section) => (
          <SettingsSection key={section.title} title={section.title}>
            {section.items.map(([key, label, description], index) => (
              <SettingsToggleRow
                key={key}
                label={label}
                description={description}
                checked={Boolean(preferences[key])}
                onChange={(value) => handleChange(key, value)}
                last={index === section.items.length - 1}
              />
            ))}
          </SettingsSection>
        ))}
        <div className="flex items-center gap-2 text-xs text-graphite-soft" role="status" aria-live="polite">
          <Bell size={14} />
          {saved ? 'Preferences updated.' : 'Account and security notices may remain essential.'}
        </div>
      </div>
    </SettingsPageShell>
  );
}
