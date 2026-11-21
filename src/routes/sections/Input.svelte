<!--
@component
Docs: Input. A playground over its text, type, size and states and what sits at its start and
end, then every size, the disabled, read-only and invalid states, start and end content (an icon,
a key, a clear button), and inside a `Field`.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Field } from '#lib/components/field/index.js';
	import { IconButton } from '#lib/components/icon-button/index.js';
	import { Input } from '#lib/components/input/index.js';
	import { Kbd } from '#lib/components/kbd/index.js';
	import MingcuteCloseLine from '~icons/mingcute/close-line';
	import MingcuteMailLine from '~icons/mingcute/mail-line';
	import MingcuteSearchLine from '~icons/mingcute/search-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';

	const sizes = ['sm', 'md', 'lg'] as const;

	let search = $state('Neon');
	let filter = $state('tree');
</script>

{#snippet searchIcon()}<MingcuteSearchLine aria-hidden="true" />{/snippet}
{#snippet shortcut()}<Kbd>/</Kbd>{/snippet}

<div class="grid gap-4">
	<Playground
		controls={{
			placeholder: text('Search games'),
			type: choice(['text', 'search', 'email', 'password', 'number', 'url'] as const),
			size: choice(sizes, 'md'),
			start: boolean(true),
			end: choice(['none', 'key', 'clear button'] as const, 'key'),
			disabled: boolean(),
			readonly: boolean(),
			invalid: boolean(),
			required: boolean()
		}}
	>
		{#snippet example(values)}
			{#snippet clear()}
				<IconButton label="Clear the search" size="xs" onclick={() => (search = '')}>
					<MingcuteCloseLine aria-hidden="true" />
				</IconButton>
			{/snippet}
			<Input
				class="max-w-xs"
				aria-label="Search games"
				bind:value={search}
				placeholder={values.placeholder}
				type={values.type}
				size={values.size}
				disabled={values.disabled}
				readonly={values.readonly}
				invalid={values.invalid}
				required={values.required}
				start={values.start ? searchIcon : undefined}
				end={values.end === 'key' ? shortcut : values.end === 'clear button' ? clear : undefined}
			/>
		{/snippet}
	</Playground>
	<div class="grid gap-4 md:grid-cols-2">
		<Card title="Sizes">
			<div class="grid gap-3">
				{#each sizes as size (size)}
					<Input {size} aria-label="Display name ({size})" placeholder="Size {size}" />
				{/each}
			</div>
		</Card>
		<Card title="States">
			<div class="grid gap-3">
				<Input aria-label="Region" value="Europe West" disabled />
				<Input aria-label="Game id" value="g_8f2k1" readonly />
				<Input aria-label="Email" type="email" value="nova@" invalid />
			</div>
		</Card>
		<Card title="Start and end">
			<div class="grid gap-3">
				<Input aria-label="Search" placeholder="Search" start={searchIcon} end={shortcut} />
				<Input aria-label="Email" type="email" placeholder="you@example.com">
					{#snippet start()}<MingcuteMailLine aria-hidden="true" />{/snippet}
				</Input>
				<Input aria-label="Filter the assets" bind:value={filter}>
					{#snippet end()}
						<IconButton label="Clear the filter" size="xs" onclick={() => (filter = '')}>
							<MingcuteCloseLine aria-hidden="true" />
						</IconButton>
					{/snippet}
				</Input>
			</div>
		</Card>
		<Card title="In a field" description="The field gives it its label, help text and error.">
			<div class="grid gap-3">
				<Field label="Username" helperText="3 to 20 letters and numbers.">
					<Input placeholder="nova_7" />
				</Field>
				<Field invalid label="Email" errorText="Enter a valid email address.">
					<Input type="email" value="nova@" />
				</Field>
			</div>
		</Card>
	</div>
</div>
