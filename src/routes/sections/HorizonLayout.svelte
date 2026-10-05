<script lang="ts">
	import { Alert } from '$lib/components/alert';
	import { Avatar, AvatarGroup } from '$lib/components/avatar';
	import { Badge } from '$lib/components/badge';
	import { Button } from '$lib/components/button';
	import { Card } from '$lib/components/card';
	import { CircularProgress } from '$lib/components/circular-progress';
	import { Input } from '$lib/components/input';
	import { NativeSelect } from '$lib/components/native-select';
	import { Progress } from '$lib/components/progress';
	import { Skeleton } from '$lib/components/skeleton';
	import { Spinner } from '$lib/components/spinner';
	import { Status } from '$lib/components/status';
	import { Switch } from '$lib/components/switch';
	import { Textarea } from '$lib/components/textarea';
	import MingcuteDownloadLine from '~icons/mingcute/download-line';
	import MingcuteFullscreenLine from '~icons/mingcute/fullscreen-line';
	import MingcuteHeartLine from '~icons/mingcute/heart-line';
	import MingcuteSettings2Line from '~icons/mingcute/settings-2-line';
	import MingcuteStarLine from '~icons/mingcute/star-line';
	import { SvelteMap } from 'svelte/reactivity';
	import HorizonLayout from '$lib/components/horizon-layout/HorizonLayout.svelte';
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
			class="text-muted-foreground hover:bg-accent hover:text-accent-foreground inline-flex size-6 items-center justify-center rounded-md transition-colors"
			onclick={() => (layoutConfig.maximizedView = activeViewId)}
			title="Maximize"
		>
			<MingcuteFullscreenLine class="size-3.5" />
		</button>
	{/if}
{/snippet}

{#snippet layoutControlsPanel()}
	<div class="h-full space-y-5 overflow-auto p-4">
		<div>
			<p class="text-muted-foreground mb-2.5 text-[11px] font-semibold tracking-widest uppercase">
				Variants
			</p>
			<div class="flex flex-wrap gap-2">
				<Button size="sm">Default</Button>
				<Button variant="outline" size="sm">Outline</Button>
				<Button variant="secondary" size="sm">Secondary</Button>
				<Button variant="ghost" size="sm">Ghost</Button>
				<Button variant="destructive" size="sm">Destructive</Button>
				<Button variant="link" size="sm">Link</Button>
			</div>
		</div>
		<div>
			<p class="text-muted-foreground mb-2.5 text-[11px] font-semibold tracking-widest uppercase">
				Sizes
			</p>
			<div class="flex flex-wrap items-center gap-2">
				<Button size="xl">XL</Button>
				<Button size="lg">LG</Button>
				<Button size="md">MD</Button>
				<Button size="sm">SM</Button>
				<Button size="xs">XS</Button>
			</div>
		</div>
		<div>
			<p class="text-muted-foreground mb-2.5 text-[11px] font-semibold tracking-widest uppercase">
				Icon buttons
			</p>
			<div class="flex flex-wrap items-center gap-2">
				<Button size="icon-md"><MingcuteStarLine /></Button>
				<Button variant="outline" size="icon-md"><MingcuteHeartLine /></Button>
				<Button variant="ghost" size="icon-md"><MingcuteSettings2Line /></Button>
				<Button variant="secondary" size="icon-md"><MingcuteDownloadLine /></Button>
			</div>
		</div>
	</div>
{/snippet}

{#snippet layoutInputsPanel()}
	<div class="h-full space-y-3 overflow-auto p-4">
		<div>
			<p class="text-muted-foreground mb-2.5 text-[11px] font-semibold tracking-widest uppercase">
				Text inputs
			</p>
			<div class="space-y-2">
				<Input placeholder="Default input..." />
				<Input placeholder="Disabled input..." disabled />
				<Textarea placeholder="Textarea..." class="min-h-18 resize-none" />
			</div>
		</div>
		<div>
			<p class="text-muted-foreground mb-2.5 text-[11px] font-semibold tracking-widest uppercase">
				Select
			</p>
			<NativeSelect>
				<option>Svelte</option>
				<option>React</option>
				<option>Vue</option>
				<option>Solid</option>
			</NativeSelect>
		</div>
		<div>
			<p class="text-muted-foreground mb-2.5 text-[11px] font-semibold tracking-widest uppercase">
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
			<p class="text-muted-foreground mb-2.5 text-[11px] font-semibold tracking-widest uppercase">
				Badges
			</p>
			<div class="flex flex-wrap gap-1.5">
				<Badge>Default</Badge>
				<Badge variant="outline">Outline</Badge>
				<Badge variant="success">Success</Badge>
				<Badge variant="warning">Warning</Badge>
				<Badge variant="info">Info</Badge>
				<Badge variant="destructive">Error</Badge>
			</div>
		</div>
		<div>
			<p class="text-muted-foreground mb-2.5 text-[11px] font-semibold tracking-widest uppercase">
				Avatars
			</p>
			<AvatarGroup>
				{#each ['RK', 'JD', 'AM', 'SL'] as initials (initials)}
					<Avatar size="sm" fallback={initials} class="ring-card ring-2" />
				{/each}
			</AvatarGroup>
		</div>
		<div>
			<p class="text-muted-foreground mb-2.5 text-[11px] font-semibold tracking-widest uppercase">
				Status
			</p>
			<div class="flex flex-wrap gap-3">
				<div class="flex items-center gap-1.5 text-xs"><Status status="online" />Online</div>
				<div class="flex items-center gap-1.5 text-xs"><Status status="away" />Away</div>
				<div class="flex items-center gap-1.5 text-xs"><Status status="busy" />Busy</div>
				<div class="flex items-center gap-1.5 text-xs"><Status status="offline" />Offline</div>
			</div>
		</div>
		<div>
			<p class="text-muted-foreground mb-2.5 text-[11px] font-semibold tracking-widest uppercase">
				Alerts
			</p>
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
			<p class="text-muted-foreground mb-2.5 text-[11px] font-semibold tracking-widest uppercase">
				Progress
			</p>
			<div class="space-y-2">
				<div class="flex items-center gap-3">
					<Progress value={72} class="flex-1" />
					<span class="text-muted-foreground w-7 text-xs tabular-nums">72%</span>
				</div>
				<div class="flex items-center gap-3">
					<Progress value={40} class="flex-1" />
					<span class="text-muted-foreground w-7 text-xs tabular-nums">40%</span>
				</div>
				<div class="flex items-center gap-3">
					<Progress value={91} class="flex-1" />
					<span class="text-muted-foreground w-7 text-xs tabular-nums">91%</span>
				</div>
			</div>
		</div>
		<div>
			<p class="text-muted-foreground mb-2.5 text-[11px] font-semibold tracking-widest uppercase">
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
			<p class="text-muted-foreground mb-2.5 text-[11px] font-semibold tracking-widest uppercase">
				Circular progress
			</p>
			<div class="flex items-center gap-4">
				<CircularProgress value={65} />
				<CircularProgress value={30} />
			</div>
		</div>
	</div>
{/snippet}

<section id="horizon-layout">
	<p class="section-tag">Layout</p>
	<h2 class="mb-2 text-2xl font-bold">Horizon Layout</h2>
	<p class="text-muted-foreground mb-6 text-sm">
		Drag tabs between panes, resize splits, and pop views out into separate windows.
	</p>
	<Card class="overflow-hidden p-0">
		<div class="h-120">
			<HorizonLayout
				bind:config={layoutConfig}
				views={layoutViews}
				tabgroupControls={[layoutMaximizeBtn]}
				showSplitRatio
			/>
		</div>
	</Card>
</section>
