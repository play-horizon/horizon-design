<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Field } from '$lib/components/field';
	import { Input } from '$lib/components/input';
	import { Textarea } from '$lib/components/textarea';
</script>

<section id="field">
	<p class="section-tag">Forms</p>
	<h2 class="mb-6 text-2xl font-bold">Field</h2>
	<Card>
		<div class="space-y-4">
			<Field label="Username" helperText="Must be 3–20 characters, letters and numbers.">
				<Input placeholder="Enter username…" />
			</Field>
			<Field invalid label="Email" errorText="Please enter a valid email address.">
				<Input type="email" placeholder="you@example.com" value="invalid-email" />
			</Field>
			<Field label="Message">
				<Textarea placeholder="Type your message here…" rows={3} />
			</Field>
		</div>
	</Card>
</section>
