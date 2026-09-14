import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertTriangle, Eye } from 'lucide-react';

interface SeverityDonutProps {
  findings?: any[];
  onSelectSeverity?: (severity: string) => void;
}

export const SeverityDonut: React.FC<SeverityDonutProps> = ({
  findings = [],
  onSelectSeverity
}) => {
  // Compute counts from findings array if present, else fallback dataset
  const critical = findings.filter(f => f.severity === 'CRITICAL').length || 1;
  const high = findings.filter(f => f.severity === 'HIGH').length || 2;
  const medium = findings.filter(f => f.severity === 'MEDIUM').length || 4;
  const low = findings.filter(f => f.severity === 'LOW').length || 6;
  const total = critical + high + medium + low;

  const data = [
    { name: 'Critical', value: critical, color: '#EF4444' },
    { name: 'High', value: high, color: '#F97316' },
    { name: 'Medium', value: medium, color: '#F59E0B' },
    { name: 'Low', value: low, color: '#3B82F6' }
  ];

  return (
    <div className="soc-card p-6 rounded-2xl flex flex-col justify-between border border-slate-800/80">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-xs font-bold text-slate-300 tracking-wider uppercase">SEVERITY BREAKDOWN</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
          {total} TOTAL
        </span>
      </div>

      {/* Donut Chart with Center Text */}
      <div className="relative h-48 py-2 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={6}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  className="cursor-pointer hover:opacity-80 transition"
                  onClick={() => onSelectSeverity && onSelectSeverity(entry.name.toUpperCase())}
                />
              ))}
            </Pie>
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
          </PieChart>
        </ResponsiveContainer>

        {/* Center Donut Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-2xl font-black text-white leading-none font-mono">{total}</span>
          <span className="text-[10px] font-mono text-slate-400 mt-1">Open Findings</span>
        </div>
      </div>

      {/* Compact Legend Grid */}
      <div className="pt-3 border-t border-slate-800/60 grid grid-cols-2 gap-2 text-xs font-mono">
        {data.map((s) => (
          <button
            key={s.name}
            onClick={() => onSelectSeverity && onSelectSeverity(s.name.toUpperCase())}
            className="flex items-center justify-between p-2 bg-[#090E19] hover:bg-slate-800/60 rounded-xl border border-slate-800 transition text-left"
          >
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-slate-300">{s.name}</span>
            </div>
            <span className="text-white font-bold">{s.value}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
