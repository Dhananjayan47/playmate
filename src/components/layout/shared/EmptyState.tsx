import React from 'react';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  onReset: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white border border-slate-200 rounded-2xl shadow-sm">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">No grounds found</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">
        We couldn't find any venues matching your current search criteria. Try adjusting your filters or search keywords.
      </p>
      <button
        onClick={onReset}
        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition"
      >
        Reset Filters
      </button>
    </div>
  );
};