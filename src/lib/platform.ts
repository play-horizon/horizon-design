/**
 * The platform the app runs on, as far as keyboard shortcuts care: Apple's platforms (macOS, iOS,
 * iPadOS), whose command key is ⌘, or the others, whose command key is Ctrl. `Kbd` draws the
 * command key from it, and apps read it to match a shortcut on `metaKey` or `ctrlKey`.
 * @module
 */

/** The parts of `navigator` the platform is read from. */
export interface PlatformSource {
	userAgent: string;
	userAgentData?: { platform: string };
}

/**
 * Whether `source` (the browser's `navigator` by default) is an Apple platform: the client hint's
 * platform when the browser gives one (Chromium), the user agent otherwise. `false` where there is
 * no navigator (server rendering).
 *
 * @example isApplePlatform({ userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5)' }) // true
 */
export function isApplePlatform(
	source: PlatformSource | undefined = globalThis.navigator as PlatformSource | undefined
): boolean {
	if (!source) return false;
	const platform = source.userAgentData?.platform || source.userAgent;
	return /mac|iphone|ipad|ipod/i.test(platform);
}
