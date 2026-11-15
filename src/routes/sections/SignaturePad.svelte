<!--
@component
Docs: SignaturePad. Live examples of the SignaturePad component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { SignaturePad } from '#lib/components/signature-pad/index.js';
</script>

<section id="signature-pad">
	<Card>
		<div>
			<SignaturePad
				label="Draw your signature"
				roleDescription="signature pad"
				clearLabel="Clear"
			/>
		</div>
	</Card>
</section>
