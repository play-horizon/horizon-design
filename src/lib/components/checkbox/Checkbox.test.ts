/**
 * Tests of `Checkbox`: the indeterminate state draws its dash (one horizontal bar), and checking it both reports the
 * change and updates the box when the app listens to `onCheckedChange`.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import Checkbox from './Checkbox.svelte';

describe('Checkbox', () => {
	it('draws the dash, not the check, while indeterminate', () => {
		const { container } = render(Checkbox, { checked: 'indeterminate', label: 'All games' });
		const indicators = [...container.querySelectorAll('[data-part="indicator"]')];
		expect(indicators.map((indicator) => indicator.hasAttribute('hidden'))).toEqual([true, false]);
		// Mingcute's minimize-fill: one bar, 3 units thick like the check, across the 24-unit box.
		const dash = indicators[1].querySelector('path[fill="currentColor"]')?.getAttribute('d');
		expect(dash?.startsWith('M19.27 10.524')).toBe(true);
	});

	it('reports a check and stays checked', async () => {
		const onCheckedChange = vi.fn();
		const { getByRole } = render(Checkbox, { label: 'Public', onCheckedChange });
		const box = getByRole('checkbox', { name: 'Public' }) as HTMLInputElement;
		await fireEvent.click(box);
		expect(onCheckedChange).toHaveBeenCalledWith(expect.objectContaining({ checked: true }));
		expect(box.checked).toBe(true);
	});
});
