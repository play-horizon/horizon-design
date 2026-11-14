<!--
@component
Docs: ImageCropper. Live examples of the ImageCropper component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { ImageCropper } from '$lib/components/image-cropper';
</script>

<section id="image-cropper">
	<Card>
		<div>
			<ImageCropper
				src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
				alt="Mountain landscape"
				axis="both"
			/>
		</div>
	</Card>
</section>
