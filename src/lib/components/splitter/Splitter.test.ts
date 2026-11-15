/**
 * Tests of `Splitter`: the handle between two panels is a focusable separator named by `label`.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import SplitterFixture from './Splitter.test.svelte';

describe('Splitter', () => {
	it('names the handle between its panels', () => {
		const { getByRole, getByText } = render(SplitterFixture);
		const handle = getByRole('separator', { name: 'Resize the scene' });
		expect(handle.getAttribute('tabindex')).toBe('0');
		expect(getByText('Scene')).toBeTruthy();
		expect(getByText('Inspector')).toBeTruthy();
	});
});
