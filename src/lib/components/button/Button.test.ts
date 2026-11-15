/**
 * Tests of `Button`: its variant, and the loading state that disables it.
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
});
