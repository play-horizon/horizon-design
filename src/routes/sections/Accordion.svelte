<!--
@component
Docs: Accordion. A playground over every prop (several sections open at once, closing the last
one, a disabled accordion or section, lazy and unmounted content), then a single and a multiple
accordion, a disabled section and triggers written as snippets.
-->
<script lang="ts">
	import { Accordion, AccordionItem } from '#lib/components/accordion/index.js';
	import { Card } from '#lib/components/card/index.js';
	import MingcutePaletteLine from '~icons/mingcute/palette-line';
	import MingcuteMoonLine from '~icons/mingcute/moon-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean } from '../playground/controls';

	const questions = [
		{
			value: 'what',
			question: 'What is horizon-design?',
			answer:
				"Horizon's design system and Svelte 5 component library, used by horizon, horizon-editor and the website."
		},
		{
			value: 'built-on',
			question: 'What is it built on?',
			answer:
				'Ark UI for behaviour and accessibility, and Tailwind CSS 4 for styling, with Svelte 5 runes and snippets throughout.'
		},
		{
			value: 'themes',
			question: 'Does it support dark and light themes?',
			answer:
				'Yes: dark is the default, and each theme maps the same OKLCH palette onto its own semantic tokens.'
		}
	];
</script>

<div class="grid gap-4">
	<Playground
		description="itemDisabled turns off the second section only."
		controls={{
			multiple: boolean(),
			collapsible: boolean(true),
			disabled: boolean(),
			itemDisabled: boolean(),
			lazyMount: boolean(true),
			unmountOnExit: boolean(true)
		}}
	>
		{#snippet example(values)}
			<Accordion
				class="w-full"
				multiple={values.multiple}
				collapsible={values.collapsible}
				disabled={values.disabled}
				lazyMount={values.lazyMount}
				unmountOnExit={values.unmountOnExit}
			>
				{#each questions as item, index (item.value)}
					<AccordionItem
						value={item.value}
						trigger={item.question}
						disabled={values.itemDisabled && index === 1}
					>
						{item.answer}
					</AccordionItem>
				{/each}
			</Accordion>
		{/snippet}
	</Playground>
	<div class="grid gap-4 md:grid-cols-2">
		<Card title="Single" description="One section open at a time; the open one closes again.">
			<Accordion defaultValue={['built-on']}>
				{#each questions as item (item.value)}
					<AccordionItem value={item.value} trigger={item.question}>{item.answer}</AccordionItem>
				{/each}
			</Accordion>
		</Card>
		<Card title="Multiple" description="Any number of sections open together.">
			<Accordion multiple defaultValue={['what', 'themes']}>
				{#each questions as item (item.value)}
					<AccordionItem value={item.value} trigger={item.question}>{item.answer}</AccordionItem>
				{/each}
			</Accordion>
		</Card>
		<Card title="Disabled section" description="The second section can't be opened.">
			<Accordion>
				{#each questions as item, index (item.value)}
					<AccordionItem value={item.value} trigger={item.question} disabled={index === 1}>
						{item.answer}
					</AccordionItem>
				{/each}
			</Accordion>
		</Card>
		<Card title="Snippet triggers" description="A trigger can hold an icon or any markup.">
			<Accordion>
				<AccordionItem value="tokens">
					{#snippet trigger()}
						<span class="flex items-center gap-2">
							<MingcutePaletteLine class="size-4 text-primary" aria-hidden="true" />
							Colour tokens
						</span>
					{/snippet}
					Components use only the semantic tokens, never a colour literal.
				</AccordionItem>
				<AccordionItem value="dark">
					{#snippet trigger()}
						<span class="flex items-center gap-2">
							<MingcuteMoonLine class="size-4 text-primary" aria-hidden="true" />
							Dark by default
						</span>
					{/snippet}
					<code>data-theme="light"</code> on the root switches to the light theme.
				</AccordionItem>
			</Accordion>
		</Card>
	</div>
</div>
