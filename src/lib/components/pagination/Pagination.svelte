<!--
@component
Page links with previous and next (Ark Pagination). `page` binds the current page; without it,
Ark's `defaultPage` sets the first one. Ark's `translations` name its controls (`rootLabel`,
`prevTriggerLabel`, `nextTriggerLabel`, `itemLabel`).

`children` replaces the built-in controls with the app's own, composed from the parts:
`PaginationPrevTrigger`, `PaginationNextTrigger`, `PaginationItem` (one page link),
`PaginationEllipsis`, and `PaginationContext`, whose `render` snippet reads the state (`page`,
`totalPages`, `pages`) to draw them.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import {
		Pagination,
		type PaginationRootProps,
		type PaginationPageChangeDetails
	} from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';
	import MingcuteLeftLine from '~icons/mingcute/left-line';
	import MingcuteRightLine from '~icons/mingcute/right-line';
	import PaginationEllipsis from './PaginationEllipsis.svelte';
	import PaginationItem from './PaginationItem.svelte';
	import PaginationNextTrigger from './PaginationNextTrigger.svelte';
	import PaginationPrevTrigger from './PaginationPrevTrigger.svelte';

	let {
		class: className = '',
		count,
		pageSize = 10,
		siblingCount = 1,
		page = $bindable(),
		onPageChange,
		translations,
		children,
		...rest
	}: {
		/** Classes added to the row of links. */
		class?: string;
		/** How many items there are in all, across every page. */
		count: number;
		/** How many items one page holds. */
		pageSize?: number;
		/** How many page links show on each side of the current one. */
		siblingCount?: number;
		/** The current page, from 1. */
		page?: number;
		/** Called on every change of page, after `page` is updated. */
		onPageChange?: (details: PaginationPageChangeDetails) => void;
		/** Names of the navigation (`rootLabel`), the previous and next buttons and each page link (`itemLabel`). */
		translations: Required<
			Pick<
				NonNullable<PaginationRootProps['translations']>,
				'rootLabel' | 'prevTriggerLabel' | 'nextTriggerLabel' | 'itemLabel'
			>
		> &
			NonNullable<PaginationRootProps['translations']>;
		/** Controls composed from the parts, in place of the built-in ones. */
		children?: Snippet;
		/** Other props of Ark's `Pagination.Root`. */
		[key: string]: unknown;
	} = $props();
</script>

<Pagination.Root
	{translations}
	{count}
	{pageSize}
	{siblingCount}
	{page}
	onPageChange={(details) => {
		page = details.page;
		onPageChange?.(details);
	}}
	class={cn('flex items-center gap-1', className)}
	data-slot="pagination"
	{...rest}
>
	{#if children}
		{@render children()}
	{:else}
		<Pagination.Context>
			{#snippet render(api)}
				<PaginationPrevTrigger class="text-muted">
					<MingcuteLeftLine class="size-4" aria-hidden="true" />
				</PaginationPrevTrigger>

				{#each api().pages as item, index (item.type === 'page' ? item.value : `ellipsis-${index}`)}
					{#if item.type === 'page'}
						<PaginationItem value={item.value}>{item.value}</PaginationItem>
					{:else}
						<PaginationEllipsis {index} />
					{/if}
				{/each}

				<PaginationNextTrigger class="text-muted">
					<MingcuteRightLine class="size-4" aria-hidden="true" />
				</PaginationNextTrigger>
			{/snippet}
		</Pagination.Context>
	{/if}
</Pagination.Root>
