<!--
@component
Docs: ImageCropper. Live examples of the ImageCropper component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { ImageCropper } from '$lib/components/image-cropper';
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
</script>

<section id="image-cropper">
	<Card>
		<div>
			<ImageCropper src={art.skyline} alt="Skyline Obby's thumbnail" axis="both" {translations} />
		</div>
	</Card>
</section>
