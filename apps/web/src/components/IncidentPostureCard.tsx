import React from 'react';
import { Activity, CheckCircle2, ShieldAlert, ChevronRight } from 'lucide-react';

interface IncidentPostureCardProps {
  incidentCount?: number;
  onViewIncidents?: () => void;
}

export const IncidentPostureCard: React.FC<IncidentPostureCardProps> = ({
  incidentCount = 0,
  onViewIncidents
}) => {
  const isHealthy = incidentCount === 0;

  return (
    <div className={`soc-card p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden border ${
      isHealthy ? 'border-slate-800/80' : 'border-red-500/40 bg-red-950/10'
    }`}>
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
        <div className="flex items-center space-x-2">
          <Activity className={`w-4 h-4 ${isHealthy ? 'text-emerald-400' : 'text-red-400 animate-pulse'}`} />
          <span className="font-mono text-xs font-bold text-slate-300 tracking-wider uppercase">INCIDENT POSTURE</span>
        </div>
        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
          isHealthy
            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
            : 'bg-red-500/20 text-red-300 border-red-500/40'
        }`}>
          {isHealthy ? 'SYSTEM CLEAN' : 'INCIDENT ACTIVE'}
        </span>
      </div>

      {/* Hero Visual Icon & State */}
      <div className="py-5 flex flex-col items-center justify-center text-center space-y-2">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center border ${
          isHealthy
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            : 'bg-red-500/20 border-red-500/40 text-red-400'
        }`}>
          {isHealthy ? (
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          ) : (
            <ShieldAlert className="w-8 h-8 text-red-400 animate-bounce" />
          )}
        </div>

        <div>
          <h3 className={`text-xl font-black font-mono uppercase tracking-wider ${
            isHealthy ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {isHealthy ? 'HEALTHY' : 'ATTENTION REQUIRED'}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            {isHealthy ? 'No active incidents detected' : `${incidentCount} unresolved incident(s)`}
          </p>
        </div>
      </div>

      {/* Footer Baseline Integrity Bar */}
      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between font-mono text-[11px]">
        <div className="flex items-center space-x-1.5 text-slate-400">
          <span>Baseline:</span>
          <span className="text-emerald-400 font-bold">100% intact</span>
        </div>
        <button
          onClick={onViewIncidents}
          className="inline-flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition"
        >
          <span>Incident Center</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
