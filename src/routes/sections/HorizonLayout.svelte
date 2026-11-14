<!--
@component
Docs: HorizonLayout. Live examples of the HorizonLayout component.
-->
<script lang="ts">
	import { Alert } from '#lib/components/alert/index.js';
	import { AvatarStack } from '#lib/components/avatar-stack/index.js';
	import { Badge } from '#lib/components/badge/index.js';
	import { Button } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
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
	import MingcuteFullscreenLine from '~icons/mingcute/fullscreen-line';
	import MingcuteHeartLine from '~icons/mingcute/heart-line';
	import MingcuteSettings2Line from '~icons/mingcute/settings-2-line';
	import MingcuteStarLine from '~icons/mingcute/star-line';
	import { SvelteMap } from 'svelte/reactivity';
	import HorizonLayout from '#lib/editor/horizon-layout/HorizonLayout.svelte';
	import type { LayoutConfig, Id, View } from 'horizon-layout';

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
		}
	});

	const layoutViews = new SvelteMap<Id, View>([
		['controls', { title: 'Controls', snippet: layoutControlsPanel }],
		['inputs', { title: 'Inputs', snippet: layoutInputsPanel }],
		['visual', { title: 'Visual', snippet: layoutVisualPanel }],
		['feedback', { title: 'Feedback', snippet: layoutFeedbackPanel }]
	]);
</script>

{#snippet layoutMaximizeBtn(activeViewId: Id)}
	{#if layoutConfig.maximizedView !== activeViewId}
		<button
			class="inline-flex size-6 items-center justify-center rounded-md text-muted transition-colors hover:bg-hover hover:text-fg"
			onclick={() => (layoutConfig.maximizedView = activeViewId)}
			aria-label="Maximize"
			title="Maximize"
		>
			<MingcuteFullscreenLine class="size-3.5" aria-hidden="true" />
		</button>
	{/if}
{/snippet}

{#snippet layoutControlsPanel()}
	<div class="h-full space-y-5 overflow-auto p-4">
		<div>
			<p class="mb-2.5 text-[11px] font-semibold tracking-widest text-muted uppercase">Variants</p>
			<div class="flex flex-wrap gap-2">
				<Button size="sm">Default</Button>
				<Button variant="default" size="sm">Outline</Button>
				<Button variant="default" size="sm">Secondary</Button>
				<Button variant="ghost" size="sm">Ghost</Button>
				<Button variant="danger" size="sm">Destructive</Button>
				<Button variant="link" size="sm">Link</Button>
			</div>
		</div>
		<div>
			<p class="mb-2.5 text-[11px] font-semibold tracking-widest text-muted uppercase">Sizes</p>
			<div class="flex flex-wrap items-center gap-2">
				<Button size="lg">LG</Button>
				<Button size="md">MD</Button>
				<Button size="sm">SM</Button>
				<Button size="xs">XS</Button>
			</div>
		</div>
		<div>
			<p class="mb-2.5 text-[11px] font-semibold tracking-widest text-muted uppercase">
				Icon buttons
			</p>
			<div class="flex flex-wrap items-center gap-2">
				<Button size="icon-md" aria-label="Star"><MingcuteStarLine aria-hidden="true" /></Button>
				<Button variant="default" size="icon-md" aria-label="Like">
					<MingcuteHeartLine aria-hidden="true" />
				</Button>
				<Button variant="ghost" size="icon-md" aria-label="Settings">
					<MingcuteSettings2Line aria-hidden="true" />
				</Button>
				<Button variant="default" size="icon-md" aria-label="Download">
					<MingcuteDownloadLine aria-hidden="true" />
				</Button>
			</div>
		</div>
	</div>
{/snippet}

{#snippet layoutInputsPanel()}
	<div class="h-full space-y-3 overflow-auto p-4">
		<div>
			<p class="mb-2.5 text-[11px] font-semibold tracking-widest text-muted uppercase">
				Text inputs
			</p>
			<div class="space-y-2">
				<Input placeholder="Default input..." />
				<Input placeholder="Disabled input..." disabled />
				<Textarea placeholder="Textarea..." class="min-h-18 resize-none" />
			</div>
		</div>
		<div>
			<p class="mb-2.5 text-[11px] font-semibold tracking-widest text-muted uppercase">Select</p>
			<NativeSelect>
				<option>Svelte</option>
				<option>React</option>
				<option>Vue</option>
				<option>Solid</option>
			</NativeSelect>
		</div>
		<div>
			<p class="mb-2.5 text-[11px] font-semibold tracking-widest text-muted uppercase">
				Toggle controls
			</p>
			<div class="flex flex-col gap-2">
				<Switch label="Dark mode" />
				<Switch defaultChecked label="Notifications" />
			</div>
		</div>
	</div>
{/snippet}

{#snippet layoutVisualPanel()}
	<div class="h-full space-y-4 overflow-auto p-4">
		<div>
			<p class="mb-2.5 text-[11px] font-semibold tracking-widest text-muted uppercase">Badges</p>
			<div class="flex flex-wrap gap-1.5">
				<Badge>Default</Badge>
				<Badge variant="neutral">Outline</Badge>
				<Badge variant="success">Success</Badge>
				<Badge variant="warning">Warning</Badge>
				<Badge variant="info">Info</Badge>
				<Badge variant="danger">Error</Badge>
			</div>
		</div>
		<div>
			<p class="mb-2.5 text-[11px] font-semibold tracking-widest text-muted uppercase">Avatars</p>
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
			<p class="mb-2.5 text-[11px] font-semibold tracking-widest text-muted uppercase">Status</p>
			<div class="flex flex-wrap gap-3">
				<div class="flex items-center gap-1.5 text-xs"><Status variant="online" />Online</div>
				<div class="flex items-center gap-1.5 text-xs"><Status variant="away" />Away</div>
				<div class="flex items-center gap-1.5 text-xs"><Status variant="busy" />Busy</div>
				<div class="flex items-center gap-1.5 text-xs"><Status variant="offline" />Offline</div>
			</div>
		</div>
		<div>
			<p class="mb-2.5 text-[11px] font-semibold tracking-widest text-muted uppercase">Alerts</p>
			<div class="space-y-2">
				<Alert variant="info" title="Heads up" description="A short informational note." />
				<Alert variant="success" title="Changes saved" />
			</div>
		</div>
	</div>
{/snippet}

{#snippet layoutFeedbackPanel()}
	<div class="h-full space-y-4 overflow-auto p-4">
		<div>
			<p class="mb-2.5 text-[11px] font-semibold tracking-widest text-muted uppercase">Progress</p>
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
			<p class="mb-2.5 text-[11px] font-semibold tracking-widest text-muted uppercase">
				Loading states
			</p>
			<div class="flex flex-wrap items-center gap-3">
				<Spinner />
				<Skeleton class="h-4 w-28 rounded" />
				<Skeleton class="h-4 w-20 rounded" />
				<Skeleton class="size-8 rounded-full" />
			</div>
		</div>
		<div>
			<p class="mb-2.5 text-[11px] font-semibold tracking-widest text-muted uppercase">
				Circular progress
			</p>
			<div class="flex items-center gap-4">
				<CircularProgress value={65} label="Upload" valueText="65%" />
				<CircularProgress value={30} label="Build" valueText="30%" />
			</div>
		</div>
	</div>
{/snippet}

<section id="horizon-layout">
	<p class="mb-6 text-sm text-muted">
		Drag tabs between panes, resize splits, and pop views out into separate windows.
	</p>
	<Card class="overflow-hidden p-0">
		<div class="h-120">
			<HorizonLayout
				restoreLabel="Restore view"
				bind:config={layoutConfig}
				views={layoutViews}
				tabgroupControls={[layoutMaximizeBtn]}
				showSplitRatio
			/>
		</div>
	</Card>
</section>
