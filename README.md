# AI WEBSITE SECURITY ASSESSMENT, ATTACK-SURFACE MONITORING & INCIDENT RECOVERY PLATFORM

Production-grade enterprise platform for website security assessment, vulnerability detection, risk analysis, ownership verification, and 13-step guided incident recovery.

---

## 1. PRODUCT ARCHITECTURE

```text
React (SOC Dark UI)  ──> Express API Server ──> BullMQ / Redis Workers ──> Modular Scanner Core ──> Prisma / PostgreSQL
```

- **SSRF Shield (`packages/security`)**: Pre-flight DNS resolution and IP address filter blocking access to loopback (`127.0.0.1`, `::1`), private networks (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), and cloud metadata services (`169.254.169.254`).
- **Modular Security Scanners (`packages/scanner-core`)**: HTTPS/TLS, Security Headers (CSP, HSTS, X-Frame-Options), Cookie Masking (`session=********`), CORS, API Discovery, Frontend JS Assets, Exposure, and Integrity Checkers.
- **Ownership Verification Engine**: Requires DNS TXT (`_aipatriot-verify`), Meta-tag, or HTTP verification file confirmation before authorizing active scanning.
- **AI Security Analyst**: Non-destructive technical finding explanations, safe conceptual attack scenarios, and step-by-step remediation plans.
- **13-Step Guided Incident Recovery**: Complete step-by-step containment, session revocation, secret rotation guidance, patch verification, and rescan sign-off.
- **Audit Logging**: Append-only security audit log recording user actions, IP addresses, target domains, and timestamps.

---

## 2. MONOREPO STRUCTURE

```text
apps/
  web/          - React + TypeScript + Vite + Tailwind CSS + Recharts SOC Dashboard
  api/          - Node.js + Express + TypeScript API Server (Auth, RBAC, SSRF Shield, Audit Logs)
  worker/       - Background Scanner Job Queue Worker Engine

packages/
  scanner-core/ - Modular Security Scanners & Master Engine
  security/     - SSRF Shield Guard & Cookie Masking Utilities
  database/     - Prisma PostgreSQL & SQLite Database Schema
  types/        - Shared TypeScript Domain Interfaces

tests/          - Automated Node.js Security Test Suite
docker-compose.yml - Multi-container service orchestrator
```

---

## 3. LOCAL DEVELOPMENT SETUP

### Prerequisites
- Node.js v18+
- npm v9+
- Docker & Docker Compose (optional for PostgreSQL/Redis containerization)

### Installation & Execution

1. **Clone & Install Workspace Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

3. **Run Automated Test Suite**:
   ```bash
   npm test
   ```

4. **Launch Local Services via Docker**:
   ```bash
   docker-compose up --build
   ```
   - **Frontend Dashboard**: `http://localhost:3000`
   - **API Server**: `http://localhost:4000`

---

## 4. SECURITY BOUNDARIES & AUTHORIZATION

- **Strict Non-Destructive Operation**: All vulnerability scanners perform safe HTTP benchmark detection and non-destructive header inspections. Exploit generation, brute forcing, credential theft, and DDoS routines are prohibited by design.
- **Mandatory Ownership Verification**: Deep scanning and recovery modules are locked until domain ownership is validated via DNS TXT record or meta tag.
- **Secret Masking**: Raw cookie strings, JWT tokens, and detected API keys are automatically redacted in report outputs (`session=********`).

---

## 5. INCIDENT RECOVERY WORKFLOW (13 STEPS)

1. Verify Ownership & Authorization
2. Create Recovery Snapshot
3. Identify Affected Components
4. Revoke Active Sessions & Tokens
5. Rotate API Keys & Secrets
6. Review Administrative Accounts
7. Restore Known-Clean Backup
8. Remove Unauthorized Changes
9. Apply Security Patches
10. Reconfigure Security Controls
11. Trigger Verification Rescan
12. Verify Recovery State
13. Generate Executive Incident Report
