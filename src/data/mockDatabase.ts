import { TrackingCard, Broadcast } from '../types/document';

export const initialDocuments: TrackingCard[] = [
  { id: 'DOC-101', title: 'Q3 Event Budget', committee: 'Finance', signatory: 'Dr. Smith', state: 'PENDING', lastUpdated: Date.now() - 3600000 },
  { id: 'DOC-102', title: 'Venue Booking Form', committee: 'Logistics', signatory: 'Facilities Mgmt', state: 'DRAFT', lastUpdated: Date.now() - 7200000 },
  { id: 'DOC-103', title: 'Speaker Agreement', committee: 'Legal', signatory: 'Legal Counsel', state: 'SIGNED', lastUpdated: Date.now() - 86400000 },
  { id: 'DOC-104', title: 'Marketing Materials', committee: 'Marketing', signatory: 'VP PR', state: 'REJECTED', rejectReason: 'MISSING_MEMO', lastUpdated: Date.now() - 1800000 },
];

export const initialBroadcasts: Broadcast[] = [
  { id: 'B-1', message: 'Legal Counsel is out of office until Thursday.', type: 'WARNING', timestamp: Date.now() - 10000000 },
  { id: 'B-2', message: 'All venue forms must use the new 2026 template.', type: 'INFO', timestamp: Date.now() - 50000000 },
];
