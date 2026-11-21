<!--
@component
Docs: RadioGroup. A playground over every prop (the label, the size, the orientation and Ark's
states), then every size, a horizontal group, a disabled option, an option with a snippet label,
and the disabled and invalid states.
-->
<script lang="ts">
	import { Badge } from '#lib/components/badge/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { RadioGroup } from '#lib/components/radio-group/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';

	const sizes = ['sm', 'md', 'lg'] as const;
	const visibilities = [
		{ value: 'public', label: 'Public' },
		{ value: 'friends', label: 'Friends only' },
		{ value: 'private', label: 'Private' },
		{ value: 'unlisted', label: 'Unlisted', disabled: true }
	];

	let visibility = $state<string | null>('public');
</script>

{#snippet proLabel()}
	<span class="text-sm">
		Pro <Badge variant="info" class="ml-1 py-0 text-[10px]">Popular</Badge>
	</span>
{/snippet}

<div class="grid gap-4">
	<Playground
		description="Unlisted is a disabled option."
		controls={{
			label: text('Visibility'),
			size: choice(sizes, 'md'),
			orientation: choice(['vertical', 'horizontal'] as const),
			disabled: boolean(),
			readOnly: boolean(),
			invalid: boolean(),
			required: boolean()
		}}
	>
		{#snippet example(values)}
			<div class="grid gap-3">
				<RadioGroup
					items={visibilities}
					bind:value={visibility}
					label={values.label || undefined}
					aria-label={values.label ? undefined : 'Visibility'}
					size={values.size}
					orientation={values.orientation}
					disabled={values.disabled}
					readOnly={values.readOnly}
					invalid={values.invalid}
					required={values.required}
				/>
				<p class="text-xs text-muted">Value: {visibility ?? 'none'}</p>
			</div>
		{/snippet}
	</Playground>
	<Card title="Sizes">
		<div class="grid gap-6 sm:grid-cols-3">
			{#each sizes as size (size)}
				<RadioGroup label="Size {size}" {size} items={visibilities} defaultValue="friends" />
			{/each}
		</div>
	</Card>
	<Card title="Layouts and labels">
		<div class="grid gap-6">
			<RadioGroup
				label="Horizontal"
				orientation="horizontal"
				items={visibilities}
				defaultValue="public"
			/>
			<RadioGroup
				label="Subscription plan"
				defaultValue="pro"
				items={[
					{ value: 'free', label: 'Free' },
					{ value: 'pro', label: proLabel },
					{ value: 'enterprise', label: 'Enterprise' }
				]}
			/>
		</div>
	</Card>
	<Card title="States">
		<div class="grid gap-6 sm:grid-cols-2">
			<RadioGroup label="Disabled" disabled items={visibilities} defaultValue="public" />
			<RadioGroup label="Invalid" invalid items={visibilities} />
		</div>
	</Card>
</div>
