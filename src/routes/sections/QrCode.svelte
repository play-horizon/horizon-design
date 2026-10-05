<script lang="ts">
	import { Card } from '$lib/components/card';
	import { QrCode } from '$lib/components/qr-code';
</script>

<section id="qr-code">
	<p class="section-tag">Display</p>
	<h2 class="mb-6 text-2xl font-bold">QR Code</h2>
	<Card>
		<div class="flex items-center gap-6">
			<QrCode value="https://github.com" size={120} />
			<div>
				<p class="text-foreground mb-1 text-sm font-medium">Scan to visit</p>
				<p class="text-muted-foreground text-xs">https://github.com</p>
			</div>
		</div>
	</Card>
</section>
