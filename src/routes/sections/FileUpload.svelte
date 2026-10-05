<script lang="ts">
	import { Card } from '$lib/components/card';
	import { FileUpload } from '$lib/components/file-upload';
</script>

<section id="file-upload">
	<p class="section-tag">Forms</p>
	<h2 class="mb-6 text-2xl font-bold">File Upload</h2>
	<Card>
		<div>
			<FileUpload label="Attachments" />
		</div>
	</Card>
</section>
