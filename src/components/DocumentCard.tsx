import React from 'react';
import { TrackingCard, DocState, RejectReasonCode } from '../types/document';

interface DocumentCardProps {
  doc: TrackingCard;
  onSimulateAction?: (id: string, newState: DocState, reason?: RejectReasonCode) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ doc, onSimulateAction }) => {
  const isRejected = doc.state === 'REJECTED';
  const isSigned = doc.state === 'SIGNED';
  const isPending = doc.state === 'PENDING';
  const isDraft = doc.state === 'DRAFT';
  
  let borderStyle = 'border-slate-200';
  if (isRejected) borderStyle = 'border-red-500 bg-red-50';
  else if (isSigned) borderStyle = 'border-emerald-500 bg-emerald-50';
  else if (isPending) borderStyle = 'border-amber-400 bg-amber-50';

  return (
    <div className={`p-4 rounded-xl border ${borderStyle} shadow-sm mb-3 flex flex-col gap-2 transition-all hover:shadow-md`}>
      <div className="flex justify-between items-start">
        <span className="text-xs font-mono font-bold text-slate-500">{doc.id}</span>
        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full ${
          isRejected ? 'bg-red-200 text-red-800' :
          isSigned ? 'bg-emerald-200 text-emerald-800' :
          isPending ? 'bg-amber-200 text-amber-800' : 'bg-slate-200 text-slate-700'
        }`}>
          {doc.state}
        </span>
      </div>
      <h3 className="font-bold text-sm text-slate-900 leading-tight">{doc.title}</h3>
      <div className="flex items-center gap-1 text-xs text-slate-600 mt-1">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span>{doc.signatory} ({doc.committee})</span>
      </div>
      
      {isRejected && (
        <div className="mt-2 p-2 bg-red-100 rounded-lg border border-red-200">
          <p className="text-xs font-bold text-red-900 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Reason: {doc.rejectReason}
          </p>
        </div>
      )}

      {/* Simulator Action Buttons inside the card */}
      {onSimulateAction && (
        <div className="mt-3 pt-3 border-t border-slate-200/50 flex flex-wrap gap-2">
          {isDraft && (
            <button onClick={() => onSimulateAction(doc.id, 'PENDING')} className="flex-1 bg-amber-100 hover:bg-amber-200 transition-colors text-amber-800 text-[10px] font-bold py-1.5 rounded uppercase">
              Send to Review
            </button>
          )}
          {isPending && (
            <>
              <button onClick={() => onSimulateAction(doc.id, 'SIGNED')} className="flex-1 bg-emerald-100 hover:bg-emerald-200 transition-colors text-emerald-800 text-[10px] font-bold py-1.5 rounded uppercase">Approve</button>
              <button onClick={() => onSimulateAction(doc.id, 'REJECTED', 'MISSING_MEMO')} className="flex-1 bg-red-100 hover:bg-red-200 transition-colors text-red-800 text-[10px] font-bold py-1.5 rounded uppercase">Reject</button>
            </>
          )}
          {(isSigned || isRejected) && (
            <button onClick={() => onSimulateAction(doc.id, 'DRAFT')} className="flex-1 bg-slate-200 hover:bg-slate-300 transition-colors text-slate-700 text-[10px] font-bold py-1.5 rounded uppercase">
              Reset to Draft
            </button>
          )}
        </div>
      )}
    </div>
  );
};
