/**
 * Tests of `CircularProgress`: its accessible name, its announced value text, and the clamping
 * of the value it reports.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import CircularProgress from './CircularProgress.svelte';

describe('CircularProgress', () => {
	it('is a progress bar named by its visible label, announcing the value text', () => {
		const { getByRole, getByText } = render(CircularProgress, {
			value: 72,
			label: 'Upload',
			valueText: '72%'
		});
		const bar = getByRole('progressbar', { name: 'Upload' });
		expect(bar.getAttribute('aria-valuenow')).toBe('72');
		expect(bar.getAttribute('aria-valuetext')).toBe('72%');
		expect(getByText('72%')).toBeTruthy();
	});

	it('keeps a hidden label as its name and clamps the value to max', () => {
		const { getByRole, queryByText } = render(CircularProgress, {
			value: 140,
			max: 100,
			label: 'Download',
			hideLabel: true
		});
		const bar = getByRole('progressbar', { name: 'Download' });
		expect(bar.getAttribute('aria-valuenow')).toBe('100');
		expect(queryByText('Download')).toBeNull();
	});
});
