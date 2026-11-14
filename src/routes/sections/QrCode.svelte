<!--
@component
Docs: QrCode. Live examples of the QrCode component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { QrCode } from '#lib/components/qr-code/index.js';
</script>

<section id="qr-code">
	<Card>
		<div class="flex items-center gap-6">
			<QrCode value="https://github.com" label="QR code of github.com" size={120} />
			<div>
				<p class="mb-1 text-sm font-medium text-fg">Scan to visit</p>
				<p class="text-xs text-muted">https://github.com</p>
			</div>
		</div>
	</Card>
</section>
