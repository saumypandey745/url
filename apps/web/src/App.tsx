import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { AssetManagementView } from './components/AssetManagementView';
import { FindingsView } from './components/FindingsView';
import { RecoveryView } from './components/RecoveryView';

export function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [assets, setAssets] = useState([
    {
      id: 'asset-demo-001',
      domain: 'example.com',
      environment: 'PRODUCTION',
      ownershipStatus: 'VERIFIED',
      verificationMethod: 'DNS_TXT',
      verificationToken: '_aipatriot-verify=sec-9912048',
      lastScanDate: new Date().toISOString(),
      securityScore: 88,
      riskLevel: 'GOOD',
      status: 'HEALTHY'
    }
  ]);

  const [findings, setFindings] = useState([
    {
      id: 'find-001',
      assetId: 'asset-demo-001',
      title: 'Missing Content-Security-Policy (CSP) Header',
      category: 'HEADERS',
      severity: 'HIGH',
      description: 'The response header does not contain a Content-Security-Policy directive.',
      evidence: { headerName: 'Content-Security-Policy', state: 'MISSING' },
      impact: 'Increases risk of Cross-Site Scripting (XSS) and clickjacking attacks.',
      remediation: "Set Content-Security-Policy: default-src 'self'; script-src 'self';",
      aiAnalysis: {
        whyItMatters: 'CSP protects the browser context against unauthorized script execution.',
        potentialImpact: 'Attackers can attempt client-side script injection if an XSS vulnerability exists.',
        attackScenario: {
          attackerGoal: 'Inject external scripts via missing CSP policy.',
          potentialImpact: 'Session token extraction or DOM manipulation.',
          verification: 'Re-run scanner module to confirm header presence.'
        }
      }
    },
    {
      id: 'find-002',
      assetId: 'asset-demo-001',
      title: 'Cookie Missing HttpOnly Attribute (session_id)',
      category: 'COOKIES',
      severity: 'MEDIUM',
      description: 'The session cookie is missing HttpOnly attribute.',
      evidence: { cookieName: 'session_id', maskedValue: 'sess_99****12' },
      impact: 'Allows JavaScript to access session cookie.',
      remediation: 'Append HttpOnly attribute to Set-Cookie header.',
      aiAnalysis: {
        whyItMatters: 'HttpOnly prevents client JavaScript from reading session tokens.',
        potentialImpact: 'Exposes session cookie to potential XSS scripts.',
        attackScenario: {
          attackerGoal: 'Read document.cookie via injected script.',
          potentialImpact: 'Session hijacking.',
          verification: 'Check Set-Cookie header for HttpOnly flag.'
        }
      }
    }
  ]);

  const handleAddAsset = (domain: string) => {
    const newAsset = {
      id: `asset-${Date.now()}`,
      domain: domain.replace(/^(https?:\/\/)/, '').split('/')[0],
      environment: 'PRODUCTION',
      ownershipStatus: 'UNVERIFIED',
      verificationMethod: 'DNS_TXT',
      verificationToken: `_aipatriot-verify=${Math.random().toString(36).substring(2, 10)}`,
      lastScanDate: new Date().toISOString(),
      securityScore: 100,
      riskLevel: 'EXCELLENT',
      status: 'PENDING_VERIFICATION'
    };
    setAssets([...assets, newAsset]);
  };

  const handleVerifyAsset = (assetId: string) => {
    setAssets(
      assets.map((a) =>
        a.id === assetId
          ? { ...a, ownershipStatus: 'VERIFIED', status: 'HEALTHY', lastScanDate: new Date().toISOString() }
          : a
      )
    );
  };

  const handleRunScan = (assetId: string) => {
    setCurrentTab('findings');
  };

  return (
    <div className="flex min-h-screen bg-[#0B0F19]">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <main className="flex-1 p-8 overflow-y-auto">
        {currentTab === 'dashboard' && (
          <DashboardView
            onAddWebsite={() => setCurrentTab('assets')}
            onRunScan={() => setCurrentTab('scans')}
          />
        )}
        {currentTab === 'assets' && (
          <AssetManagementView
            assets={assets}
            onAddAsset={handleAddAsset}
            onVerifyAsset={handleVerifyAsset}
            onRunScan={handleRunScan}
          />
        )}
        {currentTab === 'findings' && <FindingsView findings={findings} />}
        {currentTab === 'recovery' && <RecoveryView />}
        {['scans', 'attack-surface', 'incidents', 'sessions', 'secrets', 'audit-logs'].includes(currentTab) && (
          <div className="bg-[#111827] p-8 rounded-xl border border-[#1F2937] text-center text-gray-400 text-xs">
            <h3 className="text-base font-bold text-white mb-2 uppercase tracking-wide">{currentTab} Console</h3>
            <p>Active monitoring and authorization controls operational. Use the navigation sidebar to trigger scans or recovery actions.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
