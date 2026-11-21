<!--
@component
Docs: ImageCropper. A playground over the frame's shape, aspect ratio and guide lines, the zoom
and a fixed frame, reporting the crop; then a free thumbnail crop and a round avatar crop side by
side.
-->
<script lang="ts">
	import type { ImageCropperCropChangeDetails } from '@ark-ui/svelte';
	import { Card } from '#lib/components/card/index.js';
	import { ImageCropper } from '#lib/components/image-cropper/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, number } from '../playground/controls';
	import { art } from '../examples';

	const translations = {
		rootLabel: 'Thumbnail cropper',
		rootRoleDescription: 'Image cropper',
		previewLoading: 'Loading the thumbnail',
		previewDescription: ({ crop }: { crop: { width: number; height: number } }) =>
			`Thumbnail cropped to ${crop.width} by ${crop.height} pixels`,
		selectionLabel: () => 'Crop frame',
		selectionRoleDescription: '2D slider',
		selectionInstructions: 'Use the arrow keys to move the frame; hold Alt to resize it.',
		selectionValueText: ({ x, y, width, height }: Record<'x' | 'y' | 'width' | 'height', number>) =>
			`${width} by ${height} pixels, at ${x}, ${y}`
	};

	const aspectRatios = { free: undefined, '1:1': 1, '16:9': 16 / 9, '4:3': 4 / 3 };

	let crop = $state('');

	function onCropChange({ crop: area }: ImageCropperCropChangeDetails) {
		const [x, y, width, height] = [area.x, area.y, area.width, area.height].map(Math.round);
		crop = `${width} × ${height} at ${x}, ${y}`;
	}
</script>

<div class="grid gap-4">
	<Playground
		description="Drag the frame or its handles; scroll or pinch to zoom."
		controls={{
			cropShape: choice(['rectangle', 'circle'] as const),
			aspectRatio: choice(['free', '1:1', '16:9', '4:3'] as const),
			axis: choice(['both', 'horizontal', 'vertical'] as const),
			zoom: number(1, { min: 1, max: 3, step: 0.25 }),
			fixedCropArea: boolean()
		}}
	>
		{#snippet example(values)}
			<div class="grid w-full max-w-lg gap-2">
				<ImageCropper
					src={art.skyline}
					alt="Skyline Obby's thumbnail"
					{translations}
					cropShape={values.cropShape}
					aspectRatio={aspectRatios[values.aspectRatio]}
					axis={values.axis}
					zoom={values.zoom}
					fixedCropArea={values.fixedCropArea}
					{onCropChange}
				/>
				<p class="text-xs text-muted" aria-live="polite">Crop: {crop || 'not moved yet'}</p>
			</div>
		{/snippet}
	</Playground>
	<div class="grid gap-4 md:grid-cols-2">
		<Card title="Thumbnail" description="A free rectangle, every guide line.">
			<ImageCropper src={art.neon} alt="Neon Drift's thumbnail" {translations} />
		</Card>
		<Card title="Avatar" description="A round, square frame.">
			<ImageCropper
				src={art.frost}
				alt="Frostbite Arena's art"
				{translations}
				cropShape="circle"
				aspectRatio={1}
			/>
		</Card>
	</div>
</div>
