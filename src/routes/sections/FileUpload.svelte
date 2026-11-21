<!--
@component
Docs: FileUpload. A playground over its texts, the accepted files and its states, listing the
files it accepts and rejects, then a dropzone with a label and a hint, a bare one, and a disabled
one.
-->
<script lang="ts">
	import type { FileUploadFileAcceptDetails, FileUploadFileRejectDetails } from '@ark-ui/svelte';
	import { Card } from '#lib/components/card/index.js';
	import { FileUpload } from '#lib/components/file-upload/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, number, text } from '../playground/controls';

	const types = {
		any: undefined,
		images: 'image/png,image/jpeg,image/webp',
		audio: 'audio/*'
	};

	let accepted = $state.raw<string[]>([]);
	let rejected = $state.raw<string[]>([]);

	function onFileAccept(details: FileUploadFileAcceptDetails) {
		accepted = details.files.map((file) => file.name);
	}

	function onFileReject(details: FileUploadFileRejectDetails) {
		rejected = details.files.map(({ file, errors }) => `${file.name} (${errors.join(', ')})`);
	}
</script>

<div class="grid gap-4">
	<Playground
		description="Drop or browse files: the page lists what it accepts and rejects."
		controls={{
			label: text('Attachments'),
			prompt: text('Drop files here or click to browse'),
			hint: text('PNG, JPEG or WebP, up to 5 MB'),
			accept: choice(['any', 'images', 'audio'] as const, 'images'),
			maxFiles: number(3, { min: 1, max: 10 }),
			maxFileSizeMiB: number(5, { min: 1, max: 100 }),
			allowDrop: boolean(true),
			directory: boolean(),
			disabled: boolean()
		}}
	>
		{#snippet example(values)}
			<div class="grid w-full max-w-md gap-3">
				<FileUpload
					label={values.label || undefined}
					prompt={values.prompt}
					hint={values.hint || undefined}
					accept={types[values.accept]}
					maxFiles={values.maxFiles}
					maxFileSize={values.maxFileSizeMiB * 1024 * 1024}
					allowDrop={values.allowDrop}
					directory={values.directory}
					disabled={values.disabled}
					{onFileAccept}
					{onFileReject}
				/>
				<div class="grid gap-1 text-xs">
					<p class="text-muted">Accepted: {accepted.join(', ') || 'none'}</p>
					<p class="text-muted">Rejected: {rejected.join(', ') || 'none'}</p>
				</div>
			</div>
		{/snippet}
	</Playground>
	<div class="grid gap-4 md:grid-cols-3">
		<Card title="Label and hint">
			<FileUpload
				label="Game icon"
				prompt="Drop an image or browse"
				hint="PNG or WebP, 512 × 512"
				accept="image/png,image/webp"
				maxFiles={1}
			/>
		</Card>
		<Card title="Prompt only">
			<FileUpload prompt="Drop files here or click to browse" />
		</Card>
		<Card title="Disabled">
			<FileUpload label="Soundtrack" prompt="Uploads are paused" hint="Audio files" disabled />
		</Card>
	</div>
</div>
