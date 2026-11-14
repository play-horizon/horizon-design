<!--
@component
A row of stars to give a rating (Ark RatingGroup).
-->
<script lang="ts">
	import { RatingGroup } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';
	import MingcuteStarFill from '~icons/mingcute/star-fill';

	let {
		class: className = '',
		count = 5,
		value = $bindable(0),
		...rest
	}: {
		class?: string;
		count?: number;
		value?: number;
		[key: string]: unknown;
	} = $props();
</script>

<RatingGroup.Root
	{count}
	{value}
	onValueChange={(details) => (value = details.value)}
	class={cn('flex flex-col gap-1.5', className)}
	data-slot="rating-group"
	{...rest}
>
	<RatingGroup.Context>
		{#snippet render(api)}
			<RatingGroup.Control class="flex items-center gap-1">
				{#each api().items as item (item)}
					<RatingGroup.Item
						index={item}
						class="text-muted transition-colors outline-none data-highlighted:text-warning"
					>
						<MingcuteStarFill class="size-5" />
					</RatingGroup.Item>
				{/each}
			</RatingGroup.Control>
		{/snippet}
	</RatingGroup.Context>
</RatingGroup.Root>
