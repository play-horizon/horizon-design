<script lang="ts">
	import { Accordion, AccordionItem } from '$lib/components/accordion';
	import { Alert } from '$lib/components/alert';
	import { AlertDialog } from '$lib/components/alert-dialog';
	import { AngleSlider } from '$lib/components/angle-slider';
	import { Announcement } from '$lib/components/announcement';
	import { ActionBar, ActionBarSeparator } from '$lib/components/action-bar';
	import { Avatar, AvatarGroup } from '$lib/components/avatar';
	import { Badge } from '$lib/components/badge';
	import { Breadcrumb } from '$lib/components/breadcrumb';
	import { Button, buttonVariants } from '$lib/components/button';
	import { ButtonGroup } from '$lib/components/button-group';
	import { Card } from '$lib/components/card';
	import { Carousel } from '$lib/components/carousel';
	import { Checkbox } from '$lib/components/checkbox';
	import { CircularProgress } from '$lib/components/circular-progress';
	import { Clipboard } from '$lib/components/clipboard';
	import { Collapsible } from '$lib/components/collapsible';
	import { ColorPicker, parseColor } from '$lib/components/color-picker';
	import { Combobox } from '$lib/components/combobox';
	import { ContextMenu } from '$lib/components/context-menu';
	import { DataList } from '$lib/components/data-list';
	import { DatePicker } from '$lib/components/date-picker';
	import { Dialog, DialogClose } from '$lib/components/dialog';
	import { Drawer, DrawerClose } from '$lib/components/drawer';
	import { Editable } from '$lib/components/editable';
	import { Field } from '$lib/components/field';
	import { FileUpload } from '$lib/components/file-upload';
	import { Frame } from '$lib/components/frame';
	import { Hint } from '$lib/components/hint';
	import { HoverCard } from '$lib/components/hover-card';
	import { Input } from '$lib/components/input';
	import { InputGroup, InputAddon } from '$lib/components/input-group';
	import { Kbd } from '$lib/components/kbd';
	import { LinkBox, LinkOverlay } from '$lib/components/link-overlay';
	import { Listbox } from '$lib/components/listbox';
	import { Menu, MenuGroup, MenuGroupLabel, MenuItem, MenuSeparator } from '$lib/components/menu';
	import { NativeSelect } from '$lib/components/native-select';
	import { NumberInput } from '$lib/components/number-input';
	import { Pagination } from '$lib/components/pagination';
	import { PinInput } from '$lib/components/pin-input';
	import { Popover } from '$lib/components/popover';
	import { Prose } from '$lib/components/prose';
	import { Progress } from '$lib/components/progress';
	import { QrCode } from '$lib/components/qr-code';
	import { RadioGroup } from '$lib/components/radio-group';
	import { RatingGroup } from '$lib/components/rating-group';
	import { ScrollArea } from '$lib/components/scroll-area';
	import { SegmentGroup } from '$lib/components/segment-group';
	import { Select } from '$lib/components/select';
	import { Separator } from '$lib/components/separator';
	import { Sheet } from '$lib/components/sheet';
	import { Sidebar, SidebarItem, SidebarSection } from '$lib/components/sidebar';
	import { SignaturePad } from '$lib/components/signature-pad';
	import { Skeleton } from '$lib/components/skeleton';
	import { SkipNav } from '$lib/components/skip-nav';
	import { Slider } from '$lib/components/slider';
	import { Spinner } from '$lib/components/spinner';
	import { Splitter, SplitterPanel, SplitterResizeTrigger } from '$lib/components/splitter';
	import { Status } from '$lib/components/status';
	import { Steps } from '$lib/components/steps';
	import { Switch } from '$lib/components/switch';
	import { Table } from '$lib/components/table';
	import { Tabs } from '$lib/components/tabs';
	import { Textarea } from '$lib/components/textarea';
	import { Timer } from '$lib/components/timer';
	import { Toaster, createToaster } from '$lib/components/toast';
	import { Toggle } from '$lib/components/toggle';
	import { ToggleGroup } from '$lib/components/toggle-group';
	import { Tooltip } from '$lib/components/tooltip';
	import { FileTree } from '$lib/components/file-tree';
	import { HierarchyView } from '$lib/components/hierarchy-view';
	import { Swap } from '$lib/components/swap';
	import { ImageCropper } from '$lib/components/image-cropper';
	import { CircularSlider } from '$lib/components/circular-slider';
	import { Calendar } from '$lib/components/calendar';
	import { Tour } from '$lib/components/tour';
	import { AspectRatio } from '$lib/components/aspect-ratio';
	import { ThemeSwitch } from '$lib/components/theme-switch';
	import { ThumbCard } from '$lib/components/thumb-card';
	import { BottomNavigation } from '$lib/components/bottom-navigation';
	import { Float } from '$lib/components/float';
	import { FloatingPanel } from '$lib/components/floating-panel';
	import { Item } from '$lib/components/item';
	import { Marquee, MarqueeItem } from '$lib/components/marquee';
	import { ToggleTooltip } from '$lib/components/toggle-tooltip';
	import { createTreeCollection } from '@ark-ui/svelte';
	import MingcuteAddLine from '~icons/mingcute/add-line';
	import MingcuteAlertLine from '~icons/mingcute/alert-line';
	import MingcuteArchiveLine from '~icons/mingcute/archive-line';
	import MingcuteArrowRightUpLine from '~icons/mingcute/arrow-right-up-line';
	import MingcuteArrowUpLine from '~icons/mingcute/arrow-up-line';
	import MingcuteBellRingingLine from '~icons/mingcute/bell-ringing-line';
	import MingcuteBoldLine from '~icons/mingcute/bold-line';
	import MingcuteCardPayLine from '~icons/mingcute/card-pay-line';
	import MingcuteChartLineLine from '~icons/mingcute/chart-line-line';
	import MingcuteCheckCircleLine from '~icons/mingcute/check-circle-line';
	import MingcuteCloseCircleLine from '~icons/mingcute/close-circle-line';
	import MingcuteCloseLine from '~icons/mingcute/close-line';
	import MingcuteCopy2Line from '~icons/mingcute/copy-2-line';
	import MingcuteDelete2Line from '~icons/mingcute/delete-2-line';
	import MingcuteDownLine from '~icons/mingcute/down-line';
	import MingcuteDownloadLine from '~icons/mingcute/download-line';
	import MingcuteExitDoorLine from '~icons/mingcute/exit-door-line';
	import MingcuteFolder2Line from '~icons/mingcute/folder-2-line';
	import MingcuteFullscreenLine from '~icons/mingcute/fullscreen-line';
	import MingcuteGitBranchLine from '~icons/mingcute/git-branch-line';
	import MingcuteHeartLine from '~icons/mingcute/heart-line';
	import MingcuteHome4Line from '~icons/mingcute/home-4-line';
	import MingcuteInformationLine from '~icons/mingcute/information-line';
	import MingcuteItalicLine from '~icons/mingcute/italic-line';
	import MingcuteLayout4Line from '~icons/mingcute/layout-4-line';
	import MingcuteLayout6Line from '~icons/mingcute/layout-6-line';
	import MingcuteLightningLine from '~icons/mingcute/lightning-line';
	import MingcuteMoonLine from '~icons/mingcute/moon-line';
	import MingcuteMore1Line from '~icons/mingcute/more-1-line';
	import MingcuteMore2Line from '~icons/mingcute/more-2-line';
	import MingcuteNotificationLine from '~icons/mingcute/notification-line';
	import MingcutePauseLine from '~icons/mingcute/pause-line';
	import MingcutePlayLine from '~icons/mingcute/play-line';
	import MingcuteRightLine from '~icons/mingcute/right-line';
	import MingcuteSearchLine from '~icons/mingcute/search-line';
	import MingcuteSettings2Line from '~icons/mingcute/settings-2-line';
	import MingcuteSettings3Line from '~icons/mingcute/settings-3-line';
	import MingcuteSettings1Line from '~icons/mingcute/settings-1-line';
	import MingcuteStarLine from '~icons/mingcute/star-line';
	import MingcuteStrikethroughLine from '~icons/mingcute/strikethrough-line';
	import MingcuteSunLine from '~icons/mingcute/sun-line';
	import MingcuteUnderlineLine from '~icons/mingcute/underline-line';
	import MingcuteUser2Line from '~icons/mingcute/user-2-line';
	import MingcuteUser1Line from '~icons/mingcute/user-1-line';
	import MingcuteVolumeLine from '~icons/mingcute/volume-line';
	import MingcuteVolumeOffLine from '~icons/mingcute/volume-off-line';
	import MingcuteWindowsLine from '~icons/mingcute/windows-line';
	import MingcuteCheckFill from '~icons/mingcute/check-fill';
	import MingcuteCloseFill from '~icons/mingcute/close-fill';
	import { SvelteMap } from 'svelte/reactivity';
	import HorizonLayout from '$lib/components/horizon-layout/HorizonLayout.svelte';
	import type { LayoutConfig, Id, View } from 'horizon-layout';
	import { InspectorPanel } from '$lib/components/inspector-panel';

	const toaster = createToaster({ placement: 'bottom-end' });
	const splitterPanels = [{ id: 'a' }, { id: 'b' }];

	let selectedSection = $state('button');
	let search = $state('');

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

	let isLoading = $state(false);
	let progressValue = $state(72);
	let stepsStep = $state(0);
	let swapOn = $state(false);
	let swapVolume = $state(true);
	let swapPlay = $state(false);

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

	const comboboxItems = [
		{ label: 'Svelte', value: 'svelte' },
		{ label: 'React', value: 'react' },
		{ label: 'Vue', value: 'vue' },
		{ label: 'Solid', value: 'solid' },
		{ label: 'Angular', value: 'angular' }
	];

	const treeCollection = createTreeCollection({
		nodeToValue: (node: { id: string; name: string; children?: unknown[] }) => node.id,
		nodeToString: (node: { id: string; name: string; children?: unknown[] }) => node.name,
		rootNode: {
			id: 'root',
			name: '',
			children: [
				{
					id: 'src',
					name: 'src',
					children: [
						{
							id: 'components',
							name: 'components',
							children: [
								{ id: 'button', name: 'button.svelte' },
								{ id: 'input', name: 'input.svelte' }
							]
						},
						{ id: 'routes', name: 'routes', children: [{ id: 'page', name: '+page.svelte' }] }
					]
				},
				{ id: 'package', name: 'package.json' }
			]
		}
	});

	const hierarchyData = [
		{
			id: 'scene',
			name: 'Scene',
			children: [
				{
					id: 'player',
					name: 'Player',
					children: [
						{ id: 'camera', name: 'Camera' },
						{ id: 'mesh', name: 'Mesh' }
					]
				},
				{ id: 'light', name: 'Directional Light' },
				{
					id: 'ui',
					name: 'UI Canvas',
					children: [{ id: 'hud', name: 'HUD' }]
				}
			]
		}
	];

	let inspectorCards = $state([
		{ id: 'transform', title: 'Transform', subtitle: '(3, 0, 0)' },
		{ id: 'mesh-renderer', title: 'Mesh Renderer', subtitle: 'Standard' },
		{ id: 'box-collider', title: 'Box Collider' },
		{ id: 'rigidbody', title: 'Rigidbody', subtitle: '1 kg' }
	]);
	let inspectorExpanded = $state(['transform', 'rigidbody']);

	const selectItems = [
		{ label: 'Svelte', value: 'svelte' },
		{ label: 'React', value: 'react' },
		{ label: 'Vue', value: 'vue' },
		{ label: 'Solid', value: 'solid' }
	];

	const scrollItems = Array.from({ length: 20 }, (_, i) => ({
		id: i + 1,
		text: `Item ${i + 1} — lorem ipsum dolor sit amet consectetur`
	}));

	function showToast(type: 'info' | 'success' | 'warning' | 'error') {
		const messages = {
			info: { title: 'Info', description: 'This is an informational message.' },
			success: { title: 'Success!', description: 'Your action was completed successfully.' },
			warning: { title: 'Warning', description: 'Please review before proceeding.' },
			error: { title: 'Error', description: 'Something went wrong. Please try again.' }
		};
		toaster.create({ ...messages[type], type });
	}

	function triggerLoading() {
		isLoading = true;
		setTimeout(() => {
			isLoading = false;
		}, 2000);
	}
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

<Toaster {toaster} />

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
					onclick={() => (search = '')}
					class="absolute top-1/2 right-2 -translate-y-1/2"
				>
					<MingcuteCloseLine class="size-3.5" />
				</Button>
			{/if}
		</div>
		<div class="relative ml-auto flex items-center gap-3">
			<Badge class="hidden sm:flex">Svelte 5 · Ark UI · Tailwind v4</Badge>
			<ThemeSwitch size="sm" />
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
								onclick={() => {
									selectedSection = section.id;
									search = '';
								}}
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
				<!-- ─── Buttons ─── -->
				<section id="button" data-reveal class={selectedSection !== 'button' ? 'hidden' : ''}>
					<p class="section-tag">Actions</p>
					<h2 class="mb-6 text-2xl font-bold">Button</h2>
					<Card class="card-lift">
						<div class="space-y-6">
							<div>
								<p
									class="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase"
								>
									Variants
								</p>
								<div class="flex flex-wrap gap-3">
									<Button variant="default">Default</Button>
									<Button variant="secondary">Secondary</Button>
									<Button variant="outline">Outline</Button>
									<Button variant="ghost">Ghost</Button>
									<Button variant="destructive">Destructive</Button>
									<Button variant="link">Link</Button>
								</div>
							</div>
							<Separator />
							<div>
								<p
									class="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase"
								>
									Semantic colors
								</p>
								<div class="flex flex-wrap gap-3">
									<Button variant="success">
										<MingcuteCheckCircleLine class="size-4" />
										Success
									</Button>
									<Button variant="warning">
										<MingcuteAlertLine class="size-4" />
										Warning
									</Button>
									<Button variant="info">
										<MingcuteInformationLine class="size-4" />
										Info
									</Button>
									<Button variant="destructive">
										<MingcuteCloseCircleLine class="size-4" />
										Destructive
									</Button>
								</div>
							</div>
							<Separator />
							<div>
								<p
									class="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase"
								>
									Sizes
								</p>
								<div class="flex flex-wrap items-center gap-3">
									<Button size="xs">Extra Small</Button>
									<Button size="sm">Small</Button>
									<Button size="md">Medium</Button>
									<Button size="lg">Large</Button>
									<Button size="xl">Extra Large</Button>
								</div>
							</div>
							<Separator />
							<div>
								<p
									class="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase"
								>
									Icon buttons
								</p>
								<div class="flex flex-wrap items-center gap-3">
									<Button size="icon-md" variant="ghost">
										<MingcuteSearchLine class="size-4" />
									</Button>
									<Button size="icon-md" variant="ghost">
										<MingcuteSettings2Line class="size-4" />
									</Button>
									<Button size="icon-md" variant="ghost">
										<MingcuteNotificationLine class="size-4" />
									</Button>
									<Button size="icon-md" variant="outline">
										<MingcuteBellRingingLine class="size-4" />
									</Button>
									<Button size="icon-md" variant="secondary">
										<MingcuteAddLine class="size-4" />
									</Button>
									<Button size="icon-md" variant="ghost">
										<MingcuteMore1Line class="size-4" />
									</Button>
								</div>
							</div>
							<Separator />
							<div>
								<p
									class="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase"
								>
									States
								</p>
								<div class="flex flex-wrap items-center gap-3">
									<Button pill>Pill Shape</Button>
									<Button {isLoading} onclick={triggerLoading}>
										{isLoading ? 'Loading…' : 'Click to Load'}
									</Button>
									<Button disabled>Disabled</Button>
								</div>
							</div>
						</div>
					</Card>
				</section>

				<!-- ─── Toggle ─── -->
				<section
					id="toggle"
					data-reveal
					data-delay="0"
					class={selectedSection !== 'toggle' ? 'hidden' : ''}
				>
					<p class="section-tag">Actions</p>
					<h2 class="mb-6 text-2xl font-bold">Toggle</h2>
					<Card class="card-lift">
						<div>
							<div class="flex flex-wrap items-center gap-3">
								<Toggle>
									<MingcuteBoldLine class="size-4" />
								</Toggle>
								<Toggle>
									<MingcuteItalicLine class="size-4" />
								</Toggle>
								<Toggle variant="outline">
									<MingcuteUnderlineLine class="size-4" />
									<span>Underline</span>
								</Toggle>
								<Toggle variant="outline" size="sm">Small</Toggle>
								<Toggle variant="outline" size="md">Medium</Toggle>
								<Toggle variant="outline" size="lg">Large</Toggle>
							</div>
						</div>
					</Card>
				</section>

				<!-- ─── Badge ─── -->
				<section id="badge" data-reveal class={selectedSection !== 'badge' ? 'hidden' : ''}>
					<p class="section-tag">Indicators</p>
					<h2 class="mb-6 text-2xl font-bold">Badge</h2>
					<Card class="card-lift">
						<div>
							<div class="flex flex-wrap gap-2">
								<Badge>Default</Badge>
								<Badge variant="secondary">Secondary</Badge>
								<Badge variant="outline">Outline</Badge>
								<Badge variant="destructive">Destructive</Badge>
								<Badge variant="success">Success</Badge>
								<Badge variant="warning">Warning</Badge>
								<Badge variant="info">Info</Badge>
							</div>
						</div>
					</Card>
				</section>

				<!-- ─── Spinner ─── -->
				<section id="spinner" data-reveal class={selectedSection !== 'spinner' ? 'hidden' : ''}>
					<p class="section-tag">Indicators</p>
					<h2 class="mb-6 text-2xl font-bold">Spinner</h2>
					<Card class="card-lift">
						<div>
							<div class="flex items-center gap-4">
								<Spinner class="text-muted-foreground size-3" />
								<Spinner class="text-primary size-4" />
								<Spinner class="text-success size-5" />
								<Spinner class="text-warning size-6" />
								<Spinner class="text-destructive size-8" />
							</div>
							<Separator class="my-5" />
							<p class="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
								With label
							</p>
							<div class="flex flex-wrap items-center gap-5 text-sm">
								<Spinner class="text-muted-foreground" label="Loading…" />
								<Spinner class="text-primary" label="Fetching data…" />
								<Spinner class="text-success" label="Saving changes…" />
								<Spinner class="text-warning" label="Syncing…" />
								<Spinner class="text-destructive" label="Retrying…" />
							</div>
						</div>
					</Card>
				</section>

				<!-- ─── Status ─── -->
				<section id="status" data-reveal class={selectedSection !== 'status' ? 'hidden' : ''}>
					<p class="section-tag">Indicators</p>
					<h2 class="mb-6 text-2xl font-bold">Status</h2>
					<Card class="card-lift">
						<div class="space-y-4">
							{#each [{ variant: 'online', label: 'Online' }, { variant: 'away', label: 'Away' }, { variant: 'busy', label: 'Busy' }, { variant: 'offline', label: 'Offline' }] as s (s.variant)}
								<div class="flex items-center gap-3">
									<div class="relative flex size-4 justify-center">
										<Status variant={s.variant as 'online' | 'offline' | 'away' | 'busy'} />
									</div>
									<span class="text-sm font-medium">{s.label}</span>
								</div>
							{/each}
						</div>
					</Card>
				</section>

				<!-- ─── Separator ─── -->
				<section id="separator" data-reveal class={selectedSection !== 'separator' ? 'hidden' : ''}>
					<p class="section-tag">Layout</p>
					<h2 class="mb-6 text-2xl font-bold">Separator</h2>
					<Card class="card-lift">
						<div class="space-y-3">
							<Separator />
							<div class="flex items-center gap-4">
								<span class="text-muted-foreground text-sm">Left</span>
								<Separator orientation="vertical" class="h-5" />
								<span class="text-muted-foreground text-sm">Center</span>
								<Separator orientation="vertical" class="h-5" />
								<span class="text-muted-foreground text-sm">Right</span>
							</div>
						</div>
					</Card>
				</section>

				<!-- ─── Avatar ─── -->
				<section id="avatar" data-reveal class={selectedSection !== 'avatar' ? 'hidden' : ''}>
					<p class="section-tag">Display</p>
					<h2 class="mb-6 text-2xl font-bold">Avatar</h2>
					<Card class="card-lift">
						<div class="space-y-6">
							<div>
								<p
									class="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase"
								>
									Sizes
								</p>
								<div class="flex items-end gap-4">
									<div class="flex flex-col items-center gap-2">
										<Avatar
											size="sm"
											src="https://avatars.githubusercontent.com/u/239214719"
											alt="sm"
											fallback="SM"
										/>
										<span class="text-muted-foreground text-xs">sm</span>
									</div>
									<div class="flex flex-col items-center gap-2">
										<Avatar size="md" fallback="MD" />
										<span class="text-muted-foreground text-xs">md</span>
									</div>
									<div class="flex flex-col items-center gap-2">
										<Avatar
											size="lg"
											src="https://avatars.githubusercontent.com/u/239214719"
											alt="lg"
											fallback="LG"
										/>
										<span class="text-muted-foreground text-xs">lg</span>
									</div>
									<div class="flex flex-col items-center gap-2">
										<Avatar size="xl" fallback="XL" />
										<span class="text-muted-foreground text-xs">xl</span>
									</div>
								</div>
							</div>
							<Separator />
							<div>
								<p
									class="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase"
								>
									Group
								</p>
								<div class="flex items-center gap-4">
									<AvatarGroup>
										{#each ['RK', 'JD', 'AM', 'SL', 'TW'] as initials (initials)}
											<Avatar
												size="sm"
												fallback={initials}
												class="ring-background ring-2 transition-transform hover:-translate-y-1"
											/>
										{/each}
									</AvatarGroup>
									<span class="text-muted-foreground text-sm">+12 more</span>
								</div>
							</div>
						</div>
					</Card>
				</section>

				<!-- ─── Cards ─── -->
				<section id="card" data-reveal class={selectedSection !== 'card' ? 'hidden' : ''}>
					<p class="section-tag">Display</p>
					<h2 class="mb-6 text-2xl font-bold">Card</h2>
					<div class="grid gap-4 md:grid-cols-3" data-stagger>
						<Card
							class="card-lift"
							title="Simple Card"
							description="A basic card with header and footer."
						>
							<p class="text-muted-foreground text-sm">
								Card body content renders here with full styling support.
							</p>
							{#snippet footer()}
								<Button size="sm" variant="outline">Cancel</Button>
								<Button size="sm">Confirm</Button>
							{/snippet}
						</Card>

						<Card class="card-lift" title="Stats Card" description="Dashboard overview">
							<div class="space-y-3">
								<div class="text-primary text-3xl font-bold">42,890</div>
								<div class="text-success flex items-center gap-1.5 text-xs">
									<MingcuteArrowUpLine class="size-3.5" />
									<span>+12.5% from last month</span>
								</div>
								<Progress value={72} />
							</div>
						</Card>

						<Card class="card-lift" title="User Card">
							<div class="space-y-4">
								<div class="flex items-center gap-3">
									<div class="relative">
										<Avatar size="md" fallback="JD" />
										<span class="absolute right-0 bottom-0">
											<Status variant="online" class="ring-background ring-2" />
										</span>
									</div>
									<div>
										<p class="text-sm font-semibold">John Doe</p>
										<p class="text-muted-foreground text-xs">john@example.com</p>
									</div>
								</div>
								<div class="flex gap-2">
									<Badge variant="secondary">Admin</Badge>
									<Badge variant="outline">Pro</Badge>
								</div>
							</div>
							{#snippet footer()}
								<Button size="sm" class="w-full" variant="outline">View Profile</Button>
							{/snippet}
						</Card>
					</div>
				</section>

				<!-- ─── Skeleton ─── -->
				<section id="skeleton" data-reveal class={selectedSection !== 'skeleton' ? 'hidden' : ''}>
					<p class="section-tag">Display</p>
					<h2 class="mb-6 text-2xl font-bold">Skeleton</h2>
					<Card class="card-lift">
						<div>
							<div class="grid gap-6 sm:grid-cols-2">
								<div class="flex items-start gap-4">
									<Skeleton class="size-12 shrink-0 rounded-full" />
									<div class="flex-1 space-y-2.5 pt-1">
										<Skeleton class="h-3.5 w-2/5" />
										<Skeleton class="h-3 w-3/4" />
										<Skeleton class="h-3 w-1/2" />
									</div>
								</div>
								<div class="space-y-2.5">
									<Skeleton class="h-4 w-full" />
									<Skeleton class="h-4 w-full" />
									<Skeleton class="h-4 w-4/5" />
									<Skeleton class="h-4 w-2/3" />
								</div>
							</div>
							<div class="mt-6 grid gap-3 sm:grid-cols-3">
								<Skeleton class="h-24 rounded-xl" />
								<Skeleton class="h-24 rounded-xl" />
								<Skeleton class="h-24 rounded-xl" />
							</div>
						</div>
					</Card>
				</section>

				<!-- ─── Tabs ─── -->
				<section id="tabs" data-reveal class={selectedSection !== 'tabs' ? 'hidden' : ''}>
					<p class="section-tag">Navigation</p>
					<h2 class="mb-6 text-2xl font-bold">Tabs</h2>
					<Card class="card-lift">
						<div class="space-y-8">
							<div class="space-y-3">
								<p class="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
									Default
								</p>
								{#snippet tabAccountContent()}
									<p class="text-muted-foreground text-sm">
										Manage your account settings and preferences here.
									</p>
								{/snippet}
								{#snippet tabPasswordContent()}
									<p class="text-muted-foreground text-sm">
										Change your password and configure 2FA.
									</p>
								{/snippet}
								{#snippet tabSettingsContent()}
									<p class="text-muted-foreground text-sm">
										Configure application-wide settings here.
									</p>
								{/snippet}
								{#snippet tabBillingContent()}
									<p class="text-muted-foreground text-sm">
										Manage billing, invoices, and subscription plan.
									</p>
								{/snippet}
								<Tabs
									defaultValue="account"
									tabs={[
										{ value: 'account', label: 'Account', content: tabAccountContent },
										{ value: 'password', label: 'Password', content: tabPasswordContent },
										{ value: 'settings', label: 'Settings', content: tabSettingsContent },
										{ value: 'billing', label: 'Billing', content: tabBillingContent }
									]}
								/>
							</div>

							<div class="space-y-3">
								<p class="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
									Underline (with Indicator)
								</p>
								{#snippet tabProfileContent()}
									<p class="text-muted-foreground text-sm">
										Update your profile information and avatar.
									</p>
								{/snippet}
								{#snippet tabNotificationsContent()}
									<p class="text-muted-foreground text-sm">
										Configure which notifications you receive.
									</p>
								{/snippet}
								{#snippet tabIntegrationsContent()}
									<p class="text-muted-foreground text-sm">
										Connect third-party apps and integrations.
									</p>
								{/snippet}
								<Tabs
									defaultValue="profile"
									variant="underline"
									tabs={[
										{ value: 'profile', label: 'Profile', content: tabProfileContent },
										{
											value: 'notifications',
											label: 'Notifications',
											content: tabNotificationsContent
										},
										{
											value: 'integrations',
											label: 'Integrations',
											content: tabIntegrationsContent
										}
									]}
								/>
							</div>
						</div>
					</Card>
				</section>

				<!-- ─── Input ─── -->
				<section id="input" data-reveal class={selectedSection !== 'input' ? 'hidden' : ''}>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Input</h2>
					<Card class="card-lift">
						<div class="space-y-4">
							<Field label="Username" helperText="Must be 3–20 characters, letters and numbers.">
								<Input placeholder="Enter username…" />
							</Field>
							<Field invalid label="Email" errorText="Please enter a valid email address.">
								<Input type="email" placeholder="you@example.com" value="invalid-email" />
							</Field>
						</div>
					</Card>
				</section>

				<!-- ─── Textarea ─── -->
				<section id="textarea" data-reveal class={selectedSection !== 'textarea' ? 'hidden' : ''}>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Textarea</h2>
					<Card class="card-lift">
						<div>
							<Field label="Message">
								<Textarea placeholder="Type your message here…" rows={3} />
							</Field>
						</div>
					</Card>
				</section>

				<!-- ─── Field ─── -->
				<section id="field" data-reveal class={selectedSection !== 'field' ? 'hidden' : ''}>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Field</h2>
					<Card class="card-lift">
						<div class="space-y-4">
							<Field label="Username" helperText="Must be 3–20 characters, letters and numbers.">
								<Input placeholder="Enter username…" />
							</Field>
							<Field invalid label="Email" errorText="Please enter a valid email address.">
								<Input type="email" placeholder="you@example.com" value="invalid-email" />
							</Field>
							<Field label="Message">
								<Textarea placeholder="Type your message here…" rows={3} />
							</Field>
						</div>
					</Card>
				</section>

				<!-- ─── Number Input ─── -->
				<section
					id="number-input"
					data-reveal
					class={selectedSection !== 'number-input' ? 'hidden' : ''}
				>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Number Input</h2>
					<Card class="card-lift">
						<div>
							<div class="max-w-xs">
								<NumberInput min={0} max={100} defaultValue={5} label="Quantity" />
							</div>
						</div>
					</Card>
				</section>

				<!-- ─── Checkbox ─── -->
				<section id="checkbox" data-reveal class={selectedSection !== 'checkbox' ? 'hidden' : ''}>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Checkbox</h2>
					<Card class="card-lift">
						<div class="space-y-2">
							<Checkbox defaultChecked label="Accept terms and conditions" />
							<Checkbox label="Subscribe to newsletter" />
							<Checkbox disabled label="Disabled option" />
						</div>
					</Card>
				</section>

				<!-- ─── Switch ─── -->
				<section id="switch" data-reveal class={selectedSection !== 'switch' ? 'hidden' : ''}>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Switch</h2>
					<Card class="card-lift">
						<div class="space-y-3">
							<Switch defaultChecked={true} label="label" />
							<Switch label="With icon">
								{#snippet checkedContent()}<MingcuteCheckFill class="size-3" />{/snippet}
								{#snippet uncheckedContent()}<MingcuteCloseFill class="size-3" />{/snippet}
							</Switch>
							<Switch disabled label="Disabled switch" />
							<Switch disabled label="Checked Disabled switch" checked />
						</div>
						<div class="mt-4 space-y-3">
							<p class="text-muted-foreground text-xs font-medium tracking-wide uppercase">
								Secondary
							</p>
							<Switch variant="secondary" defaultChecked={true} label="label" />
							<Switch label="With icon" variant="secondary">
								{#snippet checkedContent()}<MingcuteCheckFill class="size-3" />{/snippet}
								{#snippet uncheckedContent()}<MingcuteCloseFill class="size-3" />{/snippet}
							</Switch>
							<Switch variant="secondary" disabled label="Disabled switch" />
							<Switch variant="secondary" disabled label="Checked Disabled switch" checked />
						</div>
						<div class="mt-4 space-y-3">
							<p class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Sizes</p>
							<Switch size="sm" label="Small" />
							<Switch size="md" label="Medium" />
							<Switch size="lg" label="Large" />
							<Switch size="xl" defaultChecked={true} label="Extra Large" />
						</div>
					</Card>
				</section>

				<!-- ─── Radio Group ─── -->
				<section
					id="radio-group"
					data-reveal
					class={selectedSection !== 'radio-group' ? 'hidden' : ''}
				>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Radio Group</h2>
					{#snippet proLabel()}
						<span class="text-sm font-medium"
							>Pro <Badge variant="info" class="ml-1 py-0 text-[10px]">Popular</Badge></span
						>
					{/snippet}
					<Card class="card-lift">
						<RadioGroup
							defaultValue="pro"
							label="Subscription plan"
							items={[
								{ value: 'free', label: 'Free' },
								{ value: 'pro', label: proLabel },
								{ value: 'enterprise', label: 'Enterprise' }
							]}
						/>
					</Card>
				</section>

				<!-- ─── Slider ─── -->
				<section id="slider" data-reveal class={selectedSection !== 'slider' ? 'hidden' : ''}>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Slider</h2>
					<Card class="card-lift">
						<Slider defaultValue={[40]} min={0} max={100} label="Volume" showValue />
					</Card>
				</section>

				<!-- ─── Progress ─── -->
				<section id="progress" data-reveal class={selectedSection !== 'progress' ? 'hidden' : ''}>
					<p class="section-tag">Feedback</p>
					<h2 class="mb-6 text-2xl font-bold">Progress</h2>
					<Card class="card-lift">
						<div class="space-y-3" data-progress-animate>
							<div class="flex items-center justify-between">
								<p class="text-sm font-medium">Upload progress</p>
								<span class="text-muted-foreground text-sm tabular-nums">{progressValue}%</span>
							</div>
							<Progress value={progressValue} class="transition-all duration-1000" />
							<div class="mt-4 grid grid-cols-3 gap-2">
								{#each [{ label: 'CPU', value: 45 }, { label: 'RAM', value: 68 }, { label: 'Disk', value: 23 }] as metric (metric.label)}
									<div class="bg-secondary-active space-y-1.5 rounded-lg p-3">
										<div class="flex items-center justify-between text-xs">
											<span class="text-muted-foreground">{metric.label}</span>
											<span class="font-medium tabular-nums">{metric.value}%</span>
										</div>
										<Progress value={metric.value} class="h-1" />
									</div>
								{/each}
							</div>
						</div>
					</Card>
				</section>

				<!-- ─── Select ─── -->
				<section id="select" data-reveal class={selectedSection !== 'select' ? 'hidden' : ''}>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Select</h2>
					<Card class="card-lift">
						<Select items={selectItems} label="Framework" placeholder="Choose a framework…" />
					</Card>
				</section>

				<!-- ─── Pin Input ─── -->
				<section id="pin-input" data-reveal class={selectedSection !== 'pin-input' ? 'hidden' : ''}>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Pin Input</h2>
					<Card class="card-lift">
						<div class="space-y-3">
							<PinInput length={5} label="Verification Code" />
							<p class="text-muted-foreground text-xs">
								Enter the 5-digit code sent to your email.
							</p>
						</div>
					</Card>
				</section>

				<!-- ─── Accordion ─── -->
				<section id="accordion" data-reveal class={selectedSection !== 'accordion' ? 'hidden' : ''}>
					<p class="section-tag">Navigation</p>
					<h2 class="mb-6 text-2xl font-bold">Accordion</h2>
					<Card class="card-lift">
						<Accordion>
							<AccordionItem value="item-1" trigger="What is horizon-design?">
								Horizon's design system and svelte 5 UI component library
							</AccordionItem>
							<AccordionItem value="item-2" trigger="How does it compare to shadcn/ui?">
								Same headless Ark UI primitives but built natively for Svelte 5 with runes,
								snippets, and Tailwind v4. The design language is darker and more vibrant with OKLCH
								perceptual color uniformity.
							</AccordionItem>
							<AccordionItem value="item-3" trigger="Does it support dark and light modes?">
								Yes — dark theme is the default <code>:root</code> style. Light theme activates via
								the <code>.light</code> class. All colors use OKLCH for perceptual uniformity across both
								themes.
							</AccordionItem>
							<AccordionItem value="item-4" trigger="Can I customize the components?">
								Every component accepts a <code>class</code> prop and exposes
								<code>data-slot</code>
								attributes for targeted CSS overrides. The Tailwind v4 CSS variables make theming as simple
								as changing a single <code>oklch()</code> value.
							</AccordionItem>
						</Accordion>
					</Card>
				</section>

				<!-- ─── Collapsible ─── -->
				<section
					id="collapsible"
					data-reveal
					class={selectedSection !== 'collapsible' ? 'hidden' : ''}
				>
					<p class="section-tag">Navigation</p>
					<h2 class="mb-6 text-2xl font-bold">Collapsible</h2>
					<Card class="card-lift">
						<div>
							<Collapsible>
								{#snippet trigger()}
									<MingcuteFolder2Line class="text-primary size-4" />
									<span>Open repositories</span>
									<MingcuteRightLine
										class="ml-auto size-4 transition-transform data-[state=open]:rotate-90"
									/>
								{/snippet}
								<div class="border-border mt-2 ml-4 space-y-1 border-l pl-4">
									{#each ['horizon-design', 'shark-ui', 'svelte-kit-template', 'ark-ui-svelte'] as repo (repo)}
										<div
											class="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all hover:translate-x-1"
										>
											<MingcuteGitBranchLine class="size-3.5 shrink-0" />
											<span class="font-mono">{repo}</span>
										</div>
									{/each}
								</div>
							</Collapsible>
						</div>
					</Card>
				</section>

				<!-- ─── Dialog ─── -->
				<section id="dialog" data-reveal class={selectedSection !== 'dialog' ? 'hidden' : ''}>
					<p class="section-tag">Overlays</p>
					<h2 class="mb-6 text-2xl font-bold">Dialog</h2>
					<Card class="card-lift">
						<Dialog
							title="Confirm Deletion"
							description="Are you sure you want to proceed? This action cannot be undone."
							triggerClass={buttonVariants({ variant: 'outline' })}
						>
							{#snippet trigger()}
								<MingcuteWindowsLine class="size-4" />
								Open Dialog
							{/snippet}
							<p class="text-muted-foreground text-sm">
								This will permanently delete the item and all associated data from our servers.
							</p>
							{#snippet footer()}
								<DialogClose class={buttonVariants({ variant: 'outline' })}>Cancel</DialogClose>
								<Button variant="destructive">
									<MingcuteDelete2Line class="size-4" />
									Delete
								</Button>
							{/snippet}
						</Dialog>
					</Card>
				</section>

				<!-- ─── Popover ─── -->
				<section id="popover" data-reveal class={selectedSection !== 'popover' ? 'hidden' : ''}>
					<p class="section-tag">Overlays</p>
					<h2 class="mb-6 text-2xl font-bold">Popover</h2>
					<Card class="card-lift">
						<Popover
							title="Layer Dimensions"
							description="Configure width and height of the layer."
							triggerClass={buttonVariants({ variant: 'outline' })}
						>
							{#snippet trigger()}
								<MingcuteLayout4Line class="size-4" />
								Open Popover
							{/snippet}
							<div class="grid gap-2 py-2">
								<div class="grid grid-cols-3 items-center gap-4">
									<span class="text-muted-foreground text-sm">Width</span>
									<Input class="col-span-2 h-8" value="100px" />
								</div>
								<div class="grid gap-4">
									<span class="text-muted-foreground text-sm">Height</span>
									<Input class="col-span-2 h-8" value="auto" />
								</div>
							</div>
						</Popover>
					</Card>
				</section>

				<!-- ─── Tooltip ─── -->
				<section id="tooltip" data-reveal class={selectedSection !== 'tooltip' ? 'hidden' : ''}>
					<p class="section-tag">Overlays</p>
					<h2 class="mb-6 text-2xl font-bold">Tooltip</h2>
					<Card class="card-lift">
						<Tooltip
							content="Tooltips provide helpful context on hover."
							triggerClass={buttonVariants({ variant: 'outline' })}
						>
							<MingcuteInformationLine class="size-4" />
							Hover Tooltip
						</Tooltip>
					</Card>
				</section>

				<!-- ─── Menu ─── -->
				<section id="menu" data-reveal class={selectedSection !== 'menu' ? 'hidden' : ''}>
					<p class="section-tag">Overlays</p>
					<h2 class="mb-6 text-2xl font-bold">Menu</h2>
					<Card class="card-lift">
						<Menu triggerClass={buttonVariants({ variant: 'outline' })}>
							{#snippet trigger()}
								<MingcuteMore2Line class="size-4" />
								Open Menu
							{/snippet}
							<MenuGroup>
								<MenuGroupLabel>Account</MenuGroupLabel>
								<MenuItem value="profile">
									<MingcuteUser2Line class="size-4" />
									Profile
								</MenuItem>
								<MenuItem value="settings">
									<MingcuteSettings3Line class="size-4" />
									Settings
								</MenuItem>
								<MenuItem value="billing">
									<MingcuteCardPayLine class="size-4" />
									Billing
								</MenuItem>
							</MenuGroup>
							<MenuSeparator />
							<MenuItem value="logout">
								<MingcuteExitDoorLine class="size-4" />
								Log out
							</MenuItem>
						</Menu>
					</Card>
				</section>

				<!-- ─── Toast ─── -->
				<section id="toast" data-reveal class={selectedSection !== 'toast' ? 'hidden' : ''}>
					<p class="section-tag">Feedback</p>
					<h2 class="mb-6 text-2xl font-bold">Toast</h2>
					<Card class="card-lift">
						<div>
							<div class="flex flex-wrap gap-3">
								<Button variant="outline" onclick={() => showToast('info')}>
									<MingcuteInformationLine class="size-4" />
									Info Toast
								</Button>
								<Button
									variant="outline"
									class="text-success hover:bg-success-subtle-bg border-success-ring"
									onclick={() => showToast('success')}
								>
									<MingcuteCheckCircleLine class="size-4" />
									Success Toast
								</Button>
								<Button
									variant="outline"
									class="text-warning hover:bg-warning-subtle-bg border-warning-ring"
									onclick={() => showToast('warning')}
								>
									<MingcuteAlertLine class="size-4" />
									Warning Toast
								</Button>
								<Button variant="destructive" onclick={() => showToast('error')}>
									<MingcuteCloseCircleLine class="size-4" />
									Error Toast
								</Button>
							</div>
						</div>
					</Card>
				</section>

				<!-- ─── Scroll Area ─── -->
				<section
					id="scroll-area"
					data-reveal
					class={selectedSection !== 'scroll-area' ? 'hidden' : ''}
				>
					<p class="section-tag">Display</p>
					<h2 class="mb-6 text-2xl font-bold">Scroll Area</h2>
					<Card class="card-lift">
						<div class="grid gap-4 sm:grid-cols-2">
							<div class="space-y-2">
								<p class="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
									Overflowing — scrollbar visible
								</p>
								<ScrollArea class="border-border h-52 rounded-lg border p-4">
									<div class="space-y-3">
										{#each scrollItems as item (item.id)}
											<div
												class="hover:bg-accent-hover group flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors"
											>
												<div
													class="bg-primary-subtle-bg text-primary group-hover:bg-primary-glow flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors"
												>
													{item.id}
												</div>
												<p
													class="text-muted-foreground group-hover:text-foreground text-sm transition-colors"
												>
													{item.text}
												</p>
											</div>
										{/each}
									</div>
								</ScrollArea>
							</div>
							<div class="space-y-2">
								<p class="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
									Fits — no scrollbar
								</p>
								<ScrollArea class="border-border h-52 rounded-lg border p-4">
									<div class="space-y-3">
										{#each scrollItems.slice(0, 2) as item (item.id)}
											<div
												class="hover:bg-accent-hover group flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors"
											>
												<div
													class="bg-primary-subtle-bg text-primary group-hover:bg-primary-glow flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors"
												>
													{item.id}
												</div>
												<p
													class="text-muted-foreground group-hover:text-foreground text-sm transition-colors"
												>
													{item.text}
												</p>
											</div>
										{/each}
									</div>
								</ScrollArea>
							</div>
						</div>
					</Card>
					<Card class="card-lift mt-4">
						<div class="space-y-2">
							<p class="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
								Resizable — drag the corner
							</p>
							<div
								class="border-border min-h-24 w-full resize-y overflow-hidden rounded-lg border"
								style="height: 80px;"
							>
								<ScrollArea class="size-full p-4">
									<div class="space-y-3">
										{#each scrollItems.slice(0, 6) as item (item.id)}
											<div
												class="hover:bg-accent-hover group flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors"
											>
												<div
													class="bg-primary-subtle-bg text-primary group-hover:bg-primary-glow flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors"
												>
													{item.id}
												</div>
												<p
													class="text-muted-foreground group-hover:text-foreground text-sm transition-colors"
												>
													{item.text}
												</p>
											</div>
										{/each}
									</div>
								</ScrollArea>
							</div>
						</div>
					</Card>
				</section>

				<!-- ─── Alert ─── -->
				<section id="alert" data-reveal class={selectedSection !== 'alert' ? 'hidden' : ''}>
					<p class="section-tag">Feedback</p>
					<h2 class="mb-6 text-2xl font-bold">Alert</h2>
					<Card class="card-lift">
						<div class="space-y-3">
							<Alert
								title="Default Alert"
								description="This is a default informational alert message."
							/>
							<Alert variant="info" title="Info Alert" description="Saving your changes." />
							<Alert
								variant="success"
								title="Success!"
								description="Your changes have been saved successfully."
							/>
							<Alert
								variant="warning"
								title="Warning"
								description="Please review your configuration before proceeding."
							/>
							<Alert
								variant="error"
								title="Error"
								description="Something went wrong. Please try again."
							/>
						</div>
					</Card>
				</section>

				<!-- ─── Breadcrumb ─── -->
				<section
					id="breadcrumb"
					data-reveal
					class={selectedSection !== 'breadcrumb' ? 'hidden' : ''}
				>
					<p class="section-tag">Navigation</p>
					<h2 class="mb-6 text-2xl font-bold">Breadcrumb</h2>
					<Card class="card-lift">
						<div>
							<Breadcrumb
								items={[
									{ label: 'Home', href: '/' },
									{ label: 'Components', href: '/components' },
									{ label: 'Breadcrumb' }
								]}
							/>
						</div>
					</Card>
				</section>

				<!-- ─── Skip Nav ─── -->
				<section id="skip-nav" data-reveal class={selectedSection !== 'skip-nav' ? 'hidden' : ''}>
					<p class="section-tag">Navigation</p>
					<h2 class="mb-6 text-2xl font-bold">Skip Nav</h2>
					<Card class="card-lift">
						<div class="flex flex-col gap-3">
							<SkipNav class="sr-only focus-visible:not-sr-only">Skip to content</SkipNav>
							<p class="text-muted-foreground text-sm">
								Focus the page with keyboard navigation to reveal the skip link.
							</p>
						</div>
					</Card>
				</section>

				<!-- ─── Kbd ─── -->
				<section id="kbd" data-reveal class={selectedSection !== 'kbd' ? 'hidden' : ''}>
					<p class="section-tag">Typography</p>
					<h2 class="mb-6 text-2xl font-bold">Kbd</h2>
					<Card class="card-lift">
						<div class="flex flex-wrap gap-3">
							<div class="flex items-center gap-1">
								<Kbd>⌘</Kbd>
								<Kbd>K</Kbd>
							</div>
							<div class="flex items-center gap-1">
								<Kbd>Ctrl</Kbd>
								<Kbd>Shift</Kbd>
								<Kbd>P</Kbd>
							</div>
							<Kbd>Escape</Kbd>
							<Kbd>Tab</Kbd>
							<Kbd>Enter</Kbd>
						</div>
					</Card>
				</section>

				<!-- ─── Steps ─── -->
				<section id="steps" data-reveal class={selectedSection !== 'steps' ? 'hidden' : ''}>
					<p class="section-tag">Navigation</p>
					<h2 class="mb-6 text-2xl font-bold">Steps</h2>
					<Card class="card-lift">
						<div>
							{#snippet stepsAccount()}
								<p class="text-muted-foreground py-4 text-sm">
									Fill in your account details to get started.
								</p>
							{/snippet}
							{#snippet stepsProfile()}
								<p class="text-muted-foreground py-4 text-sm">Complete your profile information.</p>
							{/snippet}
							{#snippet stepsReview()}
								<p class="text-muted-foreground py-4 text-sm">
									Review and confirm your information.
								</p>
							{/snippet}
							{#snippet stepsCompleted()}
								<p class="text-success py-4 text-sm">All steps completed!</p>
							{/snippet}
							<Steps
								bind:step={stepsStep}
								completedContent={stepsCompleted}
								steps={[
									{ title: 'Account', content: stepsAccount },
									{ title: 'Profile', content: stepsProfile },
									{ title: 'Review', content: stepsReview }
								]}
							/>
						</div>
					</Card>
				</section>

				<!-- ─── Combobox ─── -->
				<section id="combobox" data-reveal class={selectedSection !== 'combobox' ? 'hidden' : ''}>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Combobox</h2>
					<Card class="card-lift">
						<div>
							<Combobox items={comboboxItems} label="Framework" placeholder="Search frameworks…" />
						</div>
					</Card>
				</section>

				<!-- ─── Pagination ─── -->
				<section
					id="pagination"
					data-reveal
					class={selectedSection !== 'pagination' ? 'hidden' : ''}
				>
					<p class="section-tag">Navigation</p>
					<h2 class="mb-6 text-2xl font-bold">Pagination</h2>
					<Card class="card-lift">
						<div>
							<Pagination count={100} pageSize={10} />
						</div>
					</Card>
				</section>

				<!-- ─── Toggle Group ─── -->
				<section
					id="toggle-group"
					data-reveal
					class={selectedSection !== 'toggle-group' ? 'hidden' : ''}
				>
					<p class="section-tag">Actions</p>
					<h2 class="mb-6 text-2xl font-bold">Toggle Group</h2>
					<Card class="card-lift">
						<div>
							{#snippet tgBold()}<MingcuteBoldLine class="size-4" />{/snippet}
							{#snippet tgItalic()}<MingcuteItalicLine class="size-4" />{/snippet}
							{#snippet tgUnderline()}<MingcuteUnderlineLine class="size-4" />{/snippet}
							<ToggleGroup
								items={[
									{ value: 'bold', content: tgBold },
									{ value: 'italic', content: tgItalic },
									{ value: 'underline', content: tgUnderline }
								]}
							/>
						</div>
					</Card>
				</section>

				<!-- ─── Segment Group ─── -->
				<section
					id="segment-group"
					data-reveal
					class={selectedSection !== 'segment-group' ? 'hidden' : ''}
				>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Segment Group</h2>
					<Card class="card-lift">
						<div>
							<SegmentGroup
								size="sm"
								defaultValue="day"
								items={[
									{ value: 'day', label: 'Day' },
									{ value: 'week', label: 'Week' },
									{ value: 'month', label: 'Month' }
								]}
							/>
							<SegmentGroup
								size="md"
								defaultValue="day"
								items={[
									{ value: 'day', label: 'Day' },
									{ value: 'week', label: 'Week' },
									{ value: 'month', label: 'Month' }
								]}
							/>
							<SegmentGroup
								size="lg"
								defaultValue="day"
								items={[
									{ value: 'day', label: 'Day' },
									{ value: 'week', label: 'Week' },
									{ value: 'month', label: 'Month' }
								]}
							/>
						</div>
					</Card>
				</section>

				<!-- ─── Rating Group ─── -->
				<section
					id="rating-group"
					data-reveal
					class={selectedSection !== 'rating-group' ? 'hidden' : ''}
				>
					<p class="section-tag">Feedback</p>
					<h2 class="mb-6 text-2xl font-bold">Rating Group</h2>
					<Card class="card-lift">
						<div>
							<RatingGroup count={5} defaultValue={3} />
						</div>
					</Card>
				</section>

				<!-- ─── Circular Progress ─── -->
				<section
					id="circular-progress"
					data-reveal
					class={selectedSection !== 'circular-progress' ? 'hidden' : ''}
				>
					<p class="section-tag">Feedback</p>
					<h2 class="mb-6 text-2xl font-bold">Circular Progress</h2>
					<Card class="card-lift">
						<div class="flex items-center gap-6">
							<CircularProgress value={72} size={80} />
							<CircularProgress value={45} size={64} />
							<CircularProgress value={90} size={48} strokeWidth={5} />
						</div>
					</Card>
				</section>

				<!-- ─── Drawer ─── -->
				<section id="drawer" data-reveal class={selectedSection !== 'drawer' ? 'hidden' : ''}>
					<p class="section-tag">Overlays</p>
					<h2 class="mb-6 text-2xl font-bold">Drawer</h2>
					<Card class="card-lift">
						<Drawer
							title="Drawer Panel"
							description="This drawer slides in from the right."
							triggerClass={buttonVariants({ variant: 'outline' })}
						>
							{#snippet trigger()}
								<MingcuteRightLine class="size-4" />
								Open Drawer
							{/snippet}
							<p class="text-muted-foreground text-sm">
								Drawer content goes here. Use it for settings, filters, or secondary views.
							</p>
							{#snippet footer()}
								<DrawerClose class={buttonVariants({ variant: 'outline' })}>Close</DrawerClose>
								<Button>Save</Button>
							{/snippet}
						</Drawer>
					</Card>
				</section>

				<!-- ─── Sheet ─── -->
				<section id="sheet" data-reveal class={selectedSection !== 'sheet' ? 'hidden' : ''}>
					<p class="section-tag">Overlays</p>
					<h2 class="mb-6 text-2xl font-bold">Sheet</h2>
					<Card class="card-lift">
						<Sheet
							title="Bottom Sheet"
							description="Slides up from the bottom of the screen."
							side="bottom"
							triggerClass={buttonVariants({ variant: 'outline' })}
						>
							{#snippet trigger()}
								<MingcuteDownLine class="size-4" />
								Open Sheet (bottom)
							{/snippet}
							<p class="text-muted-foreground text-sm">Great for mobile-style action panels.</p>
						</Sheet>
					</Card>
				</section>

				<!-- ─── Alert Dialog ─── -->
				<section
					id="alert-dialog"
					data-reveal
					class={selectedSection !== 'alert-dialog' ? 'hidden' : ''}
				>
					<p class="section-tag">Overlays</p>
					<h2 class="mb-6 text-2xl font-bold">Alert Dialog</h2>
					<Card class="card-lift">
						<div>
							{#snippet alertDialogTrigger()}
								<MingcuteDelete2Line class="size-4" />
								Alert Dialog
							{/snippet}
							<AlertDialog
								trigger={alertDialogTrigger}
								triggerClass={buttonVariants({ variant: 'destructive' })}
								title="Are you absolutely sure?"
								description="This action cannot be undone."
								cancelLabel="Cancel"
								actionLabel="Delete"
							/>
						</div>
					</Card>
				</section>

				<!-- ─── Date Picker ─── -->
				<section
					id="date-picker"
					data-reveal
					class={selectedSection !== 'date-picker' ? 'hidden' : ''}
				>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Date Picker</h2>
					<Card class="card-lift">
						<div>
							<DatePicker label="Select date" placeholder="Pick a date…" />
						</div>
					</Card>
				</section>

				<!-- ─── Editable ─── -->
				<section id="editable" data-reveal class={selectedSection !== 'editable' ? 'hidden' : ''}>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Editable</h2>
					<Card class="card-lift">
						<div>
							<Editable label="Display Name" defaultValue="Click me to edit" />
						</div>
					</Card>
				</section>

				<!-- ─── Table ─── -->
				<section id="table" data-reveal class={selectedSection !== 'table' ? 'hidden' : ''}>
					<p class="section-tag">Display</p>
					<h2 class="mb-6 text-2xl font-bold">Table</h2>
					<Card class="card-lift">
						<div>
							<Table
								columns={[
									{ key: 'name', label: 'Name' },
									{ key: 'status', label: 'Status' },
									{ key: 'role', label: 'Role' },
									{ key: 'joined', label: 'Joined' }
								]}
								rows={[
									{ name: 'Alice Chen', status: 'online', role: 'Admin', joined: 'Jan 2024' },
									{ name: 'Bob Smith', status: 'away', role: 'Developer', joined: 'Mar 2024' },
									{ name: 'Carol White', status: 'offline', role: 'Designer', joined: 'Jun 2024' }
								]}
							/>
						</div>
					</Card>
				</section>

				<!-- ─── File Tree ─── -->
				<section id="file-tree" data-reveal class={selectedSection !== 'file-tree' ? 'hidden' : ''}>
					<p class="section-tag">Navigation</p>
					<h2 class="mb-6 text-2xl font-bold">File Tree</h2>
					<Card class="card-lift">
						<FileTree collection={treeCollection} />
					</Card>
				</section>

				<!-- ─── Hierarchy View ─── -->
				<section
					id="hierarchy-view"
					data-reveal
					class={selectedSection !== 'hierarchy-view' ? 'hidden' : ''}
				>
					<p class="section-tag">Navigation</p>
					<h2 class="mb-6 text-2xl font-bold">Hierarchy View</h2>
					<Card class="card-lift h-180">
						<HierarchyView data={hierarchyData} />
					</Card>
				</section>

				<!-- ─── Inspector Panel ─── -->
				<section
					id="inspector-panel"
					data-reveal
					class={selectedSection !== 'inspector-panel' ? 'hidden' : ''}
				>
					<p class="section-tag">Navigation</p>
					<h2 class="mb-6 text-2xl font-bold">Inspector Panel</h2>
					<div
						class="border-border min-h-40 w-full resize-y overflow-hidden rounded-xl border"
						style="height: 180px;"
					>
						<ScrollArea class="size-full p-3">
							<InspectorPanel bind:cards={inspectorCards} bind:expandedIds={inspectorExpanded}>
								{#snippet content(card)}
									{#if card.id === 'transform'}
										<div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs">
											{#each [['Position', 'X 3  Y 0  Z 0'], ['Rotation', 'X 0  Y 45  Z 0'], ['Scale', 'X 1  Y 1  Z 1']] as [label, value] (label)}
												<span class="text-muted-foreground py-0.5">{label}</span>
												<span class="bg-muted/40 rounded px-2 py-0.5 font-mono">{value}</span>
											{/each}
										</div>
									{:else if card.id === 'mesh-renderer'}
										<div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs">
											{#each [['Material', 'Standard'], ['Cast Shadows', 'On'], ['Receive Shadows', 'On']] as [label, value] (label)}
												<span class="text-muted-foreground py-0.5">{label}</span>
												<span class="bg-muted/40 rounded px-2 py-0.5">{value}</span>
											{/each}
										</div>
									{:else if card.id === 'box-collider'}
										<div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs">
											{#each [['Is Trigger', 'false'], ['Center', 'X 0  Y 0  Z 0'], ['Size', 'X 1  Y 1  Z 1']] as [label, value] (label)}
												<span class="text-muted-foreground py-0.5">{label}</span>
												<span class="bg-muted/40 rounded px-2 py-0.5 font-mono">{value}</span>
											{/each}
										</div>
									{:else if card.id === 'rigidbody'}
										<div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs">
											{#each [['Mass', '1'], ['Drag', '0'], ['Angular Drag', '0.05'], ['Use Gravity', 'true'], ['Is Kinematic', 'false']] as [label, value] (label)}
												<span class="text-muted-foreground py-0.5">{label}</span>
												<span class="bg-muted/40 rounded px-2 py-0.5 font-mono">{value}</span>
											{/each}
										</div>
										<button
											class="bg-muted hover:bg-muted/70 mt-2 w-full rounded px-2 py-1 text-xs transition-colors"
										>
											Apply Preset
										</button>
									{/if}
								{/snippet}
							</InspectorPanel>
						</ScrollArea>
					</div>
				</section>

				<!-- ─── Listbox ─── -->
				<section id="listbox" data-reveal class={selectedSection !== 'listbox' ? 'hidden' : ''}>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Listbox</h2>
					<Card class="card-lift">
						<div>
							<Listbox items={comboboxItems} label="Choose a framework" />
						</div>
					</Card>
				</section>

				<!-- ─── File Upload ─── -->
				<section
					id="file-upload"
					data-reveal
					class={selectedSection !== 'file-upload' ? 'hidden' : ''}
				>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">File Upload</h2>
					<Card class="card-lift">
						<div>
							<FileUpload label="Attachments" />
						</div>
					</Card>
				</section>

				<!-- ─── Clipboard ─── -->
				<section id="clipboard" data-reveal class={selectedSection !== 'clipboard' ? 'hidden' : ''}>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Clipboard</h2>
					<Card class="card-lift">
						<div class="space-y-4">
							<Clipboard value="npm install horizon-design" label="Install command" />
						</div>
					</Card>
				</section>

				<!-- ─── Carousel ─── -->
				<section id="carousel" data-reveal class={selectedSection !== 'carousel' ? 'hidden' : ''}>
					<p class="section-tag">Display</p>
					<h2 class="mb-6 text-2xl font-bold">Carousel</h2>
					<Card class="card-lift">
						<div>
							{#snippet carouselSlide1()}
								<div
									class="bg-primary-subtle-bg text-primary flex h-40 items-center justify-center rounded-lg text-lg font-semibold"
								>
									Slide 1
								</div>
							{/snippet}
							{#snippet carouselSlide2()}
								<div
									class="bg-success-subtle-bg text-success flex h-40 items-center justify-center rounded-lg text-lg font-semibold"
								>
									Slide 2
								</div>
							{/snippet}
							{#snippet carouselSlide3()}
								<div
									class="bg-warning-subtle-bg text-warning flex h-40 items-center justify-center rounded-lg text-lg font-semibold"
								>
									Slide 3
								</div>
							{/snippet}
							<Carousel slides={[carouselSlide1, carouselSlide2, carouselSlide3]} />
						</div>
					</Card>
				</section>

				<!-- ─── Signature Pad ─── -->
				<section
					id="signature-pad"
					data-reveal
					class={selectedSection !== 'signature-pad' ? 'hidden' : ''}
				>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Signature Pad</h2>
					<Card class="card-lift">
						<div>
							<SignaturePad label="Draw your signature" />
						</div>
					</Card>
				</section>

				<!-- ─── QR Code ─── -->
				<section id="qr-code" data-reveal class={selectedSection !== 'qr-code' ? 'hidden' : ''}>
					<p class="section-tag">Display</p>
					<h2 class="mb-6 text-2xl font-bold">QR Code</h2>
					<Card class="card-lift">
						<div class="flex items-center gap-6">
							<QrCode value="https://github.com" size={120} />
							<div>
								<p class="text-foreground mb-1 text-sm font-medium">Scan to visit</p>
								<p class="text-muted-foreground text-xs">https://github.com</p>
							</div>
						</div>
					</Card>
				</section>

				<!-- ─── Frame ─── -->
				<section id="frame" data-reveal class={selectedSection !== 'frame' ? 'hidden' : ''}>
					<p class="section-tag">Layout</p>
					<h2 class="mb-6 text-2xl font-bold">Frame</h2>
					<Card class="card-lift">
						<div>
							<Frame title="my-app.svelte" class="h-32">
								<div class="text-muted-foreground p-4 font-mono text-xs">
									<span class="text-primary">&lt;script&gt;</span><br />
									&nbsp;&nbsp;let count = $state(0);<br />
									<span class="text-primary">&lt;/script&gt;</span>
								</div>
							</Frame>
						</div>
					</Card>
				</section>

				<!-- ─── Hover Card ─── -->
				<section
					id="hover-card"
					data-reveal
					class={selectedSection !== 'hover-card' ? 'hidden' : ''}
				>
					<p class="section-tag">Overlays</p>
					<h2 class="mb-6 text-2xl font-bold">Hover Card</h2>
					<Card class="card-lift">
						<HoverCard triggerClass={buttonVariants({ variant: 'outline' })}>
							{#snippet trigger()}Hover me{/snippet}
							<div class="flex items-start gap-3">
								<Avatar size="md" fallback="HD" />
								<div>
									<p class="text-sm font-semibold">horizon-design</p>
									<p class="text-muted-foreground mt-0.5 text-xs">Svelte 5 UI library</p>
									<Badge variant="secondary" class="mt-2 text-xs">v1.0.0</Badge>
								</div>
							</div>
						</HoverCard>
					</Card>
				</section>

				<!-- ─── Link Overlay ─── -->
				<section
					id="link-overlay"
					data-reveal
					class={selectedSection !== 'link-overlay' ? 'hidden' : ''}
				>
					<p class="section-tag">Navigation</p>
					<h2 class="mb-6 text-2xl font-bold">Link Overlay</h2>
					<Card class="card-lift">
						<LinkBox
							class="border-border hover:border-primary-border-hover rounded-xl border p-4 transition-colors"
						>
							<div class="flex items-start justify-between gap-4">
								<div>
									<h3 class="text-sm font-semibold">
										<LinkOverlay href="#">Project overview</LinkOverlay>
									</h3>
									<p class="text-muted-foreground mt-1 text-sm">
										The entire card area follows the primary link.
									</p>
								</div>
								<MingcuteArrowRightUpLine class="text-muted-foreground size-4" />
							</div>
						</LinkBox>
					</Card>
				</section>

				<!-- ─── Input Group ─── -->
				<section
					id="input-group"
					data-reveal
					class={selectedSection !== 'input-group' ? 'hidden' : ''}
				>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Input Group</h2>
					<Card class="card-lift">
						<div class="space-y-4">
							<InputGroup>
								<InputAddon>https://</InputAddon>
								<Input placeholder="yoursite.com" />
							</InputGroup>
							<InputGroup>
								<Input placeholder="Search…" />
								<InputAddon><MingcuteSearchLine class="size-4" /></InputAddon>
							</InputGroup>
						</div>
					</Card>
				</section>

				<!-- ─── Native Select ─── -->
				<section
					id="native-select"
					data-reveal
					class={selectedSection !== 'native-select' ? 'hidden' : ''}
				>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Native Select</h2>
					<Card class="card-lift">
						<div>
							<NativeSelect>
								<option value="">Choose framework…</option>
								<option value="svelte">Svelte</option>
								<option value="react">React</option>
								<option value="vue">Vue</option>
							</NativeSelect>
						</div>
					</Card>
				</section>

				<!-- ─── Timer ─── -->
				<section id="timer" data-reveal class={selectedSection !== 'timer' ? 'hidden' : ''}>
					<p class="section-tag">Controls</p>
					<h2 class="mb-6 text-2xl font-bold">Timer</h2>
					<Card class="card-lift">
						<div class="flex justify-center">
							<Timer autoStart={true} />
						</div>
					</Card>
				</section>

				<!-- ─── Angle Slider ─── -->
				<section
					id="angle-slider"
					data-reveal
					class={selectedSection !== 'angle-slider' ? 'hidden' : ''}
				>
					<p class="section-tag">Controls</p>
					<h2 class="mb-6 text-2xl font-bold">Angle Slider</h2>
					<Card class="card-lift">
						<div class="flex justify-center">
							<AngleSlider defaultValue={45} />
						</div>
					</Card>
				</section>

				<!-- ─── Splitter ─── -->
				<section id="splitter" data-reveal class={selectedSection !== 'splitter' ? 'hidden' : ''}>
					<p class="section-tag">Layout</p>
					<h2 class="mb-6 text-2xl font-bold">Splitter</h2>
					<Card class="card-lift">
						<div>
							<div class="border-border h-40 overflow-hidden rounded-lg border">
								<Splitter panels={splitterPanels}>
									<SplitterPanel id="a">
										<div
											class="text-muted-foreground flex h-full items-center justify-center p-4 text-sm"
										>
											Panel A
										</div>
									</SplitterPanel>
									<SplitterResizeTrigger id="a:b" />
									<SplitterPanel id="b">
										<div
											class="text-muted-foreground flex h-full items-center justify-center p-4 text-sm"
										>
											Panel B
										</div>
									</SplitterPanel>
								</Splitter>
							</div>
						</div>
					</Card>
				</section>

				<!-- ─── Data List ─── -->
				<section id="data-list" data-reveal class={selectedSection !== 'data-list' ? 'hidden' : ''}>
					<p class="section-tag">Display</p>
					<h2 class="mb-6 text-2xl font-bold">Data List</h2>
					<Card class="card-lift">
						<div>
							{#snippet dataListStatus()}
								<Badge variant="success">Active</Badge>
							{/snippet}
							<DataList
								items={[
									{ label: 'Name', value: 'John Doe' },
									{ label: 'Role', value: 'Administrator' },
									{ label: 'Status', value: dataListStatus },
									{ label: 'Email', value: 'john@example.com' }
								]}
							/>
						</div>
					</Card>
				</section>

				<!-- ─── Announcement ─── -->
				<section
					id="announcement"
					data-reveal
					class={selectedSection !== 'announcement' ? 'hidden' : ''}
				>
					<p class="section-tag">Display</p>
					<h2 class="mb-6 text-2xl font-bold">Announcement</h2>
					<Card class="card-lift">
						<div>
							<Announcement>
								<MingcuteLightningLine class="size-3.5" />
								New: 78 components available
							</Announcement>
						</div>
					</Card>
				</section>

				<!-- ─── Action Bar ─── -->
				<section
					id="action-bar"
					data-reveal
					class={selectedSection !== 'action-bar' ? 'hidden' : ''}
				>
					<p class="section-tag">Actions</p>
					<h2 class="mb-6 text-2xl font-bold">Action Bar</h2>
					<Card class="card-lift">
						<div class="flex min-h-28 items-center justify-center">
							<ActionBar class="relative bottom-auto left-auto z-0 translate-x-0">
								<Button variant="ghost" size="icon-sm" aria-label="Archive">
									<MingcuteArchiveLine class="size-4" />
								</Button>
								<Button variant="ghost" size="icon-sm" aria-label="Copy">
									<MingcuteCopy2Line class="size-4" />
								</Button>
								<ActionBarSeparator />
								<Button variant="ghost" size="icon-sm" aria-label="Delete">
									<MingcuteDelete2Line class="size-4" />
								</Button>
							</ActionBar>
						</div>
					</Card>
				</section>

				<!-- ─── Prose ─── -->
				<section id="prose" data-reveal class={selectedSection !== 'prose' ? 'hidden' : ''}>
					<p class="section-tag">Typography</p>
					<h2 class="mb-6 text-2xl font-bold">Prose</h2>
					<Card class="card-lift">
						<Prose>
							<h2>Release notes</h2>
							<p>Use Prose to style rich text content with predictable spacing.</p>
							<ul>
								<li>Headings, paragraphs, lists, quotes, code, and dividers are covered.</li>
								<li>It keeps generated or CMS content aligned with the design system.</li>
							</ul>
							<blockquote>Consistent typography makes long-form content easier to scan.</blockquote>
						</Prose>
					</Card>
				</section>

				<!-- ─── Button Group ─── -->
				<section
					id="button-group"
					data-reveal
					class={selectedSection !== 'button-group' ? 'hidden' : ''}
				>
					<p class="section-tag">Actions</p>
					<h2 class="mb-6 text-2xl font-bold">Button Group</h2>
					<Card class="card-lift">
						<div>
							<ButtonGroup>
								<Button variant="outline" size="sm">Cut</Button>
								<Button variant="outline" size="sm">Copy</Button>
								<Button variant="outline" size="sm">Paste</Button>
							</ButtonGroup>
						</div>
					</Card>
				</section>

				<!-- ─── Hint ─── -->
				<section id="hint" data-reveal class={selectedSection !== 'hint' ? 'hidden' : ''}>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Hint</h2>
					<Card class="card-lift">
						<div>
							<form class="space-y-2">
								<input
									type="text"
									autocomplete="username"
									aria-hidden="true"
									class="sr-only"
									tabindex="-1"
								/>
								<Input placeholder="Password" type="password" autocomplete="new-password" />
								<Hint>Must be at least 8 characters with a number.</Hint>
							</form>
						</div>
					</Card>
				</section>

				<!-- ─── Context Menu ─── -->
				<section
					id="context-menu"
					data-reveal
					class={selectedSection !== 'context-menu' ? 'hidden' : ''}
				>
					<p class="section-tag">Overlays</p>
					<h2 class="mb-6 text-2xl font-bold">Context Menu</h2>
					<Card class="card-lift">
						<div>
							{#snippet contextTrigger()}
								<div
									class="border-border text-muted-foreground hover:border-primary-border-active flex h-24 items-center justify-center rounded-lg border-2 border-dashed p-4 text-sm transition-colors"
								>
									Right-click here
								</div>
							{/snippet}
							<ContextMenu
								items={[
									{ type: 'label', label: 'Actions' },
									{ type: 'separator' },
									{ value: 'edit', label: 'Edit' },
									{ value: 'copy', label: 'Copy' },
									{ type: 'separator' },
									{ value: 'delete', label: 'Delete' }
								]}
							>
								{@render contextTrigger()}
							</ContextMenu>
						</div>
					</Card>
				</section>

				<!-- ─── Color Picker ─── -->
				<section
					id="color-picker"
					data-reveal
					class={selectedSection !== 'color-picker' ? 'hidden' : ''}
				>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Color Picker</h2>
					<Card class="card-lift">
						<div>
							<ColorPicker label="Brand color" value={parseColor('#737efa')} />
						</div>
					</Card>
				</section>

				<!-- ─── Swap ─── -->
				<section id="swap" data-reveal class={selectedSection !== 'swap' ? 'hidden' : ''}>
					<p class="section-tag">Actions</p>
					<h2 class="mb-6 text-2xl font-bold">Swap</h2>
					<Card class="card-lift">
						<div>
							<p class="text-muted-foreground mb-4 text-sm">
								Toggle between two states with animated transitions.
							</p>
							<div class="flex items-center gap-6">
								{#snippet swapSun()}<MingcuteSunLine class="size-6" />{/snippet}
								{#snippet swapMoon()}<MingcuteMoonLine class="size-6" />{/snippet}
								{#snippet swapVolOn()}<MingcuteVolumeLine class="size-6" />{/snippet}
								{#snippet swapVolOff()}<MingcuteVolumeOffLine class="size-6" />{/snippet}
								{#snippet swapPlayIcon()}<MingcutePlayLine class="size-6" />{/snippet}
								{#snippet swapPauseIcon()}<MingcutePauseLine class="size-6" />{/snippet}
								<button onclick={() => (swapOn = !swapOn)} class="hover:bg-accent rounded-lg p-2">
									<Swap swap={swapOn} on={swapSun} off={swapMoon} />
								</button>
								<button
									onclick={() => (swapVolume = !swapVolume)}
									class="hover:bg-accent rounded-lg p-2"
								>
									<Swap swap={swapVolume} on={swapVolOn} off={swapVolOff} />
								</button>
								<button
									onclick={() => (swapPlay = !swapPlay)}
									class="hover:bg-accent rounded-lg p-2"
								>
									<Swap swap={swapPlay} on={swapPlayIcon} off={swapPauseIcon} />
								</button>
							</div>
						</div>
					</Card>
				</section>

				<!-- ─── Calendar ─── -->
				<section id="calendar" data-reveal class={selectedSection !== 'calendar' ? 'hidden' : ''}>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Calendar</h2>
					<Card class="card-lift">
						<div>
							<Calendar />
						</div>
					</Card>
				</section>

				<!-- ─── Circular Slider ─── -->
				<section
					id="circular-slider"
					data-reveal
					class={selectedSection !== 'circular-slider' ? 'hidden' : ''}
				>
					<p class="section-tag">Controls</p>
					<h2 class="mb-6 text-2xl font-bold">Circular Slider</h2>
					<Card class="card-lift">
						<div class="flex items-center justify-center">
							<CircularSlider size={120} thickness={8} defaultValue={120} suffix="°" />
						</div>
					</Card>
				</section>

				<!-- ─── Floating Panel ─── -->
				<section
					id="floating-panel"
					data-reveal
					class={selectedSection !== 'floating-panel' ? 'hidden' : ''}
				>
					<p class="section-tag">Overlays</p>
					<h2 class="mb-6 text-2xl font-bold">Floating Panel</h2>
					<Card class="card-lift">
						<div class="flex flex-col gap-3">
							<p class="text-muted-foreground text-sm">
								A draggable floating panel anchored to a trigger. Drag the header to reposition it.
							</p>
							{#snippet floatingPanelTrigger()}Open Panel{/snippet}
							{#snippet floatingPanelBody()}
								<p class="text-muted-foreground text-sm">
									Drag the header to move this panel around the screen.
								</p>
							{/snippet}
							<FloatingPanel
								title="Settings"
								trigger={floatingPanelTrigger}
								triggerClass="border-border hover:bg-accent inline-flex h-8 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors"
							>
								{@render floatingPanelBody()}
							</FloatingPanel>
						</div>
					</Card>
				</section>

				<!-- ─── Float ─── -->
				<section id="float" data-reveal class={selectedSection !== 'float' ? 'hidden' : ''}>
					<p class="section-tag">Layout</p>
					<h2 class="mb-6 text-2xl font-bold">Float</h2>
					<Card class="card-lift">
						<div>
							<p class="text-muted-foreground mb-4 text-sm">
								A fixed-position container for floating action buttons.
							</p>
							<div
								class="border-border bg-muted-surface-dim relative min-h-20 overflow-hidden rounded-xl border"
							>
								<Float class="absolute z-0" position="bottom-right">
									<Button size="icon-md" class="rounded-full shadow-lg">
										<MingcuteAddLine />
									</Button>
								</Float>
							</div>
						</div>
					</Card>
				</section>

				<!-- ─── Marquee ─── -->
				<section id="marquee" data-reveal class={selectedSection !== 'marquee' ? 'hidden' : ''}>
					<p class="section-tag">Display</p>
					<h2 class="mb-6 text-2xl font-bold">Marquee</h2>
					<Card class="card-lift">
						<div>
							<Marquee class="py-2">
								{#each ['Svelte', 'TypeScript', 'Tailwind', 'Ark UI', 'Zag.js', 'OKLCH', 'Vite', 'SvelteKit'] as name (name)}
									<MarqueeItem class="px-3">
										<Badge variant="outline" class="whitespace-nowrap">{name}</Badge>
									</MarqueeItem>
								{/each}
							</Marquee>
						</div>
					</Card>
				</section>

				<!-- ─── Bottom Navigation ─── -->
				<section
					id="bottom-navigation"
					data-reveal
					class={selectedSection !== 'bottom-navigation' ? 'hidden' : ''}
				>
					<p class="section-tag">Navigation</p>
					<h2 class="mb-6 text-2xl font-bold">Bottom Navigation</h2>
					<Card class="card-lift">
						<div>
							<div class="border-border overflow-hidden rounded-xl border">
								<div class="bg-muted-surface-dim flex h-10 items-center justify-center">
									<span class="text-muted-foreground text-xs">App content area</span>
								</div>
								{#snippet bnHome()}<MingcuteHome4Line class="size-5" />{/snippet}
								{#snippet bnSearch()}<MingcuteSearchLine class="size-5" />{/snippet}
								{#snippet bnProfile()}<MingcuteUser1Line class="size-5" />{/snippet}
								<BottomNavigation
									class="relative top-auto right-auto bottom-auto left-auto z-0"
									items={[
										{ label: 'Home', href: '#', icon: bnHome, active: true },
										{ label: 'Search', href: '#', icon: bnSearch },
										{ label: 'Profile', href: '#', icon: bnProfile }
									]}
								/>
							</div>
						</div>
					</Card>
				</section>

				<!-- ─── Toggle Tooltip ─── -->
				<section
					id="toggle-tooltip"
					data-reveal
					class={selectedSection !== 'toggle-tooltip' ? 'hidden' : ''}
				>
					<p class="section-tag">Overlays</p>
					<h2 class="mb-6 text-2xl font-bold">Toggle Tooltip</h2>
					<Card class="card-lift">
						<div class="flex gap-1">
							<ToggleTooltip label="Bold">
								<MingcuteBoldLine class="size-4" />
							</ToggleTooltip>
							<ToggleTooltip label="Italic">
								<MingcuteItalicLine class="size-4" />
							</ToggleTooltip>
							<ToggleTooltip label="Underline">
								<MingcuteUnderlineLine class="size-4" />
							</ToggleTooltip>
							<ToggleTooltip label="Strikethrough">
								<MingcuteStrikethroughLine class="size-4" />
							</ToggleTooltip>
						</div>
					</Card>
				</section>

				<!-- ─── Theme Switch ─── -->
				<section
					id="theme-switch"
					data-reveal
					class={selectedSection !== 'theme-switch' ? 'hidden' : ''}
				>
					<p class="section-tag">Controls</p>
					<h2 class="mb-6 text-2xl font-bold">Theme Switch</h2>
					<Card class="card-lift">
						<div class="flex items-center gap-4">
							<ThemeSwitch />
							<ThemeSwitch size="lg" />
						</div>
					</Card>
				</section>

				<!-- ─── Aspect Ratio ─── -->
				<section
					id="aspect-ratio"
					data-reveal
					class={selectedSection !== 'aspect-ratio' ? 'hidden' : ''}
				>
					<p class="section-tag">Layout</p>
					<h2 class="mb-6 text-2xl font-bold">Aspect Ratio</h2>
					<Card class="card-lift">
						<div>
							<AspectRatio ratio={16 / 9} class="overflow-hidden rounded-lg">
								<img
									src="https://images.unsplash.com/photo-1618609377864-68609b857e90?w=400"
									alt="Colourful abstract"
									class="h-full w-full object-cover"
								/>
							</AspectRatio>
						</div>
					</Card>
				</section>

				<!-- ─── Item ─── -->
				<section id="item" data-reveal class={selectedSection !== 'item' ? 'hidden' : ''}>
					<p class="section-tag">Display</p>
					<h2 class="mb-6 text-2xl font-bold">Item</h2>
					<Card class="card-lift">
						<div class="flex flex-col gap-0.5">
							<Item>
								<MingcuteUser1Line class="text-muted-foreground size-4" />
								<span class="text-sm">Profile</span>
							</Item>
							<Item>
								<MingcuteSettings1Line class="text-muted-foreground size-4" />
								<span class="text-sm">Settings</span>
							</Item>
							<Item>
								<MingcuteNotificationLine class="text-muted-foreground size-4" />
								<span class="text-sm">Notifications</span>
							</Item>
						</div>
					</Card>
				</section>

				<!-- ─── Sidebar ─── -->
				<section id="sidebar" data-reveal class={selectedSection !== 'sidebar' ? 'hidden' : ''}>
					<p class="section-tag">Navigation</p>
					<h2 class="mb-6 text-2xl font-bold">Sidebar</h2>
					<Card class="card-lift overflow-hidden p-0">
						<div class="h-80">
							<Sidebar class="h-full">
								{#snippet header()}
									<span class="text-sm font-semibold">Workspace</span>
								{/snippet}
								{#snippet footer()}
									<p class="text-muted-foreground text-xs">Signed in as Rayan</p>
								{/snippet}
								<SidebarSection label="General">
									<SidebarItem href="#" active>
										<MingcuteHome4Line class="size-4" />
										Overview
									</SidebarItem>
									<SidebarItem href="#">
										<MingcuteChartLineLine class="size-4" />
										Analytics
									</SidebarItem>
								</SidebarSection>
								<SidebarSection label="Manage">
									<SidebarItem href="#">
										<MingcuteSettings3Line class="size-4" />
										Settings
									</SidebarItem>
								</SidebarSection>
							</Sidebar>
						</div>
					</Card>
				</section>

				<!-- ─── Thumb Card ─── -->
				<section
					id="thumb-card"
					data-reveal
					class={selectedSection !== 'thumb-card' ? 'hidden' : ''}
				>
					<p class="section-tag">Display</p>
					<h2 class="mb-6 text-2xl font-bold">Thumb Card</h2>
					<Card class="card-lift">
						<div class="max-w-xs">
							<ThumbCard label="Component preview" href="#">
								<MingcuteLayout6Line class="text-primary size-12" />
							</ThumbCard>
						</div>
					</Card>
				</section>

				<!-- ─── Image Cropper ─── -->
				<section
					id="image-cropper"
					data-reveal
					class={selectedSection !== 'image-cropper' ? 'hidden' : ''}
				>
					<p class="section-tag">Forms</p>
					<h2 class="mb-6 text-2xl font-bold">Image Cropper</h2>
					<Card class="card-lift">
						<div>
							<ImageCropper
								src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
								alt="Mountain landscape"
								axis="both"
							/>
						</div>
					</Card>
				</section>

				<!-- ─── Tour ─── -->
				<section id="tour" data-reveal class={selectedSection !== 'tour' ? 'hidden' : ''}>
					<p class="section-tag">Overlays</p>
					<h2 class="mb-6 text-2xl font-bold">Tour</h2>
					<Card class="card-lift">
						<div class="flex flex-col gap-3">
							<p class="text-muted-foreground text-sm">
								A guided product tour with spotlight and step navigation.
							</p>
							{#snippet tourTrigger(start: () => void)}
								<Button onclick={start}>Start Tour</Button>
							{/snippet}
							<Tour
								trigger={tourTrigger}
								steps={[
									{
										id: 'step-1',
										type: 'dialog',
										title: 'Welcome',
										description: 'This is the first step of the tour.',
										actions: [{ label: 'Next', action: 'next' }]
									},
									{
										id: 'step-2',
										type: 'dialog',
										title: 'Step 2',
										description: 'Keep going, you are doing great!',
										actions: [
											{ label: 'Back', action: 'prev' },
											{ label: 'Next', action: 'next' }
										]
									},
									{
										id: 'step-3',
										type: 'dialog',
										title: 'Done!',
										description: 'You have completed the tour.',
										actions: [{ label: 'Finish', action: 'dismiss' }]
									}
								]}
							/>
						</div>
					</Card>
				</section>

				<!-- ─── Horizon Layout ─── -->
				<section
					id="horizon-layout"
					data-reveal
					class={selectedSection !== 'horizon-layout' ? 'hidden' : ''}
				>
					<p class="section-tag">Layout</p>
					<h2 class="mb-2 text-2xl font-bold">Horizon Layout</h2>
					<p class="text-muted-foreground mb-6 text-sm">
						Drag tabs between panes, resize splits, and pop views out into separate windows.
					</p>
					<Card class="card-lift overflow-hidden p-0">
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
		background-image: radial-gradient(circle, oklch(from var(--primary) l c h / 0.14) 1px, transparent 1px);
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
	.section-tag {
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
	.section-tag::before {
		content: '';
		display: block;
		width: 14px;
		height: 1.5px;
		background: var(--primary);
		border-radius: 9999px;
	}
</style>
