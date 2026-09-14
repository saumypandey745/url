import { MasterScannerEngine } from '@secplatform/scanner-core';

console.log('[Worker Node Initialized] Listening for scanner background job queues...');

export async function processScanJob(targetUrl: string) {
  console.log(`[Worker] Running isolated security scan for target: ${targetUrl}`);
  const engine = new MasterScannerEngine();
  const results = await engine.runFullScan(targetUrl, (progress) => {
    console.log(`[Worker Progress] ${progress.moduleName}: ${progress.completed}/${progress.total}`);
  });
  console.log(`[Worker Complete] Completed scan in ${results.totalExecutionTimeMs}ms with ${results.moduleOutputs.length} modules processed.`);
  return results;
}
