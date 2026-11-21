/**
 * Tests of `isApplePlatform`: Apple's platforms from the user agent or the client hint, the
 * others, and no navigator at all.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { isApplePlatform } from './platform';

describe('isApplePlatform', () => {
	it('recognises macOS, iOS and iPadOS from the user agent', () => {
		for (const userAgent of [
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 Safari/605.1.15',
			'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) Mobile/15E148',
			'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) Mobile/15E148'
		]) {
			expect(isApplePlatform({ userAgent })).toBe(true);
		}
	});

	it('takes the client hint first, and says no for Windows, Linux and Android', () => {
		expect(
			isApplePlatform({
				userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
				userAgentData: { platform: 'macOS' }
			})
		).toBe(true);
		expect(
			isApplePlatform({
				userAgent: 'Mozilla/5.0 (Macintosh)',
				userAgentData: { platform: 'Windows' }
			})
		).toBe(false);
		expect(isApplePlatform({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' })).toBe(false);
		expect(isApplePlatform({ userAgent: 'Mozilla/5.0 (X11; Linux x86_64)' })).toBe(false);
		expect(isApplePlatform({ userAgent: 'Mozilla/5.0 (Linux; Android 15; Pixel 9)' })).toBe(false);
	});

	it('says no without a navigator, as on the server', () => {
		expect(isApplePlatform(undefined)).toBe(false);
	});
});
