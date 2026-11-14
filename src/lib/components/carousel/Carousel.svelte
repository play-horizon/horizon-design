<!--
@component
A horizontal slideshow with previous and next controls and indicators (Ark Carousel);
`translations` name the slides and the controls and give the roles the carousel and its slides are
announced as.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Carousel, type CarouselRootProps } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';
	import MingcuteLeftLine from '~icons/mingcute/left-line';
	import MingcuteRightLine from '~icons/mingcute/right-line';

	let {
		slides = [],
		label,
		class: className = '',
		showIndicators = true,
		showArrows = true,
		translations,
		...rest
	}: {
		/** The slides, in order. */
		slides?: Snippet[];
		/** The carousel's accessible name, such as "Featured games". */
		label: string;
		/** Classes merged onto the root. */
		class?: string;
		/** Shows a dot per slide under the slides. */
		showIndicators?: boolean;
		/** Shows the previous and next buttons over the slides. */
		showArrows?: boolean;
		/**
		 * The accessible names Ark gives the slides (`item(index, count)`), the indicators
		 * (`indicator(index)`) and the buttons (`prevTrigger`, `nextTrigger`), and the roles the
		 * carousel and each slide are announced as (`roleDescription`, `slideRoleDescription`, such
		 * as "carousel" and "slide").
		 */
		translations: Required<
			Pick<
				NonNullable<CarouselRootProps['translations']>,
				'item' | 'indicator' | 'prevTrigger' | 'nextTrigger'
			>
		> & { roleDescription: string; slideRoleDescription: string };
		/** Other props of Ark's `Carousel.Root`: `page` and `onPageChange`, `loop`, `slidesPerPage`. */
		[key: string]: unknown;
	} = $props();

	const slideCount = $derived(slides.length);
	const { roleDescription, slideRoleDescription, ...arkTranslations } = $derived(translations);
</script>

<Carousel.Root
	{slideCount}
	translations={arkTranslations}
	aria-roledescription={roleDescription}
	aria-label={label}
	class={cn('relative w-full overflow-hidden rounded-xl', className)}
	data-slot="carousel"
	{...rest}
>
	<Carousel.ItemGroup class="flex touch-pan-y items-start" data-slot="carousel-item-group">
		<!-- Slides are snippets with no identity of their own, given in a fixed order: keyed by place. -->
		{#each slides as slide, i (i)}
			<Carousel.Item
				index={i}
				aria-roledescription={slideRoleDescription}
				class="min-w-0 shrink-0 grow-0 basis-full"
				data-slot="carousel-item"
			>
				{@render slide()}
			</Carousel.Item>
		{/each}
	</Carousel.ItemGroup>
	{#if showArrows}
		<Carousel.PrevTrigger
			class="absolute top-1/2 left-3 z-10 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-raised text-fg shadow-sm transition-colors hover:bg-background disabled:opacity-50"
			data-slot="carousel-prev"
		>
			<MingcuteLeftLine class="size-4" aria-hidden="true" />
		</Carousel.PrevTrigger>
		<Carousel.NextTrigger
			class="absolute top-1/2 right-3 z-10 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-raised text-fg shadow-sm transition-colors hover:bg-background disabled:opacity-50"
			data-slot="carousel-next"
		>
			<MingcuteRightLine class="size-4" aria-hidden="true" />
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
