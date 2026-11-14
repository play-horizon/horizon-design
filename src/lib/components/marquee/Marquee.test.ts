/**
 * Tests of `Marquee`: the region is named by its label, and its content is shown once to
 * assistive technology, the copies that close the loop hidden.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { createRawSnippet } from 'svelte';
import { render } from '@testing-library/svelte';
import Marquee from './Marquee.svelte';

const items = createRawSnippet(() => ({ render: () => '<span>Skyline Obby</span>' }));

describe('Marquee', () => {
	it('names the region and shows its content once', () => {
		const { getByRole, getAllByText } = render(Marquee, {
			label: 'Featured games',
			children: items
		});
		const region = getByRole('region', { name: 'Featured games' });
		const copies = region.querySelectorAll('[data-part="content"]');
		expect(copies).toHaveLength(2);
		expect(copies[0].getAttribute('aria-hidden')).toBeNull();
		expect(copies[1].getAttribute('aria-hidden')).toBe('true');
		expect(getAllByText('Skyline Obby')).toHaveLength(2);
		expect(new Set([...copies].map((copy) => copy.id)).size).toBe(2);
	});
});
