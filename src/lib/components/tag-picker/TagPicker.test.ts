/**
 * Tests of `TagPicker`: choosing and un-choosing tags, and the limit.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import TagPicker from './TagPicker.svelte';

const options = ['obby', 'racing', 'puzzle', 'horror'].map((id) => ({ id, label: id }));

describe('TagPicker', () => {
	it('toggles tags and reports the chosen ids in order', async () => {
		const onChange = vi.fn();
		const { getByRole } = render(TagPicker, { options, label: 'Tags', onChange });
		await fireEvent.click(getByRole('button', { name: 'racing' }));
		await fireEvent.click(getByRole('button', { name: 'obby' }));
		expect(onChange).toHaveBeenLastCalledWith(['racing', 'obby']);
		expect(getByRole('button', { name: 'racing' }).getAttribute('aria-pressed')).toBe('true');

		await fireEvent.click(getByRole('button', { name: 'racing' }));
		expect(onChange).toHaveBeenLastCalledWith(['obby']);
	});

	it('disables the other tags once the limit is reached', async () => {
		const { getByRole } = render(TagPicker, {
			options,
			label: 'Tags',
			max: 2,
			value: ['obby', 'racing']
		});
		expect(getByRole('group', { name: 'Tags' })).toBeTruthy();
		expect((getByRole('button', { name: 'puzzle' }) as HTMLButtonElement).disabled).toBe(true);
		expect((getByRole('button', { name: 'obby' }) as HTMLButtonElement).disabled).toBe(false);
	});
});
