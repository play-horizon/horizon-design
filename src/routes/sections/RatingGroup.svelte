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
			<RatingGroup count={5} defaultValue={3} />
		</div>
	</Card>
</section>
