<!--
@component
A QR code of a value, on the fixed `paper` background so scanners read it in both themes (Ark
QrCode). `label` names the image for assistive technology.
-->
<script lang="ts">
	import { QrCode } from '@ark-ui/svelte';

	let {
		value,
		label,
		class: className = '',
		size = 160,
		...rest
	}: {
		/** What the code encodes, such as a link. */
		value: string;
		/** The image's accessible name, such as "QR code of the invitation link". */
		label: string;
		/** Classes added to the root. */
		class?: string;
		/** The code's width and height, in pixels. */
		size?: number;
		/** Other props of Ark's `QrCode.Root`. */
		[key: string]: unknown;
	} = $props();
</script>

<QrCode.Root {value} class={className || undefined} data-slot="qr-code" {...rest}>
	<QrCode.Frame
		class="rounded-xl bg-paper p-3 shadow-lg"
		style="width: {size}px; height: {size}px;"
		role="img"
		aria-label={label}
	>
		<QrCode.Pattern />
	</QrCode.Frame>
</QrCode.Root>
