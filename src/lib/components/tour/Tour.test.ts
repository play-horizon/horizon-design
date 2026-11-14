/**
 * Tests of `Tour`: its progress line comes from `progressText`, and each action button is named
 * by its label.
 * @module
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createRawSnippet } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import Tour from './Tour.svelte';

const steps = [
	{
		id: 'welcome',
		type: 'dialog' as const,
		title: 'Welcome',
		description: 'The first step.',
		actions: [{ label: 'Continue', action: 'next' as const }]
	},
	{
		id: 'done',
		type: 'dialog' as const,
		title: 'Done',
		description: 'The last step.',
		actions: [
			{ label: 'Back', action: 'prev' as const },
			{ label: 'Finish', action: 'dismiss' as const }
		]
	}
];

// jsdom has no visual viewport, which the tour measures to place its steps.
beforeEach(() => {
	vi.stubGlobal('visualViewport', {
		width: 1024,
		height: 768,
		offsetLeft: 0,
		offsetTop: 0,
		scale: 1,
		addEventListener() {},
		removeEventListener() {}
	});
	return () => vi.unstubAllGlobals();
});

describe('Tour', () => {
	it('shows the translated progress and names the actions by their labels', async () => {
		const { getByRole, findByRole, findByText } = render(Tour, {
			steps,
			closeLabel: 'Close',
			progressText: ({ current, total }: { current: number; total: number }) =>
				`Step ${current + 1} / ${total}`,
			trigger: createRawSnippet((start: () => () => void) => ({
				render: () => '<button>Start tour</button>',
				setup: (node) => {
					node.addEventListener('click', () => start()());
				}
			}))
		});
		await fireEvent.click(getByRole('button', { name: 'Start tour' }));

		expect(await findByText('Step 1 / 2')).toBeTruthy();
		await fireEvent.click(await findByRole('button', { name: 'Continue' }));
		expect(await findByText('Step 2 / 2')).toBeTruthy();
		expect(getByRole('button', { name: 'Finish' })).toBeTruthy();
		expect(getByRole('button', { name: 'Close' })).toBeTruthy();
	});
});
