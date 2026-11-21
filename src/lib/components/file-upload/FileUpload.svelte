<!--
@component
A dropzone that takes files by drop or by browsing (Ark FileUpload); `prompt` and `hint` are its
texts, and together name it for assistive technology, as they read on screen. A `disabled`
dropzone is dimmed.
-->
<script lang="ts">
	import { FileUpload } from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';
	import MingcuteFileUploadLine from '~icons/mingcute/file-upload-line';

	let {
		class: className = '',
		label,
		prompt,
		hint,
		accept,
		maxFiles,
		maxFileSize,
		...rest
	}: {
		/** Classes merged onto the root. */
		class?: string;
		/** The visible label above the dropzone. */
		label?: string;
		/** The dropzone's main text, the start of its accessible name, such as "Drop files here or click to browse". */
		prompt: string;
		/** A second line under the prompt, such as the accepted formats; the end of its accessible name. */
		hint?: string;
		/** The accepted file types, as in the file input's `accept` (`image/png,image/webp`). */
		accept?: string;
		/** How many files can be chosen at once. */
		maxFiles?: number;
		/** The largest accepted file, in bytes. */
		maxFileSize?: number;
		/** Other props of Ark's `FileUpload.Root`, such as `onFileAccept`, `onFileReject` or `disabled`. */
		[key: string]: unknown;
	} = $props();
</script>

<FileUpload.Root
	class={cn('flex flex-col gap-3', className)}
	data-slot="file-upload"
	{accept}
	{maxFiles}
	{maxFileSize}
	{...rest}
>
	{#if label}
		<FileUpload.Label class="block text-sm font-medium text-fg" data-slot="file-upload-label">
			{label}
		</FileUpload.Label>
	{/if}
	<!-- Named by its text, as it reads, rather than by Ark's label, which would leave the hint out. -->
	<FileUpload.Dropzone
		aria-label={null}
		class="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-surface p-8 text-center transition-colors outline-none hover:bg-hover focus-visible:ring-2 focus-visible:ring-primary data-disabled:pointer-events-none data-disabled:opacity-50 data-dragging:border-primary data-dragging:bg-primary-subtle"
		data-slot="file-upload-dropzone"
	>
		<MingcuteFileUploadLine class="size-8 text-muted" aria-hidden="true" />
		<div>
			<p class="text-sm font-medium text-fg">{prompt}</p>
			{#if hint}
				<p class="mt-1 text-xs text-muted">{hint}</p>
			{/if}
		</div>
	</FileUpload.Dropzone>
	<FileUpload.HiddenInput />
</FileUpload.Root>
