<!--
@component
The trail of pages leading to the current one, each a link but the last; `label` names the trail.
-->
<script lang="ts">
	import { cn } from '$lib/utils';
	import MingcuteRightLine from '~icons/mingcute/right-line';

	interface BreadcrumbItemConfig {
		/** The page's name. */
		label: string;
		/** The page's link, already resolved by the app; the current page, last, has none. */
		href?: string;
	}

	let {
		items = [],
		label,
		class: className = '',
		...rest
	}: {
		/** The pages from the first to the current one, which comes last. */
		items?: BreadcrumbItemConfig[];
		/** The trail's accessible name, such as "Breadcrumb". */
		label: string;
		/** Classes merged onto the trail. */
		class?: string;
		/** Other attributes of the trail. */
		[key: string]: unknown;
	} = $props();
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- the app passes hrefs it has already resolved -->

<nav class={cn(className)} aria-label={label} data-slot="breadcrumb" {...rest}>
	<ol class="flex flex-wrap items-center gap-1.5 text-sm text-muted" data-slot="breadcrumb-list">
		{#each items as item, i (`${item.label}:${item.href ?? ''}`)}
			<li class="inline-flex items-center gap-1.5" data-slot="breadcrumb-item">
				{#if item.href}
					<a class="transition-colors hover:text-fg" href={item.href} data-slot="breadcrumb-link">
						{item.label}
					</a>
				{:else}
					<span
						class="font-medium text-fg"
						aria-current={i === items.length - 1 ? 'page' : undefined}
						data-slot="breadcrumb-page"
					>
						{item.label}
					</span>
				{/if}
			</li>
			{#if i < items.length - 1}
				<li class="flex items-center" aria-hidden="true" data-slot="breadcrumb-separator">
					<MingcuteRightLine class="size-3" aria-hidden="true" />
				</li>
			{/if}
		{/each}
	</ol>
</nav>
