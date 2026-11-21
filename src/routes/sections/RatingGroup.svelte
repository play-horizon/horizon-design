<!--
@component
Docs: RatingGroup. A playground over every prop (the label, the number of stars, half stars and
Ark's states), then a half rating, a ten-star scale, and the read-only and disabled states.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { RatingGroup } from '#lib/components/rating-group/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, number, text } from '../playground/controls';

	const translations = {
		ratingValueText: (index: number) => (index === 1 ? '1 star' : `${index} stars`),
		roleDescription: 'rating'
	};

	let rating = $state(3);
</script>

<div class="grid gap-4">
	<Playground
		controls={{
			label: text('Your rating'),
			count: number(5, { min: 1, max: 10, step: 1 }),
			allowHalf: boolean(),
			readOnly: boolean(),
			disabled: boolean(),
			required: boolean()
		}}
	>
		{#snippet example(values)}
			<div class="grid gap-2">
				<RatingGroup
					label={values.label}
					count={values.count}
					bind:value={rating}
					allowHalf={values.allowHalf}
					readOnly={values.readOnly}
					disabled={values.disabled}
					required={values.required}
					{translations}
				/>
				<p class="text-xs text-muted">Rating: {rating}</p>
			</div>
		{/snippet}
	</Playground>
	<Card title="Scales and states">
		<div class="grid gap-6 sm:grid-cols-2">
			<RatingGroup label="Half stars" allowHalf defaultValue={3.5} {translations} />
			<RatingGroup label="Out of ten" count={10} defaultValue={7} {translations} />
			<RatingGroup label="Read-only" readOnly defaultValue={4} {translations} />
			<RatingGroup label="Disabled" disabled defaultValue={2} {translations} />
		</div>
	</Card>
</div>
