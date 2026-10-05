<script lang="ts">
	import { Accordion, AccordionItem } from '$lib/components/accordion';
	import { Card } from '$lib/components/card';
</script>

<section id="accordion">
	<p class="section-tag">Navigation</p>
	<h2 class="mb-6 text-2xl font-bold">Accordion</h2>
	<Card>
		<Accordion>
			<AccordionItem value="item-1" trigger="What is horizon-design?">
				Horizon's design system and svelte 5 UI component library
			</AccordionItem>
			<AccordionItem value="item-2" trigger="How does it compare to shadcn/ui?">
				Same headless Ark UI primitives but built natively for Svelte 5 with runes, snippets, and
				Tailwind v4. The design language is darker and more vibrant with OKLCH perceptual color
				uniformity.
			</AccordionItem>
			<AccordionItem value="item-3" trigger="Does it support dark and light modes?">
				Yes — dark theme is the default <code>:root</code> style. Light theme activates via the
				<code>.light</code> class. All colors use OKLCH for perceptual uniformity across both themes.
			</AccordionItem>
			<AccordionItem value="item-4" trigger="Can I customize the components?">
				Every component accepts a <code>class</code> prop and exposes
				<code>data-slot</code>
				attributes for targeted CSS overrides. The Tailwind v4 CSS variables make theming as simple as
				changing a single <code>oklch()</code> value.
			</AccordionItem>
		</Accordion>
	</Card>
</section>
