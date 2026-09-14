import React, { useState } from 'react';
import { KeyRound, ShieldCheck, RefreshCw, CheckCircle2, Lock } from 'lucide-react';

export const SecretRotationView: React.FC = () => {
  const [secrets, setSecrets] = useState([
    { id: 'sec-001', name: 'PostgreSQL Database Password', type: 'Database Credential', status: 'VERIFIED', lastRotated: '30 days ago' },
    { id: 'sec-002', name: 'JWT Auth Secret', type: 'JWT Secret Key', status: 'VERIFIED', lastRotated: '14 days ago' },
    { id: 'sec-003', name: 'AWS S3 Access Keys', type: 'Cloud Storage API Key', status: 'ROTATION_REQUIRED', lastRotated: '90 days ago' }
  ]);

  const rotateSecret = (id: string) => {
    setSecrets(secrets.map((s) => (s.id === id ? { ...s, status: 'ROTATED', lastRotated: 'Just now' } : s)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-blue-500/20">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-1">
            <KeyRound className="w-4 h-4" />
            <span>CREDENTIAL & SECRET ROTATION ASSISTANT</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Secret Rotation & Credential Lifecycle</h2>
          <p className="text-xs text-gray-400 mt-1">Guided rotation workflows for API keys, JWT secrets, DB passwords, and cloud tokens</p>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-blue-900/30">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0D1424] text-gray-400 uppercase tracking-wider font-mono text-[10px]">
            <tr>
              <th className="p-4">Secret Name</th>
              <th className="p-4">Type</th>
              <th className="p-4">Rotation Status</th>
              <th className="p-4">Last Rotated</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-gray-200 font-mono">
            {secrets.map((sec) => (
              <tr key={sec.id} className="hover:bg-blue-950/10">
                <td className="p-4 text-white font-bold">{sec.name}</td>
                <td className="p-4 text-gray-400">{sec.type}</td>
                <td className="p-4">
                  {sec.status === 'VERIFIED' || sec.status === 'ROTATED' ? (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">VERIFIED / SAFE</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30">ROTATION REQUIRED</span>
                  )}
                </td>
                <td className="p-4 text-gray-400">{sec.lastRotated}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => rotateSecret(sec.id)}
                    className="px-3.5 py-1.5 bg-blue-600/20 hover:bg-blue-600/35 text-cyan-300 border border-blue-500/40 rounded-xl text-xs font-semibold transition"
                  >
                    Rotate Credential
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
