import { BaseScannerModule, ScannerModuleOutput } from './types.js';
import { TLSScanner } from './modules/tls.scanner.js';
import { HeaderScanner } from './modules/headers.scanner.js';
import { CookieScanner } from './modules/cookies.scanner.js';
import { CORSScanner } from './modules/cors.scanner.js';
import { APIScanner } from './modules/api.scanner.js';
import { FrontendScanner } from './modules/frontend.scanner.js';
import { ExposureScanner } from './modules/exposure.scanner.js';
import { IntegrityScanner } from './modules/integrity.scanner.js';
import { validateTargetUrl } from '@secplatform/security';

export class MasterScannerEngine {
  private modules: BaseScannerModule[] = [
    new TLSScanner(),
    new HeaderScanner(),
    new CookieScanner(),
    new CORSScanner(),
    new APIScanner(),
    new FrontendScanner(),
    new ExposureScanner(),
    new IntegrityScanner()
  ];

  async runFullScan(
    targetUrl: string,
    onProgress?: (progress: { moduleName: string; completed: number; total: number; output?: ScannerModuleOutput }) => void
  ): Promise<{ targetUrl: string; totalExecutionTimeMs: number; moduleOutputs: ScannerModuleOutput[] }> {
    const startTime = Date.now();

    // Enforce SSRF validation
    const ssrfCheck = await validateTargetUrl(targetUrl);
    if (!ssrfCheck.valid) {
      throw new Error(`SSRF Shield Blocked Target: ${ssrfCheck.reason}`);
    }

    const sanitizedUrl = ssrfCheck.sanitizedUrl || targetUrl;
    const moduleOutputs: ScannerModuleOutput[] = [];
    const total = this.modules.length;

    for (let i = 0; i < total; i++) {
      const module = this.modules[i];
      if (onProgress) {
        onProgress({ moduleName: module.name, completed: i, total });
      }

      try {
        const output = await module.execute(sanitizedUrl);
        moduleOutputs.push(output);
      } catch (err: any) {
        moduleOutputs.push({
          moduleName: module.name,
          success: false,
          error: err.message,
          executionTimeMs: 0,
          findings: []
        });
      }

      if (onProgress) {
        onProgress({ moduleName: module.name, completed: i + 1, total, output: moduleOutputs[moduleOutputs.length - 1] });
      }
    }

    return {
      targetUrl: sanitizedUrl,
      totalExecutionTimeMs: Date.now() - startTime,
      moduleOutputs
    };
  }
}

export * from './types.js';
export * from './modules/tls.scanner.js';
export * from './modules/headers.scanner.js';
export * from './modules/cookies.scanner.js';
export * from './modules/cors.scanner.js';
export * from './modules/api.scanner.js';
export * from './modules/frontend.scanner.js';
export * from './modules/exposure.scanner.js';
export * from './modules/integrity.scanner.js';
