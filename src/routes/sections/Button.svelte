<!--
@component
Docs: Button. A playground over every prop, then every variant and size, a link styled as a
button, and the loading and disabled states.
-->
<script lang="ts">
	import { Button, buttonVariants } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import MingcuteAddLine from '~icons/mingcute/add-line';
	import MingcutePlayFill from '~icons/mingcute/play-fill';
	import MingcuteDelete2Line from '~icons/mingcute/delete-2-line';
	import MingcuteArrowLeftLine from '~icons/mingcute/arrow-left-line';
	import { art } from '../examples';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';

	const variants = [
		'default',
		'primary',
		'tint',
		'ghost',
		'danger',
		'danger-solid',
		'link'
	] as const;
	const sizes = ['xs', 'sm', 'md', 'lg'] as const;

	let loading = $state(false);

	function load() {
		loading = true;
		setTimeout(() => (loading = false), 1500);
	}
</script>

<div class="grid gap-4">
	<Playground
		controls={{
			label: text('Play'),
			variant: choice(variants, 'primary'),
			size: choice(sizes, 'md'),
			icon: boolean(true),
			pill: boolean(),
			loading: boolean(),
			disabled: boolean()
		}}
	>
		{#snippet example(values)}
			<Button
				variant={values.variant}
				size={values.size}
				pill={values.pill}
				loading={values.loading}
				disabled={values.disabled}
			>
				{#if values.icon}<MingcutePlayFill aria-hidden="true" />{/if}
				{values.label}
			</Button>
		{/snippet}
	</Playground>
	<Card title="Variants" description="Primary is for the one main action of a screen.">
		<div class="flex flex-wrap items-center gap-2">
			<Button variant="primary"><MingcutePlayFill aria-hidden="true" />Play</Button>
			<Button>Play privately</Button>
			<Button variant="tint"><MingcuteAddLine aria-hidden="true" />New game</Button>
			<Button variant="ghost">Cancel</Button>
			<Button variant="danger"><MingcuteDelete2Line aria-hidden="true" />Delete</Button>
			<Button variant="danger-solid">Delete game</Button>
			<Button variant="link">Profile</Button>
		</div>
	</Card>
	<Card title="Over game art" description="The art variant stays readable over any art.">
		<div
			class="flex h-28 items-start rounded-lg bg-cover bg-center p-3"
			style:background-image="url({art.skyline})"
		>
			<Button size="sm" variant="art"><MingcuteArrowLeftLine aria-hidden="true" />Back</Button>
		</div>
	</Card>
	<Card title="Sizes">
		<div class="flex flex-wrap items-center gap-2">
			<Button size="xs">Extra small</Button>
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg" variant="primary"><MingcutePlayFill aria-hidden="true" />Large</Button>
		</div>
	</Card>
	<Card title="States and links">
		<div class="flex flex-wrap items-center gap-2">
			<Button {loading} onclick={load}>Publish</Button>
			<Button disabled>Disabled</Button>
			<Button pill>Pill</Button>
			<a href="#top" class={buttonVariants({ variant: 'primary', size: 'sm' })}>A link</a>
		</div>
	</Card>
</div>
