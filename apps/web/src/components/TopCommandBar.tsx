import React from 'react';
import { Plus, Radar, Bell, Shield, Menu, Clock } from 'lucide-react';

interface TopCommandBarProps {
  onAddWebsite: () => void;
  onRunScan: () => void;
  onToggleMobileMenu?: () => void;
}

export const TopCommandBar: React.FC<TopCommandBarProps> = ({
  onAddWebsite,
  onRunScan,
  onToggleMobileMenu
}) => {
  const lastScanTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <header className="soc-card p-4 rounded-2xl mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-800/80">
      {/* Left Title & Status */}
      <div className="flex items-center space-x-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 text-slate-400 hover:text-white bg-slate-800/60 rounded-xl border border-slate-700/60"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-extrabold text-white tracking-tight">SOC Command Center</h1>
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>LIVE POSTURE</span>
            </span>
          </div>
          <p className="text-xs text-slate-400">Live security posture, continuous threat surface analysis & automated compliance</p>
        </div>
      </div>

      {/* Right Controls & Actions */}
      <div className="flex items-center flex-wrap gap-3">
        {/* Last Scan Badge */}
        <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 bg-[#090E19] border border-slate-800 rounded-xl text-xs font-mono text-slate-400">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>Last Scan: {lastScanTime}</span>
        </div>

        {/* Notifications Icon */}
        <button
          className="relative p-2 bg-[#090E19] hover:bg-slate-800/80 text-slate-300 hover:text-white border border-slate-800 rounded-xl transition"
          aria-label="View Security Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        </button>

        {/* Primary Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onAddWebsite}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/80 rounded-xl text-xs font-bold transition shadow-sm"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>Add Asset</span>
          </button>

          <button
            onClick={onRunScan}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-cyan-950/40"
          >
            <Radar className="w-4 h-4 text-white" />
            <span>Run Security Scan</span>
          </button>
        </div>
      </div>
    </header>
  );
};
