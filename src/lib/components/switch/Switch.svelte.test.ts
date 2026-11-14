/**
 * Tests of `Switch`: its label, and its bound state alongside an `onCheckedChange` callback.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import Switch from './Switch.svelte';

describe('Switch', () => {
	it('updates the bound state and calls onCheckedChange', async () => {
		const bound = $state({ checked: false });
		const onCheckedChange = vi.fn();
		const { getByRole } = render(Switch, {
			props: {
				label: 'Sound',
				onCheckedChange,
				get checked() {
					return bound.checked;
				},
				set checked(next: boolean) {
					bound.checked = next;
				}
			}
		});
		const input = getByRole('switch', { name: 'Sound' }) as HTMLInputElement;
		expect(input.checked).toBe(false);

		await fireEvent.click(input);
		expect(bound.checked).toBe(true);
		expect(onCheckedChange).toHaveBeenLastCalledWith(expect.objectContaining({ checked: true }));
		expect(input.checked).toBe(true);
	});
});
