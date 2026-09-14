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
  FileText,
  Layers,
  Cpu,
  Eye
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
    <div className="space-y-7 perspective-container">
      {/* 3D Holographic Header Console Banner */}
      <div className="relative overflow-hidden card-3d p-7 rounded-3xl border border-cyan-500/30 animate-float-3d shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/15 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs tracking-wider">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>3D HOLOGRAPHIC SOC THREAT CONSOLE</span>
              <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 rounded-full text-[9px]">PERSPECTIVE ACTIVE</span>
            </div>

            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-300 tracking-tight drop-shadow">
              Security Posture & 3D Threat Radar
            </h2>

            <p className="text-xs text-gray-300 max-w-xl leading-relaxed">
              Multi-layered threat surface monitoring, pre-flight SSRF protection shield, and automated incident recovery orchestration.
            </p>
          </div>

          <div className="flex items-center space-x-3.5">
            <button
              onClick={onAddWebsite}
              className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white rounded-2xl text-xs font-extrabold transition-all transform hover:scale-105 glow-cyan-3d"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Target Asset</span>
            </button>
            <button
              onClick={onRunScan}
              className="flex items-center space-x-2 px-5 py-3 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 rounded-2xl text-xs font-extrabold transition-all transform hover:scale-105 glow-emerald-3d"
            >
              <Radar className="w-4 h-4 animate-radar text-emerald-400" />
              <span>Trigger Scan</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3D Elevated Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 3D Security Score Card with Holographic Gauge Ring */}
        <div className="card-3d p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span className="font-mono tracking-wider font-bold">SECURITY SCORE</span>
            <div className="p-2 bg-emerald-500/15 rounded-xl border border-emerald-500/40 glow-emerald">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

          <div className="flex items-center justify-between my-2">
            <div>
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-emerald-300 tracking-tight">
                88
              </div>
              <span className="text-[11px] font-mono text-gray-400">Out of 100 benchmark</span>
            </div>

            {/* 3D Holographic Gauge Ring Graphic */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20" />
              <div className="absolute inset-0 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin-slow" />
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-800/80">
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <ArrowUpRight className="w-3 h-3" />
              <span>+23 PTS RECOVERY</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">RATING: GOOD</span>
          </div>
        </div>

        {/* 3D Critical Vulnerabilities Card */}
        <div className="card-3d p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between glow-danger-3d">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span className="font-mono tracking-wider font-bold">CRITICAL FINDINGS</span>
            <div className="p-2 bg-red-500/15 rounded-xl border border-red-500/40">
              <ShieldAlert className="w-5 h-5 text-red-400" />
            </div>
          </div>

          <div className="my-2">
            <div className="text-5xl font-black text-red-400 tracking-tight">1</div>
            <p className="text-[11px] font-mono text-gray-400 mt-1">Missing Content-Security-Policy</p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-800/80">
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse">
              REMEDIATION REQUIRED
            </span>
            <span className="text-[10px] font-mono text-red-400">-15 Pts Impact</span>
          </div>
        </div>

        {/* 3D Verified Assets Card */}
        <div className="card-3d p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between glow-cyan-3d">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span className="font-mono tracking-wider font-bold">VERIFIED ASSETS</span>
            <div className="p-2 bg-cyan-500/15 rounded-xl border border-cyan-500/40">
              <Server className="w-5 h-5 text-cyan-400" />
            </div>
          </div>

          <div className="my-2">
            <div className="text-5xl font-black text-white tracking-tight">1</div>
            <p className="text-[11px] font-mono text-cyan-300 mt-1">example.com (Production)</p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-800/80">
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              DNS TXT VERIFIED
            </span>
            <span className="text-[10px] font-mono text-emerald-400">AUTH SAFE</span>
          </div>
        </div>

        {/* 3D Incident Posture Card */}
        <div className="card-3d p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between glow-emerald-3d">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span className="font-mono tracking-wider font-bold">INCIDENT POSTURE</span>
            <div className="p-2 bg-emerald-500/15 rounded-xl border border-emerald-500/40">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

          <div className="my-2">
            <div className="text-3xl font-black text-emerald-400 tracking-tight">HEALTHY</div>
            <p className="text-[11px] font-mono text-gray-400 mt-1">Zero Backdoor Signatures</p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-800/80">
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              BASELINE SAFE
            </span>
            <span className="text-[10px] font-mono text-gray-400">100% Intact</span>
          </div>
        </div>
      </div>

      {/* 3D Layered Charts & Visualizations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Security Score History Trend Chart */}
        <div className="lg:col-span-2 card-3d p-7 rounded-3xl space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-1">
                <Layers className="w-4 h-4" />
                <span>3D TIME-SERIES POSTURE ANALYTICS</span>
              </div>
              <h3 className="text-lg font-bold text-white">Security Score Improvement Trend</h3>
            </div>
            <span className="px-3 py-1 bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-mono font-bold">
              7-DAY BENCHMARK
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#4B5563" fontSize={11} tickLine={false} />
                <YAxis stroke="#4B5563" fontSize={11} domain={[0, 100]} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#090D18', borderColor: '#1E293B', borderRadius: '16px', color: '#FFF' }}
                />
                <Area type="monotone" dataKey="score" stroke="#06B6D4" strokeWidth={3.5} fillOpacity={1} fill="url(#scoreColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3D Severity Distribution Donut Chart */}
        <div className="card-3d p-7 rounded-3xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-1">
              <Eye className="w-4 h-4" />
              <span>MODULE FINDING CATEGORIZATION</span>
            </div>
            <h3 className="text-lg font-bold text-white">Severity Breakdown</h3>
          </div>

          <div className="h-44 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={severityData} dataKey="value" innerRadius={55} outerRadius={75} paddingAngle={8}>
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#090D18', borderColor: '#1E293B', borderRadius: '16px', color: '#FFF' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-gray-800/80">
            {severityData.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs p-2 bg-[#070A12] rounded-xl border border-gray-800">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: s.color }} />
                  <span className="text-gray-300 font-mono">{s.name}</span>
                </div>
                <span className="text-white font-black font-mono">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
