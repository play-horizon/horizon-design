<!--
@component
A multi-step flow: the steps, the current step's content, and back and next buttons whose labels
the app passes (Ark Steps).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Steps } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	interface StepConfig {
		title: string;
		content: Snippet;
	}

	let {
		steps = [],
		step = $bindable(),
		completedContent,
		prevLabel,
		nextLabel,
		class: className = '',
		...rest
	}: {
		steps?: StepConfig[];
		step?: number;
		completedContent?: Snippet;
		/** The back button's text, such as "Back". */
		prevLabel: string;
		/** The next button's text, such as "Next". */
		nextLabel: string;
		class?: string;
		[key: string]: unknown;
	} = $props();

	const count = $derived(steps.length);
</script>

<Steps.Root
	bind:step
	{count}
	class={cn('flex flex-col gap-4', className)}
	data-slot="steps"
	{...rest}
>
	<Steps.List class="flex w-full items-center gap-2" data-slot="steps-list">
		{#each steps as s, i (i)}
			<Steps.Item index={i} class="flex items-center gap-2" data-slot="steps-item">
				<Steps.Trigger
					class="flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg data-[state=complete]:text-fg data-[state=current]:text-fg"
					data-slot="steps-trigger"
				>
					<Steps.Indicator
						class="flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-border-strong text-xs font-bold text-muted transition-colors data-[state=complete]:border-primary data-[state=complete]:bg-primary data-[state=complete]:text-on-primary data-[state=current]:border-primary data-[state=current]:text-primary"
						data-slot="steps-indicator"
					>
						{i + 1}
					</Steps.Indicator>
					<span class="hidden sm:inline">{s.title}</span>
				</Steps.Trigger>
				{#if i < steps.length - 1}
					<Steps.Separator
						class="h-0.5 flex-1 rounded-full bg-border transition-colors data-[state=complete]:bg-primary"
						data-slot="steps-separator"
					/>
				{/if}
			</Steps.Item>
		{/each}
	</Steps.List>

	{#each steps as s, i (i)}
		<Steps.Content index={i} data-slot="steps-content">
			{@render s.content()}
		</Steps.Content>
	{/each}

	{#if completedContent}
		<Steps.CompletedContent data-slot="steps-completed-content">
			{@render completedContent()}
		</Steps.CompletedContent>
	{/if}

	<div class="mt-4 flex gap-2">
		<Steps.PrevTrigger
			class="inline-flex h-8 items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-medium text-fg transition-all hover:bg-hover hover:text-fg disabled:pointer-events-none disabled:opacity-60"
			data-slot="steps-prev-trigger"
		>
			{prevLabel}
		</Steps.PrevTrigger>
		<Steps.NextTrigger
			class="inline-flex h-8 items-center justify-center gap-2 rounded-lg border border-transparent bg-primary px-3 text-sm font-medium text-on-primary shadow-md transition-all hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-60"
			data-slot="steps-next-trigger"
		>
			{nextLabel}
		</Steps.NextTrigger>
	</div>
</Steps.Root>
