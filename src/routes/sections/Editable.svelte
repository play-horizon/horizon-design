<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Editable } from '$lib/components/editable';
</script>

<section id="editable">
	<p class="section-tag">Forms</p>
	<h2 class="mb-6 text-2xl font-bold">Editable</h2>
	<Card>
		<div>
			<Editable label="Display Name" defaultValue="Click me to edit" />
		</div>
	</Card>
</section>
