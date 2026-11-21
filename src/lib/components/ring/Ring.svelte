<!--
@component
The ring `CircularProgress` and `CircularSlider` draw: a track that fills clockwise from the top
up to `turn` (0 to 1 of a full turn), with round ends. The fill is a conic gradient drawn as a ring
by a radial mask (which reads only the alpha of its colours), and each end of the fill is a dot as
wide as the ring, centred on the ring's middle line, which rounds it. It fills its positioned
parent and is hidden from assistive technology: the parent names and announces the value.
-->
<script lang="ts">
	let {
		turn,
		thickness
	}: {
		/** How much of the ring is filled, from 0 (none) to 1 (all of it). */
		turn: number;
		/** The ring's thickness, in pixels. */
		thickness: number;
	} = $props();
</script>

{#snippet cap(angle: number)}
	<div class="absolute inset-0" style:rotate="{angle}turn" data-slot="ring-cap">
		<div
			class="absolute top-0 left-1/2 -translate-x-1/2 rounded-full bg-primary"
			style:width="{thickness}px"
			style:height="{thickness}px"
		></div>
	</div>
{/snippet}

<div aria-hidden="true" class="pointer-events-none absolute inset-0" data-slot="ring">
	<div
		class="absolute inset-0 rounded-full"
		style:background="conic-gradient(var(--primary) {turn}turn, var(--hover) 0)"
		style:mask="radial-gradient(farthest-side, transparent calc(100% - {thickness}px - 0.5px),
		currentColor calc(100% - {thickness}px))"
	></div>
	{#if turn > 0}
		{@render cap(0)}
		{@render cap(turn)}
	{/if}
</div>
