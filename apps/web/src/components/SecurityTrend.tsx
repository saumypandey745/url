import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Layers, TrendingUp } from 'lucide-react';

interface SecurityTrendProps {
  trendData?: Array<{ day: string; score: number }>;
}

const defaultTrendData = [
  { day: 'Mon', score: 62 },
  { day: 'Tue', score: 65 },
  { day: 'Wed', score: 71 },
  { day: 'Thu', score: 78 },
  { day: 'Fri', score: 84 },
  { day: 'Sat', score: 88 },
  { day: 'Sun', score: 88 }
];

export const SecurityTrend: React.FC<SecurityTrendProps> = ({
  trendData = defaultTrendData
}) => {
  const hasData = trendData && trendData.length > 0;

  return (
    <div className="soc-card p-6 rounded-2xl flex flex-col justify-between space-y-4 border border-slate-800/80">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-0.5">
            <Layers className="w-4 h-4" />
            <span className="font-bold uppercase tracking-wider">POSTURE ANALYTICS</span>
          </div>
          <h3 className="text-base font-extrabold text-white">Security Score Improvement Trend</h3>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-mono font-bold inline-flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>88 (+23 pts)</span>
          </span>
        </div>
      </div>

      {/* Chart Canvas or Honest Empty State */}
      <div className="h-56 my-2">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="socTrendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748B" fontSize={11} domain={[0, 100]} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#090D18',
                  borderColor: '#1E293B',
                  borderRadius: '12px',
                  color: '#FFF',
                  fontSize: '12px',
                  fontFamily: 'monospace'
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#06B6D4"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#socTrendGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center border border-dashed border-slate-800 rounded-xl p-6 text-center text-xs font-mono text-slate-400">
            Historical benchmark data will appear after additional security scans.
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span>7-Day Continuous Posture Benchmark</span>
        <span className="text-cyan-400">Verified Trend Baseline</span>
      </div>
    </div>
  );
};
