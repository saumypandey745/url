import React from 'react';
import { ShieldAlert, Globe, Code, Lock, Server, Terminal } from 'lucide-react';

export const AttackSurfaceView: React.FC = () => {
  const publicEndpoints = [
    { path: '/', method: 'GET', authRequired: false, cors: 'Permissive', status: '200 OK' },
    { path: '/api/health', method: 'GET', authRequired: false, cors: 'Explicit Origin', status: '200 OK' },
    { path: '/api/scans', method: 'POST', authRequired: true, cors: 'Explicit Origin', status: '401 Unauthorized' },
    { path: '/swagger.json', method: 'GET', authRequired: false, cors: 'Wildcard *', status: '404 Not Found' }
  ];

  const headerMatrix = [
    { header: 'Content-Security-Policy', status: 'MISSING', risk: 'HIGH', impact: 'Susceptible to XSS & Frame Injection' },
    { header: 'Strict-Transport-Security', status: 'ACTIVE', risk: 'LOW', impact: 'HSTS Enforced (max-age=31536000)' },
    { header: 'X-Frame-Options', status: 'MISSING', risk: 'MEDIUM', impact: 'Framing permitted without CSP ancestors' },
    { header: 'X-Content-Type-Options', status: 'ACTIVE', risk: 'LOW', impact: 'nosniff enforced' }
  ];

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-2xl border border-blue-500/20">
        <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-1">
          <ShieldAlert className="w-4 h-4" />
          <span>ATTACK SURFACE TOPOLOGY & EXPOSURE ANALYSIS</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">Public Attack Surface & Header Matrix</h2>
        <p className="text-xs text-gray-400 mt-1">Discovered endpoints, Security Headers posture, and CORS configuration</p>
      </div>

      {/* Security Headers Posture Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-blue-900/30">
        <div className="p-4 border-b border-gray-800 bg-[#0A0E17]/60 text-xs font-mono text-cyan-300 font-bold">
          SECURITY HEADERS AUDIT MATRIX
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0D1424] text-gray-400 uppercase tracking-wider font-mono text-[10px]">
            <tr>
              <th className="p-4">Header Name</th>
              <th className="p-4">Current Posture</th>
              <th className="p-4">Risk Level</th>
              <th className="p-4">Impact / Recommendation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-gray-200">
            {headerMatrix.map((h) => (
              <tr key={h.header} className="hover:bg-blue-950/10">
                <td className="p-4 font-mono font-bold text-white">{h.header}</td>
                <td className="p-4 font-mono">
                  {h.status === 'ACTIVE' ? (
                    <span className="px-2.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">ACTIVE</span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded text-[10px] bg-red-500/20 text-red-400 border border-red-500/30">MISSING</span>
                  )}
                </td>
                <td className="p-4 font-mono font-bold">
                  <span className={h.risk === 'HIGH' ? 'text-red-400' : h.risk === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'}>
                    {h.risk}
                  </span>
                </td>
                <td className="p-4 text-gray-300 font-mono text-[11px]">{h.impact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Discovered Public Endpoints */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-blue-900/30">
        <div className="p-4 border-b border-gray-800 bg-[#0A0E17]/60 text-xs font-mono text-cyan-300 font-bold">
          DISCOVERED PUBLIC API ENDPOINTS & SWAGGER POSTURE
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0D1424] text-gray-400 uppercase tracking-wider font-mono text-[10px]">
            <tr>
              <th className="p-4">Endpoint Path</th>
              <th className="p-4">HTTP Method</th>
              <th className="p-4">Auth Required</th>
              <th className="p-4">CORS Origin Policy</th>
              <th className="p-4">Response Benchmark</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-gray-200 font-mono">
            {publicEndpoints.map((ep) => (
              <tr key={ep.path} className="hover:bg-blue-950/10">
                <td className="p-4 text-white font-bold">{ep.path}</td>
                <td className="p-4"><span className="px-2 py-0.5 bg-blue-950 text-blue-300 border border-blue-800 rounded">{ep.method}</span></td>
                <td className="p-4">{ep.authRequired ? <span className="text-emerald-400">YES (Bearer JWT)</span> : <span className="text-amber-400">NO (Public)</span>}</td>
                <td className="p-4">{ep.cors}</td>
                <td className="p-4 text-gray-400">{ep.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
