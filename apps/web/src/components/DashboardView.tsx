import React from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Server,
  Activity,
  PlusCircle,
  Radar,
  ArrowUpRight,
  Sparkles,
  Lock,
  Globe,
  Radio,
  FileText
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const trendData = [
  { day: 'Mon', score: 62 },
  { day: 'Tue', score: 65 },
  { day: 'Wed', score: 71 },
  { day: 'Thu', score: 78 },
  { day: 'Fri', score: 84 },
  { day: 'Sat', score: 88 },
  { day: 'Sun', score: 88 }
];

const severityData = [
  { name: 'Critical', value: 1, color: '#EF4444' },
  { name: 'High', value: 2, color: '#F97316' },
  { name: 'Medium', value: 4, color: '#F59E0B' },
  { name: 'Low', value: 6, color: '#3B82F6' }
];

interface DashboardViewProps {
  onAddWebsite: () => void;
  onRunScan: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onAddWebsite, onRunScan }) => {
  return (
    <div className="space-y-6">
      {/* Top Banner & Control Console */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0F172A] via-[#111C33] to-[#0A1120] p-6 rounded-2xl border border-blue-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 z-10">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-1">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>LIVE ATTACK-SURFACE MONITORING ENFORCED</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Security Posture & SOC Command Console</h2>
            <p className="text-xs text-gray-400 mt-1 max-w-xl">
              Authorization-gated vulnerability assessment, SSRF protection shield, and automated incident recovery workflow.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onAddWebsite}
              className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-blue-600/25"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Target Website</span>
            </button>
            <button
              onClick={onRunScan}
              className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-emerald-500/10"
            >
              <Radar className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
              <span>Trigger Security Scan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Security Score Card */}
        <div className="glass-panel glass-panel-hover p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-3">
            <span className="font-mono tracking-wider font-semibold">SECURITY SCORE</span>
            <div className="p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-black text-white tracking-tight">88</span>
            <span className="text-xs font-mono text-gray-400">/ 100</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <ArrowUpRight className="w-3 h-3" />
              <span>+23 pts this week</span>
            </span>
            <span className="text-[10px] font-mono text-gray-400">Rating: GOOD</span>
          </div>
        </div>

        {/* Critical Vulnerabilities Card */}
        <div className="glass-panel glass-panel-hover p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-3">
            <span className="font-mono tracking-wider font-semibold">CRITICAL FINDINGS</span>
            <div className="p-1.5 bg-red-500/10 rounded-lg border border-red-500/30">
              <ShieldAlert className="w-4 h-4 text-red-400" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-black text-red-400 tracking-tight">1</span>
            <span className="text-xs font-mono text-gray-400">Open Action</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse">
              ACTION REQUIRED
            </span>
            <span className="text-[10px] font-mono text-gray-400">1 CSP Missing</span>
          </div>
        </div>

        {/* Verified Assets Card */}
        <div className="glass-panel glass-panel-hover p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-3">
            <span className="font-mono tracking-wider font-semibold">VERIFIED ASSETS</span>
            <div className="p-1.5 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <Server className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-black text-white tracking-tight">1</span>
            <span className="text-xs font-mono text-gray-400">Target</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-blue-500/20 text-cyan-300 border border-blue-500/40">
              example.com
            </span>
            <span className="text-[10px] font-mono text-emerald-400">DNS Verified</span>
          </div>
        </div>

        {/* Incident Status Card */}
        <div className="glass-panel glass-panel-hover p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-3">
            <span className="font-mono tracking-wider font-semibold">INCIDENT POSTURE</span>
            <div className="p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-emerald-400 tracking-tight">HEALTHY</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              ZERO COMPROMISE
            </span>
            <span className="text-[10px] font-mono text-gray-400">Safe Baseline</span>
          </div>
        </div>
      </div>

      {/* Main Charts & Radar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Score History Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Security Score Trend History</h3>
              <p className="text-xs text-gray-400">Post-remediation security posture improvement over the last 7 days</p>
            </div>
            <span className="px-2.5 py-1 bg-blue-500/10 text-cyan-400 border border-blue-500/30 rounded-lg text-xs font-mono">
              +23 PTS RECOVERY
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#4B5563" fontSize={11} tickLine={false} />
                <YAxis stroke="#4B5563" fontSize={11} domain={[0, 100]} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '12px', color: '#FFF' }}
                />
                <Area type="monotone" dataKey="score" stroke="#06B6D4" strokeWidth={3} fillOpacity={1} fill="url(#scoreColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity Breakdown Donut Chart */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Vulnerability Severity Distribution</h3>
            <p className="text-xs text-gray-400">Active finding categorization across 8 scanner modules</p>
          </div>

          <div className="h-44 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={severityData} dataKey="value" innerRadius={50} outerRadius={70} paddingAngle={6}>
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '12px', color: '#FFF' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-800">
            {severityData.map((s) => (
              <div key={s.name} className="flex items-center space-x-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-gray-400 font-mono">{s.name}:</span>
                <span className="text-white font-bold font-mono">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
