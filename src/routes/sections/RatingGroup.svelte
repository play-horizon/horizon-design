<script lang="ts">
	import { Card } from '$lib/components/card';
	import { RatingGroup } from '$lib/components/rating-group';
</script>

<section id="rating-group">
	<p class="section-tag">Feedback</p>
	<h2 class="mb-6 text-2xl font-bold">Rating Group</h2>
	<Card>
		<div>
			<RatingGroup count={5} defaultValue={3} />
		</div>
	</Card>
</section>
