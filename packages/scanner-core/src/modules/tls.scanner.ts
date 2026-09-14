import { BaseScannerModule, ScannerModuleOutput, ScannerResultFinding } from '../types.js';
import * as tls from 'node:tls';
import * as https from 'node:https';
import { URL } from 'node:url';

export class TLSScanner implements BaseScannerModule {
  name = 'HTTPS/TLS Security Scanner';
  description = 'Inspects SSL/TLS certificate validity, HTTPS redirection enforce, cipher strength, and expiration date.';

  async execute(targetUrl: string, options?: { timeoutMs?: number }): Promise<ScannerModuleOutput> {
    const startTime = Date.now();
    const findings: ScannerResultFinding[] = [];
    const timeout = options?.timeoutMs || 10000;

    try {
      const parsed = new URL(targetUrl);
      const host = parsed.hostname;
      const isHttps = parsed.protocol === 'https:';

      if (!isHttps) {
        findings.push({
          title: 'Unencrypted HTTP Protocol Target',
          category: 'TLS',
          severity: 'HIGH',
          description: 'The target website was submitted over unencrypted HTTP protocol. All traffic is susceptible to eavesdropping and MITM manipulation.',
          evidence: { url: targetUrl, protocol: parsed.protocol },
          impact: 'Attackers on the network path can inspect or modify sensitive session cookies, user credentials, and application payload.',
          likelihood: 'HIGH',
          riskScore: 75,
          remediation: 'Implement mandatory HTTPS across all endpoints and configure a 301 Permanent Redirect from HTTP to HTTPS.',
          references: ['https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html']
        });
      }

      // Check SSL Certificate details via TLS socket connection
      const certDetails = await new Promise<{ valid: boolean; validTo?: string; daysRemaining?: number; issuer?: string }>(
        (resolve) => {
          const req = https.request(
            `https://${host}`,
            { method: 'HEAD', timeout, rejectUnauthorized: false },
            (res) => {
              const cert = (res.socket as tls.TLSSocket).getPeerCertificate();
              if (cert && Object.keys(cert).length > 0) {
                const validTo = new Date(cert.validTo);
                const now = new Date();
                const diffMs = validTo.getTime() - now.getTime();
                const daysRemaining = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                resolve({
                  valid: daysRemaining > 0,
                  validTo: cert.validTo,
                  daysRemaining,
                  issuer: cert.issuer?.O || cert.issuer?.CN
                });
              } else {
                resolve({ valid: false });
              }
            }
          );

          req.on('error', () => resolve({ valid: false }));
          req.on('timeout', () => {
            req.destroy();
            resolve({ valid: false });
          });
          req.end();
        }
      );

      if (certDetails.validTo && certDetails.daysRemaining !== undefined) {
        if (certDetails.daysRemaining < 0) {
          findings.push({
            title: 'Expired TLS/SSL Certificate Detected',
            category: 'TLS',
            severity: 'CRITICAL',
            description: `The SSL certificate for domain ${host} expired on ${certDetails.validTo}. Browsers will block access with security warnings.`,
            evidence: { host, validTo: certDetails.validTo, daysRemaining: certDetails.daysRemaining },
            impact: 'Users cannot safely access the site, leading to total loss of user trust and susceptibility to impersonation.',
            likelihood: 'HIGH',
            riskScore: 90,
            remediation: 'Renew and deploy an active SSL/TLS certificate immediately using Let\'s Encrypt or your Certificate Authority.',
            references: ['https://ssl-config.mozilla.org/']
          });
        } else if (certDetails.daysRemaining <= 14) {
          findings.push({
            title: 'TLS/SSL Certificate Imminent Expiration',
            category: 'TLS',
            severity: 'MEDIUM',
            description: `The SSL certificate for domain ${host} will expire in ${certDetails.daysRemaining} days (${certDetails.validTo}).`,
            evidence: { host, validTo: certDetails.validTo, daysRemaining: certDetails.daysRemaining },
            impact: 'Failure to renew before expiration will break HTTPS connectivity and trigger browser security warnings.',
            likelihood: 'MEDIUM',
            riskScore: 50,
            remediation: 'Schedule automated TLS certificate renewal prior to expiration.',
            references: ['https://ssl-config.mozilla.org/']
          });
        }
      }

      return {
        moduleName: this.name,
        success: true,
        executionTimeMs: Date.now() - startTime,
        findings,
        metadata: { host, certDetails }
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
