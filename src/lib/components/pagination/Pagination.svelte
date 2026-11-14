<!--
@component
Page links with previous and next (Ark Pagination). `page` binds the current page; without it,
Ark's `defaultPage` sets the first one. Ark's `translations` name its controls (`rootLabel`,
`prevTriggerLabel`, `nextTriggerLabel`, `itemLabel`).
-->
<script lang="ts">
	import {
		Pagination,
		type PaginationRootProps,
		type PaginationPageChangeDetails
	} from '@ark-ui/svelte';
	import { cn } from '$lib/utils';
	import MingcuteLeftLine from '~icons/mingcute/left-line';
	import MingcuteRightLine from '~icons/mingcute/right-line';

	let {
		class: className = '',
		count,
		pageSize = 10,
		siblingCount = 1,
		page = $bindable(),
		onPageChange,
		translations,
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
		/** Other props of Ark's `Pagination.Root`. */
		[key: string]: unknown;
	} = $props();

	const buttonClass =
		'inline-flex items-center justify-center size-8 rounded-lg text-sm font-medium transition-colors border border-transparent hover:bg-hover hover:text-fg disabled:pointer-events-none disabled:opacity-50 data-selected:bg-primary data-selected:text-on-primary data-selected:border-transparent';
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
	<Pagination.Context>
		{#snippet render(api)}
			<Pagination.PrevTrigger class={cn(buttonClass, 'text-muted')}>
				<MingcuteLeftLine class="size-4" aria-hidden="true" />
			</Pagination.PrevTrigger>

			{#each api().pages as item, index (item.type === 'page' ? item.value : `ellipsis-${index}`)}
				{#if item.type === 'page'}
					<Pagination.Item value={item.value} type={item.type} class={buttonClass}>
						{item.value}
					</Pagination.Item>
				{:else}
					<Pagination.Ellipsis
						{index}
						class="flex size-8 items-center justify-center text-sm text-muted"
					>
						&#8230;
					</Pagination.Ellipsis>
				{/if}
			{/each}

			<Pagination.NextTrigger class={cn(buttonClass, 'text-muted')}>
				<MingcuteRightLine class="size-4" aria-hidden="true" />
			</Pagination.NextTrigger>
		{/snippet}
	</Pagination.Context>
</Pagination.Root>
