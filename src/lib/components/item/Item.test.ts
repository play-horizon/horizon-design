/**
 * Tests of `Item`: a link with `href`, a button with `onclick`, and a plain row with neither (no
 * hover, no pointer).
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { createRawSnippet } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import Item from './Item.svelte';

const children = createRawSnippet(() => ({ render: () => '<span>Skyline Obby</span>' }));

describe('Item', () => {
	it('is a link with href', () => {
		const { getByRole } = render(Item, { href: '/games/skyline', children });
		expect(getByRole('link', { name: 'Skyline Obby' }).getAttribute('href')).toBe('/games/skyline');
	});

	it('is a native button with onclick, so Enter and Space press it', async () => {
		const onclick = vi.fn();
		const { getByRole } = render(Item, { onclick, children });
		const row = getByRole('button', { name: 'Skyline Obby' });
		expect(row.getAttribute('type')).toBe('button');
		await fireEvent.click(row);
		expect(onclick).toHaveBeenCalledOnce();
	});

	it('is a plain row with neither', () => {
		const { container, queryByRole } = render(Item, { children });
		expect(queryByRole('button')).toBeNull();
		expect(queryByRole('link')).toBeNull();
		const row = container.querySelector('[data-slot="item"]');
		expect(row?.tagName).toBe('DIV');
		expect(row?.className).not.toContain('hover:bg-hover');
		expect(row?.className).not.toContain('cursor-pointer');
	});
});
