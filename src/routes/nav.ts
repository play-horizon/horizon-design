/**
 * The docs site's navigation: every component page, grouped as in the sidebar, in the order the
 * navigation slide uses (a page further down slides in forward). `kit` says which entry point
 * exports the group: `horizon-design` or `horizon-design/editor`.
 * @module
 */

/** One component page. */
export interface NavItem {
	id: string;
	label: string;
}

/** A sidebar group of component pages. */
export interface NavGroup {
	group: string;
	kit: 'general' | 'editor';
	items: NavItem[];
}

/** The sidebar, group by group. */
export const navGroups: NavGroup[] = [
	{
		group: 'Actions',
		kit: 'general',
		items: [
			{ id: 'action-bar', label: 'Action Bar' },
			{ id: 'button', label: 'Button' },
			{ id: 'button-group', label: 'Button Group' },
			{ id: 'clipboard', label: 'Clipboard' },
			{ id: 'segment-group', label: 'Segment Group' },
			{ id: 'swap', label: 'Swap' },
			{ id: 'toggle', label: 'Toggle' },
			{ id: 'toggle-group', label: 'Toggle Group' },
			{ id: 'toggle-tooltip', label: 'Toggle Tooltip' },
			{ id: 'vote-buttons', label: 'Vote Buttons' }
		]
	},
	{
		group: 'Forms',
		kit: 'general',
		items: [
			{ id: 'angle-slider', label: 'Angle Slider' },
			{ id: 'calendar', label: 'Calendar' },
			{ id: 'checkbox', label: 'Checkbox' },
			{ id: 'circular-slider', label: 'Circular Slider' },
			{ id: 'color-picker', label: 'Color Picker' },
			{ id: 'combobox', label: 'Combobox' },
			{ id: 'date-picker', label: 'Date Picker' },
			{ id: 'editable', label: 'Editable' },
			{ id: 'field', label: 'Field' },
			{ id: 'file-upload', label: 'File Upload' },
			{ id: 'hint', label: 'Hint' },
			{ id: 'image-cropper', label: 'Image Cropper' },
			{ id: 'input', label: 'Input' },
			{ id: 'input-group', label: 'Input Group' },
			{ id: 'listbox', label: 'Listbox' },
			{ id: 'native-select', label: 'Native Select' },
			{ id: 'number-input', label: 'Number Input' },
			{ id: 'pin-input', label: 'Pin Input' },
			{ id: 'radio-group', label: 'Radio Group' },
			{ id: 'rating-group', label: 'Rating Group' },
			{ id: 'select', label: 'Select' },
			{ id: 'signature-pad', label: 'Signature Pad' },
			{ id: 'slider', label: 'Slider' },
			{ id: 'switch', label: 'Switch' },
			{ id: 'tag-picker', label: 'Tag Picker' },
			{ id: 'textarea', label: 'Textarea' }
		]
	},
	{
		group: 'Display',
		kit: 'general',
		items: [
			{ id: 'announcement', label: 'Announcement' },
			{ id: 'aspect-ratio', label: 'Aspect Ratio' },
			{ id: 'avatar', label: 'Avatar' },
			{ id: 'avatar-stack', label: 'Avatar Stack' },
			{ id: 'badge', label: 'Badge' },
			{ id: 'card', label: 'Card' },
			{ id: 'carousel', label: 'Carousel' },
			{ id: 'data-list', label: 'Data List' },
			{ id: 'frame', label: 'Frame' },
			{ id: 'game-card', label: 'Game Card' },
			{ id: 'game-hero', label: 'Game Hero' },
			{ id: 'item', label: 'Item' },
			{ id: 'kbd', label: 'Kbd' },
			{ id: 'marquee', label: 'Marquee' },
			{ id: 'player-count', label: 'Player Count' },
			{ id: 'prose', label: 'Prose' },
			{ id: 'qr-code', label: 'QR Code' },
			{ id: 'scroll-area', label: 'Scroll Area' },
			{ id: 'separator', label: 'Separator' },
			{ id: 'status', label: 'Status' },
			{ id: 'table', label: 'Table' },
			{ id: 'theme-switch', label: 'Theme Switch' },
			{ id: 'thumb-card', label: 'Thumb Card' },
			{ id: 'timer', label: 'Timer' }
		]
	},
	{
		group: 'Feedback',
		kit: 'general',
		items: [
			{ id: 'alert', label: 'Alert' },
			{ id: 'circular-progress', label: 'Circular Progress' },
			{ id: 'progress', label: 'Progress' },
			{ id: 'skeleton', label: 'Skeleton' },
			{ id: 'spinner', label: 'Spinner' },
			{ id: 'toast', label: 'Toast' }
		]
	},
	{
		group: 'Navigation',
		kit: 'general',
		items: [
			{ id: 'accordion', label: 'Accordion' },
			{ id: 'bottom-navigation', label: 'Bottom Navigation' },
			{ id: 'breadcrumb', label: 'Breadcrumb' },
			{ id: 'collapsible', label: 'Collapsible' },
			{ id: 'command-palette', label: 'Command Palette' },
			{ id: 'link-overlay', label: 'Link Overlay' },
			{ id: 'pagination', label: 'Pagination' },
			{ id: 'sidebar', label: 'Sidebar' },
			{ id: 'skip-nav', label: 'Skip Nav' },
			{ id: 'steps', label: 'Steps' },
			{ id: 'tabs', label: 'Tabs' }
		]
	},
	{
		group: 'Overlays',
		kit: 'general',
		items: [
			{ id: 'alert-dialog', label: 'Alert Dialog' },
			{ id: 'context-menu', label: 'Context Menu' },
			{ id: 'dialog', label: 'Dialog' },
			{ id: 'drawer', label: 'Drawer' },
			{ id: 'floating-panel', label: 'Floating Panel' },
			{ id: 'hover-card', label: 'Hover Card' },
			{ id: 'menu', label: 'Menu' },
			{ id: 'popover', label: 'Popover' },
			{ id: 'sheet', label: 'Sheet' },
			{ id: 'tooltip', label: 'Tooltip' },
			{ id: 'tour', label: 'Tour' }
		]
	},
	{
		group: 'Layout',
		kit: 'general',
		items: [
			{ id: 'float', label: 'Float' },
			{ id: 'splitter', label: 'Splitter' },
			{ id: 'virtual-list', label: 'Virtual List' },
			{ id: 'virtual-tree', label: 'Virtual Tree' }
		]
	},
	{
		group: 'Editor',
		kit: 'editor',
		items: [
			{ id: 'file-tree', label: 'File Tree' },
			{ id: 'hierarchy-view', label: 'Hierarchy View' },
			{ id: 'horizon-layout', label: 'Horizon Layout' },
			{ id: 'inspector-panel', label: 'Inspector Panel' }
		]
	}
];

/** Every component page in sidebar order, the foundations page (`''`) first. */
export const pageOrder: string[] = ['', ...navGroups.flatMap((g) => g.items.map((i) => i.id))];
