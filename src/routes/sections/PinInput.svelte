<script lang="ts">
	import { Card } from '$lib/components/card';
	import { PinInput } from '$lib/components/pin-input';
</script>

<section id="pin-input">
	<p class="section-tag">Forms</p>
	<h2 class="mb-6 text-2xl font-bold">Pin Input</h2>
	<Card>
		<div class="space-y-3">
			<PinInput length={5} label="Verification Code" />
			<p class="text-muted-foreground text-xs">Enter the 5-digit code sent to your email.</p>
		</div>
	</Card>
</section>
