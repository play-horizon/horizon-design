<script lang="ts">
	import type { Component } from 'svelte';
	import { Badge } from '$lib/components/badge';
	import { Button } from '$lib/components/button';
	import { Input } from '$lib/components/input';
	import { Sidebar, SidebarItem, SidebarSection } from '$lib/components/sidebar';
	import { ThemeSwitch } from '$lib/components/theme-switch';
	import MingcuteCloseLine from '~icons/mingcute/close-line';
	import MingcuteSearchLine from '~icons/mingcute/search-line';
	import ButtonSection from './sections/Button.svelte';

	type SectionLoader = () => Promise<{ default: Component }>;

	// The default section ships with the page so it renders on the server;
	// every other section is a separate chunk loaded when it is selected.
	const sections: Record<string, SectionLoader> = {
		...import.meta.glob<{ default: Component }>([
			'./sections/*.svelte',
			'!./sections/Button.svelte'
		]),
		'./sections/Button.svelte': async () => ({ default: ButtonSection })
	};

	function loadSection(id: string) {
		const name = id.replace(/(^|-)(\w)/g, (_, __, c: string) => c.toUpperCase());
		return sections[`./sections/${name}.svelte`]();
	}

	let selectedSection = $state('button');
	let Section: Component = $state(ButtonSection);
	let search = $state('');

	async function selectSection(id: string) {
		selectedSection = id;
		search = '';
		const { default: component } = await loadSection(id);
		if (selectedSection === id) Section = component;
	}

	const navSections = [
		{ id: 'button', label: 'Button', group: 'Actions' },
		{ id: 'toggle', label: 'Toggle', group: 'Actions' },
		{ id: 'toggle-group', label: 'Toggle Group', group: 'Actions' },
		{ id: 'segment-group', label: 'Segment Group', group: 'Actions' },
		{ id: 'swap', label: 'Swap', group: 'Actions' },
		{ id: 'toggle-tooltip', label: 'Toggle Tooltip', group: 'Actions' },
		{ id: 'action-bar', label: 'Action Bar', group: 'Actions' },
		{ id: 'button-group', label: 'Button Group', group: 'Actions' },
		{ id: 'clipboard', label: 'Clipboard', group: 'Actions' },
		{ id: 'input', label: 'Input', group: 'Forms' },
		{ id: 'textarea', label: 'Textarea', group: 'Forms' },
		{ id: 'field', label: 'Field', group: 'Forms' },
		{ id: 'number-input', label: 'Number Input', group: 'Forms' },
		{ id: 'checkbox', label: 'Checkbox', group: 'Forms' },
		{ id: 'switch', label: 'Switch', group: 'Forms' },
		{ id: 'radio-group', label: 'Radio Group', group: 'Forms' },
		{ id: 'slider', label: 'Slider', group: 'Forms' },
		{ id: 'select', label: 'Select', group: 'Forms' },
		{ id: 'pin-input', label: 'Pin Input', group: 'Forms' },
		{ id: 'combobox', label: 'Combobox', group: 'Forms' },
		{ id: 'native-select', label: 'Native Select', group: 'Forms' },
		{ id: 'date-picker', label: 'Date Picker', group: 'Forms' },
		{ id: 'editable', label: 'Editable', group: 'Forms' },
		{ id: 'rating-group', label: 'Rating Group', group: 'Forms' },
		{ id: 'color-picker', label: 'Color Picker', group: 'Forms' },
		{ id: 'file-upload', label: 'File Upload', group: 'Forms' },
		{ id: 'listbox', label: 'Listbox', group: 'Forms' },
		{ id: 'input-group', label: 'Input Group', group: 'Forms' },
		{ id: 'hint', label: 'Hint', group: 'Forms' },
		{ id: 'calendar', label: 'Calendar', group: 'Forms' },
		{ id: 'angle-slider', label: 'Angle Slider', group: 'Forms' },
		{ id: 'circular-slider', label: 'Circular Slider', group: 'Forms' },
		{ id: 'image-cropper', label: 'Image Cropper', group: 'Forms' },
		{ id: 'signature-pad', label: 'Signature Pad', group: 'Forms' },
		{ id: 'badge', label: 'Badge', group: 'Display' },
		{ id: 'avatar', label: 'Avatar', group: 'Display' },
		{ id: 'card', label: 'Card', group: 'Display' },
		{ id: 'separator', label: 'Separator', group: 'Display' },
		{ id: 'status', label: 'Status', group: 'Display' },
		{ id: 'kbd', label: 'Kbd', group: 'Display' },
		{ id: 'table', label: 'Table', group: 'Display' },
		{ id: 'carousel', label: 'Carousel', group: 'Display' },
		{ id: 'data-list', label: 'Data List', group: 'Display' },
		{ id: 'scroll-area', label: 'Scroll Area', group: 'Display' },
		{ id: 'announcement', label: 'Announcement', group: 'Display' },
		{ id: 'prose', label: 'Prose', group: 'Display' },
		{ id: 'frame', label: 'Frame', group: 'Display' },
		{ id: 'thumb-card', label: 'Thumb Card', group: 'Display' },
		{ id: 'marquee', label: 'Marquee', group: 'Display' },
		{ id: 'aspect-ratio', label: 'Aspect Ratio', group: 'Display' },
		{ id: 'item', label: 'Item', group: 'Display' },
		{ id: 'theme-switch', label: 'Theme Switch', group: 'Display' },
		{ id: 'qr-code', label: 'QR Code', group: 'Display' },
		{ id: 'timer', label: 'Timer', group: 'Display' },
		{ id: 'alert', label: 'Alert', group: 'Feedback' },
		{ id: 'progress', label: 'Progress', group: 'Feedback' },
		{ id: 'circular-progress', label: 'Circular Progress', group: 'Feedback' },
		{ id: 'spinner', label: 'Spinner', group: 'Feedback' },
		{ id: 'skeleton', label: 'Skeleton', group: 'Feedback' },
		{ id: 'toast', label: 'Toast', group: 'Feedback' },
		{ id: 'tabs', label: 'Tabs', group: 'Navigation' },
		{ id: 'accordion', label: 'Accordion', group: 'Navigation' },
		{ id: 'collapsible', label: 'Collapsible', group: 'Navigation' },
		{ id: 'breadcrumb', label: 'Breadcrumb', group: 'Navigation' },
		{ id: 'pagination', label: 'Pagination', group: 'Navigation' },
		{ id: 'steps', label: 'Steps', group: 'Navigation' },
		{ id: 'file-tree', label: 'File Tree', group: 'Navigation' },
		{ id: 'hierarchy-view', label: 'Hierarchy View', group: 'Navigation' },
		{ id: 'inspector-panel', label: 'Inspector Panel', group: 'Navigation' },
		{ id: 'sidebar', label: 'Sidebar', group: 'Navigation' },
		{ id: 'bottom-navigation', label: 'Bottom Navigation', group: 'Navigation' },
		{ id: 'skip-nav', label: 'Skip Nav', group: 'Navigation' },
		{ id: 'link-overlay', label: 'Link Overlay', group: 'Navigation' },
		{ id: 'dialog', label: 'Dialog', group: 'Overlays' },
		{ id: 'popover', label: 'Popover', group: 'Overlays' },
		{ id: 'tooltip', label: 'Tooltip', group: 'Overlays' },
		{ id: 'menu', label: 'Menu', group: 'Overlays' },
		{ id: 'drawer', label: 'Drawer', group: 'Overlays' },
		{ id: 'sheet', label: 'Sheet', group: 'Overlays' },
		{ id: 'alert-dialog', label: 'Alert Dialog', group: 'Overlays' },
		{ id: 'context-menu', label: 'Context Menu', group: 'Overlays' },
		{ id: 'hover-card', label: 'Hover Card', group: 'Overlays' },
		{ id: 'floating-panel', label: 'Floating Panel', group: 'Overlays' },
		{ id: 'tour', label: 'Tour', group: 'Overlays' },
		{ id: 'splitter', label: 'Splitter', group: 'Layout' },
		{ id: 'float', label: 'Float', group: 'Layout' },
		{ id: 'horizon-layout', label: 'Horizon Layout', group: 'Layout' }
	];

	const NAV_GROUPS = [
		'Actions',
		'Forms',
		'Display',
		'Feedback',
		'Navigation',
		'Overlays',
		'Layout'
	];

	const groupedSections = $derived.by(() => {
		const q = search.trim().toLowerCase();
		if (q) {
			const matches = navSections.filter((s) => s.label.toLowerCase().includes(q));
			return matches.length ? [{ group: '', items: matches }] : [];
		}
		return NAV_GROUPS.map((g) => ({ group: g, items: navSections.filter((s) => s.group === g) }));
	});
</script>

<svelte:head>
	<title>horizon-design</title>
	<meta
		name="description"
		content="Showcase of horizon-design, a Svelte 5 component library built on Ark UI and Tailwind CSS v4."
	/>
</svelte:head>

<div class="bg-background text-foreground flex h-screen flex-col overflow-hidden">
	<!-- ─── Top Bar ─── -->
	<header class="border-border relative flex h-12 shrink-0 items-center gap-3 border-b px-4">
		<div class="pointer-events-none absolute inset-0 overflow-hidden">
			<div class="dot-grid absolute inset-0 opacity-60"></div>
		</div>
		<span class="shimmer-title text-sm font-bold tracking-tight">horizon-design</span>
		<div class="relative mx-auto w-full max-w-xs">
			<MingcuteSearchLine class="absolute top-1/2 left-2.5 z-1 size-3.5 -translate-y-1/2" />
			<Input
				bind:value={search}
				type="text"
				placeholder="Search components…"
				class="bg-muted/40 py-1 pr-10 pl-7 text-xs"
			/>
			{#if search}
				<Button
					variant="ghost"
					size="icon-xs"
					aria-label="Clear search"
					onclick={() => (search = '')}
					class="absolute top-1/2 right-2 -translate-y-1/2"
				>
					<MingcuteCloseLine class="size-3.5" />
				</Button>
			{/if}
		</div>
		<div class="relative ml-auto flex items-center gap-3">
			<Badge class="hidden sm:flex">Svelte 5 · Ark UI · Tailwind v4</Badge>
			<ThemeSwitch />
		</div>
	</header>

	<!-- ─── Body ─── -->
	<div class="flex flex-1 overflow-hidden">
		<!-- ─── Sidebar ─── -->
		<Sidebar class="w-52 shrink-0 rounded-none border-t-0">
			{#if groupedSections.length === 0}
				<p class="text-muted-foreground px-4 py-6 text-center text-xs">No results</p>
			{:else}
				{#each groupedSections as grp (grp.group)}
					<SidebarSection label={grp.group || ''}>
						{#each grp.items as section (section.id)}
							<SidebarItem
								active={selectedSection === section.id}
								onclick={() => selectSection(section.id)}
								onpointerenter={() => loadSection(section.id)}
								onfocus={() => loadSection(section.id)}
							>
								{section.label}
							</SidebarItem>
						{/each}
					</SidebarSection>
				{/each}
			{/if}
		</Sidebar>

		<!-- ─── Main ─── -->
		<main class="flex-1 overflow-y-auto">
			<div class="mx-auto max-w-3xl px-8 py-12">
				<Section />
			</div>
		</main>
	</div>
</div>

<style>
	:global(html, body) {
		overflow: hidden;
		height: 100%;
	}

	/* Hero dot-grid pattern */
	.dot-grid {
		background-image: radial-gradient(
			circle,
			oklch(from var(--primary) l c h / 0.14) 1px,
			transparent 1px
		);
		background-size: 28px 28px;
	}

	/* Title shimmer */
	.shimmer-title {
		background: linear-gradient(
			110deg,
			var(--foreground) 0%,
			var(--primary) 40%,
			var(--info) 60%,
			var(--foreground) 100%
		);
		background-size: 250% auto;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: shimmer-title 4s linear infinite;
	}
	@keyframes shimmer-title {
		0% {
			background-position: 0% center;
		}
		100% {
			background-position: 250% center;
		}
	}

	/* Section label */
	:global(.section-tag) {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 0.65rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--primary);
		margin-bottom: 0.5rem;
	}
	:global(.section-tag::before) {
		content: '';
		display: block;
		width: 14px;
		height: 1.5px;
		background: var(--primary);
		border-radius: 9999px;
	}
</style>
