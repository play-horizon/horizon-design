/**
 * Tests of `Timer`: its buttons are named by `labels`, and only the ones that apply show.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import Timer from './Timer.svelte';

const labels = { start: 'Start', pause: 'Pause', resume: 'Resume', reset: 'Reset' };

describe('Timer', () => {
	it('names its buttons and swaps start for pause once started', async () => {
		const { getByRole, queryByRole } = render(Timer, { labels });
		expect(queryByRole('button', { name: 'Pause' })).toBeNull();

		await fireEvent.click(getByRole('button', { name: 'Start' }));
		expect(queryByRole('button', { name: 'Start' })).toBeNull();
		expect(getByRole('button', { name: 'Pause' })).toBeTruthy();
		expect(getByRole('button', { name: 'Reset' })).toBeTruthy();
	});
});
