/**
 * Tests of `Toggle`: pressing it updates the bound state alongside an `onPressedChange` callback,
 * and an icon-only toggle inside a `Tooltip` shows its name and keeps its pressed look.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Toggle from './Toggle.svelte';
import ToggleInTooltip from './Toggle.test.svelte';

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

	it('shows its name as a tooltip and keeps its pressed look inside a Tooltip', async () => {
		const user = userEvent.setup();
		const { getByRole } = render(ToggleInTooltip);
		const toggle = getByRole('button', { name: 'Bold' });
		await user.hover(toggle);
		await waitFor(() => expect(getByRole('tooltip').textContent?.trim()).toBe('Bold'));

		await user.click(toggle);
		expect(toggle.getAttribute('aria-pressed')).toBe('true');
		// The pressed look is drawn from Ark's state, which the Tooltip around it leaves alone.
		expect(toggle.getAttribute('data-state')).toBe('on');
	});
});
