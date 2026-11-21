<!--
@component
Docs: AngleSlider. A playground over every prop (the angle, the dial's size, the keyboard step,
the disabled, read-only and invalid states), then the dial at three sizes,
its states side by side, and presets bound to the angle.
-->
<script lang="ts">
	import { AngleSlider } from '#lib/components/angle-slider/index.js';
	import { Button } from '#lib/components/button/index.js';
	import { ButtonGroup } from '#lib/components/button-group/index.js';
	import { Card } from '#lib/components/card/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, number } from '../playground/controls';

	const degrees = (angle: number) => `${angle}°`;
	const presets = [0, 90, 180, 270];
	let heading = $state(90);
</script>

<div class="grid gap-4">
	<Playground
		description="step is how far an arrow key turns the dial."
		controls={{
			value: number(45, { min: 0, max: 359 }),
			size: number(120, { min: 60, max: 240, step: 10 }),
			step: number(1, { min: 1, max: 90 }),
			disabled: boolean(),
			readOnly: boolean(),
			invalid: boolean()
		}}
	>
		{#snippet example(values)}
			<AngleSlider
				label="Rotation"
				valueText={degrees}
				value={values.value}
				size={values.size}
				step={values.step}
				disabled={values.disabled}
				readOnly={values.readOnly}
				invalid={values.invalid}
			/>
		{/snippet}
	</Playground>
	<Card title="Sizes" description="The diameter, in pixels.">
		<div class="flex flex-wrap items-end justify-center gap-8">
			<AngleSlider label="Small rotation" valueText={degrees} size={80} defaultValue={30} />
			<AngleSlider label="Medium rotation" valueText={degrees} defaultValue={45} />
			<AngleSlider label="Large rotation" valueText={degrees} size={160} defaultValue={300} />
		</div>
	</Card>
	<Card title="States">
		<div class="flex flex-wrap items-end justify-center gap-8">
			<AngleSlider label="Disabled rotation" valueText={degrees} defaultValue={120} disabled />
			<AngleSlider label="Read-only rotation" valueText={degrees} defaultValue={210} readOnly />
			<AngleSlider label="Invalid rotation" valueText={degrees} defaultValue={330} invalid />
		</div>
	</Card>
	<Card title="Presets" description="Content under the dial, here buttons bound to the angle.">
		<div class="flex justify-center">
			<AngleSlider label="Heading" valueText={degrees} step={15} bind:value={heading}>
				<ButtonGroup aria-label="Heading presets">
					{#each presets as preset (preset)}
						<Button size="xs" onclick={() => (heading = preset)}>{degrees(preset)}</Button>
					{/each}
				</ButtonGroup>
			</AngleSlider>
		</div>
	</Card>
</div>
