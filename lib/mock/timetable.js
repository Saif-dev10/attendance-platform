export const timetableDays = [
  { label: 'Mon', date: 22, active: false },
  { label: 'Tue', date: 23, active: true },
  { label: 'Wed', date: 24, active: false },
  { label: 'Thu', date: 25, active: false },
  { label: 'Fri', date: 26, active: false },
];

export const timetableSlots = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
];

export const examinationEvents = [
  { dayIndex: 1, top: 200, code: 'CSC301', hall: 'New Computer Science Hall', title: 'Advanced Algorithms', date: 'Sept 24, 2026', time: '10:00 AM', variant: 'primary' },
  { dayIndex: 2, top: 0, code: 'MAT311', hall: 'Exam Hall 2', title: 'Linear Algebra II', date: 'Sept 25, 2026', time: '08:00 AM', variant: 'default' },
  { dayIndex: 3, top: 300, code: 'GST301', hall: 'LT-01', title: 'Entrepreneurship', date: 'Sept 26, 2026', time: '01:00 PM', variant: 'default' },
];
