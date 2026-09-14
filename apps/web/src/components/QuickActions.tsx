import React from 'react';
import { Plus, Radar, AlertTriangle, RotateCcw, FileText, Zap } from 'lucide-react';

interface QuickActionsProps {
  onAddAsset?: () => void;
  onRunScan?: () => void;
  onReviewFindings?: () => void;
  onIncidentRecovery?: () => void;
  onGenerateReport?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onAddAsset,
  onRunScan,
  onReviewFindings,
  onIncidentRecovery,
  onGenerateReport
}) => {
  const actions = [
    { label: '+ Add Asset', icon: Plus, onClick: onAddAsset, color: 'hover:border-cyan-500/50 text-cyan-300' },
    { label: 'Scan Asset', icon: Radar, onClick: onRunScan, color: 'hover:border-blue-500/50 text-blue-300' },
    { label: 'Review Findings', icon: AlertTriangle, onClick: onReviewFindings, color: 'hover:border-orange-500/50 text-orange-300' },
    { label: 'Incident Recovery', icon: RotateCcw, onClick: onIncidentRecovery, color: 'hover:border-purple-500/50 text-purple-300' },
    { label: 'Generate Report', icon: FileText, onClick: onGenerateReport, color: 'hover:border-emerald-500/50 text-emerald-300' }
  ];

  return (
    <div className="soc-card p-6 rounded-2xl flex flex-col justify-between space-y-4 border border-slate-800/80">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-xs font-bold text-slate-300 tracking-wider uppercase">QUICK ACTIONS</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
          COMMANDS
        </span>
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.label}
              onClick={act.onClick}
              className={`flex items-center justify-center space-x-2 p-3 bg-[#090E19] hover:bg-slate-800/80 border border-slate-800 rounded-xl text-xs font-mono font-bold transition ${act.color}`}
            >
              <Icon className="w-4 h-4" />
              <span>{act.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
