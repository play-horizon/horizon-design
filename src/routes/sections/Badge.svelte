<!--
@component
Docs: Badge. A playground over every prop (the text, an icon, the variant, the size), then every
variant at both sizes, and badges with an icon.
-->
<script lang="ts">
	import { Badge } from '#lib/components/badge/index.js';
	import { Card } from '#lib/components/card/index.js';
	import MingcuteCheckLine from '~icons/mingcute/check-line';
	import MingcuteCloseCircleLine from '~icons/mingcute/close-circle-line';
	import MingcuteNotificationLine from '~icons/mingcute/notification-line';
	import MingcuteWarningLine from '~icons/mingcute/warning-line';
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
			label: text('Unread'),
			icon: boolean(),
			variant: choice(variants, 'primary'),
			size: choice(sizes)
		}}
	>
		{#snippet example(values)}
			<Badge variant={values.variant} size={values.size}>
				{#if values.icon}<MingcuteNotificationLine aria-hidden="true" />{/if}
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
	<Card title="With an icon" description="Badges mark state to notice; metadata is muted text.">
		<div class="flex flex-wrap items-center gap-2">
			<Badge variant="success"><MingcuteCheckLine aria-hidden="true" />Verified</Badge>
			<Badge variant="danger"><MingcuteCloseCircleLine aria-hidden="true" />2 errors</Badge>
			<Badge size="sm" variant="warning">
				<MingcuteWarningLine aria-hidden="true" />Not applied
			</Badge>
		</div>
	</Card>
</div>
