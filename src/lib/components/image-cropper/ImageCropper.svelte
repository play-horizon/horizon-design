<!--
@component
Crops an image to a frame that can be moved and resized (Ark ImageCropper), for avatars and
thumbnails.
-->
<script lang="ts">
	import { ImageCropper } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';

	let {
		src,
		alt = '',
		axis = 'both',
		class: className = '',
		...rest
	}: {
		src: string;
		alt?: string;
		axis?: 'horizontal' | 'vertical' | 'both';
		class?: string;
		[key: string]: unknown;
	} = $props();
</script>

<ImageCropper.Root
	class={cn(
		'[--cropper-accent:var(--on-art)] [--cropper-handler-size:--spacing(2)] [--cropper-handler-width:--spacing(0.5)]',
		'relative aspect-video w-full',
		className
	)}
	data-slot="image-cropper"
	{...rest}
>
	<ImageCropper.Viewport class="size-full overflow-hidden" data-slot="image-cropper-viewport">
		<ImageCropper.Image
			{src}
			{alt}
			class={cn(
				'absolute top-0 left-0 size-full object-contain',
				'pointer-events-none origin-center select-none backface-hidden'
			)}
			data-slot="image-cropper-image"
		/>
		<ImageCropper.Selection
			class={cn(
				'shadow-[0_0_0_9999px_var(--scrim)]',
				'border-2 border-on-art/64',
				'cursor-move',
				'data-[shape=circle]:rounded-full',
				'outline-none focus-visible:border-(--cropper-accent)',
				'data-disabled:cursor-default',
				'data-dragging:cursor-grabbing data-dragging:border-on-art/84'
			)}
			data-slot="image-cropper-selection"
		>
			{#if axis === 'horizontal' || axis === 'both'}
				<ImageCropper.Grid
					axis="horizontal"
					class="pointer-events-none absolute inset-[33.33%_0] border-t border-b border-on-art/40 opacity-0 transition-opacity duration-200 data-dragging:opacity-100 data-panning:opacity-100"
					data-slot="image-cropper-grid"
				/>
			{/if}
			{#if axis === 'vertical' || axis === 'both'}
				<ImageCropper.Grid
					axis="vertical"
					class="pointer-events-none absolute inset-[0_33.33%] border-r border-l border-on-art/40 opacity-0 transition-opacity duration-200 data-dragging:opacity-100 data-panning:opacity-100"
					data-slot="image-cropper-grid"
				/>
			{/if}

			{#each ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'] as const as position (position)}
				<ImageCropper.Handle
					{position}
					class={cn(
						'absolute flex touch-none items-center justify-center',
						'h-[calc(var(--cropper-handler-size)+8px)] w-[calc(var(--cropper-handler-size)+8px)]',
						'data-disabled:hidden',
						'data-[position=ne]:cursor-nesw-resize data-[position=nw]:cursor-nwse-resize',
						'data-[position=se]:cursor-nwse-resize data-[position=sw]:cursor-nesw-resize',
						'data-[position=n]:cursor-ns-resize data-[position=s]:cursor-ns-resize',
						'data-[position=e]:cursor-ew-resize data-[position=w]:cursor-ew-resize'
					)}
					data-slot="image-cropper-handle"
				>
					<span
						aria-hidden="true"
						class="block size-(--cropper-handler-size) bg-(--cropper-accent) shadow-sm"
					></span>
				</ImageCropper.Handle>
			{/each}
		</ImageCropper.Selection>
	</ImageCropper.Viewport>
</ImageCropper.Root>
