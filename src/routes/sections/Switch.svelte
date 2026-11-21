<!--
@component
Docs: Switch. A playground over every prop, then every size in both variants, with and without
thumb icons (sized and centred by the switch), and the disabled states.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Switch } from '#lib/components/switch/index.js';
	import MingcuteCheckFill from '~icons/mingcute/check-fill';
	import MingcuteCloseFill from '~icons/mingcute/close-fill';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';

	const sizes = ['sm', 'md', 'lg', 'xl'] as const;
	const variants = ['default', 'secondary'] as const;
</script>

{#snippet on()}<MingcuteCheckFill aria-hidden="true" />{/snippet}
{#snippet off()}<MingcuteCloseFill aria-hidden="true" />{/snippet}

<div class="grid gap-4">
	<Playground
		controls={{
			label: text('Sound'),
			size: choice(sizes, 'md'),
			variant: choice(variants),
			icons: boolean(true),
			checked: boolean(true),
			disabled: boolean(),
			readOnly: boolean(),
			invalid: boolean()
		}}
	>
		{#snippet example(values)}
			<Switch
				label={values.label}
				size={values.size}
				variant={values.variant}
				checked={values.checked}
				disabled={values.disabled}
				readOnly={values.readOnly}
				invalid={values.invalid}
				checkedContent={values.icons ? on : undefined}
				uncheckedContent={values.icons ? off : undefined}
			/>
		{/snippet}
	</Playground>
	{#each variants as variant (variant)}
		<Card title={variant === 'default' ? 'Default' : 'Secondary'}>
			<div class="grid gap-4 sm:grid-cols-4">
				{#each sizes as size (size)}
					<div class="grid content-start gap-3">
						<p class="text-xs font-medium text-muted">{size}</p>
						<Switch {size} {variant} label="Off" />
						<Switch {size} {variant} label="On" defaultChecked />
						<Switch {size} {variant} label="Icons" checkedContent={on} uncheckedContent={off} />
						<Switch
							{size}
							{variant}
							label="Icons, on"
							defaultChecked
							checkedContent={on}
							uncheckedContent={off}
						/>
						<Switch {size} {variant} label="Disabled" disabled />
						<Switch {size} {variant} label="Disabled, on" disabled checked />
					</div>
				{/each}
			</div>
		</Card>
	{/each}
</div>
