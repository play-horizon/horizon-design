<!--
@component
Docs: Input. Live examples of the Input component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Field } from '#lib/components/field/index.js';
	import { Input } from '#lib/components/input/index.js';
</script>

<section id="input">
	<Card>
		<div class="space-y-4">
			<Field label="Username" helperText="Must be 3–20 characters, letters and numbers.">
				<Input placeholder="Enter username…" />
			</Field>
			<Field invalid label="Email" errorText="Please enter a valid email address.">
				<Input type="email" placeholder="you@example.com" value="invalid-email" />
			</Field>
		</div>
	</Card>
</section>
