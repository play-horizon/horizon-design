<!--
@component
A row of stars to give a rating (Ark RatingGroup). `label` names the group; Ark's
`translations.ratingValueText` names each star ("3 stars"). `value` binds the rating; without it,
Ark's `defaultValue` sets the first one.
-->
<script lang="ts">
	import { RatingGroup, type RatingGroupValueChangeDetails } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';
	import MingcuteStarFill from '~icons/mingcute/star-fill';

	let {
		class: className = '',
		label,
		count = 5,
		value = $bindable(),
		onValueChange,
		...rest
	}: {
		/** Classes added to the root, around the label and the stars. */
		class?: string;
		/** The group's label, which names it, such as "Your rating". */
		label?: string;
		/** How many stars there are. */
		count?: number;
		/** The rating, from 1 to `count`. */
		value?: number;
		/** Called on every change of the rating, after `value` is updated. */
		onValueChange?: (details: RatingGroupValueChangeDetails) => void;
		[key: string]: unknown;
	} = $props();
</script>

<RatingGroup.Root
	{count}
	{value}
	onValueChange={(details) => {
		value = details.value;
		onValueChange?.(details);
	}}
	class={cn('flex flex-col gap-1.5', className)}
	data-slot="rating-group"
	{...rest}
>
	{#if label}
		<RatingGroup.Label class="text-sm leading-none font-medium" data-slot="rating-group-label">
			{label}
		</RatingGroup.Label>
	{/if}
	<RatingGroup.Context>
		{#snippet render(api)}
			<RatingGroup.Control class="flex items-center gap-1">
				{#each api().items as item (item)}
					<RatingGroup.Item
						index={item}
						class="rounded-sm text-muted transition-colors data-highlighted:text-warning"
					>
						<MingcuteStarFill class="size-5" aria-hidden="true" />
					</RatingGroup.Item>
				{/each}
			</RatingGroup.Control>
		{/snippet}
	</RatingGroup.Context>
	<RatingGroup.HiddenInput />
</RatingGroup.Root>
