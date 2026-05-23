import React from 'react';
import { NodeStatus, WorkflowNode } from '../types/graph';

interface NodeCardProps {
  node: WorkflowNode;
  status: NodeStatus;
  isLast: boolean;
}

export const NodeCard: React.FC<NodeCardProps> = ({ node, status, isLast }) => {
  let cardStyles = '';
  let iconStyles = '';
  let edgeStyles = '';
  let Icon = null;

  switch (status) {
    case 'COMPLETED':
      cardStyles = 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm';
      iconStyles = 'text-emerald-600';
      edgeStyles = 'bg-emerald-500';
      Icon = () => (
        <svg className={`w-6 h-6 ${iconStyles}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
      break;
    case 'ACTIVE':
      cardStyles = 'bg-amber-50 border-amber-500 text-amber-900 shadow-lg scale-105 z-10 ring-4 ring-amber-100 transition-transform';
      iconStyles = 'animate-pulse text-amber-600';
      edgeStyles = 'bg-slate-200';
      Icon = () => (
        <svg className={`w-6 h-6 ${iconStyles}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      break;
    case 'LOCKED':
      cardStyles = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60 grayscale';
      iconStyles = 'text-slate-300';
      edgeStyles = 'bg-slate-200';
      Icon = () => (
        <svg className={`w-6 h-6 ${iconStyles}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      );
      break;
    case 'REJECTED':
      cardStyles = 'bg-red-50 border-red-500 text-red-900 shadow-lg scale-105 z-20 ring-4 ring-red-200 animate-pulse';
      iconStyles = 'text-red-600';
      edgeStyles = 'bg-slate-200';
      Icon = () => (
        <svg className={`w-6 h-6 ${iconStyles}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
      break;
  }

  return (
    <div className="flex-1 relative flex flex-col items-center group">
      {/* Edge Connector (hidden on the terminal node) */}
      {!isLast && (
        <div 
          className={`hidden md:block absolute top-1/2 left-[50%] w-full h-1 -translate-y-1/2 -z-10 transition-colors duration-500 ${edgeStyles}`} 
        />
      )}
      
      {/* Node Card */}
      <div className={`relative w-full max-w-[200px] p-4 rounded-xl border-2 flex flex-col items-center text-center gap-2 transition-all duration-300 ${cardStyles}`}>
        <div className="p-2 rounded-full bg-white bg-opacity-50">
          <Icon />
        </div>
        <h3 className="font-bold text-sm">{node.name}</h3>
        <span className="text-xs font-medium uppercase tracking-wider">{status}</span>
      </div>
    </div>
  );
};
