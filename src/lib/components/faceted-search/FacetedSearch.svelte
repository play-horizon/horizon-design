<!--
@component
Search with facets, for Discover and the store: a search field and an optional sort at the top,
the facets in a column at the side (each a group of checkboxes, with optional counts), and the
results, which the app renders in `children`. The query, the chosen options of each facet and
the sort are bound; `onChange` reports each change so the app can search again. "Clear filters"
shows while any option is chosen. Every text is passed in, translated.
-->
<script lang="ts" module>
	/** One option of a facet. */
	export interface FacetOption {
		/** The option's stable id (a tag's id, a kind). */
		id: string;
		/** Its label, translated. */
		label: string;
		/** How many results have it, formatted; not shown when unset. */
		count?: string;
	}

	/** A facet: a group of options to filter by. */
	export interface Facet {
		/** The facet's stable id ("tags", "kind"). */
		id: string;
		/** Its heading, translated. */
		label: string;
		/** Its options, in the order shown. */
		options: readonly FacetOption[];
	}

	/** A way to order the results. */
	export interface SortOption {
		/** The sort's stable id ("players", "newest"). */
		id: string;
		/** Its label, translated. */
		label: string;
	}

	/** The state of a search: what `onChange` reports. */
	export interface SearchState {
		/** The search text. */
		query: string;
		/** The chosen option ids of each facet, by facet id. */
		selected: Record<string, string[]>;
		/** The chosen sort's id; unset when there is no sort. */
		sort: string | undefined;
	}
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import MingcuteSearchLine from '~icons/mingcute/search-line';
	import Input from '../input/Input.svelte';
	import Checkbox from '../checkbox/Checkbox.svelte';
	import NativeSelect from '../native-select/NativeSelect.svelte';
	import Button from '../button/Button.svelte';

	let {
		query = $bindable(''),
		selected = $bindable({}),
		facets,
		sorts = [],
		sort = $bindable(sorts[0]?.id),
		searchLabel,
		placeholder = '',
		sortLabel,
		clearLabel,
		onChange,
		children,
		class: className = ''
	}: {
		/** The search text. */
		query?: string;
		/** The chosen option ids of each facet, by facet id. */
		selected?: Record<string, string[]>;
		/** The facets, in the order shown. */
		facets: readonly Facet[];
		/** The ways to order the results; no sort control when empty. */
		sorts?: readonly SortOption[];
		/** The chosen sort's id (bindable); unset, the first of `sorts`. */
		sort?: string;
		/** The search field's accessible name, such as "Search games". */
		searchLabel: string;
		/** The search field's placeholder, such as "Search games by name". */
		placeholder?: string;
		/** The sort control's accessible name, such as "Sort by"; unused without `sorts`. */
		sortLabel: string;
		/** The "Clear filters" button's text. */
		clearLabel: string;
		/** Called after each change of the query, a facet or the sort. */
		onChange?: (state: SearchState) => void;
		/** The results. */
		children?: Snippet;
		/** Classes merged onto the root. */
		class?: string;
	} = $props();

	const anySelected = $derived(Object.values(selected).some((ids) => ids.length > 0));

	function changed() {
		onChange?.({ query, selected, sort });
	}

	// Read the field itself: the binding may update `query` after this listener has run.
	function onQueryInput(event: Event & { currentTarget: HTMLInputElement }) {
		query = event.currentTarget.value;
		changed();
	}

	function toggle(facetId: string, optionId: string, on: boolean) {
		const current = selected[facetId] ?? [];
		const next = on ? [...current, optionId] : current.filter((id) => id !== optionId);
		selected = { ...selected, [facetId]: next };
		changed();
	}

	// The button disappears with the last chosen option, so focus moves to the first option
	// rather than falling back to the page.
	function clear(event: MouseEvent & { currentTarget: HTMLElement }) {
		selected = {};
		changed();
		event.currentTarget.closest('aside')?.querySelector('input')?.focus();
	}
</script>

<div
	class={cn('grid min-h-0 grid-cols-[13rem_minmax(0,1fr)] gap-6', className)}
	data-slot="faceted-search"
>
	<aside class="flex min-h-0 flex-col gap-5 overflow-y-auto">
		{#each facets as facet (facet.id)}
			<fieldset class="grid gap-1.5">
				<legend class="mb-1.5 text-2xs font-bold tracking-overline text-faint uppercase">
					{facet.label}
				</legend>
				{#each facet.options as option (option.id)}
					<div class="flex items-center gap-2">
						<Checkbox
							size="sm"
							label={option.label}
							checked={selected[facet.id]?.includes(option.id) ?? false}
							onCheckedChange={(details: { checked: boolean | 'indeterminate' }) =>
								toggle(facet.id, option.id, details.checked === true)}
						/>
						{#if option.count}
							<span class="ml-auto text-xs text-faint tabular-nums">{option.count}</span>
						{/if}
					</div>
				{/each}
			</fieldset>
		{/each}
		{#if anySelected}
			<Button variant="ghost" size="sm" class="justify-self-start" onclick={clear}>
				{clearLabel}
			</Button>
		{/if}
	</aside>
	<div class="flex min-h-0 min-w-0 flex-col gap-4">
		<div class="flex items-center gap-2">
			<Input
				type="search"
				bind:value={query}
				{placeholder}
				aria-label={searchLabel}
				oninput={onQueryInput}
				class="flex-1"
			>
				{#snippet start()}<MingcuteSearchLine aria-hidden="true" />{/snippet}
			</Input>
			{#if sorts.length > 0}
				<div class="w-44 shrink-0">
					<NativeSelect bind:value={sort} aria-label={sortLabel} onchange={changed}>
						{#each sorts as option (option.id)}
							<option value={option.id}>{option.label}</option>
						{/each}
					</NativeSelect>
				</div>
			{/if}
		</div>
		<div class="min-h-0 flex-1">{@render children?.()}</div>
	</div>
</div>
