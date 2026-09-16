// Notification service contract. Replace the mock lookup with the backend
// notification feed without changing the shared notification-center UI.

import { notificationsByRole } from '@/lib/mock/notifications';

export function getNotifications(role = 'student') {
  return notificationsByRole[role] || notificationsByRole.student;
}
