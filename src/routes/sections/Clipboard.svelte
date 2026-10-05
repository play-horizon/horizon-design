<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Clipboard } from '$lib/components/clipboard';
</script>

<section id="clipboard">
	<p class="section-tag">Forms</p>
	<h2 class="mb-6 text-2xl font-bold">Clipboard</h2>
	<Card>
		<div class="space-y-4">
			<Clipboard value="npm install horizon-design" label="Install command" />
		</div>
	</Card>
</section>
