<!--
@component
Docs: PinInput. Live examples of the PinInput component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { PinInput } from '$lib/components/pin-input';
</script>

<section id="pin-input">
	<Card>
		<div class="space-y-3">
			<PinInput length={5} label="Verification Code" />
			<p class="text-xs text-muted">Enter the 5-digit code sent to your email.</p>
		</div>
	</Card>
</section>
