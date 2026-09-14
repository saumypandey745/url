import React from 'react';
import { ShieldCheck, ShieldAlert, Server, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface SecurityMetricsProps {
  score?: number;
  criticalCount?: number;
  assetCount?: number;
  incidentCount?: number;
  onNavigateTab?: (tab: string) => void;
}

export const SecurityMetrics: React.FC<SecurityMetricsProps> = ({
  score = 88,
  criticalCount = 1,
  assetCount = 1,
  incidentCount = 0,
  onNavigateTab
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Security Score Metric */}
      <div
        onClick={() => onNavigateTab && onNavigateTab('dashboard')}
        className="soc-card soc-card-interactive p-4 rounded-2xl flex flex-col justify-between"
      >
        <div className="flex items-center justify-between text-slate-400 text-xs mb-2 font-mono">
          <span className="font-bold">SECURITY SCORE</span>
          <div className="p-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="my-1">
          <div className="text-3xl font-black text-white tracking-tight">{score}</div>
          <p className="text-[10px] font-mono text-slate-400">Benchmark score / 100</p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 font-mono text-[10px]">
          <span className="inline-flex items-center space-x-0.5 text-emerald-400 font-bold">
            <ArrowUpRight className="w-3 h-3" />
            <span>+23 pts</span>
          </span>
          <span className="text-emerald-400 font-bold">RATING: GOOD</span>
        </div>
      </div>

      {/* 2. Critical Findings Metric */}
      <div
        onClick={() => onNavigateTab && onNavigateTab('findings')}
        className="soc-card soc-card-interactive p-4 rounded-2xl flex flex-col justify-between"
      >
        <div className="flex items-center justify-between text-slate-400 text-xs mb-2 font-mono">
          <span className="font-bold">CRITICAL FINDINGS</span>
          <div className="p-1.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
        </div>

        <div className="my-1">
          <div className="text-3xl font-black text-red-400 tracking-tight">{criticalCount}</div>
          <p className="text-[10px] font-mono text-slate-400">Missing CSP header</p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 font-mono text-[10px]">
          <span className="inline-flex items-center space-x-0.5 text-emerald-400">
            <ArrowDownRight className="w-3 h-3" />
            <span>-2 this week</span>
          </span>
          <span className="text-red-400 font-bold">HIGH SEVERITY</span>
        </div>
      </div>

      {/* 3. Verified Assets Metric */}
      <div
        onClick={() => onNavigateTab && onNavigateTab('assets')}
        className="soc-card soc-card-interactive p-4 rounded-2xl flex flex-col justify-between"
      >
        <div className="flex items-center justify-between text-slate-400 text-xs mb-2 font-mono">
          <span className="font-bold">VERIFIED ASSETS</span>
          <div className="p-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400">
            <Server className="w-4 h-4" />
          </div>
        </div>

        <div className="my-1">
          <div className="text-3xl font-black text-white tracking-tight">{assetCount}</div>
          <p className="text-[10px] font-mono text-cyan-300">example.com</p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 font-mono text-[10px]">
          <span className="text-cyan-400">DNS VERIFIED</span>
          <span className="text-emerald-400 font-bold">AUTH SAFE</span>
        </div>
      </div>

      {/* 4. Active Incidents Metric */}
      <div
        onClick={() => onNavigateTab && onNavigateTab('incidents')}
        className="soc-card soc-card-interactive p-4 rounded-2xl flex flex-col justify-between"
      >
        <div className="flex items-center justify-between text-slate-400 text-xs mb-2 font-mono">
          <span className="font-bold">ACTIVE INCIDENTS</span>
          <div className="p-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
            <Activity className="w-4 h-4" />
          </div>
        </div>

        <div className="my-1">
          <div className="text-3xl font-black text-emerald-400 tracking-tight">{incidentCount}</div>
          <p className="text-[10px] font-mono text-slate-400">Zero active threats</p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 font-mono text-[10px]">
          <span className="text-emerald-400">BASELINE INTACT</span>
          <span className="text-emerald-400 font-bold">100% HEALTHY</span>
        </div>
      </div>
    </div>
  );
};
