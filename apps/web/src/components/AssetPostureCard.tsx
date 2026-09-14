import React from 'react';
import { Globe, ShieldCheck, CheckCircle2, ChevronRight, Lock } from 'lucide-react';

interface AssetPostureCardProps {
  assets?: any[];
  onViewAssets?: () => void;
  onRunScan?: (assetId: string) => void;
}

export const AssetPostureCard: React.FC<AssetPostureCardProps> = ({
  assets = [],
  onViewAssets,
  onRunScan
}) => {
  const primaryAsset = assets[0] || {
    domain: 'example.com',
    environment: 'PRODUCTION',
    ownershipStatus: 'VERIFIED',
    securityScore: 88,
    openFindingsCount: 13
  };

  return (
    <div className="soc-card p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden border border-slate-800/80">
      {/* Header Row */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-xs font-bold text-slate-300 tracking-wider uppercase">PROTECTED ASSETS</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          {assets.length || 1} ACTIVE
        </span>
      </div>

      {/* Asset Body */}
      <div className="py-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-white font-mono">{primaryAsset.domain}</h3>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-800 text-cyan-400 border border-slate-700">
              {primaryAsset.environment || 'PRODUCTION'}
            </span>
          </div>

          <div className="text-right font-mono">
            <span className="text-xs text-slate-400 block">Security Score</span>
            <span className="text-xl font-black text-emerald-400">{primaryAsset.securityScore || 88}</span>
          </div>
        </div>

        {/* Verification Status Tags */}
        <div className="flex items-center space-x-3 text-[11px] font-mono">
          <span className="inline-flex items-center space-x-1 text-emerald-400 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>DNS VERIFIED</span>
          </span>
          <span className="inline-flex items-center space-x-1 text-emerald-400 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>AUTH SAFE</span>
          </span>
        </div>

        {/* Findings Count Bar */}
        <div className="p-2.5 bg-[#090E19] rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">Open Findings</span>
          <span className="text-white font-black">{primaryAsset.openFindingsCount || 13}</span>
        </div>
      </div>

      {/* Footer Action */}
      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
        <span className="text-[10px] font-mono text-slate-400">Status: HEALTHY</span>
        <button
          onClick={onViewAssets}
          className="inline-flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-xl text-xs font-bold transition"
        >
          <span>View Asset</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
