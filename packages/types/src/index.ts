export type RoleType = 'OWNER' | 'ADMIN' | 'SECURITY_ANALYST' | 'DEVELOPER' | 'VIEWER';

export type PermissionType = 
  | 'asset.read' | 'asset.write' | 'asset.verify' | 'asset.delete'
  | 'scan.run' | 'scan.read' | 'scan.cancel'
  | 'finding.read' | 'finding.update'
  | 'incident.read' | 'incident.manage'
  | 'recovery.execute' | 'recovery.verify'
  | 'report.generate' | 'team.manage' | 'settings.manage';

export type AssetVerificationStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'FAILED';
export type VerificationMethod = 'DNS_TXT' | 'META_TAG' | 'FILE_UPLOAD' | 'API_TOKEN';

export type AssetStatus = 'PENDING_VERIFICATION' | 'VERIFIED' | 'SCANNING' | 'HEALTHY' | 'AT_RISK' | 'COMPROMISED' | 'RECOVERY_REQUIRED';

export type ScanStatus = 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export type FindingSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export type FindingStatus = 'OPEN' | 'ACKNOWLEDGED' | 'IN_PROGRESS' | 'FIXED' | 'VERIFIED' | 'FALSE_POSITIVE';

export type IncidentStatus = 'OPEN' | 'INVESTIGATING' | 'CONTAINED' | 'RECOVERY' | 'VERIFICATION' | 'RESOLVED';

export type IncidentSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type CompromiseStatus = 'HEALTHY' | 'SUSPICIOUS' | 'HIGH_RISK' | 'POSSIBLE_COMPROMISE';

export interface FindingEvidence {
  headerName?: string;
  headerValue?: string;
  cookieName?: string;
  cookieFlags?: string[];
  url?: string;
  statusCode?: number;
  snippet?: string;
  matchedPattern?: string;
  recommendation?: string;
  [key: string]: any;
}

export interface SecurityScoreBreakdown {
  overallScore: number; // 0 - 100
  riskLevel: 'EXCELLENT' | 'GOOD' | 'MODERATE' | 'HIGH_RISK' | 'CRITICAL_RISK';
  tlsScore: number;
  headersScore: number;
  cookiesScore: number;
  corsScore: number;
  apiScore: number;
  exposureScore: number;
  integrityScore: number;
  deductions: Array<{
    findingId: string;
    title: string;
    points: number;
    category: string;
  }>;
}

export interface ConceptualAttackScenario {
  attackerGoal: string;
  potentialWeakness: string;
  prerequisites: string[];
  potentialImpact: string;
  detection: string;
  mitigation: string;
  verification: string;
}

export interface AIAnalysisResult {
  whatHappened: string;
  whyItMatters: string;
  potentialImpact: string;
  riskContext: string;
  recommendedFix: string;
  verificationSteps: string[];
  attackScenario: ConceptualAttackScenario;
}

export interface AuditLogEntry {
  id: string;
  userId?: string;
  userEmail?: string;
  action: string;
  targetAssetId?: string;
  targetDomain?: string;
  ipAddress?: string;
  userAgent?: string;
  details?: Record<string, any>;
  createdAt: string;
}
