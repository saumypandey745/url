import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, FileText, ChevronRight, CheckCircle2, Lock, Sparkles, Terminal, Code, Info } from 'lucide-react';

interface FindingsViewProps {
  findings: any[];
}

export const FindingsView: React.FC<FindingsViewProps> = ({ findings }) => {
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const filteredFindings = findings.filter((f) => {
    if (selectedFilter === 'ALL') return true;
    return f.severity === selectedFilter;
  });

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'CRITICAL':
        return <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/40 glow-danger">CRITICAL</span>;
      case 'HIGH':
        return <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40">HIGH</span>;
      case 'MEDIUM':
        return <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">MEDIUM</span>;
      default:
        return <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-blue-500/20 text-cyan-400 border border-blue-500/40">LOW</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-blue-500/20">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI-POWERED VULNERABILITY & EXPOSURE MANAGER</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Vulnerability Findings & Technical Evidence</h2>
          <p className="text-xs text-gray-400 mt-1">Authoritative HTTP scanner benchmarks, AI explanations, and safe conceptual attack vectors</p>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex items-center space-x-1.5 bg-[#070A12] p-1.5 rounded-xl border border-gray-800 text-xs font-mono">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedFilter === filter
                  ? 'bg-blue-600/30 border border-blue-500/50 text-cyan-300 font-bold'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Findings List */}
      <div className="space-y-4">
        {filteredFindings.length === 0 ? (
          <div className="glass-panel p-12 rounded-2xl border border-blue-900/20 text-center text-gray-400 text-xs">
            No open findings match the selected severity filter.
          </div>
        ) : (
          filteredFindings.map((f) => (
            <div key={f.id} className="glass-panel glass-panel-hover border border-blue-900/30 rounded-2xl p-6 space-y-5">
              {/* Finding Title & Badges */}
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-3">
                    {getSeverityBadge(f.severity)}
                    <h3 className="text-base font-bold text-white">{f.title}</h3>
                  </div>
                  <div className="flex items-center space-x-3 text-xs font-mono text-gray-400">
                    <span>Category: <strong className="text-cyan-300">[{f.category}]</strong></span>
                    <span>•</span>
                    <span>Finding ID: <strong className="text-gray-300">{f.id}</strong></span>
                  </div>
                </div>

                <div className="text-right font-mono text-xs">
                  <span className="text-red-400 font-bold">Deduction: -{f.severity === 'CRITICAL' ? 25 : f.severity === 'HIGH' ? 15 : 8} Pts</span>
                  <p className="text-[10px] text-gray-400">Status: OPEN</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-300 bg-[#070A12] p-4 rounded-xl border border-gray-800/80 leading-relaxed font-sans">
                <strong className="text-white font-mono text-[11px] block mb-1">DETECTION SUMMARY:</strong>
                {f.description}
              </p>

              {/* Technical Evidence Code Box */}
              <div className="bg-[#050810] p-4 rounded-xl border border-blue-900/40 font-mono text-[11px] space-y-2">
                <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-xs border-b border-gray-800 pb-2">
                  <Terminal className="w-4 h-4" />
                  <span>AUTHORITATIVE SCAN EVIDENCE (REDACTED)</span>
                </div>
                <pre className="text-gray-300 whitespace-pre-wrap overflow-x-auto pt-1">{JSON.stringify(f.evidence, null, 2)}</pre>
              </div>

              {/* AI Security Analyst Breakdown */}
              {f.aiAnalysis && (
                <div className="bg-gradient-to-br from-blue-950/30 via-[#0B1324] to-cyan-950/20 border border-blue-500/30 p-5 rounded-xl space-y-4 shadow-xl">
                  <div className="flex items-center space-x-2 text-cyan-300 text-xs font-mono font-bold">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>AI SECURITY ANALYST RISK INSIGHT</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-300">
                    <div className="bg-[#070A12]/60 p-3.5 rounded-xl border border-blue-900/30 space-y-1">
                      <span className="text-cyan-400 font-mono text-[11px] font-semibold block">WHY IT MATTERS</span>
                      <p>{f.aiAnalysis.whyItMatters}</p>
                    </div>

                    <div className="bg-[#070A12]/60 p-3.5 rounded-xl border border-blue-900/30 space-y-1">
                      <span className="text-cyan-400 font-mono text-[11px] font-semibold block">RECOMMENDED REMEDIATION</span>
                      <p className="font-mono text-[11px] text-emerald-300">{f.remediation}</p>
                    </div>
                  </div>

                  {/* Safe Conceptual Attack Scenario */}
                  {f.aiAnalysis.attackScenario && (
                    <div className="bg-[#070A12] p-4 rounded-xl border border-amber-500/30 space-y-2">
                      <div className="text-amber-400 font-mono font-bold text-xs flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span>SAFE CONCEPTUAL ATTACK SCENARIO (NON-DESTRUCTIVE)</span>
                      </div>
                      <div className="text-xs text-gray-300 space-y-1 font-mono">
                        <p><strong className="text-gray-400">Attacker Goal:</strong> {f.aiAnalysis.attackScenario.attackerGoal}</p>
                        <p><strong className="text-gray-400">Potential Impact:</strong> {f.aiAnalysis.attackScenario.potentialImpact}</p>
                        <p><strong className="text-gray-400">Verification Steps:</strong> {f.aiAnalysis.attackScenario.verification}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
