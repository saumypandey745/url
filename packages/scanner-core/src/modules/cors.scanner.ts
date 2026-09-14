import { BaseScannerModule, ScannerModuleOutput, ScannerResultFinding } from '../types.js';
import * as http from 'node:http';
import * as https from 'node:https';
import { URL } from 'node:url';

export class CORSScanner implements BaseScannerModule {
  name = 'Cross-Origin Resource Sharing (CORS) Scanner';
  description = 'Audits CORS configurations for unsafe wildcard origins (*), credentialed reflections, and permissive cross-origin access.';

  async execute(targetUrl: string, options?: { timeoutMs?: number }): Promise<ScannerModuleOutput> {
    const startTime = Date.now();
    const findings: ScannerResultFinding[] = [];
    const timeout = options?.timeoutMs || 10000;

    try {
      const parsed = new URL(targetUrl);
      const client = parsed.protocol === 'https:' ? https : http;

      const testOrigin = 'https://evil-attacker-domain.example';

      const resHeaders = await new Promise<Record<string, string>>((resolve) => {
        const req = client.request(
          targetUrl,
          {
            method: 'OPTIONS',
            timeout,
            headers: {
              'User-Agent': 'SecPlatform-SecurityScanner/1.0',
              'Origin': testOrigin,
              'Access-Control-Request-Method': 'GET'
            }
          },
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

      const allowOrigin = resHeaders['access-control-allow-origin'];
      const allowCredentials = resHeaders['access-control-allow-credentials'];

      // 1. Wildcard origin check
      if (allowOrigin === '*') {
        findings.push({
          title: 'Wildcard Access-Control-Allow-Origin Implemented',
          category: 'CORS',
          severity: 'MEDIUM',
          description: 'The server returns Access-Control-Allow-Origin: * on pre-flight request.',
          evidence: { header: 'Access-Control-Allow-Origin', value: '*' },
          impact: 'Any external web application can make cross-origin requests and read public responses.',
          likelihood: 'MEDIUM',
          riskScore: 45,
          remediation: 'Restrict Access-Control-Allow-Origin to an explicit list of trusted origin domains.',
          references: ['https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS']
        });
      }

      // 2. Arbitrary Origin Reflection + Credentials
      if (allowOrigin === testOrigin && allowCredentials === 'true') {
        findings.push({
          title: 'Unsafe Dynamic CORS Origin Reflection with Credentials',
          category: 'CORS',
          severity: 'CRITICAL',
          description: 'The server reflects untrusted arbitrary Origin headers while enabling Access-Control-Allow-Credentials: true.',
          evidence: { allowOrigin, allowCredentials, testedOrigin: testOrigin },
          impact: 'Attacker domains can make authenticated cross-origin API calls on behalf of logged-in users and exfiltrate responses.',
          likelihood: 'HIGH',
          riskScore: 90,
          remediation: 'Validate incoming Origin headers against an explicit, strict server-side allowlist before reflecting them.',
          references: ['https://portswigger.net/web-security/cors']
        });
      }

      return {
        moduleName: this.name,
        success: true,
        executionTimeMs: Date.now() - startTime,
        findings,
        metadata: { allowOrigin: allowOrigin || 'NONE', allowCredentials: allowCredentials || 'false' }
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
