/**
 * Tests of `Ring`: the fill reaches `turn`, and its two ends are round dots at the top and at
 * `turn`, as wide as the ring; an empty ring has no ends.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Ring from './Ring.svelte';

describe('Ring', () => {
	it('rounds both ends of the fill', () => {
		const { container } = render(Ring, { turn: 0.25, thickness: 6 });
		const caps = [...container.querySelectorAll<HTMLElement>('[data-slot="ring-cap"]')];
		expect(caps.map((cap) => cap.style.rotate)).toEqual(['0turn', '0.25turn']);
		const dot = caps[1].firstElementChild as HTMLElement;
		expect([dot.style.width, dot.style.height]).toEqual(['6px', '6px']);
		expect(dot.classList.contains('rounded-full')).toBe(true);
	});

	it('draws no ends while empty', () => {
		const { container } = render(Ring, { turn: 0, thickness: 6 });
		expect(container.querySelectorAll('[data-slot="ring-cap"]')).toHaveLength(0);
	});
});
