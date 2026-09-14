import React from 'react';
import { AlertTriangle, ShieldCheck, FileText, ChevronRight, CheckCircle2, Lock } from 'lucide-react';

interface FindingsViewProps {
  findings: any[];
}

export const FindingsView: React.FC<FindingsViewProps> = ({ findings }) => {
  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'CRITICAL':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/40">CRITICAL</span>;
      case 'HIGH':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40">HIGH</span>;
      case 'MEDIUM':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">MEDIUM</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/40">LOW</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#111827] p-5 rounded-xl border border-[#1F2937]">
        <h2 className="text-xl font-bold text-white">Vulnerability Findings & AI Risk Analyst</h2>
        <p className="text-xs text-gray-400">Technical evidence, conceptual non-destructive attack scenarios, and remediation guides</p>
      </div>

      <div className="space-y-4">
        {findings.length === 0 ? (
          <div className="bg-[#111827] p-8 rounded-xl border border-[#1F2937] text-center text-gray-400 text-xs">
            No open findings. Trigger a security scan to populate vulnerability items.
          </div>
        ) : (
          findings.map((f) => (
            <div key={f.id} className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 space-y-4 hover:border-gray-700 transition">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    {getSeverityBadge(f.severity)}
                    <h3 className="text-base font-bold text-white">{f.title}</h3>
                  </div>
                  <p className="text-xs text-gray-400 font-mono">Category: [{f.category}] | Affected Asset ID: {f.assetId}</p>
                </div>
                <span className="text-xs font-mono text-gray-400">Risk Score Impact: -{f.severity === 'CRITICAL' ? 25 : f.severity === 'HIGH' ? 15 : 8} pts</span>
              </div>

              <div className="text-xs text-gray-300 bg-[#0B0F19] p-3 rounded border border-[#1F2937]">
                <strong className="text-gray-200">Description:</strong> {f.description}
              </div>

              {/* Evidence Box */}
              <div className="bg-[#0B0F19] p-3 rounded border border-[#1F2937] font-mono text-[11px] space-y-1">
                <div className="text-blue-400 font-semibold text-xs mb-1">AUTHORITATIVE SCAN EVIDENCE (REDACTED):</div>
                <pre className="text-gray-300 whitespace-pre-wrap">{JSON.stringify(f.evidence, null, 2)}</pre>
              </div>

              {/* AI Security Analyst Breakdown */}
              {f.aiAnalysis && (
                <div className="bg-blue-950/20 border border-blue-900/40 p-4 rounded-lg space-y-3">
                  <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold">
                    <FileText className="w-4 h-4" />
                    <span>AI SECURITY ANALYST SUMMARY</span>
                  </div>

                  <div className="text-xs text-gray-300 space-y-2">
                    <p><strong className="text-blue-300">Why it matters:</strong> {f.aiAnalysis.whyItMatters}</p>
                    <p><strong className="text-blue-300">Potential Impact:</strong> {f.aiAnalysis.potentialImpact}</p>
                    <p><strong className="text-blue-300">Recommended Fix:</strong> {f.remediation}</p>
                  </div>

                  {/* Conceptual Attack Scenario */}
                  {f.aiAnalysis.attackScenario && (
                    <div className="bg-[#0B0F19] p-3 rounded border border-blue-900/30 text-xs space-y-1">
                      <div className="text-amber-400 font-semibold text-[11px] uppercase tracking-wider">SAFE CONCEPTUAL ATTACK SCENARIO:</div>
                      <p className="text-gray-300"><strong className="text-gray-400">Goal:</strong> {f.aiAnalysis.attackScenario.attackerGoal}</p>
                      <p className="text-gray-300"><strong className="text-gray-400">Impact:</strong> {f.aiAnalysis.attackScenario.potentialImpact}</p>
                      <p className="text-gray-300"><strong className="text-gray-400">Verification:</strong> {f.aiAnalysis.attackScenario.verification}</p>
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
