import React from 'react';
import { ShieldAlert, ChevronRight } from 'lucide-react';

interface AttackSurfaceSummaryProps {
  onViewAttackSurface?: () => void;
}

export const AttackSurfaceSummary: React.FC<AttackSurfaceSummaryProps> = ({
  onViewAttackSurface
}) => {
  const items = [
    { label: 'Assets', count: 1, max: 5, color: 'bg-cyan-400' },
    { label: 'Endpoints', count: 24, max: 30, color: 'bg-blue-400' },
    { label: 'External APIs', count: 7, max: 15, color: 'bg-purple-400' },
    { label: 'Exposed Services', count: 2, max: 10, color: 'bg-amber-400' },
    { label: 'Third-party libs', count: 13, max: 20, color: 'bg-emerald-400' }
  ];

  return (
    <div className="soc-card p-6 rounded-2xl flex flex-col justify-between space-y-4 border border-slate-800/80">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-xs font-bold text-slate-300 tracking-wider uppercase">ATTACK SURFACE</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
          MONITORED
        </span>
      </div>

      {/* Attack Surface List with Stat Bars */}
      <div className="space-y-3 font-mono text-xs">
        {items.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-slate-300">
              <span>{item.label}</span>
              <span className="font-bold text-white">{item.count}</span>
            </div>
            <div className="h-1.5 w-full bg-[#090E19] rounded-full overflow-hidden border border-slate-800">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${Math.min((item.count / item.max) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Action */}
      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
        <span className="text-[10px] font-mono text-slate-400">Total Surface Monitored</span>
        <button
          onClick={onViewAttackSurface}
          className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-xl text-xs font-bold transition"
        >
          <span>View Map</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
