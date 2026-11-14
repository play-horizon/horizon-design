<!--
@component
Chooses tags from a fixed list (the platform's tag lists are never free text): every tag is a
toggle chip, the chosen ones tinted and checked. With `max`, the other chips are disabled once
that many are chosen (games take up to 3 tags, store listings up to 5). The app passes the list
with its labels translated; `value` holds the chosen tags' ids, in the order they were chosen.
-->
<script lang="ts" module>
	/** One tag of a fixed list. */
	export interface TagOption {
		/** The tag's stable id. */
		id: string;
		/** Its label, translated. */
		label: string;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils';
	import MingcuteCheckLine from '~icons/mingcute/check-line';

	let {
		options,
		value = $bindable([]),
		max,
		label,
		disabled = false,
		onChange,
		class: className = ''
	}: {
		/** The fixed list to choose from. */
		options: readonly TagOption[];
		/** The ids of the chosen tags. */
		value?: string[];
		/** The most tags that may be chosen; no limit when unset. */
		max?: number;
		/** The group's accessible name, such as "Tags". */
		label: string;
		/** Disables every chip. */
		disabled?: boolean;
		/** Called with the chosen ids after each change. */
		onChange?: (value: string[]) => void;
		class?: string;
	} = $props();

	const chosen = $derived(new Set(value));
	const full = $derived(max !== undefined && value.length >= max);

	function toggle(id: string) {
		value = chosen.has(id) ? value.filter((v) => v !== id) : [...value, id];
		onChange?.(value);
	}
</script>

<div
	role="group"
	aria-label={label}
	class={cn('flex flex-wrap gap-1.5', className)}
	data-slot="tag-picker"
>
	{#each options as option (option.id)}
		{@const on = chosen.has(option.id)}
		<button
			type="button"
			aria-pressed={on}
			disabled={disabled || (full && !on)}
			class={cn(
				'inline-flex h-control-sm items-center gap-1 rounded-full border px-2.5 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-40',
				on
					? 'border-primary-border bg-primary-subtle font-semibold text-primary'
					: 'border-border bg-surface text-fg-2 hover:bg-hover hover:text-fg'
			)}
			onclick={() => toggle(option.id)}
		>
			{#if on}<MingcuteCheckLine class="-ml-0.5 size-3.5" aria-hidden="true" />{/if}
			{option.label}
		</button>
	{/each}
</div>
