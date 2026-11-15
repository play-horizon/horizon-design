/**
 * Tests of `Spinner`: announced with its visible label, announced by `aria-label` alone, or
 * decorative.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Spinner from './Spinner.svelte';

describe('Spinner', () => {
	it('shows and announces its label', () => {
		const { getByRole } = render(Spinner, { label: 'Saving…' });
		expect(getByRole('status').textContent?.trim()).toBe('Saving…');
	});

	it('announces an aria-label without visible text', () => {
		const { getByRole } = render(Spinner, { 'aria-label': 'Loading' });
		expect(getByRole('status', { name: 'Loading' }).getAttribute('aria-hidden')).toBeNull();
	});

	it('is decorative with neither', () => {
		const { container, queryByRole } = render(Spinner);
		expect(queryByRole('status')).toBeNull();
		expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
	});
});
