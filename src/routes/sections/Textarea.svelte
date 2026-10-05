<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Field } from '$lib/components/field';
	import { Textarea } from '$lib/components/textarea';
</script>

<section id="textarea">
	<p class="section-tag">Forms</p>
	<h2 class="mb-6 text-2xl font-bold">Textarea</h2>
	<Card>
		<div>
			<Field label="Message">
				<Textarea placeholder="Type your message here…" rows={3} />
			</Field>
		</div>
	</Card>
</section>
