import {
  PiCarFill,
  PiClipboardTextFill,
  PiFileTextFill,
  PiGraduationCapFill,
} from 'react-icons/pi';

export const complaintCategories = [
  {
    id: 'academic', label: 'Academic', icon: PiGraduationCapFill,
    helper: 'Attendance, registration, assignments, grades', team: 'Academic Office',
    types: ['Attendance issue', 'Course/registration issue', 'Assignment issue', 'Grade/score issue', 'Lecturer/course issue'],
  },
  {
    id: 'examination', label: 'Examination', icon: PiClipboardTextFill,
    helper: 'Results, timetable, hall, seat', team: 'Examinations Office',
    types: ['Result issue', 'Examination timetable issue', 'Examination hall issue', 'Examination seat issue'],
  },
  {
    id: 'campus-ride', label: 'Campus Ride', icon: PiCarFill,
    helper: 'Bookings, drivers, routes, wallet', team: 'Campus Ride Support',
    types: ['Booking issue', 'Driver/ride issue', 'Route issue', 'Pickup/drop-off issue', 'Wallet/payment issue', 'Lost item'],
  },
  {
    id: 'documents', label: 'Documents & Student Services', icon: PiFileTextFill,
    helper: 'Document requests and records', team: 'Student Records',
    types: ['Document request issue', 'Student record issue', 'Other student service issue'],
  },
];

export const complaintCourses = [
  'ITC 401 — Software Engineering', 'ITC 403 — Database Systems II',
  'ITC 405 — Human-Computer Interaction', 'ITC 407 — Computer Networks',
  'GST 401 — Entrepreneurship Studies', 'ITC 409 — Mobile Application Development',
];

export const complaintSessions = ['2025/2026 — Rain', '2024/2025 — Harmattan', '2024/2025 — Rain'];

export const initialComplaints = [
  {
    ref: 'CMP-1042', category: 'Examination', type: 'Result issue',
    subject: 'ITC 407 score not reflecting practical marks', status: 'Under Review',
    submitted: 'Sept 8, 2026', updated: '2 days ago',
    description: 'My recorded score for ITC 407 does not include the practical component submitted in week 10.',
    assignedTeam: 'Examinations Office',
    timeline: [{ stage: 'Submitted', date: 'Sept 8, 2026', done: true }, { stage: 'Under Review', date: 'Sept 9, 2026', done: true }, { stage: 'Resolved', date: null, done: false }],
  },
  {
    ref: 'CMP-1029', category: 'Documents & Student Services', type: 'Document request issue',
    subject: 'Transcript request stuck in processing', status: 'Resolved',
    submitted: 'Aug 29, 2026', updated: '1 week ago',
    description: 'My official transcript request (DOC-2201) has been in Processing for over two weeks.',
    assignedTeam: 'Student Records',
    timeline: [{ stage: 'Submitted', date: 'Aug 29, 2026', done: true }, { stage: 'Under Review', date: 'Aug 30, 2026', done: true }, { stage: 'Resolved', date: 'Sept 5, 2026', done: true }],
  },
  {
    ref: 'CMP-1015', category: 'Academic', type: 'Course/registration issue',
    subject: 'Unable to register GST 401 — course full', status: 'Submitted',
    submitted: 'Sept 11, 2026', updated: '2 weeks ago',
    description: 'The system shows GST 401 as full, but I registered on time during the open window.',
    assignedTeam: 'Academic Office',
    timeline: [{ stage: 'Submitted', date: 'Sept 11, 2026', done: true }, { stage: 'Under Review', date: null, done: false }, { stage: 'Resolved', date: null, done: false }],
  },
  {
    ref: 'CMP-0988', category: 'Campus Ride', type: 'Driver/ride issue',
    subject: 'Driver skipped my pickup stop', status: 'Rejected',
    submitted: 'Aug 20, 2026', updated: '3 weeks ago',
    description: 'The driver on route B skipped the Block C stop and I had to walk to the next one.',
    assignedTeam: 'Campus Ride Support',
    timeline: [{ stage: 'Submitted', date: 'Aug 20, 2026', done: true }, { stage: 'Under Review', date: 'Aug 21, 2026', done: true }, { stage: 'Rejected', date: 'Aug 23, 2026', done: true }],
  },
];
