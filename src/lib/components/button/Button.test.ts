/**
 * Tests of `Button`: its variant, the art variant's hover that stays dark over game art, and the
 * loading state that disables it.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { createRawSnippet } from 'svelte';
import { render } from '@testing-library/svelte';
import Button from './Button.svelte';

const children = createRawSnippet(() => ({ render: () => '<span>Publish</span>' }));

describe('Button', () => {
	it('renders a button of its variant', () => {
		const { getByRole } = render(Button, { variant: 'primary', children });
		const button = getByRole('button', { name: 'Publish' });
		expect(button.dataset.variant).toBe('primary');
		expect(button.getAttribute('type')).toBe('button');
	});

	it('is busy and disabled while loading', () => {
		const { getByRole } = render(Button, { loading: true, children });
		const button = getByRole('button', { name: 'Publish' }) as HTMLButtonElement;
		expect(button.disabled).toBe(true);
		expect(button.getAttribute('aria-busy')).toBe('true');
	});

	it('keeps the art variant a dark scrim with light text, hovered too', () => {
		const { getByRole } = render(Button, { variant: 'art', children });
		const classes = getByRole('button', { name: 'Publish' }).classList;
		expect(classes).toContain('bg-art-scrim');
		expect(classes).toContain('hover:bg-art-scrim-hover');
		expect(classes).toContain('text-on-art');
		expect(classes).not.toContain('hover:bg-hover');
	});
});
