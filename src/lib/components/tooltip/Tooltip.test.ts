/**
 * Tests of `Tooltip`: its own trigger is a button, and an app's trigger receives the trigger props.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { createRawSnippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { render } from '@testing-library/svelte';
import Tooltip from './Tooltip.svelte';

describe('Tooltip', () => {
	it('renders its trigger as a focusable button', () => {
		const children = createRawSnippet(() => ({ render: () => '<span>Help</span>' }));
		const { getByRole } = render(Tooltip, { content: 'More about this', children });
		const trigger = getByRole('button', { name: 'Help' });
		expect(trigger.getAttribute('type')).toBe('button');
		expect(trigger.dataset.part).toBe('trigger');
	});

	it("spreads the trigger props onto the app's own element", () => {
		const trigger = createRawSnippet((props: () => HTMLAttributes<HTMLElement>) => ({
			render: () => `<button aria-label="Settings" id="${String(props().id)}"></button>`
		}));
		const { getByRole } = render(Tooltip, { content: 'Settings', trigger });
		expect(getByRole('button', { name: 'Settings' }).id).toMatch(/^tooltip:.+:trigger$/);
	});
});
