export type NodeId = 'NODE_ADVISER' | 'NODE_DEAN' | 'NODE_SAO' | 'NODE_FACILITIES';

export type NodeStatus = 'COMPLETED' | 'ACTIVE' | 'LOCKED' | 'REJECTED';

export interface WorkflowNode {
  id: NodeId;
  name: string;
  nextNodeId: NodeId | null; // null indicates the terminal node in the DAG
}

export interface HistoricalLog {
  nodeId: NodeId;
  submittedAt: number; // Unix timestamp (ms)
  clearedAt: number;   // Unix timestamp (ms)
}

export interface DocumentState {
  documentId: string;
  currentNodeId: NodeId;
  startTime: number;
}
