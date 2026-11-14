<!--
@component
Docs: FileUpload. Live examples of the FileUpload component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { FileUpload } from '#lib/components/file-upload/index.js';
</script>

<section id="file-upload">
	<Card>
		<div>
			<FileUpload
				label="Attachments"
				prompt="Drop files here or click to browse"
				hint="PNG, JPEG or WebP, up to 5 MB"
			/>
		</div>
	</Card>
</section>
