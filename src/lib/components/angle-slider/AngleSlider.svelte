<!--
@component
A circular control that picks an angle in degrees (Ark AngleSlider).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { AngleSlider } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		size = 120,
		value = $bindable(0),
		children,
		...rest
	}: {
		class?: string;
		size?: number;
		value?: number;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<AngleSlider.Root
	class={cn('flex flex-col items-center gap-3', className)}
	data-slot="angle-slider"
	step={0.1}
	bind:value
	{...rest}
>
	<AngleSlider.Control
		class="relative rounded-full border-2 border-border bg-hover"
		style="width: {size}px; height: {size}px;"
	>
		<AngleSlider.Thumb class="absolute inset-0 cursor-grab active:cursor-grabbing">
			<div
				class="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full"
			>
				<div
					class="absolute h-0.5 origin-left rounded-full bg-primary"
					style="width: calc({size / 2}px - 12px); left: 50%; top: calc(50% - 1px);"
				></div>
				<div class="relative z-10 size-3 rounded-full bg-primary"></div>
			</div>
		</AngleSlider.Thumb>
	</AngleSlider.Control>
	<AngleSlider.ValueText class="font-mono text-sm font-medium text-fg tabular-nums">
		{Math.round(value)}°
	</AngleSlider.ValueText>
	<AngleSlider.HiddenInput />
	{@render children?.()}
</AngleSlider.Root>
