import React, { useState } from 'react';
import { Flame, ShieldCheck, AlertCircle, Activity, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

export const IncidentsView: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [status, setStatus] = useState<'HEALTHY' | 'SUSPICIOUS' | 'COMPROMISED'>('HEALTHY');

  const triggerAssessment = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setStatus('HEALTHY');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-blue-500/20">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-1">
            <Flame className="w-4 h-4" />
            <span>"IS MY WEBSITE COMPROMISED?" INTEGRITY CHECKER</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Incident Response Center & Compromise Assessment</h2>
          <p className="text-xs text-gray-400 mt-1">Non-destructive compromise indicator checks, unauthorized redirects, and backdoor signatures</p>
        </div>

        <button
          onClick={triggerAssessment}
          disabled={analyzing}
          className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-blue-600/20"
        >
          <RefreshCw className={`w-4 h-4 ${analyzing ? 'animate-spin' : ''}`} />
          <span>{analyzing ? 'Running Integrity Assessment...' : 'Run Compromise Check'}</span>
        </button>
      </div>

      {/* Compromise Status Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-emerald-500/15 text-emerald-400 rounded-2xl border border-emerald-500/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-white">COMPROMISE POSTURE:</span>
              <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 glow-emerald">
                {status}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Zero backdoor signatures, unexpected administrative accounts, or unauthorized external redirects detected.</p>
          </div>
        </div>
      </div>

      {/* Incident Timeline */}
      <div className="glass-panel p-6 rounded-2xl border border-blue-900/30 space-y-4">
        <h3 className="text-base font-bold text-white">Incident Activity Log & Timeline</h3>
        <div className="space-y-3 font-mono text-xs">
          <div className="p-3.5 bg-[#070A12] rounded-xl border border-gray-800 flex justify-between items-center text-gray-300">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Automated Compromise Assessment Completed — Asset: example.com</span>
            </div>
            <span className="text-gray-500 text-[10px]">{new Date().toLocaleTimeString()}</span>
          </div>

          <div className="p-3.5 bg-[#070A12] rounded-xl border border-gray-800 flex justify-between items-center text-gray-300">
            <div className="flex items-center space-x-3">
              <Activity className="w-4 h-4 text-blue-400" />
              <span>Baseline System Integrity Sync Complete</span>
            </div>
            <span className="text-gray-500 text-[10px]">10 mins ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};
