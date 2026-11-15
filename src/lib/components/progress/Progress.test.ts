/**
 * Tests of `Progress`: the label names the bar, and `showValue` shows the percentage.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Progress from './Progress.svelte';

describe('Progress', () => {
	it('is a progress bar named by its label', () => {
		const { getByRole } = render(Progress, { label: 'Upload', value: 30, max: 60 });
		const bar = getByRole('progressbar', { name: 'Upload' });
		expect(bar.getAttribute('aria-valuenow')).toBe('30');
		expect(bar.getAttribute('aria-valuemax')).toBe('60');
	});

	it('shows the value as a percentage', () => {
		const { getByText } = render(Progress, {
			label: 'Upload',
			value: 30,
			max: 60,
			showValue: true
		});
		expect(getByText('50%')).toBeTruthy();
	});
});
