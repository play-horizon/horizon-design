<!--
@component
Docs: HorizonLayout. A playground over the layout's behaviour (resizing, dragging, the tab bar,
the minimum sizes and depth, the toolbar controls) and the restore button's label, on a layout
of two splits and a floating panel whose toolbars pop a view out or maximise it; then a layout
showing a maximised view with its restore button.
-->
<script lang="ts">
	import { Alert } from '#lib/components/alert/index.js';
	import { AvatarStack } from '#lib/components/avatar-stack/index.js';
	import { Badge } from '#lib/components/badge/index.js';
	import { Button } from '#lib/components/button/index.js';
	import { CircularProgress } from '#lib/components/circular-progress/index.js';
	import { Input } from '#lib/components/input/index.js';
	import { NativeSelect } from '#lib/components/native-select/index.js';
	import { Progress } from '#lib/components/progress/index.js';
	import { Skeleton } from '#lib/components/skeleton/index.js';
	import { Spinner } from '#lib/components/spinner/index.js';
	import { Status } from '#lib/components/status/index.js';
	import { Switch } from '#lib/components/switch/index.js';
	import { Textarea } from '#lib/components/textarea/index.js';
	import MingcuteDownloadLine from '~icons/mingcute/download-line';
	import MingcuteExternalLinkLine from '~icons/mingcute/external-link-line';
	import MingcuteFullscreenLine from '~icons/mingcute/fullscreen-line';
	import MingcuteHeartLine from '~icons/mingcute/heart-line';
	import MingcuteSettings2Line from '~icons/mingcute/settings-2-line';
	import MingcuteStarLine from '~icons/mingcute/star-line';
	import { Card } from '#lib/components/card/index.js';
	import { IconButton } from '#lib/components/icon-button/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, number, text } from '../playground/controls';
	import { SvelteMap } from 'svelte/reactivity';
	import HorizonLayout from '#lib/editor/horizon-layout/HorizonLayout.svelte';
	import {
		englishTranslations,
		floatView,
		removeView,
		type LayoutConfig,
		type Id,
		type View
	} from 'horizon-layout';

	let layoutConfig: LayoutConfig = $state({
		root: {
			direction: 'horizontal',
			views: [
				{ tabs: ['controls', 'inputs'], activeTabIndex: 1 },
				{
					direction: 'vertical',
					views: [
						{ tabs: ['visual'], activeTabIndex: 0 },
						{ tabs: ['feedback'], activeTabIndex: 0 }
					],
					splitPoints: [0.6]
				}
			],
			splitPoints: [0.4]
		},
		floating: [
			{ tabs: ['notes'], activeTabIndex: 0, rect: { x: 24, y: 200, width: 280, height: 180 } }
		]
	});

	const layoutViews = new SvelteMap<Id, View>([
		['controls', { title: 'Controls', snippet: layoutControlsPanel }],
		['inputs', { title: 'Inputs', snippet: layoutInputsPanel }],
		['visual', { title: 'Visual', snippet: layoutVisualPanel }],
		['feedback', { title: 'Feedback', snippet: layoutFeedbackPanel }],
		['notes', { title: 'Notes', snippet: layoutNotesPanel }]
	]);

	let maximizedConfig: LayoutConfig = $state({
		root: {
			direction: 'horizontal',
			views: [
				{ tabs: ['scene'], activeTabIndex: 0 },
				{ tabs: ['console'], activeTabIndex: 0 }
			],
			splitPoints: [0.5]
		},
		maximizedView: 'scene'
	});

	const maximizedViews = new SvelteMap<Id, View>([
		['scene', { title: 'Scene', snippet: maximizedScenePanel }],
		['console', { title: 'Console', snippet: maximizedConsolePanel }]
	]);

	/** Moves a view into a window of its own. */
	function popOut(id: Id) {
		removeView(layoutConfig, id);
		layoutConfig.popouts = [...(layoutConfig.popouts ?? []), id];
	}

	/** Brings back the view of a popout window the user closed, floating over the layout. */
	function floatClosedPopout(id: Id) {
		floatView(layoutConfig, id, { x: 48, y: 64, width: 320, height: 220 });
	}
</script>

{#snippet layoutPopOutButton(activeViewId: Id)}
	<IconButton label="Pop out" size="xs" onclick={() => popOut(activeViewId)}>
		<MingcuteExternalLinkLine aria-hidden="true" />
	</IconButton>
{/snippet}

{#snippet layoutMaximizeButton(activeViewId: Id)}
	{#if layoutConfig.maximizedView !== activeViewId}
		<IconButton
			label="Maximize"
			size="xs"
			onclick={() => (layoutConfig.maximizedView = activeViewId)}
		>
			<MingcuteFullscreenLine aria-hidden="true" />
		</IconButton>
	{/if}
{/snippet}

{#snippet layoutControlsPanel()}
	<div class="h-full space-y-5 overflow-auto p-4">
		<div>
			<p class="mb-2.5 text-xs font-semibold text-muted">Variants</p>
			<div class="flex flex-wrap gap-2">
				<Button variant="primary" size="sm">Primary</Button>
				<Button size="sm">Default</Button>
				<Button variant="tint" size="sm">Tint</Button>
				<Button variant="ghost" size="sm">Ghost</Button>
				<Button variant="danger" size="sm">Danger</Button>
				<Button variant="link" size="sm">Link</Button>
			</div>
		</div>
		<div>
			<p class="mb-2.5 text-xs font-semibold text-muted">Sizes</p>
			<div class="flex flex-wrap items-center gap-2">
				<Button size="lg">LG</Button>
				<Button size="md">MD</Button>
				<Button size="sm">SM</Button>
				<Button size="xs">XS</Button>
			</div>
		</div>
		<div>
			<p class="mb-2.5 text-xs font-semibold text-muted">Icon buttons</p>
			<div class="flex flex-wrap items-center gap-2">
				<IconButton label="Star" variant="primary">
					<MingcuteStarLine aria-hidden="true" />
				</IconButton>
				<IconButton label="Like" variant="default">
					<MingcuteHeartLine aria-hidden="true" />
				</IconButton>
				<IconButton label="Settings"><MingcuteSettings2Line aria-hidden="true" /></IconButton>
				<IconButton label="Download" variant="tint">
					<MingcuteDownloadLine aria-hidden="true" />
				</IconButton>
			</div>
		</div>
	</div>
{/snippet}

{#snippet layoutInputsPanel()}
	<div class="h-full space-y-3 overflow-auto p-4">
		<div>
			<p class="mb-2.5 text-xs font-semibold text-muted">Text inputs</p>
			<div class="space-y-2">
				<Input placeholder="Default input..." />
				<Input placeholder="Disabled input..." disabled />
				<Textarea placeholder="Textarea..." class="min-h-18 resize-none" />
			</div>
		</div>
		<div>
			<p class="mb-2.5 text-xs font-semibold text-muted">Select</p>
			<NativeSelect aria-label="Framework">
				<option>Svelte</option>
				<option>React</option>
				<option>Vue</option>
				<option>Solid</option>
			</NativeSelect>
		</div>
		<div>
			<p class="mb-2.5 text-xs font-semibold text-muted">Toggle controls</p>
			<div class="flex flex-col gap-2">
				<Switch label="Dark mode" />
				<Switch defaultChecked label="Notifications" />
			</div>
		</div>
	</div>
{/snippet}

{#snippet layoutVisualPanel()}
	<!-- A panel that scrolls with nothing focusable in it takes the focus, so the keyboard
	scrolls it too. -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div role="region" aria-label="Visual" tabindex="0" class="h-full space-y-4 overflow-auto p-4">
		<div>
			<p class="mb-2.5 text-xs font-semibold text-muted">Badges</p>
			<div class="flex flex-wrap gap-1.5">
				<Badge>Default</Badge>
				<Badge variant="neutral">Neutral</Badge>
				<Badge variant="success">Success</Badge>
				<Badge variant="warning">Warning</Badge>
				<Badge variant="info">Info</Badge>
				<Badge variant="danger">Danger</Badge>
			</div>
		</div>
		<div>
			<p class="mb-2.5 text-xs font-semibold text-muted">Avatars</p>
			<AvatarStack
				people={['RK', 'JD', 'AM', 'SL'].map((initials) => ({
					id: initials,
					name: initials,
					initials
				}))}
				label="Editing now"
				overflowText={(n) => `+${n}`}
			/>
		</div>
		<div>
			<p class="mb-2.5 text-xs font-semibold text-muted">Status</p>
			<div class="flex flex-wrap gap-3">
				<div class="flex items-center gap-1.5 text-xs"><Status variant="online" />Online</div>
				<div class="flex items-center gap-1.5 text-xs"><Status variant="away" />Away</div>
				<div class="flex items-center gap-1.5 text-xs"><Status variant="busy" />Busy</div>
				<div class="flex items-center gap-1.5 text-xs"><Status variant="offline" />Offline</div>
			</div>
		</div>
		<div>
			<p class="mb-2.5 text-xs font-semibold text-muted">Alerts</p>
			<div class="space-y-2">
				<Alert variant="info" title="Heads up" description="A short informational note." />
				<Alert variant="success" title="Changes saved" />
			</div>
		</div>
	</div>
{/snippet}

{#snippet layoutFeedbackPanel()}
	<!-- A panel that scrolls with nothing focusable in it takes the focus, so the keyboard
	scrolls it too. -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div role="region" aria-label="Feedback" tabindex="0" class="h-full space-y-4 overflow-auto p-4">
		<div>
			<p class="mb-2.5 text-xs font-semibold text-muted">Progress</p>
			<div class="space-y-2">
				<div class="flex items-center gap-3">
					<Progress value={72} class="flex-1" />
					<span class="w-7 text-xs text-muted tabular-nums">72%</span>
				</div>
				<div class="flex items-center gap-3">
					<Progress value={40} class="flex-1" />
					<span class="w-7 text-xs text-muted tabular-nums">40%</span>
				</div>
				<div class="flex items-center gap-3">
					<Progress value={91} class="flex-1" />
					<span class="w-7 text-xs text-muted tabular-nums">91%</span>
				</div>
			</div>
		</div>
		<div>
			<p class="mb-2.5 text-xs font-semibold text-muted">Loading states</p>
			<div class="flex flex-wrap items-center gap-3">
				<Spinner />
				<Skeleton class="h-4 w-28 rounded" />
				<Skeleton class="h-4 w-20 rounded" />
				<Skeleton class="size-8 rounded-full" />
			</div>
		</div>
		<div>
			<p class="mb-2.5 text-xs font-semibold text-muted">Circular progress</p>
			<div class="flex items-center gap-4">
				<CircularProgress value={65} label="Upload" valueText="65%" />
				<CircularProgress value={30} label="Build" valueText="30%" />
			</div>
		</div>
	</div>
{/snippet}

{#snippet layoutNotesPanel()}
	<!-- A panel that scrolls with nothing focusable in it takes the focus, so the keyboard
	scrolls it too. -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		role="region"
		aria-label="Notes"
		tabindex="0"
		class="h-full overflow-auto p-4 text-sm text-fg-2"
	>
		A floating panel: drag its tab bar to move it, an edge or a corner to resize it, and its tab
		onto the layout to dock it again.
	</div>
{/snippet}

{#snippet maximizedScenePanel()}
	<p class="p-4 text-sm text-fg-2">
		The scene, maximised: the restore button brings back the split.
	</p>
{/snippet}

{#snippet maximizedConsolePanel()}
	<p class="p-4 font-mono text-xs text-fg-2">Build finished in 1.2 s.</p>
{/snippet}

<div class="grid gap-4">
	<Playground
		description="Drag tabs between panes, resize splits, float panels over the layout, pop views out into windows of their own, and maximise one."
		controls={{
			restoreLabel: text('Restore view'),
			toolbar: choice(['pop out and maximize', 'maximize', 'none'] as const),
			showSplitRatio: boolean(true),
			disableResizeSplits: boolean(),
			disableDragAndDrop: boolean(),
			hideTabBar: boolean(),
			minWidthRatio: number(0.1, { min: 0, max: 0.4, step: 0.05 }),
			minHeightRatio: number(0.2, { min: 0, max: 0.4, step: 0.05 }),
			maxDepth: number(6, { min: 3, max: 8 })
		}}
	>
		{#snippet example(values)}
			<div class="h-120 w-full">
				<HorizonLayout
					restoreLabel={values.restoreLabel}
					translations={englishTranslations}
					bind:config={layoutConfig}
					views={layoutViews}
					tabgroupControls={values.toolbar === 'none'
						? []
						: values.toolbar === 'maximize'
							? [layoutMaximizeButton]
							: [layoutPopOutButton, layoutMaximizeButton]}
					onPopoutClose={floatClosedPopout}
					showSplitRatio={values.showSplitRatio}
					disableResizeSplits={values.disableResizeSplits}
					disableDragAndDrop={values.disableDragAndDrop}
					hideTabBar={values.hideTabBar}
					minWidthRatio={values.minWidthRatio}
					minHeightRatio={values.minHeightRatio}
					maxDepth={values.maxDepth}
				/>
			</div>
		{/snippet}
	</Playground>
	<Card
		title="A maximised view"
		description="While a view is maximised, the restore button at the top right brings back the layout; its label is its name and tooltip."
	>
		<div class="h-48">
			<HorizonLayout
				restoreLabel="Restore view"
				translations={englishTranslations}
				bind:config={maximizedConfig}
				views={maximizedViews}
			/>
		</div>
	</Card>
</div>
