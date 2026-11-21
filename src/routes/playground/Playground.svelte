<!--
@component
A live example with its controls beside it: the docs site's way to try every prop of a component.
`controls` declares one control per prop (see `controls.ts`); `example` renders the component with
their current values, and re-renders as a control changes.

```svelte
<Playground title="Playground" controls={{ size: choice(['sm', 'md']), disabled: boolean() }}>
	{#snippet example(values)}
		<Button size={values.size} disabled={values.disabled}>Play</Button>
	{/snippet}
</Playground>
```
-->
<script lang="ts" generics="C extends Controls">
	import type { Snippet } from 'svelte';
	import { untrack } from 'svelte';
	import { Card } from '#lib/components/card/index.js';
	import { Input } from '#lib/components/input/index.js';
	import { NativeSelect } from '#lib/components/native-select/index.js';
	import { Switch } from '#lib/components/switch/index.js';
	import { initialValues, type ControlValues, type Controls } from './controls';

	let {
		title = 'Playground',
		description,
		controls,
		example
	}: {
		/** The card's title. */
		title?: string;
		/** A line under the title. */
		description?: string;
		/** One control per prop, by prop name. */
		controls: C;
		/** The example, rendered with the controls' current values. */
		example: Snippet<[ControlValues<C>]>;
	} = $props();

	// The declaration only gives the starting values; from then on the controls own them.
	const values = $state(initialValues(untrack(() => controls)));
	const id = $props.id();
	const names = $derived(Object.keys(controls) as (keyof C & string)[]);
</script>

<Card {title} {description}>
	<div class="grid gap-4 md:grid-cols-[minmax(0,1fr)_15rem]">
		<div
			class="flex min-h-32 min-w-0 flex-wrap items-center justify-center gap-3 rounded-md border border-dashed border-border p-4"
			data-testid="playground-example"
		>
			{@render example(values)}
		</div>
		<div class="grid content-start gap-3" role="group" aria-label="{title} controls">
			{#each names as name (name)}
				{@const control = controls[name]}
				{#if control.type === 'boolean'}
					<Switch
						size="sm"
						label={name}
						checked={values[name] as boolean}
						onCheckedChange={(details: { checked: boolean }) => {
							values[name] = details.checked as C[typeof name]['value'];
						}}
					/>
				{:else}
					<label class="grid gap-1 text-xs font-medium" for="{id}-{name}">
						{name}
						{#if control.type === 'choice'}
							<NativeSelect
								id="{id}-{name}"
								class="h-control-sm"
								value={values[name] as string}
								onchange={(event: Event & { currentTarget: HTMLSelectElement }) => {
									values[name] = event.currentTarget.value as C[typeof name]['value'];
								}}
							>
								{#each control.options as option (option)}
									<option value={option}>{option}</option>
								{/each}
							</NativeSelect>
						{:else if control.type === 'text'}
							<Input
								id="{id}-{name}"
								size="sm"
								value={values[name] as string}
								oninput={(event: Event & { currentTarget: HTMLInputElement }) => {
									values[name] = event.currentTarget.value as C[typeof name]['value'];
								}}
							/>
						{:else}
							<Input
								id="{id}-{name}"
								size="sm"
								type="number"
								min={control.min}
								max={control.max}
								step={control.step}
								value={String(values[name])}
								oninput={(event: Event & { currentTarget: HTMLInputElement }) => {
									const next = event.currentTarget.valueAsNumber;
									if (!Number.isNaN(next)) values[name] = next as C[typeof name]['value'];
								}}
							/>
						{/if}
					</label>
				{/if}
			{/each}
		</div>
	</div>
</Card>
