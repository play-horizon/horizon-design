/**
 * Tests of `Toggle`: pressing it updates the bound state alongside an `onPressedChange` callback.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import Toggle from './Toggle.svelte';

describe('Toggle', () => {
	it('updates the bound state and calls onPressedChange', async () => {
		const bound = $state({ pressed: false });
		const onPressedChange = vi.fn();
		const { getByRole } = render(Toggle, {
			props: {
				'aria-label': 'Bold',
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

		await fireEvent.click(toggle);
		expect(bound.pressed).toBe(true);
		expect(onPressedChange).toHaveBeenLastCalledWith(true);
		expect(toggle.getAttribute('aria-pressed')).toBe('true');
	});
});
