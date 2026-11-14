/**
 * Tests of `VoteButtons`: voting, changing the vote, taking it back, and the disabled state.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import VoteButtons from './VoteButtons.svelte';

const labels = { group: 'Vote', up: 'Vote up', down: 'Vote down' };

describe('VoteButtons', () => {
	it('votes, changes the vote, and takes it back', async () => {
		const onVote = vi.fn();
		const { getByRole } = render(VoteButtons, {
			upCount: '4.2k',
			downCount: '310',
			labels,
			onVote
		});
		const up = getByRole('button', { name: /^Vote up/ });
		const down = getByRole('button', { name: /^Vote down/ });

		await fireEvent.click(up);
		expect(onVote).toHaveBeenLastCalledWith('up');
		expect(up.getAttribute('aria-pressed')).toBe('true');

		await fireEvent.click(down);
		expect(onVote).toHaveBeenLastCalledWith('down');
		expect(up.getAttribute('aria-pressed')).toBe('false');

		await fireEvent.click(down);
		expect(onVote).toHaveBeenLastCalledWith(null);
		expect(down.getAttribute('aria-pressed')).toBe('false');
	});

	it('names each button with its count', () => {
		const { getByRole } = render(VoteButtons, { upCount: '4.2k', downCount: '310', labels });
		expect(getByRole('button', { name: 'Vote up 4.2k' })).toBeTruthy();
		expect(getByRole('button', { name: 'Vote down 310' })).toBeTruthy();
	});

	it('shows the counts and refuses votes when disabled', async () => {
		const onVote = vi.fn();
		const { getByRole, getByText } = render(VoteButtons, {
			upCount: '4.2k',
			downCount: '310',
			labels,
			onVote,
			disabled: true
		});
		expect(getByText('4.2k')).toBeTruthy();
		await fireEvent.click(getByRole('button', { name: /^Vote up/ }));
		expect(onVote).not.toHaveBeenCalled();
	});
});
