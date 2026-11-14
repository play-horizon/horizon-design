/**
 * Tests of `PlayerCount`: the label shown inline, and kept for assistive technology on art.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import PlayerCount from './PlayerCount.svelte';

describe('PlayerCount', () => {
	it('shows the count and its label inline', () => {
		const { container } = render(PlayerCount, { count: '988', label: 'playing now' });
		expect(container.textContent?.replace(/\s+/g, ' ').trim()).toBe('988 playing now');
	});

	it('keeps the label for assistive technology over art', () => {
		const { getByText } = render(PlayerCount, {
			count: '9,870',
			label: 'playing now',
			variant: 'overlay'
		});
		expect(getByText('playing now').className).toContain('sr-only');
		expect(getByText('9,870')).toBeTruthy();
	});
});
