import React, { useState } from 'react';
import { RotateCcw, CheckCircle2, ShieldCheck, AlertCircle, Lock, ArrowRight } from 'lucide-react';

export const RecoveryView: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

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

  return (
    <div className="space-y-6">
      <div className="bg-[#111827] p-5 rounded-xl border border-[#1F2937] flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">13-Step Guided Incident Recovery Assistant</h2>
          <p className="text-xs text-gray-400">Authorized step-by-step remediation, containment, and recovery workflow</p>
        </div>
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-mono">
          STEP {activeStep} OF 13
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step List */}
        <div className="bg-[#111827] rounded-xl border border-[#1F2937] p-4 space-y-2 max-h-[600px] overflow-y-auto">
          {recoverySteps.map((s) => {
            const isDone = s.id < activeStep;
            const isCurrent = s.id === activeStep;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStep(s.id)}
                className={`w-full text-left p-3 rounded-lg border text-xs flex items-center justify-between transition ${
                  isCurrent
                    ? 'bg-blue-600/20 border-blue-500 text-white font-semibold'
                    : isDone
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-[#0B0F19] border-[#1F2937] text-gray-400 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isDone ? 'bg-emerald-500 text-black' : isCurrent ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'
                  }`}>
                    {s.id}
                  </span>
                  <span className="truncate">{s.title}</span>
                </div>
                {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-2 bg-[#111827] rounded-xl border border-[#1F2937] p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-blue-400 text-xs font-mono">
              <RotateCcw className="w-4 h-4" />
              <span>STEP {activeStep} GUIDANCE</span>
            </div>

            <h3 className="text-lg font-bold text-white">{recoverySteps[activeStep - 1].title}</h3>
            <p className="text-xs text-gray-300 bg-[#0B0F19] p-4 rounded border border-[#1F2937] leading-relaxed">
              {recoverySteps[activeStep - 1].desc}
            </p>

            <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded text-amber-400 text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>All recovery actions log append-only events and require explicit admin verification.</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[#1F2937]">
            <button
              disabled={activeStep === 1}
              onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-gray-300 rounded text-xs"
            >
              Previous Step
            </button>
            <button
              onClick={() => setActiveStep((prev) => Math.min(13, prev + 1))}
              className="flex items-center space-x-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold"
            >
              <span>{activeStep === 13 ? 'Finish & Export Report' : 'Execute & Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
