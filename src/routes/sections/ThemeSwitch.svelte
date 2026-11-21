<!--
@component
Docs: ThemeSwitch. A playground over every prop, and both sizes: the highlight slides to the chosen
mode, and each button's tooltip names it.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { ThemeSwitch } from '#lib/components/theme-switch/index.js';
	import Playground from '../playground/Playground.svelte';
	import { choice } from '../playground/controls';

	const labels = { group: 'Theme', system: 'System', dark: 'Dark', light: 'Light' };
</script>

<div class="grid gap-4">
	<Playground
		controls={{
			size: choice(['md', 'sm']),
			tooltipSide: choice(['bottom', 'top', 'left', 'right'])
		}}
	>
		{#snippet example(values)}
			<ThemeSwitch {labels} size={values.size} tooltipSide={values.tooltipSide} />
		{/snippet}
	</Playground>
	<Card title="Sizes">
		<div class="flex items-center gap-4">
			<ThemeSwitch {labels} />
			<ThemeSwitch size="sm" {labels} />
		</div>
	</Card>
</div>
