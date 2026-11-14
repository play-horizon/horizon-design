<!--
@component
Typography for long-form text, such as rendered Markdown: headings, paragraphs, lists, quotes,
dividers, links and inline code. Its text is selectable, unlike the rest of the interface.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils.js';

	let {
		class: className = '',
		children,
		...rest
	}: {
		/** Classes added to the text's container. */
		class?: string;
		/** The text, as HTML elements. */
		children?: Snippet;
		/** Other attributes, passed on to the `<div>`. */
		[key: string]: unknown;
	} = $props();
</script>

<div
	class={cn(
		'max-w-none text-fg select-text [&_:not(pre)>code]:rounded [&_:not(pre)>code]:bg-hover [&_:not(pre)>code]:px-1 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-sm [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-primary-hover [&_li]:mb-1 [&>blockquote]:border-l-4 [&>blockquote]:border-primary-border [&>blockquote]:pl-4 [&>blockquote]:text-muted [&>blockquote]:italic [&>h1]:mb-4 [&>h1]:text-3xl [&>h1]:font-bold [&>h2]:mb-3 [&>h2]:text-2xl [&>h2]:font-semibold [&>h3]:mb-2 [&>h3]:text-xl [&>h3]:font-semibold [&>hr]:my-4 [&>hr]:border-border [&>ol]:mb-3 [&>ol]:list-decimal [&>ol]:pl-5 [&>p]:mb-3 [&>p]:leading-relaxed [&>ul]:mb-3 [&>ul]:list-disc [&>ul]:pl-5',
		className
	)}
	data-slot="prose"
	{...rest}
>
	{@render children?.()}
</div>
