// Frontend service contract for student documents.
// Replace these mock responses with API calls when document services are available.

import {
  documentTypes,
  recentDocumentRequests,
} from '@/lib/mock/documents';

export function getDocumentTypes() {
  return documentTypes;
}

export function getRecentDocumentRequests() {
  return recentDocumentRequests;
}

export async function requestDocument(documentTypeId) {
  return { documentTypeId, status: 'submitted' };
}
