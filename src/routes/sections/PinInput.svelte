<!--
@component
Docs: PinInput. Live examples of the PinInput component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { PinInput } from '#lib/components/pin-input/index.js';
</script>

<section id="pin-input">
	<Card>
		<div class="space-y-3">
			<PinInput
				count={5}
				label="Verification code"
				translations={{
					inputLabel: (index: number, length: number) => `Digit ${index + 1} of ${length}`
				}}
			/>
			<p class="text-xs text-muted">Enter the 5-digit code sent to your email.</p>
		</div>
	</Card>
</section>
