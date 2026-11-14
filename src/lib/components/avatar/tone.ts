/**
 * The avatar tones: five fallback colours (the `avatar-1`…`avatar-5` tokens), and the stable
 * choice of one from a person's initials.
 * @module
 */

/** One of the five avatar tones. */
export type AvatarTone = 1 | 2 | 3 | 4 | 5;

/**
 * Picks a tone from a text (the initials), always the same for the same text.
 *
 * @example
 * toneOf('RM'); // 5: (82 + 77) % 5 + 1
 */
export function toneOf(text: string): AvatarTone {
	let sum = 0;
	for (const char of text) sum += char.codePointAt(0) ?? 0;
	return ((sum % 5) + 1) as AvatarTone;
}
