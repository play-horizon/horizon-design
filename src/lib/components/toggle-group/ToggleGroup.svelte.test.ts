/**
 * Tests of `ToggleGroup`: its items' names, pressing one updates the bound value alongside an
 * `onValueChange` callback, only a single-choice group has the sliding indicator, and an icon item's
 * label is its tooltip.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { createRawSnippet } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import ToggleGroup from './ToggleGroup.svelte';
import { expectTooltip } from '../../../test/tooltip';

const icon = createRawSnippet(() => ({ render: () => '<span aria-hidden="true"></span>' }));

const items = [
	{ value: 'bold', label: 'Bold', content: icon },
	{ value: 'italic', label: 'Italic', content: icon }
];

describe('ToggleGroup', () => {
	it('names icon items by their label and updates the bound value', async () => {
		const bound = $state({ value: [] as string[] });
		const onValueChange = vi.fn();
		const { getByRole } = render(ToggleGroup, {
			props: {
				items,
				multiple: true,
				'aria-label': 'Text style',
				onValueChange,
				get value() {
					return bound.value;
				},
				set value(next: string[]) {
					bound.value = next;
				}
			}
		});
		expect(getByRole('group', { name: 'Text style' })).toBeTruthy();

		await fireEvent.click(getByRole('button', { name: 'Italic' }));
		expect(bound.value).toEqual(['italic']);
		expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: ['italic'] }));
		expect(getByRole('button', { name: 'Italic' }).getAttribute('aria-pressed')).toBe('true');
	});

	it('slides one indicator in a single-choice group, and raises items in place otherwise', () => {
		const single = render(ToggleGroup, { props: { items, 'aria-label': 'Align' } });
		expect(single.container.querySelector('[data-slot="toggle-group-indicator"]')).toBeTruthy();
		single.unmount();
		const multiple = render(ToggleGroup, {
			props: { items, multiple: true, 'aria-label': 'Style' }
		});
		expect(multiple.container.querySelector('[data-slot="toggle-group-indicator"]')).toBeNull();
	});

	it('shows the label of an icon item in its tooltip', async () => {
		const { getByRole } = render(ToggleGroup, { props: { items, 'aria-label': 'Text style' } });
		await expectTooltip(getByRole('radio', { name: 'Bold' }), 'Bold');
	});

	it('keeps the pressed state of an item that has a tooltip', () => {
		const { getByRole } = render(ToggleGroup, {
			props: { items, value: ['italic'], 'aria-label': 'Text style' }
		});
		expect(getByRole('radio', { name: 'Italic' }).getAttribute('data-state')).toBe('on');
		expect(getByRole('radio', { name: 'Bold' }).getAttribute('data-state')).toBe('off');
	});

	it('keeps an item that has a tooltip its own: its part attributes and its id', () => {
		const { getByRole } = render(ToggleGroup, {
			props: { items, multiple: true, 'aria-label': 'Text style' }
		});
		const bold = getByRole('button', { name: 'Bold' });
		expect(bold.getAttribute('data-scope')).toBe('toggle-group');
		expect(bold.getAttribute('data-part')).toBe('item');
		expect(bold.id).toMatch(/-item-bold$/);
	});
});
