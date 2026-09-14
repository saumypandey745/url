# PROJECT AUDIT & ARCHITECTURE SPECIFICATION
**Platform:** AI Website Security Assessment, Vulnerability Detection, Attack-Surface Monitoring & Incident Recovery Platform

---

## 1. CURRENT WORKSPACE STATE
- **Target Workspace:** `/home/saumy/Desktop/url`
- **Existing Files:** None (Empty Directory).
- **Audit Findings:** Clean slate build. Full production architecture must be created from scratch following enterprise cybersecurity standards.

---

## 2. ARCHITECTURE OVERVIEW

The platform uses a modular, scalable full-stack TypeScript architecture designed with security-first boundaries:

```
                  ┌───────────────────────────────────────────┐
                  │          React + TS + Vite Web App        │
                  │   (Enterprise SOC Dark Mode Dashboard)    │
                  └─────────────────────┬─────────────────────┘
                                        │ REST API / SSE
                                        ▼
                  ┌───────────────────────────────────────────┐
                  │          Express + TS API Server           │
                  │   (Auth, RBAC, SSRF Shield, Audit Log)   │
                  └──────┬─────────────────────────────┬──────┘
                         │                             │
       ┌─────────────────┴────────┐                   ┌┴─────────────────────────┐
       ▼                          ▼                   ▼                          ▼
┌──────────────┐          ┌──────────────┐    ┌──────────────┐          ┌──────────────┐
│  PostgreSQL  │          │    Redis /   │    │ Modular Scan │          │  AI Security │
│   (Prisma)   │          │  Job Queue   │    │    Engine    │          │    Analyst   │
└──────────────┘          └──────────────┘    └──────────────┘          └──────────────┘
```

---

## 3. CORE MODULES & RESPONSIBILITIES

### A. Security Scanner Engine (`packages/scanner-core`)
- **HTTPS/TLS Scanner**: Certificate validity, expiration, cipher suites, TLS version, mixed content, HTTP-to-HTTPS redirect enforce.
- **Security Headers Scanner**: Validates CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP, CORP.
- **Cookie Security Scanner**: Flags insecure cookies (missing `Secure`, `HttpOnly`, `SameSite`), redacting values as `session=********`.
- **CORS Configuration Scanner**: Flags unsafe origins, wildcard reflection, credentialed wildcard configurations safely.
- **API Surface Scanner**: Detects exposed public API endpoints, Swagger/OpenAPI docs, error disclosure, rate-limiting headers.
- **Frontend Security Scanner**: Identifies exposed JS source maps, sensitive environment variable leaks (masked), obsolete client-side libraries.
- **Exposure & Info Leak Scanner**: Detects exposed debug flags, server version headers (`Server`, `X-Powered-By`), public `.git`/`.env`/backup file indicators.
- **Integrity & Compromise Scanner**: Analyzes unauthorized script injection indicators, unexpected redirects, administrative backdoor patterns safely.

### B. SSRF Protection & Hardening (`packages/security`)
- Strict URL validation & parsing (`http` / `https` scheme enforce).
- Pre-flight DNS resolution checking against RFC 1918 private IPs (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), loopback (`127.0.0.1`, `::1`), link-local (`169.254.0.0/16`), and cloud metadata (`169.254.169.254`).
- Request timeout (max 10s per request), response payload cap (max 5MB), and maximum redirect depth (max 3).

### C. Ownership Verification Engine
- Requires verified asset ownership before active deep scanning or recovery workflows.
- Verification strategies:
  1. DNS TXT record (`_aipatriot-verify=<token>`)
  2. HTTP verification file (`/.well-known/security-verification.txt`)
  3. Meta tag injection (`<meta name="security-platform-verification" content="...">`)
  4. Scoped API / Account token check

### D. Incident Response & Recovery Center
- **"Is My Website Compromised?"**: Automated safety assessment pipeline categorizing status as `HEALTHY`, `SUSPICIOUS`, `HIGH_RISK`, or `POSSIBLE_COMPROMISE`.
- **13-Step Guided Recovery Workflow**:
  1. Ownership Verification Check
  2. Recovery Snapshot Creation
  3. Affected Component Analysis
  4. Session/Token Revocation
  5. Credential/Secret Rotation Workflow
  6. Admin Account Audit
  7. Known-Clean Backup Restoration Trigger
  8. Unauthorized Code Removal Guidance
  9. Patch Deployment Checklist
  10. Security Control Re-configuration
  11. Verification Rescan Trigger
  12. Recovery State Lock & Sign-off
  13. Executive Incident Report Generation

### E. AI Security Analyst Engine
- Translates raw technical scanner output into contextualized, human-readable insights:
  - Detection summary
  - Business impact & likelihood
  - Non-destructive conceptual attack scenario
  - Exact remediation instructions
  - Verification checklist
- Strictly enforced guardrails: zero exploit payload generation, zero attack execution steps, zero credential leakage.

---

## 4. PROPOSED DATABASE SCHEMA (Prisma / PostgreSQL)
Entities:
- `User`, `Organization`, `Membership`, `Role`, `Permission`
- `Asset`, `AssetVerification`
- `Scan`, `ScanModuleResult`, `Finding`, `FindingEvidence`, `FindingStatusHistory`
- `Incident`, `IncidentTimelineEvent`, `RecoveryJob`, `RecoveryStep`
- `BackupReference`, `SecretRotationLog`, `ActiveSession`
- `MonitoringSchedule`, `Notification`, `AuditLog`, `SecurityReport`

---

## 5. SECURITY & ETHICAL BOUNDARIES
1. Non-destructive, authorization-gated active scanning.
2. Mandatory ownership verification for all active scans & recovery actions.
3. Complete redaction/masking of sensitive secrets (`session=***`, `API_KEY=sk-***`).
4. Hardened SSRF defense blocking internal corporate & cloud infrastructure targets.
5. Append-only audit log for all system activities.

---

## 6. PHASED IMPLEMENTATION STRATEGY
- **Phase 1**: Monorepo Setup & Core Shared Package Initialization
- **Phase 2**: SSRF Shield & Modular Security Scanner Engine
- **Phase 3**: Backend API Server, Database Schema & Authentication/RBAC/Audit Logging
- **Phase 4**: Incident Detection & 13-Step Recovery Workflow Engine
- **Phase 5**: AI Security Analyst & PDF/HTML Report Generator
- **Phase 6**: Enterprise Dark-Mode SOC Frontend Application (React + Vite + Tailwind + Recharts)
- **Phase 7**: End-to-End Integration, Verification Suite & Documentation
