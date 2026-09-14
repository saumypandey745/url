import * as net from 'net';
import * as dns from 'dns/promises';
import { URL } from 'url';

/**
 * Enterprise SSRF Guard & Target Sanitizer
 * Prevents scanner workers from making unauthorized requests to internal infrastructure,
 * cloud metadata endpoints (169.254.169.254), loopback (127.0.0.1 / ::1), or RFC 1918 private IP ranges.
 */

export interface SSRFValidationResult {
  valid: boolean;
  reason?: string;
  sanitizedUrl?: string;
  resolvedIp?: string;
}

// RFC 1918 Private Ranges & Special Reserved CIDRs
const PRIVATE_IPV4_PATTERNS = [
  /^127\./,                        // Loopback
  /^10\./,                         // Class A Private
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,// Class B Private
  /^192\.168\./,                   // Class C Private
  /^169\.254\./,                   // Link-Local / Cloud Metadata
  /^0\./,                          // Current Network
  /^224\./,                        // Multicast
  /^240\./                         // Reserved
];

const PRIVATE_HOSTNAMES = [
  'localhost',
  'localhost.localdomain',
  'metadata.google.internal',
  '169.254.169.254',
  'instance-data'
];

export function isPrivateIP(ip: string): boolean {
  if (!net.isIP(ip)) return false;

  // IPv6 Checks
  if (net.isIPv6(ip)) {
    const normalized = ip.toLowerCase();
    return (
      normalized === '::1' ||
      normalized === '::' ||
      normalized.startsWith('fe80:') || // Link-local
      normalized.startsWith('fc00:') || // Unique Local Address
      normalized.startsWith('fd00:')
    );
  }

  // IPv4 Checks
  return PRIVATE_IPV4_PATTERNS.some((pattern) => pattern.test(ip));
}

export async function validateTargetUrl(rawUrl: string, allowInternalOverride = false): Promise<SSRFValidationResult> {
  try {
    let formattedUrl = rawUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const parsed = new URL(formattedUrl);

    // Protocol check
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return { valid: false, reason: `Disallowed protocol: ${parsed.protocol}. Only http and https are permitted.` };
    }

    const hostname = parsed.hostname.toLowerCase();

    // Direct Hostname checks
    if (!allowInternalOverride) {
      if (PRIVATE_HOSTNAMES.includes(hostname)) {
        return { valid: false, reason: `Forbidden target hostname: ${hostname}` };
      }

      if (isPrivateIP(hostname)) {
        return { valid: false, reason: `Forbidden target IP address (Private/Internal Range): ${hostname}` };
      }
    }

    // DNS pre-flight resolution check to prevent DNS rebinding SSRF
    try {
      const addresses = await dns.lookup(hostname, { all: true });
      if (!addresses || addresses.length === 0) {
        return { valid: false, reason: `DNS resolution failed for hostname: ${hostname}` };
      }

      for (const addr of addresses) {
        if (!allowInternalOverride && isPrivateIP(addr.address)) {
          return {
            valid: false,
            reason: `Target hostname ${hostname} resolved to private/internal IP address: ${addr.address}`
          };
        }
      }

      return {
        valid: true,
        sanitizedUrl: parsed.href,
        resolvedIp: addresses[0].address
      };
    } catch (err: any) {
      return { valid: false, reason: `DNS resolution error for target hostname ${hostname}: ${err.message}` };
    }
  } catch (err: any) {
    return { valid: false, reason: `Invalid target URL structure: ${err.message}` };
  }
}

/**
 * Mask sensitive string values (cookies, API tokens, passwords) for report safety
 */
export function maskSensitiveValue(value: string | undefined | null): string {
  if (!value) return '********';
  if (value.length <= 6) return '********';
  return `${value.substring(0, 3)}****${value.substring(value.length - 2)}`;
}
