import React, { useState } from 'react';
import { UserCheck, ShieldAlert, Trash2, CheckCircle2, Laptop, Smartphone } from 'lucide-react';

export const SessionControlView: React.FC = () => {
  const [sessions, setSessions] = useState([
    { id: 'sess-001', userEmail: 'secops@enterprise.org', device: 'Chrome / macOS (This Device)', ip: '127.0.0.1', location: 'Local Dev Node', lastActive: 'Just now', current: true },
    { id: 'sess-002', userEmail: 'admin@enterprise.org', device: 'Firefox / Linux Workstation', ip: '192.168.1.45', location: 'Enterprise SOC LAN', lastActive: '12 mins ago', current: false }
  ]);

  const revokeSession = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  const revokeAllOther = () => {
    setSessions(sessions.filter((s) => s.current));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-blue-500/20">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-1">
            <UserCheck className="w-4 h-4" />
            <span>AUTHENTICATED SESSION CONTROL & REVOCATION</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Active Sessions & Emergency Invalidation</h2>
          <p className="text-xs text-gray-400 mt-1">Audit active JWT tokens and revoke compromised user sessions safely</p>
        </div>

        <button
          onClick={revokeAllOther}
          className="flex items-center space-x-2 px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 rounded-xl text-xs font-bold transition"
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Revoke All Other Sessions</span>
        </button>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-blue-900/30">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0D1424] text-gray-400 uppercase tracking-wider font-mono text-[10px]">
            <tr>
              <th className="p-4">User Account</th>
              <th className="p-4">Device & Client Agent</th>
              <th className="p-4">IP Metadata</th>
              <th className="p-4">Last Activity</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-gray-200 font-mono">
            {sessions.map((s) => (
              <tr key={s.id} className="hover:bg-blue-950/10">
                <td className="p-4 text-white font-bold">{s.userEmail}</td>
                <td className="p-4 flex items-center space-x-2">
                  <Laptop className="w-4 h-4 text-cyan-400" />
                  <span>{s.device}</span>
                  {s.current && <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded text-[9px]">CURRENT</span>}
                </td>
                <td className="p-4">{s.ip} <span className="text-gray-500 text-[10px]">({s.location})</span></td>
                <td className="p-4 text-gray-400">{s.lastActive}</td>
                <td className="p-4 text-right">
                  {!s.current && (
                    <button
                      onClick={() => revokeSession(s.id)}
                      className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 rounded text-[11px] font-semibold"
                    >
                      Revoke Session
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
