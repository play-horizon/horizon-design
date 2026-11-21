/**
 * Tests of `Timer`: it starts paused, its buttons are named by `labels` (with the same tooltip),
 * only the ones that apply show, and a time of a day or more shows its days.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import { expectTooltip } from '../../../test/tooltip';
import Timer from './Timer.svelte';

const labels = { start: 'Start', pause: 'Pause', resume: 'Resume', reset: 'Reset' };

describe('Timer', () => {
	it('starts paused, waiting for its start button', async () => {
		const { getByRole, queryByRole, container } = render(Timer, { labels, startMs: 5_000 });
		expect(getByRole('button', { name: 'Start' })).toBeTruthy();
		expect(queryByRole('button', { name: 'Pause' })).toBeNull();
		await new Promise((done) => setTimeout(done, 1_100));
		expect(
			container.querySelector('[data-slot="timer-time"]')?.textContent?.replace(/\s/g, '')
		).toBe('00:00:05');
	});

	it('shows the name of each button in its tooltip', async () => {
		const { getByRole } = render(Timer, { labels });
		await expectTooltip(getByRole('button', { name: 'Start' }), 'Start');
	});

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
