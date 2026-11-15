<!--
@component
Docs: Hint. Live examples of the Hint component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Hint } from '#lib/components/hint/index.js';
	import { Input } from '#lib/components/input/index.js';
</script>

<section id="hint">
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
				<Input
					type="password"
					autocomplete="new-password"
					aria-label="Password"
					aria-describedby="hint-password"
				/>
				<Hint id="hint-password">Must be at least 8 characters with a number.</Hint>
			</form>
		</div>
	</Card>
</section>
