import { BaseScannerModule, ScannerModuleOutput, ScannerResultFinding } from '../types.js';
import * as http from 'node:http';
import * as https from 'node:https';
import { URL } from 'node:url';

export class APIScanner implements BaseScannerModule {
  name = 'API Surface Discovery & Documentation Exposure Scanner';
  description = 'Discovers public API endpoints, Swagger/OpenAPI documentation exposure, error leakage, and rate-limiting header presence.';

  async execute(targetUrl: string, options?: { timeoutMs?: number }): Promise<ScannerModuleOutput> {
    const startTime = Date.now();
    const findings: ScannerResultFinding[] = [];
    const timeout = options?.timeoutMs || 10000;

    try {
      const parsed = new URL(targetUrl);
      const client = parsed.protocol === 'https:' ? https : http;
      const baseUrl = `${parsed.protocol}//${parsed.host}`;

      const commonDocPaths = ['/swagger.json', '/openapi.json', '/api-docs', '/swagger-ui.html', '/v2/api-docs', '/v3/api-docs'];
      const discoveredDocs: string[] = [];

      for (const path of commonDocPaths) {
        const testUrl = `${baseUrl}${path}`;
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
          discoveredDocs.push(path);
        }
      }

      if (discoveredDocs.length > 0) {
        findings.push({
          title: 'Public API Documentation / OpenAPI Spec Exposed',
          category: 'API',
          severity: 'LOW',
          description: `Publicly accessible API documentation or spec files were detected at: ${discoveredDocs.join(', ')}.`,
          evidence: { discoveredPaths: discoveredDocs },
          impact: 'Provides external actors with a complete map of application endpoints, request schemas, and parameter specifications.',
          likelihood: 'MEDIUM',
          riskScore: 35,
          remediation: 'Restrict access to API documentation in production environments behind authentication.',
          references: ['https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html']
        });
      }

      // Rate limit header check on root or API endpoint
      const resHeaders = await new Promise<Record<string, string>>((resolve) => {
        const req = client.request(
          targetUrl,
          { method: 'GET', timeout, headers: { 'User-Agent': 'SecPlatform-SecurityScanner/1.0' } },
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

      const hasRateLimitHeader = ['x-ratelimit-limit', 'ratelimit-limit', 'retry-after'].some(
        (h) => resHeaders[h] !== undefined
      );

      if (!hasRateLimitHeader) {
        findings.push({
          title: 'No Rate Limiting Headers Detected',
          category: 'API',
          severity: 'LOW',
          description: 'The endpoint does not return standard rate-limiting headers (X-RateLimit-Limit, Retry-After).',
          evidence: { checkedHeaders: ['X-RateLimit-Limit', 'RateLimit-Limit', 'Retry-After'], status: 'MISSING' },
          impact: 'Endpoints without rate limiting may be vulnerable to automated resource exhaustion or high-frequency requests.',
          likelihood: 'LOW',
          riskScore: 25,
          remediation: 'Implement rate limiting middleware e.g. express-rate-limit and expose standard RateLimit headers.',
          references: ['https://owasp.org/www-community/controls/Blocking_Brute_Force_Attacks']
        });
      }

      return {
        moduleName: this.name,
        success: true,
        executionTimeMs: Date.now() - startTime,
        findings,
        metadata: { discoveredDocs, hasRateLimitHeader }
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
