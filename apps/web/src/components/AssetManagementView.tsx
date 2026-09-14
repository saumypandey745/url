import React, { useState } from 'react';
import { Globe, ShieldCheck, Clock, CheckCircle2, AlertCircle, Plus, Copy, Check, Lock, ExternalLink, Shield, Trash2, AlertTriangle } from 'lucide-react';

interface AssetManagementViewProps {
  assets: any[];
  onAddAsset: (domain: string) => void;
  onVerifyAsset: (assetId: string) => void;
  onRunScan: (assetId: string) => void;
  onDeleteAsset?: (assetId: string) => void;
}

export const AssetManagementView: React.FC<AssetManagementViewProps> = ({
  assets,
  onAddAsset,
  onVerifyAsset,
  onRunScan,
  onDeleteAsset
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDomain, setNewDomain] = useState('');
  const [selectedAssetForVerify, setSelectedAssetForVerify] = useState<any>(null);
  const [selectedAssetForDelete, setSelectedAssetForDelete] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain) return;
    onAddAsset(newDomain);
    setNewDomain('');
    setShowAddModal(false);
  };

  const copyToken = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confirmDelete = () => {
    if (selectedAssetForDelete && onDeleteAsset) {
      onDeleteAsset(selectedAssetForDelete.id);
      setSelectedAssetForDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 soc-card p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-1">
            <Shield className="w-4 h-4" />
            <span>AUTHORIZATION & OWNERSHIP GATED INVENTORY</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Asset Inventory & Authorization Controls</h2>
          <p className="text-xs text-slate-400 mt-1">Strict DNS / Meta Tag ownership verification required before active scanning</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-cyan-950/40"
        >
          <Plus className="w-4 h-4" />
          <span>Add Target Asset</span>
        </button>
      </div>

      {/* Asset Grid / Table */}
      <div className="soc-card rounded-2xl overflow-hidden border border-slate-800">
        <div className="p-4 border-b border-slate-800 bg-[#090E19] flex items-center justify-between text-xs font-mono text-slate-400">
          <span>MONITORED TARGET DOMAINS ({assets.length})</span>
          <span className="text-emerald-400 flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>VERIFIED AUTHORIZATION REQUIRED</span>
          </span>
        </div>

        {assets.length === 0 ? (
          <div className="p-12 text-center text-slate-400 font-mono text-xs space-y-3">
            <p>No target assets in inventory.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-xl text-xs font-bold"
            >
              + Add First Asset
            </button>
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0D1424] text-slate-400 uppercase tracking-wider font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-4">Target Domain</th>
                <th className="p-4">Environment</th>
                <th className="p-4">Authorization</th>
                <th className="p-4">Security Score</th>
                <th className="p-4">Last Active Scan</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-slate-800/30 transition">
                  <td className="p-4 font-mono font-bold flex items-center space-x-3 text-white">
                    <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm">{asset.domain}</span>
                      <p className="text-[10px] text-slate-400 font-normal">ID: {asset.id}</p>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-slate-800 text-cyan-300 border border-slate-700">
                      {asset.environment}
                    </span>
                  </td>

                  <td className="p-4">
                    {asset.ownershipStatus === 'VERIFIED' ? (
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>VERIFIED</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => setSelectedAssetForVerify(asset)}
                        className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 transition animate-pulse"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>VERIFY OWNERSHIP</span>
                      </button>
                    )}
                  </td>

                  <td className="p-4 font-mono">
                    <div className="flex items-center space-x-2">
                      <span className={`text-base font-black ${asset.securityScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {asset.securityScore}
                      </span>
                      <span className="text-xs text-slate-400">/ 100</span>
                    </div>
                  </td>

                  <td className="p-4 text-slate-400 text-[11px] font-mono">
                    {asset.lastScanDate ? new Date(asset.lastScanDate).toLocaleString() : 'Never'}
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {asset.ownershipStatus === 'VERIFIED' ? (
                        <button
                          onClick={() => onRunScan(asset.id)}
                          className="px-3 py-1.5 bg-cyan-600/20 hover:bg-cyan-600/35 text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-semibold transition"
                        >
                          Run Security Scan
                        </button>
                      ) : (
                        <button
                          disabled
                          className="px-3 py-1.5 bg-slate-900 text-slate-600 border border-slate-800 rounded-xl text-xs font-semibold cursor-not-allowed flex items-center space-x-1"
                        >
                          <Lock className="w-3 h-3" />
                          <span>Scan Locked</span>
                        </button>
                      )}

                      {/* Delete Asset Button */}
                      {onDeleteAsset && (
                        <button
                          onClick={() => setSelectedAssetForDelete(asset)}
                          className="p-1.5 bg-red-500/10 hover:bg-red-500/25 text-red-400 border border-red-500/30 rounded-xl transition"
                          title="Delete Asset"
                          aria-label={`Delete ${asset.domain}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Website Target Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#0F172A] border border-cyan-500/30 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-mono">Add Target Website</h3>
            <p className="text-xs text-slate-300">Enter a website or domain you own or are explicitly authorized to assess.</p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">TARGET URL / DOMAIN</label>
                <input
                  type="text"
                  placeholder="https://example.com"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  className="w-full bg-[#070A12] border border-slate-700 px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold font-mono"
                >
                  Generate Verification Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ownership Verification Modal */}
      {selectedAssetForVerify && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#0F172A] border border-cyan-500/30 p-6 rounded-2xl max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>OWNERSHIP VERIFICATION WIZARD</span>
            </div>

            <h3 className="text-lg font-bold text-white font-mono">Confirm Domain Authorization</h3>
            <p className="text-xs text-slate-300">
              Add the following TXT record to the DNS zone file for domain <strong className="text-cyan-400 font-mono">{selectedAssetForVerify.domain}</strong>:
            </p>

            <div className="bg-[#070A12] p-4 rounded-xl border border-cyan-500/30 flex items-center justify-between font-mono text-xs text-emerald-400">
              <span>{selectedAssetForVerify.verificationToken || '_aipatriot-verify=sec-9912048'}</span>
              <button
                onClick={() => copyToken(selectedAssetForVerify.verificationToken || '_aipatriot-verify=sec-9912048')}
                className="p-1.5 hover:text-white bg-slate-800 border border-slate-700 rounded-lg"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="text-[11px] text-slate-400 space-y-1 font-mono bg-[#070A12]/50 p-3 rounded-xl border border-slate-800">
              <p>Record Host: <code className="text-slate-200">@</code> or <code className="text-slate-200">_aipatriot-verify</code></p>
              <p>Record Type: <code className="text-slate-200">TXT</code></p>
            </div>

            <div className="flex justify-end space-x-2 pt-3 font-mono">
              <button
                onClick={() => setSelectedAssetForVerify(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onVerifyAsset(selectedAssetForVerify.id);
                  setSelectedAssetForVerify(null);
                }}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold"
              >
                Confirm DNS Verification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Asset Confirmation Modal */}
      {selectedAssetForDelete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#0F172A] border border-red-500/40 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center space-x-2 text-red-400 text-xs font-mono">
              <AlertTriangle className="w-4 h-4" />
              <span>DELETE ASSET CONFIRMATION</span>
            </div>

            <h3 className="text-lg font-bold text-white font-mono">Remove Target Asset?</h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to remove <strong className="text-white font-mono">{selectedAssetForDelete.domain}</strong> from active security monitoring inventory?
            </p>

            <div className="flex justify-end space-x-2 pt-3 font-mono">
              <button
                onClick={() => setSelectedAssetForDelete(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-bold"
              >
                Remove Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
