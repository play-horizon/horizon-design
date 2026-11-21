<!--
@component
The docs site's shell: a skip link to the page, the header (logo, name, theme switch), the sidebar
with every component page, and the page itself, which slides in the direction of travel when the page changes (the
library's own `slidePage`, as the apps use it).
-->
<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { asset, resolve } from '$app/paths';
	import { onNavigate } from '$app/navigation';
	import { theme } from '#lib/theme.svelte.js';
	import { slidePage } from '#lib/motion/page-transition.js';
	import { Sidebar, SidebarItem, SidebarSection } from '#lib/components/sidebar/index.js';
	import { ThemeSwitch } from '#lib/components/theme-switch/index.js';
	import { Input } from '#lib/components/input/index.js';
	import { SkipNav } from '#lib/components/skip-nav/index.js';
	import MingcuteSearchLine from '~icons/mingcute/search-line';
	import { navigationGroups, pageOrder } from './navigation';
	import packageJson from '../../package.json';

	let { children } = $props();
	let search = $state('');

	onMount(() => theme.initialize());

	const current = $derived(page.params.section ?? '');

	const groups = $derived.by(() => {
		const query = search.trim().toLowerCase();
		if (!query) return navigationGroups;
		return navigationGroups
			.map((g) => ({ ...g, items: g.items.filter((i) => i.label.toLowerCase().includes(query)) }))
			.filter((g) => g.items.length > 0);
	});

	function sectionOf(pathname: string | undefined): string {
		const base = resolve('/');
		return (pathname ?? base).slice(base.length).replace(/\/$/, '');
	}

	onNavigate((navigation) => {
		const from = pageOrder.indexOf(sectionOf(navigation.from?.url.pathname));
		const to = pageOrder.indexOf(sectionOf(navigation.to?.url.pathname));
		if (from === to || from < 0 || to < 0) return;
		return new Promise((done) => {
			slidePage(to > from ? 'forward' : 'backward', async () => {
				done();
				// A failed or cancelled navigation is SvelteKit's to report; the slide just ends.
				await navigation.complete.catch(() => {});
			});
		});
	});
</script>

<SkipNav>Skip to content</SkipNav>

<div class="flex h-screen flex-col overflow-hidden">
	<header class="flex h-12 shrink-0 items-center gap-3 border-b border-border bg-sunken px-4">
		<a href={resolve('/')} class="flex items-center gap-2.5 font-bold">
			<img src={asset('favicon.svg')} alt="" class="size-6.5 rounded-md" />
			<span class="text-md">horizon-design</span>
		</a>
		<span class="font-mono text-xs text-faint">v{packageJson.version}</span>
		<ThemeSwitch
			class="ml-auto"
			labels={{ group: 'Theme', system: 'System', dark: 'Dark', light: 'Light' }}
		/>
	</header>

	<div class="flex min-h-0 flex-1">
		<Sidebar class="w-56 shrink-0">
			<div class="pt-3 pb-1">
				<Input bind:value={search} placeholder="Search components" aria-label="Search components">
					{#snippet start()}<MingcuteSearchLine aria-hidden="true" />{/snippet}
				</Input>
			</div>
			<SidebarSection label="Foundations">
				<SidebarItem href={resolve('/')} active={current === ''}>Tokens and motion</SidebarItem>
			</SidebarSection>
			{#each groups as group (group.group)}
				<SidebarSection label={group.group}>
					{#each group.items as item (item.id)}
						<SidebarItem
							href={resolve('/[section]', { section: item.id })}
							active={current === item.id}
						>
							{item.label}
						</SidebarItem>
					{/each}
				</SidebarSection>
			{/each}
		</Sidebar>

		<main id="main-content" class="min-w-0 flex-1 overflow-y-auto" data-slide-region>
			<div class="mx-auto max-w-4xl px-8 py-10">
				{@render children()}
			</div>
		</main>
	</div>
</div>

<style>
	:global(html, body) {
		height: 100%;
		overflow: hidden;
	}

	:global(.section-tag) {
		margin-bottom: 0.25rem;
		color: var(--primary);
		font-size: var(--text-2xs);
		font-weight: 700;
		letter-spacing: var(--tracking-overline);
		text-transform: uppercase;
	}
</style>
