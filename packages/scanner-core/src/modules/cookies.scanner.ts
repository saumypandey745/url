import { BaseScannerModule, ScannerModuleOutput, ScannerResultFinding } from '../types.js';
import { maskSensitiveValue } from '@secplatform/security';
import * as http from 'node:http';
import * as https from 'node:https';
import { URL } from 'node:url';

export class CookieScanner implements BaseScannerModule {
  name = 'Cookie Security & Session Attributes Scanner';
  description = 'Analyzes Set-Cookie headers for missing Secure, HttpOnly, and SameSite flags while strictly redacting raw cookie values.';

  async execute(targetUrl: string, options?: { timeoutMs?: number }): Promise<ScannerModuleOutput> {
    const startTime = Date.now();
    const findings: ScannerResultFinding[] = [];
    const timeout = options?.timeoutMs || 10000;

    try {
      const parsed = new URL(targetUrl);
      const client = parsed.protocol === 'https:' ? https : http;

      const setCookieHeaders = await new Promise<string[]>((resolve) => {
        const req = client.request(
          targetUrl,
          { method: 'GET', timeout, headers: { 'User-Agent': 'SecPlatform-SecurityScanner/1.0' } },
          (res) => {
            const rawCookies = res.headers['set-cookie'];
            if (!rawCookies) resolve([]);
            resolve(Array.isArray(rawCookies) ? rawCookies : [rawCookies]);
          }
        );
        req.on('error', () => resolve([]));
        req.on('timeout', () => { req.destroy(); resolve([]); });
        req.end();
      });

      for (const cookieStr of setCookieHeaders) {
        const parts = cookieStr.split(';').map((p) => p.trim());
        const [nameValue] = parts;
        const eqIdx = nameValue.indexOf('=');
        const cookieName = eqIdx > -1 ? nameValue.substring(0, eqIdx) : nameValue;
        const rawVal = eqIdx > -1 ? nameValue.substring(eqIdx + 1) : '';
        const maskedVal = maskSensitiveValue(rawVal);

        const isSecure = parts.some((p) => p.toLowerCase() === 'secure');
        const isHttpOnly = parts.some((p) => p.toLowerCase() === 'httponly');
        const sameSitePart = parts.find((p) => p.toLowerCase().startsWith('samesite='));
        const sameSiteVal = sameSitePart ? sameSitePart.split('=')[1]?.toLowerCase() : undefined;

        // 1. Missing HttpOnly
        if (!isHttpOnly) {
          findings.push({
            title: `Cookie Missing HttpOnly Flag (${cookieName})`,
            category: 'COOKIES',
            severity: 'HIGH',
            description: `The cookie "${cookieName}" is set without the HttpOnly attribute.`,
            evidence: { cookieName, maskedValue: maskedVal, missingFlag: 'HttpOnly' },
            impact: 'Client-side scripts (e.g. via XSS) can access cookie content, potentially stealing session identifiers.',
            likelihood: 'HIGH',
            riskScore: 65,
            remediation: 'Append HttpOnly attribute to Set-Cookie header for session and security cookies.',
            references: ['https://owasp.org/www-community/HttpOnly']
          });
        }

        // 2. Missing Secure
        if (!isSecure && parsed.protocol === 'https:') {
          findings.push({
            title: `Cookie Missing Secure Flag (${cookieName})`,
            category: 'COOKIES',
            severity: 'HIGH',
            description: `The cookie "${cookieName}" is served over HTTPS without the Secure attribute.`,
            evidence: { cookieName, maskedValue: maskedVal, missingFlag: 'Secure' },
            impact: 'Browsers may transmit this cookie over unencrypted HTTP requests, exposing session secrets on the network.',
            likelihood: 'MEDIUM',
            riskScore: 60,
            remediation: 'Append Secure attribute to Set-Cookie header.',
            references: ['https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#secure']
          });
        }

        // 3. Lax / Missing SameSite
        if (!sameSiteVal || sameSiteVal === 'none') {
          findings.push({
            title: `Weak or Missing Cookie SameSite Attribute (${cookieName})`,
            category: 'COOKIES',
            severity: 'MEDIUM',
            description: `The cookie "${cookieName}" uses SameSite=${sameSiteVal || 'MISSING'}.`,
            evidence: { cookieName, maskedValue: maskedVal, sameSite: sameSiteVal || 'MISSING' },
            impact: 'Increases susceptibility to Cross-Site Request Forgery (CSRF) attacks.',
            likelihood: 'MEDIUM',
            riskScore: 45,
            remediation: 'Set SameSite=Lax or SameSite=Strict for session cookies.',
            references: ['https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#samesite']
          });
        }
      }

      return {
        moduleName: this.name,
        success: true,
        executionTimeMs: Date.now() - startTime,
        findings,
        metadata: { cookiesAnalyzedCount: setCookieHeaders.length }
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
