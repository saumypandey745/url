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
export declare function isPrivateIP(ip: string): boolean;
export declare function validateTargetUrl(rawUrl: string, allowInternalOverride?: boolean): Promise<SSRFValidationResult>;
/**
 * Mask sensitive string values (cookies, API tokens, passwords) for report safety
 */
export declare function maskSensitiveValue(value: string | undefined | null): string;
