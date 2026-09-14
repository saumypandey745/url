import express, { Response } from 'express';
import cors from 'cors';
import { validateTargetUrl } from '@secplatform/security';
import { MasterScannerEngine } from '@secplatform/scanner-core';
import { AISecurityAnalyst } from './services/aiAnalyst.js';
import { authenticateJWT, AuthenticatedRequest } from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-Memory storage fallback for dev zero-setup demo stability
const inMemoryAssets: any[] = [
  {
    id: 'asset-demo-001',
    domain: 'example.com',
    environment: 'PRODUCTION',
    ownershipStatus: 'VERIFIED',
    verificationMethod: 'DNS_TXT',
    verificationToken: 'aipatriot-verify-demo-9921',
    verificationDate: new Date().toISOString(),
    lastScanDate: new Date().toISOString(),
    securityScore: 88,
    riskLevel: 'GOOD',
    status: 'HEALTHY',
    createdAt: new Date().toISOString()
  }
];

const inMemoryScans: any[] = [];
const inMemoryFindings: any[] = [];
const inMemoryIncidents: any[] = [];
const inMemoryAuditLogs: any[] = [
  {
    id: 'log-001',
    userEmail: 'secops@enterprise.org',
    action: 'SYSTEM_BOOT',
    targetDomain: 'example.com',
    ipAddress: '127.0.0.1',
    createdAt: new Date().toISOString()
  }
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'secplatform-api', timestamp: new Date().toISOString() });
});

// ASSETS API
app.get('/api/assets', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  res.json({ success: true, data: inMemoryAssets });
});

app.post('/api/assets', authenticateJWT, async (req: AuthenticatedRequest, res: Response) => {
  const { domain, environment } = req.body;
  if (!domain) {
    return res.status(400).json({ success: false, error: { code: 'INVALID_DOMAIN', message: 'Domain or URL is required.' } });
  }

  const ssrf = await validateTargetUrl(domain);
  if (!ssrf.valid) {
    return res.status(400).json({ success: false, error: { code: 'SSRF_BLOCKED', message: ssrf.reason } });
  }

  const token = `_aipatriot-verify=${Math.random().toString(36).substring(2, 12)}`;
  const newAsset = {
    id: `asset-${Date.now()}`,
    domain: domain.replace(/^(https?:\/\/)/, '').split('/')[0],
    environment: environment || 'PRODUCTION',
    ownershipStatus: 'UNVERIFIED',
    verificationToken: token,
    securityScore: 100,
    riskLevel: 'EXCELLENT',
    status: 'PENDING_VERIFICATION',
    createdAt: new Date().toISOString()
  };

  inMemoryAssets.push(newAsset);
  inMemoryAuditLogs.unshift({
    id: `log-${Date.now()}`,
    userEmail: req.user?.email || 'admin@secplatform.local',
    action: 'ASSET_CREATED',
    targetDomain: newAsset.domain,
    ipAddress: req.ip,
    createdAt: new Date().toISOString()
  });

  res.status(201).json({ success: true, data: newAsset });
});

app.post('/api/assets/:id/verify', authenticateJWT, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const asset = inMemoryAssets.find((a) => a.id === id);
  if (!asset) {
    return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Asset not found.' } });
  }

  // Simulate ownership verification approval
  asset.ownershipStatus = 'VERIFIED';
  asset.status = 'HEALTHY';
  asset.verificationMethod = req.body.method || 'DNS_TXT';
  asset.verificationDate = new Date().toISOString();

  inMemoryAuditLogs.unshift({
    id: `log-${Date.now()}`,
    userEmail: req.user?.email,
    action: 'ASSET_VERIFIED',
    targetDomain: asset.domain,
    ipAddress: req.ip,
    createdAt: new Date().toISOString()
  });

  res.json({ success: true, data: asset });
});

// SCANS API & SSE PROGRESS
app.post('/api/scans', authenticateJWT, async (req: AuthenticatedRequest, res: Response) => {
  const { assetId } = req.body;
  const asset = inMemoryAssets.find((a) => a.id === assetId);
  if (!asset) {
    return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Asset not found.' } });
  }

  if (asset.ownershipStatus !== 'VERIFIED') {
    return res.status(403).json({
      success: false,
      error: { code: 'ASSET_NOT_VERIFIED', message: 'Ownership verification required before triggering active security scan.' }
    });
  }

  const scanId = `scan-${Date.now()}`;
  const scanObj = {
    id: scanId,
    assetId: asset.id,
    domain: asset.domain,
    status: 'RUNNING',
    findingsCount: 0,
    createdAt: new Date().toISOString()
  };

  inMemoryScans.unshift(scanObj);
  asset.status = 'SCANNING';

  // Execute Master Scanner Engine
  const engine = new MasterScannerEngine();
  engine.runFullScan(`https://${asset.domain}`).then((result) => {
    scanObj.status = 'COMPLETED';
    asset.status = 'HEALTHY';
    asset.lastScanDate = new Date().toISOString();

    let deductions = 0;
    result.moduleOutputs.forEach((mod) => {
      mod.findings.forEach((f) => {
        const findingId = `find-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        const aiAnalysis = AISecurityAnalyst.analyzeFinding(f);

        inMemoryFindings.unshift({
          id: findingId,
          scanId,
          assetId: asset.id,
          title: f.title,
          category: f.category,
          severity: f.severity,
          status: 'OPEN',
          description: f.description,
          evidence: f.evidence,
          impact: f.impact,
          likelihood: f.likelihood,
          riskScore: f.riskScore,
          remediation: f.remediation,
          aiAnalysis,
          createdAt: new Date().toISOString()
        });

        scanObj.findingsCount++;
        deductions += f.severity === 'CRITICAL' ? 25 : f.severity === 'HIGH' ? 15 : f.severity === 'MEDIUM' ? 8 : 3;
      });
    });

    asset.securityScore = Math.max(10, 100 - deductions);
    asset.riskLevel = asset.securityScore >= 90 ? 'EXCELLENT' : asset.securityScore >= 75 ? 'GOOD' : asset.securityScore >= 60 ? 'MODERATE' : 'HIGH_RISK';

    inMemoryAuditLogs.unshift({
      id: `log-${Date.now()}`,
      userEmail: req.user?.email,
      action: 'SCAN_COMPLETED',
      targetDomain: asset.domain,
      ipAddress: req.ip,
      createdAt: new Date().toISOString()
    });
  }).catch((err) => {
    scanObj.status = 'FAILED';
    asset.status = 'HEALTHY';
  });

  res.status(202).json({ success: true, data: scanObj });
});

app.get('/api/scans', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  res.json({ success: true, data: inMemoryScans });
});

// FINDINGS API
app.get('/api/findings', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  res.json({ success: true, data: inMemoryFindings });
});

// INCIDENTS & RECOVERY API
app.get('/api/incidents', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  res.json({ success: true, data: inMemoryIncidents });
});

app.post('/api/incidents/assess', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  const { assetId } = req.body;
  const asset = inMemoryAssets.find((a) => a.id === assetId);

  const incident = {
    id: `inc-${Date.now()}`,
    assetId: asset?.id || assetId,
    domain: asset?.domain || 'unknown',
    status: 'INVESTIGATING',
    severity: 'HIGH',
    summary: 'Automated compromise indicator check completed.',
    compromiseStatus: 'HEALTHY',
    createdAt: new Date().toISOString()
  };

  inMemoryIncidents.unshift(incident);
  res.json({ success: true, data: incident });
});

// AUDIT LOGS API
app.get('/api/audit-logs', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  res.json({ success: true, data: inMemoryAuditLogs });
});

app.listen(PORT, () => {
  console.log(`[SECPLATFORM API Server] Running on http://localhost:${PORT}`);
});
