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
  Sparkles,
  ChevronRight,
  X,
  Menu
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openFindingsCount?: number;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  openFindingsCount = 2,
  mobileOpen = false,
  setMobileOpen
}) => {
  const navigationGroups = [
    {
      group: 'COMMAND',
      items: [
        { id: 'dashboard', label: 'SOC Command Center', icon: LayoutDashboard, badge: null },
        { id: 'assets', label: 'Asset Inventory', icon: Globe, badge: '1 Active', badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
        { id: 'scans', label: 'Security Scans', icon: Radar, badge: null },
        { id: 'findings', label: 'Vulnerabilities', icon: AlertTriangle, badge: `${openFindingsCount}`, badgeColor: 'bg-red-500/15 text-red-400 border-red-500/30' }
      ]
    },
    {
      group: 'THREAT INTELLIGENCE',
      items: [
        { id: 'attack-surface', label: 'Attack Surface', icon: ShieldAlert, badge: null },
        { id: 'incidents', label: 'Incident Center', icon: Flame, badge: 'Clean', badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' },
        { id: 'ai-analyst', label: 'AI Analyst Engine', icon: Sparkles, badge: 'Active', badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/20' }
      ]
    },
    {
      group: 'RESPONSE',
      items: [
        { id: 'recovery', label: '13-Step Recovery', icon: RotateCcw, badge: 'Guided', badgeColor: 'bg-blue-500/15 text-blue-300 border-blue-500/20' },
        { id: 'sessions', label: 'Session Control', icon: UserCheck, badge: null },
        { id: 'secrets', label: 'Secret Rotation', icon: KeyRound, badge: null }
      ]
    },
    {
      group: 'GOVERNANCE',
      items: [
        { id: 'audit-logs', label: 'Audit Trail', icon: History, badge: null }
      ]
    }
  ];

  const handleSelectTab = (tabId: string) => {
    const targetTab = tabId === 'ai-analyst' ? 'findings' : tabId;
    setCurrentTab(targetTab);
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  const navContent = (
    <aside className="w-64 bg-[#090D16] border-r border-slate-800/80 flex flex-col h-full select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border border-cyan-500/30 rounded-xl shadow-inner">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="font-extrabold text-white text-sm tracking-wider">AIPATRIOT</h1>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight">Security Operations Center</p>
            <div className="flex items-center space-x-1.5 mt-1 text-[10px] font-mono text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEM OPERATIONAL</span>
            </div>
          </div>
        </div>

        {setMobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
        {navigationGroups.map((grp) => (
          <div key={grp.group} className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
              {grp.group}
            </div>
            {grp.items.map((item) => {
              const Icon = item.icon;
              const targetTab = item.id === 'ai-analyst' ? 'findings' : item.id;
              const isActive = currentTab === targetTab;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-slate-800/80 text-cyan-300 border-l-2 border-cyan-400 font-semibold shadow-sm'
                      : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border-l-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 text-[9px] font-mono rounded border ${item.badgeColor || 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-3.5 border-t border-slate-800/80 bg-[#070A12]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-xs font-bold text-cyan-300 shadow-inner">
            SO
          </div>
          <div className="flex-1 overflow-hidden text-left">
            <p className="text-xs font-medium text-slate-200 truncate">secops@enterprise.org</p>
            <div className="flex items-center space-x-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <p className="text-[10px] font-mono text-emerald-400">Verified Admin</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-screen sticky top-0 z-40">
        {navContent}
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileOpen && setMobileOpen(false)}
          />
          <div className="relative z-10 h-full w-64 shadow-2xl">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
