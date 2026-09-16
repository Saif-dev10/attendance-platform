'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar, { lecturerSections, studentSections } from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import NotificationCenter from '@/components/features/notifications/NotificationCenter';
import { getNotifications } from '@/lib/services/notifications';

export default function NotificationsPage() {
  return (
    <Suspense fallback={<NotificationsLoading />}>
      <NotificationsContent />
    </Suspense>
  );
}

function NotificationsContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') === 'lecturer' ? 'lecturer' : 'student';
  const isLecturer = role === 'lecturer';

  return (
    <div className="min-h-screen bg-paper text-charcoal">
      <Sidebar sections={isLecturer ? lecturerSections : studentSections} dashboardHref={isLecturer ? '/lecturers' : '/dashboard'} />
      <MobileBottomNav active={isLecturer ? 'home' : 'more'} />
      <Topbar title="Notifications" subtitle={isLecturer ? 'Lecturer updates and actions' : 'Student updates and actions'} />
      <main className="min-h-screen overflow-y-auto bg-paper pb-[calc(84px+1.5rem)] pt-[72px] md:ml-[280px] md:pb-0">
        <div className="mx-auto max-w-4xl px-3 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8">
          <NotificationCenter notifications={getNotifications(role)} role={role} />
        </div>
      </main>
    </div>
  );
}

function NotificationsLoading() {
  return (
    <div className="min-h-screen bg-paper px-5 py-8 text-sm text-graphite-soft">
      Loading notifications...
    </div>
  );
}
