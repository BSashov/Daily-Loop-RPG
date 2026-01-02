
import React from 'react';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  colorClass?: string;
  subLabel?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, label, colorClass = "bg-indigo-500", subLabel }) => {
  return (
    <div className="w-full">
      {(label || subLabel) && (
        <div className="flex justify-between items-end mb-1.5 px-1">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
          <span className="text-[10px] text-indigo-400 font-black uppercase tracking-tighter">{subLabel}</span>
        </div>
      )}
      <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800 shadow-inner">
        <div 
          className={`h-full transition-all duration-1000 ease-out rounded-full ${colorClass}`}
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        >
            <div className="w-full h-full bg-gradient-to-b from-white/10 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
