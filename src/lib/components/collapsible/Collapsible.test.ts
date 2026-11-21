/**
 * Tests of `Collapsible`: the trigger shows and hides the content, and a disabled collapsible's
 * trigger is a disabled button that leaves the content as it is.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { createRawSnippet } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import Collapsible from './Collapsible.svelte';

const trigger = createRawSnippet(() => ({ render: () => '<span>Repositories</span>' }));
const children = createRawSnippet(() => ({ render: () => '<p>horizon-design</p>' }));

describe('Collapsible', () => {
	it('shows and hides its content from its trigger', async () => {
		const { getByRole } = render(Collapsible, { trigger, children });
		const button = getByRole('button', { name: 'Repositories' });
		expect(button.getAttribute('aria-expanded')).toBe('false');
		await fireEvent.click(button);
		expect(button.getAttribute('aria-expanded')).toBe('true');
	});

	it('turns its trigger off when disabled', async () => {
		const { getByRole } = render(Collapsible, { trigger, children, disabled: true });
		const button = getByRole('button', { name: 'Repositories' });
		expect(button.hasAttribute('disabled')).toBe(true);
		await fireEvent.click(button);
		expect(button.getAttribute('aria-expanded')).toBe('false');
	});
});
