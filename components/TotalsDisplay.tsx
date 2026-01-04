import React from 'react';

interface TotalsDisplayProps {
  label: string;
  value: number;
  highlight?: boolean;
  subLabel?: string;
}

export const TotalsDisplay: React.FC<TotalsDisplayProps> = ({ label, value, highlight, subLabel }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-2 rounded-xl border ${highlight ? 'bg-teal-50 border-teal-200' : 'bg-slate-50 border-slate-100'}`}>
      <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">{label}</span>
      <span className={`text-xl sm:text-2xl font-bold ${highlight ? 'text-teal-700' : 'text-slate-800'}`}>
        {value}
      </span>
      {subLabel && <span className="text-[10px] text-slate-400">{subLabel}</span>}
    </div>
  );
};
