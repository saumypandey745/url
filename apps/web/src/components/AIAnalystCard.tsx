import React from 'react';
import { Sparkles, ArrowRight, Bot } from 'lucide-react';

interface AIAnalystCardProps {
  onViewAnalysis?: () => void;
  isLlmActive?: boolean;
}

export const AIAnalystCard: React.FC<AIAnalystCardProps> = ({
  onViewAnalysis,
  isLlmActive = false
}) => {
  return (
    <div className="soc-card p-6 rounded-2xl flex flex-col justify-between space-y-4 border border-purple-500/30 bg-gradient-to-br from-purple-950/15 via-[#0D1222] to-[#070A12]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
        <div className="flex items-center space-x-2 text-purple-300">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="font-mono text-xs font-bold tracking-wider uppercase">AI SECURITY ANALYST</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
          {isLlmActive ? 'LLM CONTEXT ENABLED' : 'RULE ENGINE ACTIVE'}
        </span>
      </div>

      {/* Insight Text */}
      <div className="py-2 space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
        <p className="font-medium text-slate-200">
          Security posture is good, but one critical header configuration is reducing the overall score benchmark.
        </p>

        <div className="p-3 bg-[#080B15] rounded-xl border border-purple-500/30 text-purple-300 font-mono text-[11px] space-y-1">
          <span className="text-slate-400 font-bold block text-[10px] uppercase">Recommended Priority Action:</span>
          <p className="text-emerald-300 font-semibold">Implement a strict Content-Security-Policy header.</p>
        </div>
      </div>

      {/* Footer Action */}
      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between font-mono text-[11px]">
        <span className="text-slate-400">Analysis Type: {isLlmActive ? 'Generative LLM' : 'Deterministic Rule Engine'}</span>
        <button
          onClick={onViewAnalysis}
          className="inline-flex items-center space-x-1 px-3.5 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 rounded-xl text-xs font-bold transition group"
        >
          <span>View Analysis</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
