import { FindingSeverity, FindingEvidence } from '@secplatform/types';

export interface ScannerResultFinding {
  title: string;
  category: 'TLS' | 'HEADERS' | 'COOKIES' | 'CORS' | 'API' | 'AUTH' | 'FRONTEND' | 'EXPOSURE' | 'INTEGRITY' | 'DEPENDENCY';
  severity: FindingSeverity;
  description: string;
  evidence: FindingEvidence;
  impact: string;
  likelihood: 'HIGH' | 'MEDIUM' | 'LOW';
  riskScore: number; // 0 - 100
  remediation: string;
  references: string[];
}

export interface ScannerModuleOutput {
  moduleName: string;
  success: boolean;
  error?: string;
  executionTimeMs: number;
  findings: ScannerResultFinding[];
  metadata?: Record<string, any>;
}

export interface BaseScannerModule {
  name: string;
  description: string;
  execute(targetUrl: string, options?: { timeoutMs?: number; authenticatedToken?: string }): Promise<ScannerModuleOutput>;
}
