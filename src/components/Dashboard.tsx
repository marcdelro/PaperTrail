import React, { useState } from 'react';
import { DocumentCard } from './DocumentCard';
import { TrackingCard, DocState, RejectReasonCode } from '../types/document';
import { initialDocuments, initialBroadcasts } from '../data/mockDatabase';

export const Dashboard: React.FC = () => {
  const [documents, setDocuments] = useState<TrackingCard[]>(initialDocuments);
  const [simulatedDoc, setSimulatedDoc] = useState<string>('DOC-101');
  const [activeTab, setActiveTab] = useState<'QUEUE' | 'CLEARED' | 'ALERTS' | 'FEEDS'>('QUEUE');

  const simulateAction = (id: string, newState: DocState, reason?: RejectReasonCode) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, state: newState, rejectReason: reason, lastUpdated: Date.now() } : doc
    ));
    // Auto-switch tabs to show the action to the judges
    if (newState === 'REJECTED') setActiveTab('ALERTS');
    if (newState === 'SIGNED') setActiveTab('CLEARED');
    if (newState === 'PENDING' || newState === 'DRAFT') setActiveTab('QUEUE');
  };

  // Derived state for badges
  const alertsCount = documents.filter(d => d.state === 'REJECTED').length;

  const renderMobileContent = () => {
    switch (activeTab) {
      case 'QUEUE':
        return (
          <div className="flex flex-col gap-3 p-4">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Active Queue</h2>
            {documents.filter(d => d.state === 'DRAFT' || d.state === 'PENDING').map(doc => <DocumentCard key={doc.id} doc={doc} onSimulateAction={simulateAction} />)}
            {documents.filter(d => d.state === 'DRAFT' || d.state === 'PENDING').length === 0 && (
                <p className="text-slate-400 text-center text-xs font-semibold py-8 border-2 border-dashed border-slate-200 rounded-xl">Queue is empty</p>
            )}
          </div>
        );
      case 'CLEARED':
        return (
          <div className="flex flex-col gap-3 p-4">
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-2">Signed & Cleared</h2>
            {documents.filter(d => d.state === 'SIGNED').map(doc => <DocumentCard key={doc.id} doc={doc} onSimulateAction={simulateAction} />)}
            {documents.filter(d => d.state === 'SIGNED').length === 0 && (
                <p className="text-slate-400 text-center text-xs font-semibold py-8 border-2 border-dashed border-slate-200 rounded-xl">No cleared documents</p>
            )}
          </div>
        );
      case 'ALERTS':
        return (
          <div className="flex flex-col gap-3 p-4">
             <h2 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-2">Action Required</h2>
             {documents.filter(d => d.state === 'REJECTED').map(doc => <DocumentCard key={doc.id} doc={doc} onSimulateAction={simulateAction} />)}
             {alertsCount === 0 && (
                <p className="text-slate-400 text-center text-xs font-semibold py-8 border-2 border-dashed border-slate-200 rounded-xl">You're all caught up!</p>
             )}
          </div>
        );
      case 'FEEDS':
        return (
          <div className="flex flex-col gap-3 p-4">
             <h2 className="text-sm font-bold text-indigo-500 uppercase tracking-wider mb-2">Committee Feeds</h2>
             {initialBroadcasts.map(b => (
               <div key={b.id} className={`p-4 rounded-xl border ${b.type === 'WARNING' ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'}`}>
                 <div className="flex items-center gap-2 mb-2">
                   {b.type === 'WARNING' ? (
                     <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                   ) : (
                     <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                   )}
                   <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                     {b.type}
                   </span>
                 </div>
                 <p className="text-sm font-medium text-slate-800 leading-snug">{b.message}</p>
               </div>
             ))}
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center h-screen bg-slate-900 relative overflow-y-auto">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900 to-slate-900"></div>
      
      <div className="relative w-[380px] h-[800px] bg-black rounded-[55px] shadow-2xl p-3 shrink-0 ring-[1px] ring-slate-800 shadow-indigo-500/10">
        
        {/* Hardware Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-3xl z-40"></div> {/* Dynamic Island */}
        
        {/* iOS Screen Context */}
        <div className="w-full h-full bg-slate-50 rounded-[45px] overflow-hidden flex flex-col relative">
          
          {/* Mobile Status Bar Simulation */}
          <div className="bg-indigo-900 h-12 w-full shrink-0 flex justify-end items-center px-6 gap-1.5 z-30">
             <div className="w-4 h-2.5 bg-white rounded-sm opacity-90"></div>
             <div className="w-4 h-2.5 bg-white rounded-sm opacity-90"></div>
          </div>

          {/* Mobile Header */}
          <div className="bg-indigo-900 pt-2 pb-6 px-6 shadow-sm shrink-0">
            <h2 className="text-white font-black text-2xl tracking-tight">PaperTrail</h2>
          </div>

          {/* Mobile Content Scroll Area */}
          <div className="flex-1 overflow-y-auto pb-[90px] bg-slate-50 scroll-smooth">
             {renderMobileContent()}
          </div>

          {/* iOS Bottom Tab Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200/60 pb-[34px] pt-4 px-6 flex justify-between items-center z-20">
            <button onClick={() => setActiveTab('QUEUE')} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'QUEUE' ? 'text-indigo-600' : 'text-slate-400'}`}>
              <svg className="w-[22px] h-[22px]" fill={activeTab === 'QUEUE' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'QUEUE' ? 0 : 2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              <span className="text-[10px] font-bold tracking-tight">Queue</span>
            </button>
            
            <button onClick={() => setActiveTab('CLEARED')} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'CLEARED' ? 'text-emerald-600' : 'text-slate-400'}`}>
              <svg className="w-[22px] h-[22px]" fill={activeTab === 'CLEARED' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'CLEARED' ? 0 : 2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-[10px] font-bold tracking-tight">Cleared</span>
            </button>
            
            <button onClick={() => setActiveTab('ALERTS')} className={`relative flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'ALERTS' ? 'text-red-600' : 'text-slate-400'}`}>
              {alertsCount > 0 && <span className="absolute -top-1 right-2 w-4 h-4 bg-red-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full ring-2 ring-white">{alertsCount}</span>}
              <svg className="w-[22px] h-[22px]" fill={activeTab === 'ALERTS' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'ALERTS' ? 0 : 2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span className="text-[10px] font-bold tracking-tight">Alerts</span>
            </button>
            
            <button onClick={() => setActiveTab('FEEDS')} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'FEEDS' ? 'text-indigo-600' : 'text-slate-400'}`}>
              <svg className="w-[22px] h-[22px]" fill={activeTab === 'FEEDS' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'FEEDS' ? 0 : 2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
              <span className="text-[10px] font-bold tracking-tight">Feeds</span>
            </button>
          </div>
          
          {/* iOS Home Indicator */}
          <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-900 rounded-full z-30"></div>
        </div>
      </div>
    </div>
  );
};
