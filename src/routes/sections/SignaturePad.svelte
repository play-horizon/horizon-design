<script lang="ts">
	import { Card } from '$lib/components/card';
	import { SignaturePad } from '$lib/components/signature-pad';
</script>

<section id="signature-pad">
	<p class="section-tag">Forms</p>
	<h2 class="mb-6 text-2xl font-bold">Signature Pad</h2>
	<Card>
		<div>
			<SignaturePad label="Draw your signature" />
		</div>
	</Card>
</section>
