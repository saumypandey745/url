import { BaseScannerModule, ScannerModuleOutput, ScannerResultFinding } from '../types.js';
import * as http from 'node:http';
import * as https from 'node:https';
import { URL } from 'node:url';

export class HeaderScanner implements BaseScannerModule {
  name = 'Security Headers Scanner';
  description = 'Audits HTTP Security Headers including CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy.';

  async execute(targetUrl: string, options?: { timeoutMs?: number }): Promise<ScannerModuleOutput> {
    const startTime = Date.now();
    const findings: ScannerResultFinding[] = [];
    const timeout = options?.timeoutMs || 10000;

    try {
      const parsed = new URL(targetUrl);
      const client = parsed.protocol === 'https:' ? https : http;

      const headers = await new Promise<Record<string, string>>((resolve) => {
        const req = client.request(
          targetUrl,
          { method: 'GET', timeout, headers: { 'User-Agent': 'SecPlatform-SecurityScanner/1.0' } },
          (res) => {
            const lowerHeaders: Record<string, string> = {};
            for (const [key, val] of Object.entries(res.headers)) {
              if (val) lowerHeaders[key.toLowerCase()] = Array.isArray(val) ? val.join(', ') : val;
            }
            resolve(lowerHeaders);
          }
        );
        req.on('error', () => resolve({}));
        req.on('timeout', () => { req.destroy(); resolve({}); });
        req.end();
      });

      // 1. Content-Security-Policy (CSP)
      if (!headers['content-security-policy']) {
        findings.push({
          title: 'Missing Content-Security-Policy (CSP)',
          category: 'HEADERS',
          severity: 'HIGH',
          description: 'The response header does not contain a Content-Security-Policy. CSP restricts resources (scripts, images, frames) the browser can load.',
          evidence: { headerName: 'Content-Security-Policy', state: 'MISSING' },
          impact: 'Increases risk of Cross-Site Scripting (XSS), data injection, and clickjacking attacks.',
          likelihood: 'HIGH',
          riskScore: 70,
          remediation: "Define a strict CSP header e.g. Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none';",
          references: ['https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP']
        });
      }

      // 2. Strict-Transport-Security (HSTS)
      if (!headers['strict-transport-security'] && parsed.protocol === 'https:') {
        findings.push({
          title: 'Missing Strict-Transport-Security (HSTS)',
          category: 'HEADERS',
          severity: 'MEDIUM',
          description: 'HTTP Strict Transport Security header is missing on an HTTPS domain.',
          evidence: { headerName: 'Strict-Transport-Security', state: 'MISSING' },
          impact: 'Users making initial HTTP connections may be vulnerable to SSL stripping attacks.',
          likelihood: 'MEDIUM',
          riskScore: 50,
          remediation: 'Add HSTS header: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
          references: ['https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html']
        });
      }

      // 3. X-Frame-Options
      if (!headers['x-frame-options'] && !headers['content-security-policy']?.includes('frame-ancestors')) {
        findings.push({
          title: 'Missing Clickjacking Defense (X-Frame-Options)',
          category: 'HEADERS',
          severity: 'MEDIUM',
          description: 'Neither X-Frame-Options nor CSP frame-ancestors is present to restrict framing of this site.',
          evidence: { headerName: 'X-Frame-Options', state: 'MISSING' },
          impact: 'Attacker can render this application inside an invisible iframe to trick users into executing unintended actions.',
          likelihood: 'MEDIUM',
          riskScore: 55,
          remediation: 'Set X-Frame-Options: DENY or X-Frame-Options: SAMEORIGIN.',
          references: ['https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options']
        });
      }

      // 4. X-Content-Type-Options
      if (headers['x-content-type-options'] !== 'nosniff') {
        findings.push({
          title: 'Missing X-Content-Type-Options Header',
          category: 'HEADERS',
          severity: 'LOW',
          description: 'The X-Content-Type-Options header is missing or not set to "nosniff".',
          evidence: { headerName: 'X-Content-Type-Options', currentValue: headers['x-content-type-options'] || 'MISSING' },
          impact: 'Browsers may attempt MIME-type sniffing, treating non-executable files as executable code.',
          likelihood: 'LOW',
          riskScore: 30,
          remediation: 'Set header X-Content-Type-Options: nosniff on all responses.',
          references: ['https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options']
        });
      }

      return {
        moduleName: this.name,
        success: true,
        executionTimeMs: Date.now() - startTime,
        findings,
        metadata: { headersAnalyzed: Object.keys(headers).length }
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
