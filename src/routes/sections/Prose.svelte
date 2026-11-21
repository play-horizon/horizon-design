<!--
@component
Docs: Prose. A playground over its text, then every element it styles: headings,
paragraphs, inline code, links, bulleted and numbered lists, a quote and a divider.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Prose } from '#lib/components/prose/index.js';
	import Playground from '../playground/Playground.svelte';
	import { text } from '../playground/controls';
</script>

<div class="grid gap-4">
	<Playground
		description="Prose has no props of its own: edit its text."
		controls={{
			heading: text('Release notes'),
			paragraph: text('Release 18 adds night races and a new garage.'),
			quote: text('The best update yet.')
		}}
	>
		{#snippet example(values)}
			<Prose class="w-full">
				<h2>{values.heading}</h2>
				<p>{values.paragraph}</p>
				<blockquote>{values.quote}</blockquote>
			</Prose>
		{/snippet}
	</Playground>
	<Card title="Every element">
		<Prose>
			<h2>Release notes</h2>
			<p>
				Use Prose to style rich text content with predictable spacing, <code>inline code</code>
				and <a href="#top">links</a> included.
			</p>
			<h3>What's new</h3>
			<ul>
				<li>Headings, paragraphs, lists, quotes, links, code, and dividers are covered.</li>
				<li>It keeps generated content aligned with the design system.</li>
			</ul>
			<h3>Upgrading</h3>
			<ol>
				<li>Open the game in the editor.</li>
				<li>Publish a new release.</li>
			</ol>
			<blockquote>Consistent typography makes long-form content easier to scan.</blockquote>
			<hr />
			<p>Its text is selectable, unlike the rest of the interface.</p>
		</Prose>
	</Card>
</div>
