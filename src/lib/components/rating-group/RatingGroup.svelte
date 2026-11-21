<!--
@component
A row of stars to give a rating (Ark RatingGroup). `label` names the group; `translations` names
each star (`ratingValueText`, "3 stars") and gives the role a star is announced as
(`roleDescription`). `value` binds the rating; without it, Ark's `defaultValue` sets the first one.
With Ark's `allowHalf`, a half rating fills half a star.
-->
<script lang="ts">
	import {
		RatingGroup,
		type RatingGroupRootProps,
		type RatingGroupValueChangeDetails
	} from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';
	import MingcuteStarFill from '~icons/mingcute/star-fill';

	let {
		class: className = '',
		label,
		count = 5,
		value = $bindable(),
		onValueChange,
		translations,
		...rest
	}: {
		/** Classes added to the root, around the label and the stars. */
		class?: string;
		/** The group's visible label, which names it, such as "Your rating". */
		label: string;
		/** How many stars there are. */
		count?: number;
		/** The rating, from 1 to `count`. */
		value?: number;
		/** Called on every change of the rating, after `value` is updated. */
		onValueChange?: (details: RatingGroupValueChangeDetails) => void;
		/**
		 * `ratingValueText(index)` names each star, such as "3 stars"; `roleDescription` is the role
		 * a star is announced as, such as "rating".
		 */
		translations: Required<
			Pick<NonNullable<RatingGroupRootProps['translations']>, 'ratingValueText'>
		> & { roleDescription: string };
		/** Other props of Ark's `RatingGroup.Root`. */
		[key: string]: unknown;
	} = $props();

	const { roleDescription, ...arkTranslations } = $derived(translations);
</script>

<RatingGroup.Root
	translations={arkTranslations}
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
	<RatingGroup.Label class="text-sm leading-none font-medium" data-slot="rating-group-label">
		{label}
	</RatingGroup.Label>
	<RatingGroup.Context>
		{#snippet render(api)}
			<RatingGroup.Control class="flex items-center gap-1 data-disabled:opacity-50">
				{#each api().items as item (item)}
					<RatingGroup.Item
						index={item}
						aria-roledescription={roleDescription}
						class="group/star relative rounded-sm text-muted transition-colors data-highlighted:not-data-half:text-warning"
					>
						<MingcuteStarFill class="size-5" aria-hidden="true" />
						<MingcuteStarFill
							class="absolute inset-0 hidden size-5 text-warning [clip-path:inset(0_50%_0_0)] group-data-half/star:block rtl:[clip-path:inset(0_0_0_50%)]"
							aria-hidden="true"
						/>
					</RatingGroup.Item>
				{/each}
			</RatingGroup.Control>
		{/snippet}
	</RatingGroup.Context>
	<RatingGroup.HiddenInput />
</RatingGroup.Root>
