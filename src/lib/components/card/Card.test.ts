/**
 * Tests of `Card`: its title is a heading of `headingLevel`, a third-level one by default.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Card from './Card.svelte';

describe('Card', () => {
	it('titles itself with a heading of its level', () => {
		const section = render(Card, { title: 'Players' });
		expect(section.getByRole('heading', { name: 'Players' }).tagName).toBe('H3');
		const nested = render(Card, { title: 'Weekly goal', headingLevel: 4 });
		expect(nested.getByRole('heading', { name: 'Weekly goal' }).tagName).toBe('H4');
	});
});
