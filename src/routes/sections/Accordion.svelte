<!--
@component
Docs: Accordion. Live examples of the Accordion component.
-->
<script lang="ts">
	import { Accordion, AccordionItem } from '$lib/components/accordion';
	import { Card } from '$lib/components/card';
</script>

<section id="accordion">
	<Card>
		<Accordion>
			<AccordionItem value="item-1" trigger="What is horizon-design?">
				Horizon's design system and Svelte 5 component library, used by horizon, horizon-editor and
				the website.
			</AccordionItem>
			<AccordionItem value="item-2" trigger="What is it built on?">
				Ark UI for behaviour and accessibility, and Tailwind CSS 4 for styling, with Svelte 5 runes
				and snippets throughout.
			</AccordionItem>
			<AccordionItem value="item-3" trigger="Does it support dark and light themes?">
				Yes: dark is the default, and <code>data-theme="light"</code> switches to light. Each theme maps
				the same OKLCH palette onto its own semantic tokens.
			</AccordionItem>
			<AccordionItem value="item-4" trigger="Can I adjust a component's look?">
				Every component takes a <code>class</code> prop, merged last so it wins over the component's own
				classes. Colours always come from the tokens, never from a literal.
			</AccordionItem>
		</Accordion>
	</Card>
</section>
