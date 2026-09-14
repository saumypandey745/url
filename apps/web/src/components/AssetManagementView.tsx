import React, { useState } from 'react';
import { Globe, ShieldCheck, Clock, CheckCircle2, AlertCircle, Plus, Copy, Check } from 'lucide-react';

interface AssetManagementViewProps {
  assets: any[];
  onAddAsset: (domain: string) => void;
  onVerifyAsset: (assetId: string) => void;
  onRunScan: (assetId: string) => void;
}

export const AssetManagementView: React.FC<AssetManagementViewProps> = ({
  assets,
  onAddAsset,
  onVerifyAsset,
  onRunScan
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDomain, setNewDomain] = useState('');
  const [selectedAssetForVerify, setSelectedAssetForVerify] = useState<any>(null);
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-[#111827] p-5 rounded-xl border border-[#1F2937]">
        <div>
          <h2 className="text-xl font-bold text-white">Asset Inventory & Authorization Management</h2>
          <p className="text-xs text-gray-400">Strict ownership verification required prior to active scanner execution</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Target Domain</span>
        </button>
      </div>

      {/* Asset Table */}
      <div className="bg-[#111827] rounded-xl border border-[#1F2937] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#1F2937] text-gray-400 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Target Domain</th>
              <th className="p-4">Environment</th>
              <th className="p-4">Authorization</th>
              <th className="p-4">Security Score</th>
              <th className="p-4">Last Scan</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1F2937] text-gray-200">
            {assets.map((asset) => (
              <tr key={asset.id} className="hover:bg-[#1A2332]">
                <td className="p-4 font-mono font-medium flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span>{asset.domain}</span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-gray-800 text-gray-300 border border-gray-700">
                    {asset.environment}
                  </span>
                </td>
                <td className="p-4">
                  {asset.ownershipStatus === 'VERIFIED' ? (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>VERIFIED</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => setSelectedAssetForVerify(asset)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20"
                    >
                      <AlertCircle className="w-3 h-3" />
                      <span>VERIFY OWNERSHIP</span>
                    </button>
                  )}
                </td>
                <td className="p-4 font-mono">
                  <span className={asset.securityScore >= 80 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {asset.securityScore} / 100
                  </span>
                </td>
                <td className="p-4 text-gray-400 text-[11px]">
                  {asset.lastScanDate ? new Date(asset.lastScanDate).toLocaleString() : 'Never'}
                </td>
                <td className="p-4 text-right space-x-2">
                  {asset.ownershipStatus === 'VERIFIED' ? (
                    <button
                      onClick={() => onRunScan(asset.id)}
                      className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded text-[11px] font-medium"
                    >
                      Run Security Scan
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-3 py-1 bg-gray-800 text-gray-500 border border-gray-700 rounded text-[11px] font-medium cursor-not-allowed"
                    >
                      Scan Locked
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Website Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111827] border border-[#1F2937] p-6 rounded-xl max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-white">Add Website Target</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Target URL / Domain</label>
                <input
                  type="text"
                  placeholder="https://example.com"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  className="w-full bg-[#0B0F19] border border-[#1F2937] px-3 py-2 rounded text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold"
                >
                  Create & Get Verification Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ownership Verification Modal */}
      {selectedAssetForVerify && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111827] border border-[#1F2937] p-6 rounded-xl max-w-lg w-full space-y-4">
            <h3 className="text-base font-bold text-white">Domain Ownership Verification</h3>
            <p className="text-xs text-gray-400">
              Add the following TXT record to your DNS zone file for domain <strong className="text-white">{selectedAssetForVerify.domain}</strong>:
            </p>

            <div className="bg-[#0B0F19] p-3 rounded border border-[#1F2937] flex items-center justify-between font-mono text-xs text-emerald-400">
              <span>{selectedAssetForVerify.verificationToken || '_aipatriot-verify=sec-9912048'}</span>
              <button
                onClick={() => copyToken(selectedAssetForVerify.verificationToken || '_aipatriot-verify=sec-9912048')}
                className="p-1 hover:text-white"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="text-[11px] text-gray-400 space-y-1">
              <p>Record Host: <code className="text-gray-200">@</code> or <code className="text-gray-200">_aipatriot-verify</code></p>
              <p>Record Type: <code className="text-gray-200">TXT</code></p>
            </div>

            <div className="flex justify-end space-x-2 pt-3">
              <button
                onClick={() => setSelectedAssetForVerify(null)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onVerifyAsset(selectedAssetForVerify.id);
                  setSelectedAssetForVerify(null);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold"
              >
                Confirm DNS Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
