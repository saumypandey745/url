import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { AssetManagementView } from './components/AssetManagementView';
import { FindingsView } from './components/FindingsView';
import { RecoveryView } from './components/RecoveryView';
import { AttackSurfaceView } from './components/AttackSurfaceView';
import { IncidentsView } from './components/IncidentsView';
import { SessionControlView } from './components/SessionControlView';
import { SecretRotationView } from './components/SecretRotationView';
import { AuditLogsView } from './components/AuditLogsView';

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
      description: 'The response header does not contain a Content-Security-Policy directive restricting script loading.',
      evidence: { headerName: 'Content-Security-Policy', state: 'MISSING' },
      impact: 'Increases risk of Cross-Site Scripting (XSS) and clickjacking attacks.',
      remediation: "Set Content-Security-Policy: default-src 'self'; script-src 'self';",
      aiAnalysis: {
        whyItMatters: 'CSP protects browser execution contexts against unauthorized external script execution.',
        potentialImpact: 'Attackers can attempt client-side script injection if an XSS vulnerability exists.',
        attackScenario: {
          attackerGoal: 'Inject external malicious scripts via missing CSP policy.',
          potentialImpact: 'Session token extraction or DOM manipulation.',
          verification: 'Re-run security scanner module to confirm header presence.'
        }
      }
    },
    {
      id: 'find-002',
      assetId: 'asset-demo-001',
      title: 'Cookie Missing HttpOnly Attribute (session_id)',
      category: 'COOKIES',
      severity: 'MEDIUM',
      description: 'The session cookie is served without the HttpOnly security attribute.',
      evidence: { cookieName: 'session_id', maskedValue: 'sess_99****12' },
      impact: 'Client-side scripts (e.g. via XSS) can access cookie content.',
      remediation: 'Append HttpOnly attribute to Set-Cookie header.',
      aiAnalysis: {
        whyItMatters: 'HttpOnly prevents client-side JavaScript from reading sensitive session cookies.',
        potentialImpact: 'Exposes session identifier to potential XSS vectors.',
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
    <div className="flex min-h-screen bg-[#070A12] text-gray-100 selection:bg-blue-600/40 selection:text-blue-200 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openFindingsCount={findings.length}
      />

      {/* Main SOC Console Body */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto space-y-6">
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
        {currentTab === 'attack-surface' && <AttackSurfaceView />}
        {currentTab === 'incidents' && <IncidentsView />}
        {currentTab === 'recovery' && <RecoveryView />}
        {currentTab === 'sessions' && <SessionControlView />}
        {currentTab === 'secrets' && <SecretRotationView />}
        {currentTab === 'audit-logs' && <AuditLogsView />}
        {currentTab === 'scans' && (
          <div className="glass-panel p-8 rounded-2xl border border-blue-900/30 text-center space-y-4">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Security Scans Console</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              Master Scanner Engine execution active. 8 modular scanners (TLS, Headers, Cookies, CORS, API, Frontend, Exposure, Integrity) are operational.
            </p>
            <button
              onClick={() => setCurrentTab('findings')}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold transition"
            >
              View Findings & Evidence
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
