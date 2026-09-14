import test from 'node:test';
import assert from 'node:assert';
import { validateTargetUrl, isPrivateIP, maskSensitiveValue } from '../packages/security/dist/index.js';

test('SSRF Shield - Blocks Localhost and Private IPs', async () => {
  const localRes = await validateTargetUrl('http://127.0.0.1');
  assert.strictEqual(localRes.valid, false);

  const metadataRes = await validateTargetUrl('http://169.254.169.254');
  assert.strictEqual(metadataRes.valid, false);

  const privateA = await validateTargetUrl('http://10.0.0.1');
  assert.strictEqual(privateA.valid, false);
});

test('SSRF Shield - Allows Public Domain Target', async () => {
  const publicRes = await validateTargetUrl('https://example.com');
  assert.strictEqual(publicRes.valid, true);
  assert.ok(publicRes.sanitizedUrl?.startsWith('https://example.com'));
});

test('Cookie Masking - Redacts Secret Values', () => {
  const masked = maskSensitiveValue('super_secret_session_token_12345');
  assert.strictEqual(masked.includes('super_secret_session_token_12345'), false);
  assert.ok(masked.includes('****'));
});
