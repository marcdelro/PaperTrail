import React from 'react';
import { Broadcast } from '../types/document';

export const BroadcastSidebar: React.FC<{ broadcasts: Broadcast[] }> = ({ broadcasts }) => {
  return (
    <div className="w-80 bg-white border-l border-slate-200 h-screen flex flex-col hidden lg:flex">
      <div className="p-6 border-b border-slate-200 bg-slate-50">
        <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
          Committee Feeds
        </h2>
        <p className="text-xs text-slate-500 mt-1">Read-only global logistics updates.</p>
      </div>
      <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3">
        {broadcasts.map(b => (
          <div key={b.id} className={`p-4 rounded-xl border ${b.type === 'WARNING' ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2 mb-2">
              {b.type === 'WARNING' ? (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              ) : (
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              )}
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {b.type}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-800">{b.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
