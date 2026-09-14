import React from 'react';
import { ShieldAlert, ArrowRight, AlertTriangle } from 'lucide-react';

interface CriticalFindingCardProps {
  finding?: any;
  onViewFinding?: () => void;
}

export const CriticalFindingCard: React.FC<CriticalFindingCardProps> = ({
  finding,
  onViewFinding
}) => {
  const title = finding?.title || 'Missing Content-Security-Policy';
  const category = finding?.category || 'Security Headers';
  const assetDomain = finding?.assetDomain || 'example.com';
  const impact = finding?.severity === 'CRITICAL' ? '-25 pts' : '-15 pts';

  return (
    <div className="soc-card p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden border border-red-500/30 bg-gradient-to-br from-red-950/20 via-[#0D1323] to-[#070A12]">
      {/* Top Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-red-500/20">
        <div className="flex items-center space-x-2 text-red-400">
          <ShieldAlert className="w-4 h-4 animate-pulse" />
          <span className="font-mono text-xs font-bold tracking-wider uppercase">CRITICAL FINDING</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/40">
          ACTION REQUIRED
        </span>
      </div>

      {/* Main Alert Info */}
      <div className="py-4 space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            01 • {category}
          </span>
          <h3 className="text-base font-extrabold text-white leading-snug">
            {title}
          </h3>
          <p className="text-xs text-slate-300 font-mono">
            Target: <span className="text-cyan-300">{assetDomain}</span>
          </p>
        </div>

        {/* Score Deduction Pill */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-mono font-bold">
          <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
          <span>Score Impact: {impact}</span>
        </div>
      </div>

      {/* Footer Action */}
      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-400">Severity: High/Critical</span>
        <button
          onClick={onViewFinding}
          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 rounded-xl text-xs font-bold transition group"
        >
          <span>View Finding</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
