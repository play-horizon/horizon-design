<!--
@component
Docs: RatingGroup. Live examples of the RatingGroup component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { RatingGroup } from '$lib/components/rating-group';
</script>

<section id="rating-group">
	<Card>
		<div>
			<RatingGroup
				label="Your rating"
				count={5}
				defaultValue={3}
				translations={{
					ratingValueText: (index: number) => (index === 1 ? '1 star' : `${index} stars`),
					roleDescription: 'rating'
				}}
			/>
		</div>
	</Card>
</section>
