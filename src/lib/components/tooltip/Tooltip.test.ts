/**
 * Tests of `Tooltip`: its own trigger is a button, and an app's trigger receives the trigger props,
 * but the tooltip's `data-scope`, `data-part` and `data-state`, so its element keeps its own, and
 * `triggerId` sets the trigger's id.
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

	it("leaves the app's element its own part attributes, and takes its id", () => {
		let received: HTMLAttributes<HTMLElement> = {};
		const trigger = createRawSnippet((props: () => HTMLAttributes<HTMLElement>) => {
			received = props();
			return { render: () => '<button aria-label="Bold" data-state="on"></button>' };
		});
		render(Tooltip, { content: 'Bold', trigger, triggerId: 'toolbar-bold' });
		for (const name of ['data-scope', 'data-part', 'data-state'])
			expect(name in received).toBe(false);
		expect(received.id).toBe('toolbar-bold');
	});
});
