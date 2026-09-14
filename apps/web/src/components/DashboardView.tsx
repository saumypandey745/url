import React from 'react';
import { ShieldCheck, ShieldAlert, AlertCircle, Server, Activity, PlusCircle, Radar } from 'lucide-react';
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
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111827] p-5 rounded-xl border border-[#1F2937]">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Security Posture & SOC Dashboard</h2>
          <p className="text-xs text-gray-400">Real-time attack surface monitoring & authorization-aware risk management</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onAddWebsite}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Website</span>
          </button>
          <button
            onClick={onRunScan}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 rounded-lg text-xs font-semibold transition"
          >
            <Radar className="w-4 h-4" />
            <span>Trigger Scan</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111827] p-5 rounded-xl border border-[#1F2937]">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>SECURITY SCORE</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">88 <span className="text-xs font-normal text-emerald-400">/ 100</span></div>
          <div className="mt-2 text-[11px] text-emerald-400 font-mono">Status: GOOD (+23 pts this week)</div>
        </div>

        <div className="bg-[#111827] p-5 rounded-xl border border-[#1F2937]">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>CRITICAL FINDINGS</span>
            <ShieldAlert className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-3xl font-extrabold text-red-400">1</div>
          <div className="mt-2 text-[11px] text-red-400 font-mono">Requires Immediate Remediation</div>
        </div>

        <div className="bg-[#111827] p-5 rounded-xl border border-[#1F2937]">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>VERIFIED ASSETS</span>
            <Server className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">1</div>
          <div className="mt-2 text-[11px] text-blue-400 font-mono">DNS Ownership Confirmed</div>
        </div>

        <div className="bg-[#111827] p-5 rounded-xl border border-[#1F2937]">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>INCIDENT STATUS</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">HEALTHY</div>
          <div className="mt-2 text-[11px] text-gray-400 font-mono">Zero active compromise signals</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#111827] p-5 rounded-xl border border-[#1F2937]">
          <h3 className="text-sm font-semibold text-gray-200 mb-4">Security Score History Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#6B7280" fontSize={11} />
                <YAxis stroke="#6B7280" fontSize={11} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#FFF' }} />
                <Area type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#scoreColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#111827] p-5 rounded-xl border border-[#1F2937] flex flex-col justify-between">
          <h3 className="text-sm font-semibold text-gray-200 mb-2">Finding Severity Breakdown</h3>
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={severityData} dataKey="value" innerRadius={50} outerRadius={70} paddingAngle={4}>
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#FFF' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {severityData.map((s) => (
              <div key={s.name} className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-gray-400">{s.name}:</span>
                <span className="text-gray-200 font-mono">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
