/**
 * Tests of `Switch`: its label, its bound state alongside an `onCheckedChange` callback, and the
 * neutral variant's checked colours, the same gap at both ends of the thumb's travel at every size,
 * and an icon sized to the thumb.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { createRawSnippet } from 'svelte';
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

	it('leaves the same 2 px gap at both ends of the travel, at every size', () => {
		// [size, track width, track height]: the thumb is the height minus the 2 px border on each
		// side, and travels the width minus the height, so the end gap equals the start gap.
		const tracks = [
			['sm', 24, 14, 10, 10],
			['md', 30, 17, 13, 13],
			['lg', 36, 20, 16, 16],
			['xl', 52, 28, 24, 24]
		] as const;
		for (const [size, width, height, thumb, travel] of tracks) {
			const { container, unmount } = render(Switch, { props: { size, label: size } });
			const control = container.querySelector<HTMLElement>('[data-part="control"]');
			const knob = container.querySelector<HTMLElement>('[data-part="thumb"]');
			expect(control?.style.width).toBe(`${width}px`);
			expect(control?.style.height).toBe(`${height}px`);
			expect(knob?.style.width).toBe(`${thumb}px`);
			expect(control?.style.getPropertyValue('--switch-travel')).toBe(`${travel}px`);
			// The start gap is the border; the end gap is what the travel leaves: width - 4 - thumb - travel.
			expect(width - 4 - thumb - travel).toBe(0);
			unmount();
		}
	});

	it('sizes a thumb icon to 60% of the thumb', () => {
		const icon = createRawSnippet(() => ({ render: () => '<svg aria-hidden="true"></svg>' }));
		const { container } = render(Switch, {
			props: { size: 'xl', label: 'Sound', checkedContent: icon, uncheckedContent: icon }
		});
		const control = container.querySelector<HTMLElement>('[data-part="control"]');
		// 60% of the 24 px thumb, rounded.
		expect(control?.style.getPropertyValue('--switch-icon')).toBe('14px');
	});
});
