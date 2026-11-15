/**
 * Tests of `Separator`: hidden from assistive technology when decorative, a separator with its
 * orientation otherwise.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Separator from './Separator.svelte';

describe('Separator', () => {
	it('is decorative by default', () => {
		const { queryByRole } = render(Separator);
		expect(queryByRole('separator')).toBeNull();
	});

	it('is a separator with its orientation when not decorative', () => {
		const { getByRole } = render(Separator, { decorative: false, orientation: 'vertical' });
		expect(getByRole('separator').getAttribute('aria-orientation')).toBe('vertical');
	});
});
