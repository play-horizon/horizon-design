/**
 * Tests of `Frame`: the title bar puts the title first and the window controls at its end, with
 * the close control (red) last; no title, no title bar.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Frame from './Frame.svelte';

describe('Frame', () => {
	it('puts the window controls at the end of the title bar, close last', () => {
		const { container } = render(Frame, { title: 'main.hzs' });
		const bar = container.querySelector('[data-slot="frame-title-bar"]');
		expect(bar?.firstElementChild?.textContent).toBe('main.hzs');
		const controls = bar?.lastElementChild;
		expect(controls?.getAttribute('data-slot')).toBe('frame-controls');
		expect(controls?.lastElementChild?.classList.contains('bg-danger/60')).toBe(true);
	});

	it('has no title bar without a title', () => {
		const { container } = render(Frame, {});
		expect(container.querySelector('[data-slot="frame-title-bar"]')).toBeNull();
	});
});
