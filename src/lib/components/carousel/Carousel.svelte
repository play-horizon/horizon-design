<!--
@component
A horizontal slideshow with previous and next controls and indicators (Ark Carousel).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Carousel } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';
	import MingcuteLeftLine from '~icons/mingcute/left-line';
	import MingcuteRightLine from '~icons/mingcute/right-line';

	let {
		slides = [],
		class: className = '',
		showIndicators = true,
		showArrows = true,
		...rest
	}: {
		slides?: Snippet[];
		class?: string;
		showIndicators?: boolean;
		showArrows?: boolean;
		[key: string]: unknown;
	} = $props();

	const slideCount = $derived(slides.length);
</script>

<Carousel.Root
	{slideCount}
	class={cn('relative w-full overflow-hidden rounded-xl', className)}
	data-slot="carousel"
	{...rest}
>
	<Carousel.ItemGroup class="flex touch-pan-y items-start" data-slot="carousel-item-group">
		{#each slides as slide, i (i)}
			<Carousel.Item index={i} class="min-w-0 shrink-0 grow-0 basis-full" data-slot="carousel-item">
				{@render slide()}
			</Carousel.Item>
		{/each}
	</Carousel.ItemGroup>
	{#if showArrows}
		<Carousel.PrevTrigger
			class="absolute top-1/2 left-3 z-10 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-raised text-fg shadow-sm transition-colors hover:bg-background disabled:opacity-50"
			data-slot="carousel-prev"
		>
			<MingcuteLeftLine class="size-4" />
		</Carousel.PrevTrigger>
		<Carousel.NextTrigger
			class="absolute top-1/2 right-3 z-10 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-raised text-fg shadow-sm transition-colors hover:bg-background disabled:opacity-50"
			data-slot="carousel-next"
		>
			<MingcuteRightLine class="size-4" />
		</Carousel.NextTrigger>
	{/if}
	{#if showIndicators}
		<Carousel.IndicatorGroup
			class="flex items-center justify-center gap-1.5 py-3"
			data-slot="carousel-indicators"
		>
			<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
			{#each slides as _, i (i)}
				<Carousel.Indicator
					index={i}
					class="size-1.5 rounded-full bg-faint transition-all data-current:w-4 data-current:bg-primary"
					data-slot="carousel-indicator"
				/>
			{/each}
		</Carousel.IndicatorGroup>
	{/if}
</Carousel.Root>
