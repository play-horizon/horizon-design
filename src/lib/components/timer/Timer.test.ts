/**
 * Tests of `Timer`: its buttons are named by `labels`, only the ones that apply show, and a time
 * of a day or more shows its days.
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

	it('shows the days in front of the hours from one day on', () => {
		const time = (startMs: number) =>
			render(Timer, { labels, countdown: true, startMs })
				.container.querySelector('[data-slot="timer-time"]')
				?.textContent?.replace(/\s/g, '');
		// 25 h = 1 day and 1 hour; 2 h 3 min 4 s has no day.
		expect(time(25 * 3_600_000)).toBe('01:01:00:00');
		expect(time(2 * 3_600_000 + 3 * 60_000 + 4_000)).toBe('02:03:04');
	});
});
