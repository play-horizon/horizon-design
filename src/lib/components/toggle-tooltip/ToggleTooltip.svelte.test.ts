/**
 * Tests of `ToggleTooltip`: it is a toggle named by its label, whose state binds.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import ToggleTooltip from './ToggleTooltip.svelte';

describe('ToggleTooltip', () => {
	it('is named by its label and toggles its bound state', async () => {
		const bound = $state({ pressed: false });
		const onPressedChange = vi.fn();
		const { getByRole } = render(ToggleTooltip, {
			props: {
				label: 'Bold',
				onPressedChange,
				get pressed() {
					return bound.pressed;
				},
				set pressed(next: boolean) {
					bound.pressed = next;
				}
			}
		});
		const toggle = getByRole('button', { name: 'Bold' });
		expect(toggle.getAttribute('aria-pressed')).toBe('false');

		await fireEvent.click(toggle);
		expect(bound.pressed).toBe(true);
		expect(onPressedChange).toHaveBeenLastCalledWith(true);
		expect(toggle.getAttribute('aria-pressed')).toBe('true');

		await fireEvent.click(toggle);
		expect(bound.pressed).toBe(false);
		expect(toggle.getAttribute('aria-pressed')).toBe('false');
	});
});
