<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Hint } from '$lib/components/hint';
	import { Input } from '$lib/components/input';
</script>

<section id="hint">
	<p class="section-tag">Forms</p>
	<h2 class="mb-6 text-2xl font-bold">Hint</h2>
	<Card>
		<div>
			<form class="space-y-2">
				<input
					type="text"
					autocomplete="username"
					aria-hidden="true"
					class="sr-only"
					tabindex="-1"
				/>
				<Input placeholder="Password" type="password" autocomplete="new-password" />
				<Hint>Must be at least 8 characters with a number.</Hint>
			</form>
		</div>
	</Card>
</section>
