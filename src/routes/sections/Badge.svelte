<!--
@component
Docs: Badge. A playground over every prop (the text, an icon, the variant, the size), then every
variant at both sizes, and badges with an icon.
-->
<script lang="ts">
	import { Badge } from '#lib/components/badge/index.js';
	import { Card } from '#lib/components/card/index.js';
	import MingcuteCheckLine from '~icons/mingcute/check-line';
	import MingcuteStarLine from '~icons/mingcute/star-line';
	import MingcuteUser1Line from '~icons/mingcute/user-1-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';

	const variants = [
		'neutral',
		'primary',
		'success',
		'warning',
		'danger',
		'info',
		'accent',
		'server',
		'local'
	] as const;
	const sizes = ['md', 'sm'] as const;
</script>

<div class="grid gap-4">
	<Playground
		controls={{
			label: text('Featured'),
			icon: boolean(),
			variant: choice(variants, 'primary'),
			size: choice(sizes)
		}}
	>
		{#snippet example(values)}
			<Badge variant={values.variant} size={values.size}>
				{#if values.icon}<MingcuteStarLine aria-hidden="true" />{/if}
				{values.label}
			</Badge>
		{/snippet}
	</Playground>
	<Card title="Variants" description="server and local are the Editor's two object modes.">
		<div class="grid gap-3">
			{#each sizes as size (size)}
				<div class="flex flex-wrap items-center gap-2">
					{#each variants as variant (variant)}
						<Badge {variant} {size}>{variant}</Badge>
					{/each}
				</div>
			{/each}
		</div>
	</Card>
	<Card title="With an icon">
		<div class="flex flex-wrap items-center gap-2">
			<Badge variant="success"><MingcuteCheckLine aria-hidden="true" />Verified</Badge>
			<Badge variant="accent"><MingcuteStarLine aria-hidden="true" />Featured</Badge>
			<Badge><MingcuteUser1Line aria-hidden="true" />12 playing</Badge>
			<Badge size="sm" variant="warning"><MingcuteStarLine aria-hidden="true" />Beta</Badge>
		</div>
	</Card>
</div>
