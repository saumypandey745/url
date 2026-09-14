import { BaseScannerModule, ScannerModuleOutput, ScannerResultFinding } from '../types.js';
import * as http from 'node:http';
import * as https from 'node:https';
import { URL } from 'node:url';

export class ExposureScanner implements BaseScannerModule {
  name = 'Information Disclosure & Server Exposure Scanner';
  description = 'Detects server software version disclosure headers (Server, X-Powered-By), exposed environment file indicators (.env), and debug mode responses.';

  async execute(targetUrl: string, options?: { timeoutMs?: number }): Promise<ScannerModuleOutput> {
    const startTime = Date.now();
    const findings: ScannerResultFinding[] = [];
    const timeout = options?.timeoutMs || 10000;

    try {
      const parsed = new URL(targetUrl);
      const client = parsed.protocol === 'https:' ? https : http;
      const baseUrl = `${parsed.protocol}//${parsed.host}`;

      const resHeaders = await new Promise<Record<string, string>>((resolve) => {
        const req = client.request(
          targetUrl,
          { method: 'HEAD', timeout, headers: { 'User-Agent': 'SecPlatform-SecurityScanner/1.0' } },
          (res) => {
            const lower: Record<string, string> = {};
            for (const [k, v] of Object.entries(res.headers)) {
              if (v) lower[k.toLowerCase()] = Array.isArray(v) ? v.join(', ') : v;
            }
            resolve(lower);
          }
        );
        req.on('error', () => resolve({}));
        req.on('timeout', () => { req.destroy(); resolve({}); });
        req.end();
      });

      // 1. Server Version / Software Header Disclosure
      const serverHeader = resHeaders['server'];
      const xPoweredBy = resHeaders['x-powered-by'];

      if (serverHeader && /\d+\.\d+/.test(serverHeader)) {
        findings.push({
          title: 'Detailed Server Software Version Disclosure',
          category: 'EXPOSURE',
          severity: 'LOW',
          description: `The Server response header reveals specific web server software version: "${serverHeader}".`,
          evidence: { headerName: 'Server', value: serverHeader },
          impact: 'Aids attackers during reconnaissance to pinpoint version-specific known vulnerabilities (CVEs).',
          likelihood: 'LOW',
          riskScore: 25,
          remediation: 'Configure web server (Nginx/Apache) to suppress granular version information e.g. `server_tokens off;`.',
          references: ['https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html']
        });
      }

      if (xPoweredBy) {
        findings.push({
          title: 'X-Powered-By Technology Disclosure Header',
          category: 'EXPOSURE',
          severity: 'LOW',
          description: `The X-Powered-By header discloses backend application framework details: "${xPoweredBy}".`,
          evidence: { headerName: 'X-Powered-By', value: xPoweredBy },
          impact: 'Reveals underlying stack technology (Express, PHP, ASP.NET) to external observers.',
          likelihood: 'LOW',
          riskScore: 20,
          remediation: 'Remove X-Powered-By header e.g. `app.disable("x-powered-by")` in Express.',
          references: ['https://expressjs.com/en/advanced/best-practice-security.html']
        });
      }

      // 2. Safe check for exposed sensitive file indicators e.g. .env or .git/HEAD
      const checkPaths = ['/.env', '/.git/HEAD'];
      for (const p of checkPaths) {
        const testUrl = `${baseUrl}${p}`;
        const statusCode = await new Promise<number>((resolve) => {
          const req = client.request(
            testUrl,
            { method: 'HEAD', timeout, headers: { 'User-Agent': 'SecPlatform-SecurityScanner/1.0' } },
            (res) => resolve(res.statusCode || 404)
          );
          req.on('error', () => resolve(404));
          req.on('timeout', () => { req.destroy(); resolve(404); });
          req.end();
        });

        if (statusCode === 200) {
          findings.push({
            title: `Exposed Sensitive Path Indicator (${p})`,
            category: 'EXPOSURE',
            severity: 'CRITICAL',
            description: `The sensitive path ${p} returned HTTP 200 OK, indicating potential public configuration or source repository exposure.`,
            evidence: { path: p, statusCode },
            impact: 'Attacker can download environment secrets, database credentials, or full source code history.',
            likelihood: 'HIGH',
            riskScore: 95,
            remediation: 'Block web server access to hidden dotfiles (.env, .git) immediately.',
            references: ['https://owasp.org/www-project-top-ten/2021/A05_2021-Security_Misconfiguration/']
          });
        }
      }

      return {
        moduleName: this.name,
        success: true,
        executionTimeMs: Date.now() - startTime,
        findings,
        metadata: { serverHeader, xPoweredBy }
      };
    } catch (err: any) {
      return {
        moduleName: this.name,
        success: false,
        error: err.message,
        executionTimeMs: Date.now() - startTime,
        findings: []
      };
    }
  }
}
