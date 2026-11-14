<!--
@component
Page links with previous and next (Ark Pagination); Ark `translations` name its controls.
-->
<script lang="ts">
	import { Pagination } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';
	import MingcuteLeftLine from '~icons/mingcute/left-line';
	import MingcuteRightLine from '~icons/mingcute/right-line';

	let {
		class: className = '',
		count = 100,
		pageSize = 10,
		siblingCount = 1,
		page = $bindable(1),
		...rest
	}: {
		class?: string;
		count?: number;
		pageSize?: number;
		siblingCount?: number;
		page?: number;
		[key: string]: unknown;
	} = $props();

	const buttonClass =
		'inline-flex items-center justify-center size-8 rounded-lg text-sm font-medium transition-colors border border-transparent hover:bg-hover hover:text-fg disabled:pointer-events-none disabled:opacity-50 data-selected:bg-primary data-selected:text-on-primary data-selected:border-transparent';
</script>

<Pagination.Root
	{count}
	{pageSize}
	{siblingCount}
	{page}
	onPageChange={(details) => (page = details.page)}
	class={cn('flex items-center gap-1', className)}
	data-slot="pagination"
	{...rest}
>
	<Pagination.Context>
		{#snippet render(api)}
			<Pagination.PrevTrigger class={cn(buttonClass, 'text-muted')}>
				<MingcuteLeftLine class="size-4" />
			</Pagination.PrevTrigger>

			{#each api().pages as page, pageIndex (pageIndex)}
				{#if page.type === 'page'}
					<Pagination.Item value={page.value} type={page.type} class={buttonClass}>
						{page.value}
					</Pagination.Item>
				{:else}
					<Pagination.Ellipsis
						index={pageIndex}
						class="flex size-8 items-center justify-center text-sm text-muted"
					>
						&#8230;
					</Pagination.Ellipsis>
				{/if}
			{/each}

			<Pagination.NextTrigger class={cn(buttonClass, 'text-muted')}>
				<MingcuteRightLine class="size-4" />
			</Pagination.NextTrigger>
		{/snippet}
	</Pagination.Context>
</Pagination.Root>
