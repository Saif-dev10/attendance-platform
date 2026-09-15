/** Mock attendance service used until the backend validation endpoints exist. */

export async function validateQRCode(rawPayload) {
  await new Promise((resolve) => setTimeout(resolve, 1400));

  if (rawPayload === 'INVALID_DEMO') {
    return { type: 'attendance', status: 'invalid' };
  }

  if (rawPayload === 'EXPIRED_DEMO') {
    return { type: 'attendance', status: 'expired' };
  }

  if (rawPayload === 'ALREADY_DEMO') {
    return {
      type: 'attendance',
      status: 'already_used',
      alreadyMarked: {
        courseCode: 'CSC301',
        courseTitle: 'Advanced Algorithms',
        timeRegistered: '9:58 AM',
        status: 'Present',
      },
    };
  }

  if (rawPayload === 'NOT_ELIGIBLE_DEMO') {
    return {
      type: 'attendance',
      status: 'not_eligible',
      notEligible: {
        courseCode: 'CSC301',
        courseTitle: 'Advanced Algorithms',
        reason: 'You are not registered for this course this semester.',
      },
    };
  }

  const now = new Date();
  const date = now.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const time = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  });

  return {
    type: 'attendance',
    status: 'valid',
    session: {
      courseCode: 'CSC301',
      courseTitle: 'Advanced Algorithms',
      lecturer: 'Dr. Yusuf Muhammad',
      date,
      time,
      location: 'Main Lecture Hall B-04',
    },
  };
}

export async function confirmAttendance() {
  await new Promise((resolve) => setTimeout(resolve, 1100));

  return {
    courseCode: 'CSC301',
    courseTitle: 'Advanced Algorithms',
    lecturer: 'Dr. Yusuf Muhammad',
    date: 'September 14, 2026',
    time: '10:00 - 12:00 PM',
    location: 'Main Lecture Hall B-04',
    timeRegistered: new Date().toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    }),
    status: 'Present',
  };
}
