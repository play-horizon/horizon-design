<!--
@component
Content that scrolls continuously, pausing while it is hovered or focused (Ark Marquee); `label`
names the region for assistive technology. Under reduced motion it stays still. Each piece of the
content is a `MarqueeItem`, which Ark spaces by `spacing`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Marquee } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		label,
		children,
		...rest
	}: {
		/** Classes merged onto the root. */
		class?: string;
		/** The region's accessible name, such as "Featured games". */
		label: string;
		/** The `MarqueeItem`s; Ark repeats them so the loop has no gap. */
		children?: Snippet;
		/** Other props of Ark's `Marquee.Root`, such as `speed`, `side`, `spacing` or `autoFill`. */
		[key: string]: unknown;
	} = $props();
</script>

<!-- Ark sets the animation's variables (--marquee-duration, --marquee-translate…) and leaves the
     animation itself to the styles. -->
<Marquee.Root
	class={cn('group', className)}
	data-slot="marquee"
	translations={{ root: label }}
	pauseOnInteraction
	{...rest}
>
	<Marquee.Viewport>
		<Marquee.Content
			class="items-center group-data-paused:[animation-play-state:paused] data-reverse:[animation-direction:reverse] data-[orientation=vertical]:[animation-name:hd-marquee-y] motion-safe:[animation:hd-marquee-x_var(--marquee-duration)_linear_var(--marquee-delay)_var(--marquee-loop-count)]"
		>
			{@render children?.()}
		</Marquee.Content>
	</Marquee.Viewport>
</Marquee.Root>

<style>
	@keyframes -global-hd-marquee-x {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(var(--marquee-translate));
		}
	}

	@keyframes -global-hd-marquee-y {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(var(--marquee-translate));
		}
	}
</style>
