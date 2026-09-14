import React from 'react';
import {
  ShieldAlert,
  LayoutDashboard,
  Globe,
  Radar,
  AlertTriangle,
  Flame,
  RotateCcw,
  UserCheck,
  KeyRound,
  History,
  Activity,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openFindingsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab, openFindingsCount = 2 }) => {
  const navItems = [
    { id: 'dashboard', label: 'SOC Command Center', icon: LayoutDashboard, badge: null },
    { id: 'assets', label: 'Asset Inventory', icon: Globe, badge: '1 Active' },
    { id: 'scans', label: 'Security Scans', icon: Radar, badge: null },
    { id: 'findings', label: 'Vulnerabilities', icon: AlertTriangle, badge: `${openFindingsCount} Open`, badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30' },
    { id: 'attack-surface', label: 'Attack Surface', icon: ShieldAlert, badge: null },
    { id: 'incidents', label: 'Incident Center', icon: Flame, badge: 'Clean', badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    { id: 'recovery', label: '13-Step Recovery', icon: RotateCcw, badge: 'Guided' },
    { id: 'sessions', label: 'Session Control', icon: UserCheck, badge: null },
    { id: 'secrets', label: 'Secret Rotation', icon: KeyRound, badge: null },
    { id: 'audit-logs', label: 'Audit Trail', icon: History, badge: null }
  ];

  return (
    <aside className="w-64 bg-[#0A0E17]/90 backdrop-blur-xl border-r border-blue-900/20 flex flex-col h-screen sticky top-0 z-40 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-blue-900/20 flex items-center space-x-3">
        <div className="relative p-2.5 bg-gradient-to-br from-blue-600/30 to-cyan-500/10 border border-blue-500/40 rounded-xl glow-blue">
          <ShieldAlert className="w-6 h-6 text-cyan-400" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
        </div>
        <div>
          <div className="flex items-center space-x-1.5">
            <h1 className="font-extrabold text-white text-sm tracking-wider">AIPATRIOT</h1>
            <span className="px-1.5 py-0.2 bg-blue-500/20 text-blue-400 text-[9px] font-mono border border-blue-400/30 rounded">SOC</span>
          </div>
          <p className="text-[11px] text-gray-400 font-mono flex items-center space-x-1 mt-0.5">
            <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>Shield Active</span>
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-gray-400 font-semibold">
          Platform Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600/25 to-cyan-500/10 border border-blue-500/40 text-cyan-300 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                  : 'text-gray-400 hover:bg-[#111927] hover:text-gray-200 border border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-0.5 text-[9px] font-mono rounded-full border ${item.badgeColor || 'bg-gray-800 text-gray-400 border-gray-700'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* AI Assistant Callout */}
      <div className="mx-3 mb-3 p-3 bg-gradient-to-br from-blue-950/40 via-[#0D1527] to-cyan-950/20 border border-blue-500/30 rounded-xl">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold mb-1">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>AI Analyst Engine</span>
        </div>
        <p className="text-[11px] text-gray-400 leading-tight">Deterministic rule benchmarks & LLM risk context operational.</p>
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-blue-900/20 bg-[#080C14]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-xs font-black text-white shadow-md">
            SO
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-semibold text-gray-200 truncate">secops@enterprise.org</p>
            <div className="flex items-center space-x-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-mono text-emerald-400 tracking-wider">VERIFIED ADMIN</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
