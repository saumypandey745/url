import React from 'react';
import {
  ShieldAlert,
  LayoutDashboard,
  Globe,
  Radar,
  AlertTriangle,
  Flame,
  RotateCcw,
  KeyRound,
  UserCheck,
  FileSpreadsheet,
  Settings,
  History
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'SOC Overview', icon: LayoutDashboard },
    { id: 'assets', label: 'Asset Inventory', icon: Globe },
    { id: 'scans', label: 'Security Scans', icon: Radar },
    { id: 'findings', label: 'Vulnerabilities', icon: AlertTriangle },
    { id: 'attack-surface', label: 'Attack Surface', icon: ShieldAlert },
    { id: 'incidents', label: 'Incident Center', icon: Flame },
    { id: 'recovery', label: '13-Step Recovery', icon: RotateCcw },
    { id: 'sessions', label: 'Session Control', icon: UserCheck },
    { id: 'secrets', label: 'Secret Rotation', icon: KeyRound },
    { id: 'audit-logs', label: 'Audit Logs', icon: History }
  ];

  return (
    <aside className="w-64 bg-[#111827] border-r border-[#1F2937] flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-[#1F2937] flex items-center space-x-3">
        <div className="p-2 bg-blue-600/20 border border-blue-500/40 rounded-lg">
          <ShieldAlert className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h1 className="font-bold text-white text-sm tracking-wide">SECPLATFORM</h1>
          <p className="text-xs text-blue-400 font-mono">SOC enterprise v1.0</p>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600/20 border border-blue-500/40 text-blue-400'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#1F2937] bg-[#0D131F]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
            SO
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-medium text-gray-200 truncate">secops@enterprise.org</p>
            <span className="inline-block px-1.5 py-0.5 text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded">
              VERIFIED ADMIN
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
