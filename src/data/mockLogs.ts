import { HistoricalLog, WorkflowNode } from '../types/graph';

// Mock static graph definition
export const mockGraph: WorkflowNode[] = [
  { id: 'NODE_ADVISER', name: 'Faculty Adviser', nextNodeId: 'NODE_DEAN' },
  { id: 'NODE_DEAN', name: 'College Dean', nextNodeId: 'NODE_SAO' },
  { id: 'NODE_SAO', name: 'Student Affairs Office', nextNodeId: 'NODE_FACILITIES' },
  { id: 'NODE_FACILITIES', name: 'Facilities Management', nextNodeId: null }
];

// Seeded historical logs representing typical processing times (in milliseconds)
// Faculty Adviser: ~2 hours (7,200,000 ms)
// College Dean: ~5 hours (18,000,000 ms)
// SAO: ~1 hour (3,600,000 ms)
// Facilities: ~3 hours (10,800,000 ms)

const HOUR = 3600000;

export const mockLogs: HistoricalLog[] = [
  // Adviser Logs
  { nodeId: 'NODE_ADVISER', submittedAt: 1000000, clearedAt: 1000000 + 2 * HOUR },
  { nodeId: 'NODE_ADVISER', submittedAt: 2000000, clearedAt: 2000000 + 2.5 * HOUR },
  { nodeId: 'NODE_ADVISER', submittedAt: 3000000, clearedAt: 3000000 + 1.5 * HOUR },

  // Dean Logs
  { nodeId: 'NODE_DEAN', submittedAt: 5000000, clearedAt: 5000000 + 5 * HOUR },
  { nodeId: 'NODE_DEAN', submittedAt: 6000000, clearedAt: 6000000 + 4.5 * HOUR },
  { nodeId: 'NODE_DEAN', submittedAt: 7000000, clearedAt: 7000000 + 5.5 * HOUR },

  // SAO Logs
  { nodeId: 'NODE_SAO', submittedAt: 8000000, clearedAt: 8000000 + 1 * HOUR },
  { nodeId: 'NODE_SAO', submittedAt: 9000000, clearedAt: 9000000 + 1.2 * HOUR },

  // Facilities Logs
  { nodeId: 'NODE_FACILITIES', submittedAt: 10000000, clearedAt: 10000000 + 3 * HOUR },
  { nodeId: 'NODE_FACILITIES', submittedAt: 11000000, clearedAt: 11000000 + 2.8 * HOUR }
];
