<!--
@component
Typography for long-form text, such as rendered Markdown. Its text is selectable, unlike the
rest of the interface.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className = '',
		children,
		...rest
	}: {
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<div
	class={cn(
		'max-w-none text-fg select-text [&>blockquote]:border-l-4 [&>blockquote]:border-primary-border [&>blockquote]:pl-4 [&>blockquote]:text-muted [&>blockquote]:italic [&>code]:rounded [&>code]:bg-hover [&>code]:px-1 [&>code]:py-0.5 [&>code]:font-mono [&>code]:text-sm [&>h1]:mb-4 [&>h1]:text-3xl [&>h1]:font-bold [&>h2]:mb-3 [&>h2]:text-2xl [&>h2]:font-semibold [&>h3]:mb-2 [&>h3]:text-xl [&>h3]:font-semibold [&>hr]:my-4 [&>hr]:border-border [&>li]:mb-1 [&>ol]:mb-3 [&>ol]:list-decimal [&>ol]:pl-5 [&>p]:mb-3 [&>p]:leading-relaxed [&>ul]:mb-3 [&>ul]:list-disc [&>ul]:pl-5',
		className
	)}
	data-slot="prose"
	{...rest}
>
	{@render children?.()}
</div>
