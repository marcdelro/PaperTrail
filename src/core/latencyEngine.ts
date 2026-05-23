import { NodeId, HistoricalLog, WorkflowNode } from '../types/graph';

export function getAverageLatencyForNode(logs: HistoricalLog[], nodeId: NodeId): number {
  const nodeLogs = logs.filter(log => log.nodeId === nodeId);
  
  if (nodeLogs.length === 0) return 0;
  
  const totalLatency = nodeLogs.reduce((acc, log) => {
    return acc + (log.clearedAt - log.submittedAt);
  }, 0);

  return Math.floor(totalLatency / nodeLogs.length);
}

export function calculateRemainingLatency(
  graph: WorkflowNode[], 
  logs: HistoricalLog[], 
  activeNodeId: NodeId
): number {
  let remainingLatency = 0;
  let currentNode: WorkflowNode | undefined = graph.find(n => n.id === activeNodeId);
  
  while (currentNode) {
    remainingLatency += getAverageLatencyForNode(logs, currentNode.id);
    const nextId = currentNode.nextNodeId;
    currentNode = nextId ? graph.find(n => n.id === nextId) : undefined;
  }
  
  return remainingLatency;
}
