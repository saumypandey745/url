import React from 'react';
import { History, ShieldCheck, User, Terminal } from 'lucide-react';

export const AuditLogsView: React.FC = () => {
  const auditLogs = [
    { id: 'log-001', userEmail: 'secops@enterprise.org', action: 'SECURITY_SCAN_COMPLETED', targetDomain: 'example.com', ip: '127.0.0.1', timestamp: new Date().toLocaleString() },
    { id: 'log-002', userEmail: 'secops@enterprise.org', action: 'ASSET_OWNERSHIP_VERIFIED', targetDomain: 'example.com', ip: '127.0.0.1', timestamp: new Date(Date.now() - 3600000).toLocaleString() },
    { id: 'log-003', userEmail: 'admin@enterprise.org', action: 'ASSET_CREATED', targetDomain: 'example.com', ip: '192.168.1.45', timestamp: new Date(Date.now() - 86400000).toLocaleString() }
  ];

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-2xl border border-blue-500/20">
        <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-1">
          <History className="w-4 h-4" />
          <span>APPEND-ONLY SECURITY AUDIT TRAIL</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">Immutable System Audit Logs</h2>
        <p className="text-xs text-gray-400 mt-1">Audit events, admin actions, asset verifications, and scanner triggers</p>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-blue-900/30">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#0D1424] text-gray-400 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Timestamp</th>
              <th className="p-4">User Actor</th>
              <th className="p-4">Security Action</th>
              <th className="p-4">Target Domain</th>
              <th className="p-4">Client IP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-gray-200">
            {auditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-blue-950/10">
                <td className="p-4 text-gray-400">{log.timestamp}</td>
                <td className="p-4 text-cyan-300 font-bold">{log.userEmail}</td>
                <td className="p-4"><span className="px-2 py-0.5 bg-blue-950 text-blue-300 border border-blue-800 rounded">{log.action}</span></td>
                <td className="p-4 text-white">{log.targetDomain}</td>
                <td className="p-4 text-gray-400">{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
