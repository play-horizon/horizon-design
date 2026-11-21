<!--
@component
Docs: Toggle. A playground over every prop (variant, size, an icon, a label or both, pressed and
disabled), then both variants, every size, icon-only toggles named by a tooltip, and the
disabled state, pressed and not.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Toggle } from '#lib/components/toggle/index.js';
	import { Tooltip } from '#lib/components/tooltip/index.js';
	import MingcuteBoldLine from '~icons/mingcute/bold-line';
	import MingcuteItalicLine from '~icons/mingcute/italic-line';
	import MingcuteUnderlineLine from '~icons/mingcute/underline-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';

	const variants = ['default', 'outline'] as const;
	const sizes = ['sm', 'md', 'lg'] as const;
	const formats = [
		{ label: 'Bold', Icon: MingcuteBoldLine },
		{ label: 'Italic', Icon: MingcuteItalicLine },
		{ label: 'Underline', Icon: MingcuteUnderlineLine }
	];
</script>

<div class="grid gap-4">
	<Playground
		description="With only an icon, the label is its tooltip and its accessible name."
		controls={{
			label: text('Bold'),
			content: choice(['icon and label', 'icon', 'label'] as const),
			variant: choice(variants, 'outline'),
			size: choice(sizes, 'md'),
			pressed: boolean(),
			disabled: boolean()
		}}
	>
		{#snippet example(values)}
			{#if values.content === 'icon'}
				<Tooltip content={values.label}>
					{#snippet trigger(props)}
						<Toggle
							{...props}
							aria-label={values.label}
							variant={values.variant}
							size={values.size}
							pressed={values.pressed}
							disabled={values.disabled}
						>
							<MingcuteBoldLine aria-hidden="true" />
						</Toggle>
					{/snippet}
				</Tooltip>
			{:else}
				<Toggle
					variant={values.variant}
					size={values.size}
					pressed={values.pressed}
					disabled={values.disabled}
				>
					{#if values.content === 'icon and label'}<MingcuteBoldLine aria-hidden="true" />{/if}
					{values.label}
				</Toggle>
			{/if}
		{/snippet}
	</Playground>
	<Card title="Variants" description="Borderless, or outlined; each shown off and on.">
		<div class="flex flex-wrap items-center gap-2">
			{#each variants as variant (variant)}
				<Toggle {variant}>
					<MingcuteUnderlineLine aria-hidden="true" />
					Underline
				</Toggle>
				<Toggle {variant} pressed>
					<MingcuteUnderlineLine aria-hidden="true" />
					Underline
				</Toggle>
			{/each}
		</div>
	</Card>
	<Card title="Sizes">
		<div class="flex flex-wrap items-center gap-2">
			{#each sizes as size (size)}
				<Toggle variant="outline" {size}>Size {size}</Toggle>
			{/each}
		</div>
	</Card>
	<Card title="Icon only" description="A tooltip around each one names it.">
		<div class="flex flex-wrap items-center gap-1">
			{#each formats as format (format.label)}
				<Tooltip content={format.label}>
					{#snippet trigger(props)}
						<Toggle {...props} aria-label={format.label}>
							<format.Icon aria-hidden="true" />
						</Toggle>
					{/snippet}
				</Tooltip>
			{/each}
		</div>
	</Card>
	<Card title="Disabled">
		<div class="flex flex-wrap items-center gap-2">
			<Toggle variant="outline" disabled>Off</Toggle>
			<Toggle variant="outline" disabled pressed>On</Toggle>
		</div>
	</Card>
</div>
