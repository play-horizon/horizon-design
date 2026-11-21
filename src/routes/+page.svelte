<!--
@component
The docs site's foundations page: the library's version and how many components each entry point
holds (counted from the navigation), every colour token side by side in both themes with its hex and OKLCH values,
the type scale, radius, elevation, and the page motion (theme crossfade, navigation slide).
-->
<script lang="ts">
	import { tokenValues, type ColorToken } from '#lib/generated/tokens.js';
	import { theme } from '#lib/theme.svelte.js';
	import { slidePage } from '#lib/motion/page-transition.js';
	import { Button } from '#lib/components/button/index.js';
	import { navigationGroups } from './navigation';
	import packageJson from '../../package.json';

	const count = (kit: 'general' | 'editor') =>
		navigationGroups
			.filter((group) => group.kit === kit)
			.reduce((sum, group) => sum + group.items.length, 0);

	const tokens = Object.keys(tokenValues.dark) as ColorToken[];
	const themes = ['dark', 'light'] as const;
	// Full class names, so Tailwind finds them in the source.
	const textSizes = [
		'text-2xs',
		'text-xs',
		'text-sm',
		'text-base',
		'text-md',
		'text-lg',
		'text-xl',
		'text-2xl',
		'text-3xl',
		'text-4xl'
	];
	const displaySizes = ['text-display-sm', 'text-display', 'text-display-lg'];
	const radii = [
		'rounded-xs',
		'rounded-sm',
		'rounded-md',
		'rounded-lg',
		'rounded-xl',
		'rounded-full'
	];
	const shadows = ['shadow-sm', 'shadow-md', 'shadow-lg', 'inset-shadow-highlight'];

	let slideStep = $state(0);

	function slideDemo(direction: 'forward' | 'backward') {
		slidePage(direction, () => {
			slideStep += direction === 'forward' ? 1 : -1;
		});
	}
</script>

<svelte:head>
	<title>horizon-design</title>
	<meta
		name="description"
		content="horizon-design, Horizon's design system and Svelte 5 component library."
	/>
</svelte:head>

<p class="section-tag">Foundations</p>
<h1 class="text-3xl font-bold">Tokens and motion</h1>
<p class="mt-2 max-w-2xl text-fg-2" data-testid="library-summary">
	horizon-design {packageJson.version}: {count('general')} components in <code>horizon-design</code>
	and
	{count('editor')} for the Editor in <code>horizon-design/editor</code>, each with a playground of
	its props and every variant on its page.
</p>
<p class="mt-2 max-w-2xl text-fg-2">
	One OKLCH palette, mapped onto semantic tokens per theme. Components use only these tokens, so
	both themes stay consistent. <code>horizon-design/tokens</code> exports each one as data, for colours
	needed before any CSS loads: its hex, shown beside it, and its OKLCH value, shown when the hex is hovered.
</p>

<h2 class="mt-10 mb-3 text-xl font-bold">Colour tokens</h2>
<div class="grid grid-cols-2 gap-4">
	{#each themes as name (name)}
		<div
			data-theme={name}
			class="rounded-xl border border-border bg-background p-3 text-fg"
			data-testid="swatches-{name}"
		>
			<p class="mb-2 text-2xs font-bold tracking-overline text-faint uppercase">{name}</p>
			<div class="grid gap-1">
				{#each tokens as token (token)}
					<div class="flex items-center gap-2.5 text-xs">
						<span
							class="size-5 shrink-0 rounded-md border border-border-strong"
							style:background="var(--{token})"
						></span>
						<span class="font-mono">{token}</span>
						<span
							class="ml-auto font-mono text-muted select-text"
							title={tokenValues[name][token].oklch}
						>
							{tokenValues[name][token].hex}
						</span>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<h2 class="mt-10 mb-3 text-xl font-bold">Type scale</h2>
<div class="grid gap-2 rounded-xl border border-border bg-surface p-5">
	{#each textSizes as size (size)}
		<div class="flex items-baseline gap-4">
			<span class="w-32 shrink-0 font-mono text-xs text-muted">{size}</span>
			<span class={size}>Build worlds with your friends</span>
		</div>
	{/each}
	<p class="mt-3 text-2xs font-bold tracking-overline text-faint uppercase">Marketing</p>
	{#each displaySizes as size (size)}
		<div class="flex items-baseline gap-4">
			<span class="w-32 shrink-0 font-mono text-xs text-muted">{size}</span>
			<span class="{size} font-bold">Play together</span>
		</div>
	{/each}
</div>

<h2 class="mt-10 mb-3 text-xl font-bold">Radius and elevation</h2>
<div class="flex flex-wrap gap-4">
	{#each radii as radius (radius)}
		<div class="grid size-20 place-items-center border border-border-strong bg-surface {radius}">
			<span class="font-mono text-xs text-muted">{radius}</span>
		</div>
	{/each}
</div>
<div class="mt-4 flex flex-wrap gap-4">
	{#each shadows as shadow (shadow)}
		<div class="grid h-20 w-40 place-items-center rounded-lg bg-raised {shadow}">
			<span class="font-mono text-xs text-muted">{shadow}</span>
		</div>
	{/each}
</div>

<h2 class="mt-10 mb-3 text-xl font-bold">Motion</h2>
<p class="mb-3 max-w-2xl text-fg-2">
	Switching themes crossfades the whole page; navigating slides the screen in the direction of
	travel (0.32 s each). Both are skipped when the system asks for reduced motion.
</p>
<div class="flex flex-wrap items-center gap-2">
	<Button onclick={() => theme.set(theme.resolved === 'dark' ? 'light' : 'dark')}>
		Crossfade to {theme.resolved === 'dark' ? 'light' : 'dark'}
	</Button>
	<Button onclick={() => slideDemo('backward')}>Slide back</Button>
	<Button onclick={() => slideDemo('forward')}>Slide forward</Button>
	<span class="text-sm text-muted">Screen {slideStep}</span>
</div>
