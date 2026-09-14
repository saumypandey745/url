import React, { useState } from 'react';
import { RotateCcw, CheckCircle2, ShieldCheck, AlertCircle, Lock, ArrowRight, ShieldAlert, FileText, Check } from 'lucide-react';

export const RecoveryView: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const recoverySteps = [
    { id: 1, title: 'Verify Ownership & Authorization', desc: 'Confirm DNS TXT or file verification token before initiating recovery workflow.' },
    { id: 2, title: 'Create Recovery Snapshot', desc: 'Generate immutable state backup of database, storage, and configuration.' },
    { id: 3, title: 'Identify Affected Components', desc: 'Analyze scan findings to pinpoint compromised scripts, endpoints, or headers.' },
    { id: 4, title: 'Revoke Active Sessions & Tokens', desc: 'Invalidate all existing user JWTs and session cookies across application.' },
    { id: 5, title: 'Rotate API Keys & Secrets', desc: 'Rotate database credentials, OAuth secrets, SMTP tokens, and cloud keys.' },
    { id: 6, title: 'Review Administrative Accounts', desc: 'Audit user roles to remove unauthorized admin accounts or privilege escalations.' },
    { id: 7, title: 'Restore Known-Clean Backup', desc: 'Deploy known-clean git baseline release or database snapshot.' },
    { id: 8, title: 'Remove Unauthorized Changes', desc: 'Purge injected scripts, backdoor files, or unapproved webhooks.' },
    { id: 9, title: 'Apply Security Patches', desc: 'Upgrade vulnerable dependencies and update framework libraries.' },
    { id: 10, title: 'Reconfigure Security Controls', desc: 'Apply strict CSP, HSTS, SameSite cookies, and CORS origin allowlists.' },
    { id: 11, title: 'Trigger Verification Rescan', desc: 'Execute automated security scanner to verify resolution of all findings.' },
    { id: 12, title: 'Verify Recovery State', desc: 'Validate application functionality, TLS validity, and security score improvement.' },
    { id: 13, title: 'Generate Incident Report', desc: 'Export executive PDF report with timeline, containment steps, and audit log.' }
  ];

  const markCompletedAndNext = () => {
    if (!completedSteps.includes(activeStep)) {
      setCompletedSteps([...completedSteps, activeStep]);
    }
    if (activeStep < 13) {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-blue-500/20">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-1">
            <RotateCcw className="w-4 h-4 animate-spin" style={{ animationDuration: '12s' }} />
            <span>AUTHORIZED INCIDENT RESPONSE & CONTAINMENT</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">13-Step Guided Website Recovery Assistant</h2>
          <p className="text-xs text-gray-400 mt-1">Step-by-step remediation, token revocation, snapshotting, and rescan verification</p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="px-3.5 py-1.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-mono font-bold">
            STEP {activeStep} OF 13 IN PROGRESS
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step Progress Sidebar */}
        <div className="glass-panel rounded-2xl border border-blue-900/30 p-4 space-y-2 max-h-[640px] overflow-y-auto">
          <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 font-semibold px-2 py-1">
            RECOVERY STEPS PROGRESS
          </div>
          {recoverySteps.map((s) => {
            const isDone = completedSteps.includes(s.id);
            const isCurrent = s.id === activeStep;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStep(s.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-r from-blue-600/30 to-cyan-500/10 border-blue-500/60 text-white font-semibold shadow-lg shadow-blue-500/10'
                    : isDone
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-[#070A12] border-gray-800 text-gray-400 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                    isDone ? 'bg-emerald-500 text-black' : isCurrent ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'
                  }`}>
                    {s.id}
                  </span>
                  <span className="truncate max-w-[170px]">{s.title}</span>
                </div>
                {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Step Action Console */}
        <div className="lg:col-span-2 glass-panel rounded-2xl border border-blue-900/30 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono">
              <ShieldAlert className="w-4 h-4" />
              <span>STEP {activeStep} OPERATIONAL GUIDANCE</span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">{recoverySteps[activeStep - 1].title}</h3>

            <div className="bg-[#070A12] p-5 rounded-xl border border-gray-800 space-y-3 leading-relaxed text-xs text-gray-300">
              <span className="text-cyan-400 font-mono text-[11px] font-semibold block">ACTION DESCRIPTION:</span>
              <p>{recoverySteps[activeStep - 1].desc}</p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl text-amber-300 text-xs flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
              <div>
                <strong className="block font-mono text-amber-400 mb-0.5">EXPLICIT ADMIN AUTHORIZATION ENFORCED:</strong>
                <span>Every destructive recovery action logs an append-only audit event and requires explicit ownership verification.</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-5 border-t border-gray-800/80">
            <button
              disabled={activeStep === 1}
              onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-40 text-gray-300 rounded-xl text-xs font-semibold"
            >
              Previous Step
            </button>

            <button
              onClick={markCompletedAndNext}
              className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-blue-600/20"
            >
              <span>{activeStep === 13 ? 'Export Post-Incident Report' : 'Confirm Action & Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
