import React from 'react';
import { History, CheckCircle2, ShieldAlert, Radar, FileCheck } from 'lucide-react';

interface ActivityTimelineProps {
  onViewAuditTrail?: () => void;
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  onViewAuditTrail
}) => {
  const events = [
    {
      time: '14:02',
      title: 'Security scan completed',
      detail: 'example.com',
      icon: Radar,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20'
    },
    {
      time: '13:48',
      title: 'Asset ownership verified',
      detail: 'example.com (DNS TXT)',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20'
    },
    {
      time: '13:21',
      title: 'Finding detected',
      detail: 'Missing Content-Security-Policy',
      icon: ShieldAlert,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    },
    {
      time: '12:54',
      title: 'Baseline integrity verified',
      detail: 'System signatures intact',
      icon: FileCheck,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    }
  ];

  return (
    <div className="soc-card p-6 rounded-2xl flex flex-col justify-between space-y-4 border border-slate-800/80">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
        <div className="flex items-center space-x-2">
          <History className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-xs font-bold text-slate-300 tracking-wider uppercase">RECENT ACTIVITY</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
          AUDIT LOG
        </span>
      </div>

      {/* Timeline Stream */}
      <div className="space-y-3 font-mono text-xs relative pl-3 border-l border-slate-800">
        {events.map((evt, idx) => {
          const Icon = evt.icon;
          return (
            <div key={idx} className="relative flex items-start space-x-3 group">
              {/* Timeline Dot */}
              <div className={`absolute -left-[19px] top-1 p-1 rounded-full border border-slate-800 ${evt.bgColor}`}>
                <span className={`block w-2 h-2 rounded-full ${evt.color.replace('text-', 'bg-')}`} />
              </div>

              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-200 font-bold">{evt.title}</span>
                  <span className="text-[10px] text-slate-500">{evt.time}</span>
                </div>
                <p className="text-[11px] text-slate-400">{evt.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Action */}
      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between font-mono text-[10px]">
        <span className="text-slate-400">Continuous Security Auditing</span>
        <button
          onClick={onViewAuditTrail}
          className="text-cyan-400 hover:underline font-bold"
        >
          View Full Audit Trail →
        </button>
      </div>
    </div>
  );
};
