import React from 'react';
import { ShieldCheck, TrendingUp, AlertTriangle } from 'lucide-react';

interface SecurityScoreCardProps {
  score?: number;
  trend?: string;
  previousScore?: number;
  statusLabel?: string;
  severityCounts?: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export const SecurityScoreCard: React.FC<SecurityScoreCardProps> = ({
  score = 88,
  trend = '+23 pts from previous benchmark',
  statusLabel = 'GOOD SECURITY POSTURE',
  severityCounts = { critical: 1, high: 2, medium: 4, low: 6 }
}) => {
  // SVG Radial Gauge math
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = (val: number) => {
    if (val >= 85) return '#10B981'; // emerald
    if (val >= 70) return '#06B6D4'; // cyan
    if (val >= 50) return '#F59E0B'; // amber
    return '#EF4444'; // red
  };

  const ringColor = getScoreColor(score);

  return (
    <div className="soc-card p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden border border-slate-800/80">
      {/* Top Header Row */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-mono text-xs font-bold text-slate-300 tracking-wider">SECURITY POSTURE</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          SYSTEM HEALTHY
        </span>
      </div>

      {/* Hero Score Radial Display */}
      <div className="py-6 flex flex-col items-center justify-center text-center space-y-3">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full radial-progress-ring" viewBox="0 0 120 120">
            {/* Background Track */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#1E293B"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Progress Arc */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke={ringColor}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="radial-progress-ring-circle"
            />
          </svg>

          {/* Centered Big Score Number */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-white tracking-tighter leading-none">{score}</span>
            <span className="text-[10px] font-mono text-slate-400 mt-0.5">/ 100</span>
          </div>
        </div>

        {/* Rating & Trend Badges */}
        <div className="space-y-1">
          <h3 className="text-xs font-mono font-black tracking-widest text-emerald-400 uppercase">
            {statusLabel}
          </h3>
          <div className="flex items-center justify-center space-x-1 text-[11px] font-mono text-slate-400">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>{trend}</span>
          </div>
        </div>
      </div>

      {/* Severity Breakdown Bar */}
      <div className="pt-3 border-t border-slate-800/60 grid grid-cols-4 gap-2 text-center font-mono">
        <div className="p-2 bg-[#090E19] rounded-xl border border-red-500/20">
          <span className="block text-[10px] text-slate-400">Critical</span>
          <span className="text-xs font-bold text-red-400">{severityCounts.critical}</span>
        </div>
        <div className="p-2 bg-[#090E19] rounded-xl border border-orange-500/20">
          <span className="block text-[10px] text-slate-400">High</span>
          <span className="text-xs font-bold text-orange-400">{severityCounts.high}</span>
        </div>
        <div className="p-2 bg-[#090E19] rounded-xl border border-amber-500/20">
          <span className="block text-[10px] text-slate-400">Medium</span>
          <span className="text-xs font-bold text-amber-400">{severityCounts.medium}</span>
        </div>
        <div className="p-2 bg-[#090E19] rounded-xl border border-blue-500/20">
          <span className="block text-[10px] text-slate-400">Low</span>
          <span className="text-xs font-bold text-blue-400">{severityCounts.low}</span>
        </div>
      </div>
    </div>
  );
};
