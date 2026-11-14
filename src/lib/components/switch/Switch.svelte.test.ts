/**
 * Tests of `Switch`: its label, its bound state alongside an `onCheckedChange` callback, and the
 * neutral variant's checked colours.
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

	it('gives the neutral variant a checked track that contrasts with its thumb and the page', () => {
		const { container } = render(Switch, {
			props: { label: 'Grid', variant: 'secondary', defaultChecked: true }
		});
		const control = container.querySelector('[data-part="control"]');
		const thumb = container.querySelector('[data-part="thumb"]');
		expect(control?.getAttribute('data-state')).toBe('checked');
		expect(control?.classList).toContain('data-[state=checked]:bg-fg-2');
		expect(thumb?.classList).toContain('data-[state=checked]:bg-background');
	});

	it('gives the unchecked track a contrast of at least 3:1 with its thumb and the page', () => {
		// faint against the paper thumb: 5.54:1 dark, 3.36:1 light; against surface: 3.13:1, 3.36:1.
		const { container } = render(Switch, { props: { label: 'Grid' } });
		const control = container.querySelector('[data-part="control"]');
		expect(control?.getAttribute('data-state')).toBe('unchecked');
		expect(control?.classList).toContain('bg-faint');
	});
});
