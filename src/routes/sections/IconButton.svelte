<!--
@component
Docs: IconButton. A playground over every prop, and every variant and size side by side.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { IconButton } from '#lib/components/icon-button/index.js';
	import MingcuteDelete2Line from '~icons/mingcute/delete-2-line';
	import MingcuteSettings3Line from '~icons/mingcute/settings-3-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';

	const variants = ['default', 'primary', 'tint', 'ghost', 'danger', 'danger-solid'] as const;
	const sizes = ['xs', 'sm', 'md', 'lg'] as const;
</script>

<div class="grid gap-4">
	<Playground
		description="The label is the tooltip and the accessible name."
		controls={{
			label: text('Settings'),
			variant: choice(variants, 'ghost'),
			size: choice(sizes, 'md'),
			side: choice(['top', 'bottom', 'left', 'right']),
			disabled: boolean()
		}}
	>
		{#snippet example(values)}
			<IconButton
				label={values.label}
				variant={values.variant}
				size={values.size}
				side={values.side}
				disabled={values.disabled}
			>
				<MingcuteSettings3Line aria-hidden="true" />
			</IconButton>
		{/snippet}
	</Playground>
	<Card title="Variants">
		<div class="flex flex-wrap items-center gap-2">
			{#each variants as variant (variant)}
				<IconButton label="Delete ({variant})" {variant}>
					<MingcuteDelete2Line aria-hidden="true" />
				</IconButton>
			{/each}
		</div>
	</Card>
	<Card title="Sizes">
		<div class="flex flex-wrap items-center gap-2">
			{#each sizes as size (size)}
				<IconButton label="Settings ({size})" {size} variant="default">
					<MingcuteSettings3Line aria-hidden="true" />
				</IconButton>
			{/each}
		</div>
	</Card>
</div>
