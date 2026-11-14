<!--
@component
A QR code of a value, on a white background so scanners read it in both themes (Ark QrCode).
-->
<script lang="ts">
	import { QrCode } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		value = '',
		class: className = '',
		size = 160,
		...rest
	}: {
		value?: string;
		class?: string;
		size?: number;
		[key: string]: unknown;
	} = $props();
</script>

<QrCode.Root {value} class={cn('', className)} data-slot="qr-code" {...rest}>
	<QrCode.Frame
		class="rounded-xl bg-paper p-3 shadow-lg"
		style="width: {size}px; height: {size}px;"
	>
		<QrCode.Pattern />
	</QrCode.Frame>
</QrCode.Root>
