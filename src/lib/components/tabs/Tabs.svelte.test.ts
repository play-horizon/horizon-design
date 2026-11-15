/**
 * Tests of `Tabs`: selecting a tab updates the bound value alongside an `onValueChange` callback.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { createRawSnippet } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import Tabs from './Tabs.svelte';

const panel = (text: string) => createRawSnippet(() => ({ render: () => `<p>${text}</p>` }));

const tabs = [
	{ value: 'account', label: 'Account', content: panel('Account panel') },
	{ value: 'billing', label: 'Billing', content: panel('Billing panel') }
];

describe('Tabs', () => {
	it('updates the bound value and calls onValueChange', async () => {
		const bound = $state({ value: 'account' });
		const onValueChange = vi.fn();
		const { getByRole } = render(Tabs, {
			props: {
				tabs,
				onValueChange,
				get value() {
					return bound.value;
				},
				set value(next: string) {
					bound.value = next;
				}
			}
		});
		expect(getByRole('tab', { name: 'Account' }).getAttribute('aria-selected')).toBe('true');

		await fireEvent.click(getByRole('tab', { name: 'Billing' }));
		expect(bound.value).toBe('billing');
		expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: 'billing' }));
		expect(getByRole('tab', { name: 'Billing' }).getAttribute('aria-selected')).toBe('true');
	});
});
