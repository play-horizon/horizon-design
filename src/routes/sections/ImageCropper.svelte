<script lang="ts">
	import { Card } from '$lib/components/card';
	import { ImageCropper } from '$lib/components/image-cropper';
</script>

<section id="image-cropper">
	<p class="section-tag">Forms</p>
	<h2 class="mb-6 text-2xl font-bold">Image Cropper</h2>
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
