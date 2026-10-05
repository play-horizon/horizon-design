<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Prose } from '$lib/components/prose';
</script>

<section id="prose">
	<p class="section-tag">Typography</p>
	<h2 class="mb-6 text-2xl font-bold">Prose</h2>
	<Card>
		<Prose>
			<h2>Release notes</h2>
			<p>Use Prose to style rich text content with predictable spacing.</p>
			<ul>
				<li>Headings, paragraphs, lists, quotes, code, and dividers are covered.</li>
				<li>It keeps generated or CMS content aligned with the design system.</li>
			</ul>
			<blockquote>Consistent typography makes long-form content easier to scan.</blockquote>
		</Prose>
	</Card>
</section>
