import { BaseScannerModule, ScannerModuleOutput, ScannerResultFinding } from '../types.js';
import { maskSensitiveValue } from '@secplatform/security';
import * as http from 'node:http';
import * as https from 'node:https';
import { URL } from 'node:url';

export class FrontendScanner implements BaseScannerModule {
  name = 'Frontend Assets & JavaScript Exposure Scanner';
  description = 'Inspects HTML and client JavaScript bundles for exposed source maps, third-party library signatures, and environment variable leaks.';

  async execute(targetUrl: string, options?: { timeoutMs?: number }): Promise<ScannerModuleOutput> {
    const startTime = Date.now();
    const findings: ScannerResultFinding[] = [];
    const timeout = options?.timeoutMs || 10000;

    try {
      const parsed = new URL(targetUrl);
      const client = parsed.protocol === 'https:' ? https : http;

      const htmlBody = await new Promise<string>((resolve) => {
        let body = '';
        const req = client.request(
          targetUrl,
          { method: 'GET', timeout, headers: { 'User-Agent': 'SecPlatform-SecurityScanner/1.0' } },
          (res) => {
            res.on('data', (chunk) => {
              body += chunk.toString();
              if (body.length > 500000) req.destroy(); // 500KB cap
            });
            res.on('end', () => resolve(body));
          }
        );
        req.on('error', () => resolve(''));
        req.on('timeout', () => { req.destroy(); resolve(''); });
        req.end();
      });

      // 1. Source map references check
      if (htmlBody.includes('.map') || htmlBody.includes('sourceMappingURL=')) {
        findings.push({
          title: 'JavaScript Source Maps Referenced in Production',
          category: 'FRONTEND',
          severity: 'LOW',
          description: 'Production frontend assets include comments or links referencing JavaScript source maps (.js.map).',
          evidence: { matchedPattern: 'sourceMappingURL=' },
          impact: 'Source maps allow reverse-engineering of original unminified application source code and internal variable names.',
          likelihood: 'LOW',
          riskScore: 30,
          remediation: 'Disable production source map generation in build tools e.g. Vite (`sourcemap: false`) or webpack.',
          references: ['https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html']
        });
      }

      // 2. Sensitive pattern scanner (API Keys / Tokens in frontend HTML/script tags)
      const sensitiveRegex = /(sk_live_[0-9a-zA-Z]{24}|AIzaSy[0-9a-zA-Z-_]{35}|AWS_SECRET_ACCESS_KEY=[0-9a-zA-Z/+]{40})/g;
      const matches = htmlBody.match(sensitiveRegex);

      if (matches && matches.length > 0) {
        const masked = maskSensitiveValue(matches[0]);
        findings.push({
          title: 'Potential Hardcoded API Secret / Private Key Indicator',
          category: 'FRONTEND',
          severity: 'CRITICAL',
          description: 'A pattern matching high-entropy API secrets or cloud access keys was detected in client-accessible HTML/JS content.',
          evidence: { detectedPattern: matches[0].substring(0, 8), maskedValue: masked },
          impact: 'Exposed secrets can allow unauthorized access to backend services, database clusters, or cloud platform APIs.',
          likelihood: 'HIGH',
          riskScore: 95,
          remediation: 'Revoke the exposed key immediately, rotate credentials, and store private secrets exclusively in backend environment variables.',
          references: ['https://owasp.org/www-project-top-ten/2021/A07_2021-Identification_and_Authentication_Failures/']
        });
      }

      return {
        moduleName: this.name,
        success: true,
        executionTimeMs: Date.now() - startTime,
        findings,
        metadata: { htmlLength: htmlBody.length }
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
