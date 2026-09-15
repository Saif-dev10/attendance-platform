import {
  PiCertificateFill,
  PiEnvelopeSimpleOpenFill,
  PiFileTextFill,
  PiIdentificationCardFill,
} from 'react-icons/pi';

export const documentTypes = [
  {
    id: 'transcript',
    icon: PiFileTextFill,
    title: 'Official Transcript',
    description: 'A certified record of every course and grade on file.',
    lastRequest: 'Requested 3 weeks ago',
  },
  {
    id: 'certificate',
    icon: PiCertificateFill,
    title: 'Certificate of Attendance',
    description: 'Confirms your current enrollment status for the session.',
    lastRequest: null,
  },
  {
    id: 'admission-letter',
    icon: PiEnvelopeSimpleOpenFill,
    title: 'Admission Letter',
    description: 'A reissued copy of your original letter of admission.',
    lastRequest: null,
  },
  {
    id: 'id-replacement',
    icon: PiIdentificationCardFill,
    title: 'Student ID Replacement',
    description: 'Request a new ID card if yours is lost or damaged.',
    lastRequest: 'Requested 4 months ago',
  },
];

export const requestStages = ['Requested', 'Processing', 'Ready', 'Collected'];

export const recentDocumentRequests = [
  { id: 'DOC-2201', title: 'Official Transcript', stage: 2, date: 'Sept 2, 2026' },
  { id: 'DOC-2088', title: 'Student ID Replacement', stage: 3, date: 'May 14, 2026' },
];
