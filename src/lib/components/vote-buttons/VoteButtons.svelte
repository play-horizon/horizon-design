<!--
@component
Up and down votes, side by side on a segmented track, each with its count. The current account's
vote is pressed; pressing it again takes the vote back (`vote` becomes null). The app passes the
counts formatted by the i18n layer and the labels translated; `disabled` when the account may not
vote, with the reason said next to the buttons.
-->
<script lang="ts" module>
	/** An account's vote: up, down, or none. */
	export type Vote = 'up' | 'down' | null;

	/** The accessible texts of the vote buttons. */
	export interface VoteLabels {
		/** The group's name, such as "Vote". */
		group: string;
		/** The up button's name, such as "Vote up"; the count follows it. */
		up: string;
		/** The down button's name, such as "Vote down". */
		down: string;
	}
</script>

<script lang="ts">
	import { cn } from '#lib/utils.js';
	import MingcuteThumbUp2Line from '~icons/mingcute/thumb-up-2-line';
	import MingcuteThumbDown2Line from '~icons/mingcute/thumb-down-2-line';

	let {
		vote = $bindable(null),
		upCount,
		downCount,
		labels,
		disabled = false,
		onVote,
		class: className = ''
	}: {
		/** The account's vote. */
		vote?: Vote;
		/** The number of up votes, formatted for display. */
		upCount: string;
		/** The number of down votes, formatted for display. */
		downCount: string;
		/** The buttons' accessible names, translated. */
		labels: VoteLabels;
		/** Refuses votes, for an account that may not vote; the counts still show. */
		disabled?: boolean;
		/** Called with the new vote when the account votes or takes its vote back. */
		onVote?: (vote: Vote) => void;
		/** Classes merged onto the `<div>`. */
		class?: string;
	} = $props();

	function press(choice: 'up' | 'down') {
		if (disabled) return;
		vote = vote === choice ? null : choice;
		onVote?.(vote);
	}

	const buttons = [
		{ choice: 'up', Icon: MingcuteThumbUp2Line },
		{ choice: 'down', Icon: MingcuteThumbDown2Line }
	] as const;
</script>

<div
	role="group"
	aria-label={labels.group}
	class={cn('inline-flex gap-0.5 rounded-lg border border-border bg-sunken p-0.5', className)}
	data-slot="vote-buttons"
>
	{#each buttons as { choice, Icon } (choice)}
		<button
			type="button"
			aria-pressed={vote === choice}
			{disabled}
			class={cn(
				'inline-flex h-6 items-center gap-1.5 rounded-md px-2.5 text-sm text-muted tabular-nums transition-colors outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50',
				vote === choice && 'bg-surface font-semibold text-fg shadow-sm inset-shadow-highlight'
			)}
			onclick={() => press(choice)}
		>
			<Icon class="size-3.5" aria-hidden="true" />
			<span class="sr-only">{choice === 'up' ? labels.up : labels.down}</span>
			<span>{choice === 'up' ? upCount : downCount}</span>
		</button>
	{/each}
</div>
