# horizon-design

Horizon's design system and Svelte 5 UI component library. Built on [Ark UI](https://ark-ui.com) for headless behaviour and [Tailwind CSS v4](https://tailwindcss.com) for styling, with OKLCH color tokens and full dark/light theme support.

---

## Setup

```bash
pnpm add horizon-design
```

Import the global design CSS in your root layout:

```svelte
<!-- src/routes/+layout.svelte -->
<script>
	import 'horizon-design/horizon-design.css';
</script>
```

The dark theme is the default (`:root`). Add `.light` to `<html>` for the light variant.

---

## Developing

```bash
pnpm dev        # start the showcase app
pnpm check      # svelte-check type checking
pnpm build      # build library → dist/
```

---

## Components

### Accordion

Collapsible sections. `trigger` accepts a string or Snippet for rich content.

```svelte
<script>
	import { Accordion, AccordionItem } from 'horizon-design';

	let openItems = $state([]);
</script>

<Accordion bind:value={openItems}>
	<AccordionItem value="faq-1" trigger="Question?">Answer.</AccordionItem>
	<AccordionItem value="faq-2" trigger="Another question?">Another answer.</AccordionItem>
</Accordion>
```

| Component       | Prop            | Type                    | Default     |
| --------------- | --------------- | ----------------------- | ----------- |
| `Accordion`     | `collapsible`   | `boolean`               | `true`      |
|                 | `multiple`      | `boolean`               | `false`     |
|                 | `lazyMount`     | `boolean`               | `true`      |
|                 | `unmountOnExit` | `boolean`               | `true`      |
|                 | `value`         | `string[]`              | `undefined` |
|                 | `defaultValue`  | `string[]`              | —           |
| `AccordionItem` | `value`         | `string` **(required)** | —           |
|                 | `trigger`       | `string \| Snippet`     | —           |
|                 | `disabled`      | `boolean`               | —           |

---

### ActionBar

Floating contextual action bar for compact page-level actions.

```svelte
<script>
	import { ActionBar, ActionBarSeparator, Button } from 'horizon-design';
	import MingcuteArchiveLine from '~icons/mingcute/archive-line';
	import MingcuteCopy2Line from '~icons/mingcute/copy2-line';
	import MingcuteDelete2Line from '~icons/mingcute/delete2-line';
</script>

<ActionBar>
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
```

`ActionBar` is fixed to the bottom center by default. Use `ActionBarSeparator` to split action groups.

---

### Alert

Contextual feedback message with icon, title, and description.

```svelte
<script>
	import { Alert } from 'horizon-design';
</script>

<Alert variant="success" title="Saved!" description="Your changes were saved successfully." />
<Alert variant="error" title="Error" description="Something went wrong." />
```

| Prop          | Type                                                           | Default                  |
| ------------- | -------------------------------------------------------------- | ------------------------ |
| `variant`     | `'info' \| 'success' \| 'warning' \| 'error' \| 'destructive'` | `'info'`                 |
| `title`       | `string`                                                       | —                        |
| `description` | `string`                                                       | —                        |
| `icon`        | `Snippet`                                                      | default icon per variant |

---

### AlertDialog

A confirmation dialog that prevents accidental actions.

```svelte
<script>
	import { AlertDialog } from 'horizon-design';
	import { buttonVariants } from 'horizon-design';
	import MingcuteDelete2Line from '~icons/mingcute/delete2-line';
</script>

{#snippet trigger()}
	<MingcuteDelete2Line class="size-4" />
	Delete
{/snippet}

<AlertDialog
	{trigger}
	triggerClass={buttonVariants({ variant: 'destructive' })}
	title="Are you absolutely sure?"
	description="This action cannot be undone."
	cancelLabel="Cancel"
	actionLabel="Delete"
/>
```

| Prop           | Type      | Default     |
| -------------- | --------- | ----------- |
| `trigger`      | `Snippet` | —           |
| `triggerClass` | `string`  | `''`        |
| `title`        | `string`  | —           |
| `description`  | `string`  | —           |
| `cancelLabel`  | `string`  | `'Cancel'`  |
| `actionLabel`  | `string`  | `'Confirm'` |
| `cancelClass`  | `string`  | —           |
| `actionClass`  | `string`  | —           |

---

### AngleSlider

A circular drag-handle for picking an angle (0–360°).

```svelte
<script>
	import { AngleSlider } from 'horizon-design';

	let angle = $state(45);
</script>

<AngleSlider bind:value={angle} />
```

| Prop           | Type     | Default |
| -------------- | -------- | ------- |
| `value`        | `number` | `0`     |
| `defaultValue` | `number` | —       |
| `size`         | `number` | `120`   |

---

### Announcement

A compact pill-shaped badge for highlighting news or updates.

```svelte
<script>
	import { Announcement } from 'horizon-design';
	import { MingcuteLightningLine } from '~icons/mingcute/lightning-line';
</script>

<Announcement>
	<MingcuteLightningLine class="size-3.5" />
	New: horizon-design
</Announcement>
```

---

### AspectRatio

Maintains a fixed aspect ratio for its children.

```svelte
<script>
	import { AspectRatio } from 'horizon-design';
</script>

<AspectRatio ratio={16 / 9} class="overflow-hidden rounded-lg">
	<img src="/photo.jpg" alt="Photo" class="h-full w-full object-cover" />
</AspectRatio>
```

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `ratio` | `number` | `1`     |

---

### Avatar

User avatar with image and text fallback.

```svelte
<script>
	import { Avatar, AvatarGroup } from 'horizon-design';
</script>

<Avatar src="/photo.jpg" alt="User" fallback="AB" size="md" />

<AvatarGroup>
	<Avatar fallback="A" />
	<Avatar fallback="B" />
	<Avatar fallback="C" />
</AvatarGroup>
```

| Prop       | Type                           | Default |
| ---------- | ------------------------------ | ------- |
| `src`      | `string`                       | —       |
| `alt`      | `string`                       | —       |
| `fallback` | `string`                       | —       |
| `size`     | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`  |

`AvatarGroup` is a layout wrapper that overlaps its children with negative margins.

---

### Badge

Small status or label indicator.

```svelte
<script>
	import { Badge } from 'horizon-design';
</script>

<Badge>New</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
```

| Prop      | Type                                                                                         | Default     |
| --------- | -------------------------------------------------------------------------------------------- | ----------- |
| `variant` | `'default' \| 'secondary' \| 'outline' \| 'destructive' \| 'success' \| 'warning' \| 'info'` | `'default'` |

---

### BottomNavigation

Fixed bottom navigation bar for mobile interfaces. `icon` in each item is a Snippet.

```svelte
<script>
	import { BottomNavigation } from 'horizon-design';
	import MingcuteHomeLine from '~icons/mingcute/home-line';
	import MingcuteSearchLine from '~icons/mingcute/search-line';
</script>

{#snippet iconHome()}<MingcuteHomeLine class="size-5" />{/snippet}
{#snippet iconSearch()}<MingcuteSearchLine class="size-5" />{/snippet}

<BottomNavigation
	items={[
		{ label: 'Home', href: '/', icon: iconHome, active: true },
		{ label: 'Search', href: '/search', icon: iconSearch }
	]}
/>
```

| Prop    | Type                                                                       | Default |
| ------- | -------------------------------------------------------------------------- | ------- |
| `items` | `Array<{ label: string; href: string; icon?: Snippet; active?: boolean }>` | `[]`    |

---

### Breadcrumb

Navigation trail showing the current page location.

```svelte
<script>
	import { Breadcrumb } from 'horizon-design';
</script>

<Breadcrumb
	items={[
		{ label: 'Home', href: '/' },
		{ label: 'Components', href: '/components' },
		{ label: 'Breadcrumb' }
	]}
/>
```

| Prop    | Type                                      | Default |
| ------- | ----------------------------------------- | ------- |
| `items` | `Array<{ label: string; href?: string }>` | `[]`    |

The last item (without `href`) is treated as the current page (`aria-current="page"`).

---

### Button

Primary interactive element.

```svelte
<script>
	import { Button, buttonVariants } from 'horizon-design';
</script>

<Button>Click me</Button>
<Button variant="outline" size="lg">Outline</Button>
<Button isLoading>Saving…</Button>
```

| Prop          | Type                                                                                                              | Default     |
| ------------- | ----------------------------------------------------------------------------------------------------------------- | ----------- |
| `variant`     | `'default' \| 'outline' \| 'secondary' \| 'ghost' \| 'link' \| 'destructive' \| 'success' \| 'warning' \| 'info'` | `'default'` |
| `size`        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'icon-xs' \| 'icon-sm' \| 'icon-md' \| 'icon-lg' \| 'icon-xl'`           | `'md'`      |
| `isLoading`   | `boolean`                                                                                                         | `false`     |
| `clickEffect` | `boolean`                                                                                                         | `true`      |
| `pill`        | `boolean`                                                                                                         | `false`     |
| `disabled`    | `boolean`                                                                                                         | `false`     |

`buttonVariants({ variant, size })` returns the class string for use on non-button elements.

---

### ButtonGroup

Groups buttons into a visually connected row.

```svelte
<script>
	import { ButtonGroup } from 'horizon-design';
	import { Button } from 'horizon-design';
</script>

<ButtonGroup>
	<Button variant="outline" size="sm">Cut</Button>
	<Button variant="outline" size="sm">Copy</Button>
	<Button variant="outline" size="sm">Paste</Button>
</ButtonGroup>
```

---

### Calendar

Standalone inline date picker (no popover). Built on the DatePicker primitive with `inline` mode.

```svelte
<script>
	import { Calendar } from 'horizon-design';
</script>

<Calendar onValueChange={(d) => console.log(d.value)} />
```

Supports all DatePicker props: `value`, `defaultValue`, `min`, `max`, `selectionMode` (`'single' | 'range' | 'multiple'`), `onValueChange`.

---

### Card

Content container with optional header and footer.

```svelte
<script>
	import { Card } from 'horizon-design';
	import { Button } from 'horizon-design';
</script>

<Card title="Title" description="Subtitle">
	Body content goes here.
	{#snippet footer()}
		<Button>Save</Button>
	{/snippet}
</Card>
```

| Prop          | Type      | Default |
| ------------- | --------- | ------- |
| `title`       | `string`  | —       |
| `description` | `string`  | —       |
| `footer`      | `Snippet` | —       |
| `class`       | `string`  | `''`    |

---

### Carousel

Slideshow with prev/next controls and indicator dots. Each slide is a Snippet.

```svelte
<script>
	import { Carousel } from 'horizon-design';
</script>

{#snippet slide1()}
	<div class="flex h-40 items-center justify-center rounded-lg bg-blue-100">Slide 1</div>
{/snippet}
{#snippet slide2()}
	<div class="flex h-40 items-center justify-center rounded-lg bg-green-100">Slide 2</div>
{/snippet}

<Carousel slides={[slide1, slide2]} />
```

| Prop             | Type        | Default |
| ---------------- | ----------- | ------- |
| `slides`         | `Snippet[]` | `[]`    |
| `showIndicators` | `boolean`   | `true`  |
| `showArrows`     | `boolean`   | `true`  |

---

### Checkbox

Accessible checkbox with label.

```svelte
<script>
	import { Checkbox } from 'horizon-design';

	let accepted = $state(false);
</script>

<Checkbox label="Accept terms" bind:checked={accepted} />
<Checkbox label="Newsletter" defaultChecked />
```

| Prop             | Type      | Default |
| ---------------- | --------- | ------- |
| `label`          | `string`  | —       |
| `checked`        | `boolean` | —       |
| `defaultChecked` | `boolean` | —       |
| `disabled`       | `boolean` | —       |

---

### CircularProgress

SVG ring progress indicator with percentage label.

```svelte
<script>
	import { CircularProgress } from 'horizon-design';
</script>

<CircularProgress value={72} showLabel />
<CircularProgress value={72} label="Complete" />
```

| Prop        | Type      | Default |
| ----------- | --------- | ------- |
| `value`     | `number`  | `0`     |
| `max`       | `number`  | `100`   |
| `showLabel` | `boolean` | `true`  |
| `label`     | `string`  | —       |

---

### CircularSlider

A circular angle-based slider rendered with SVG rings, with an optional value display.

```svelte
<script>
	import { CircularSlider } from 'horizon-design';

	let angle = $state(90);
</script>

<CircularSlider size={120} thickness={8} bind:value={angle} suffix="°" />
```

| Prop        | Type      | Default |
| ----------- | --------- | ------- |
| `size`      | `number`  | `100`   |
| `thickness` | `number`  | `6`     |
| `step`      | `number`  | `1`     |
| `showValue` | `boolean` | `true`  |
| `prefix`    | `string`  | `''`    |
| `suffix`    | `string`  | `''`    |
| `value`     | `number`  | `0`     |

---

### Clipboard

Copy-to-clipboard input with a toggle trigger icon.

```svelte
<script>
	import { Clipboard } from 'horizon-design';
</script>

<Clipboard value="npm install horizon-design" label="Install command" />
```

| Prop    | Type                    | Default |
| ------- | ----------------------- | ------- |
| `value` | `string` **(required)** | —       |
| `label` | `string`                | —       |

---

### Collapsible

A section that can be toggled open or closed.

```svelte
<script>
	import { Collapsible } from 'horizon-design';

	let open = $state(false);
</script>

<Collapsible bind:open>
	{#snippet trigger()}Toggle{/snippet}
	Hidden content
</Collapsible>
```

| Prop          | Type      | Default |
| ------------- | --------- | ------- |
| `trigger`     | `Snippet` | —       |
| `open`        | `boolean` | `false` |
| `defaultOpen` | `boolean` | —       |
| `disabled`    | `boolean` | —       |

---

### ColorPicker

Full-featured HSLA color picker with hex input and swatches.

```svelte
<script>
	import { ColorPicker, parseColor } from 'horizon-design';

	let color = $state(parseColor('#737efa'));
</script>

<ColorPicker label="Brand color" bind:value={color} />
```

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `label` | `string` | —       |
| `value` | `Color`  | —       |

`Color` is a type exported from `horizon-design` representing a parsed color object. `parseColor` accepts any of the following string formats:

- Hex: `#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`
- RGB: `rgb(r, g, b)`, `rgba(r, g, b, a)`
- HSL: `hsl(h, s%, l%)`, `hsla(h, s%, l%, a)`
- HSB: `hsb(h, s%, b%)`, `hsba(h, s%, b%, a)`

---

### Combobox

Searchable dropdown that filters a list of options.

```svelte
<script>
	import { Combobox } from 'horizon-design';

	const items = [
		{ label: 'Svelte', value: 'svelte' },
		{ label: 'React', value: 'react' }
	];
</script>

<Combobox {items} label="Framework" placeholder="Search…" />
```

| Prop          | Type                                      | Default     |
| ------------- | ----------------------------------------- | ----------- |
| `items`       | `Array<{ label: string; value: string }>` | `[]`        |
| `label`       | `string`                                  | —           |
| `placeholder` | `string`                                  | `'Search…'` |

---

### ContextMenu

Menu triggered on right-click. Pass the target area as `children`.

```svelte
<script>
	import { ContextMenu } from 'horizon-design';
</script>

{#snippet area()}
	<div class="rounded-lg border-2 border-dashed p-4">Right-click here</div>
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
	{@render area()}
</ContextMenu>
```

| Prop       | Type                                                                                                     | Default |
| ---------- | -------------------------------------------------------------------------------------------------------- | ------- |
| `items`    | `Array<{ type?: 'item' \| 'separator' \| 'label'; value?: string; label?: string; disabled?: boolean }>` | `[]`    |
| `children` | `Snippet`                                                                                                | —       |

---

### DataList

Key–value pair list. Values can be strings or Snippets.

```svelte
<script>
	import { DataList } from 'horizon-design';
</script>

{#snippet statusBadge()}
	<Badge variant="success">Active</Badge>
{/snippet}

<DataList
	items={[
		{ label: 'Name', value: 'John Doe' },
		{ label: 'Role', value: 'Admin' },
		{ label: 'Status', value: statusBadge }
	]}
/>
```

| Prop    | Type                                                 | Default |
| ------- | ---------------------------------------------------- | ------- |
| `items` | `Array<{ label: string; value: string \| Snippet }>` | `[]`    |

---

### DatePicker

Date picker with a calendar popover.

```svelte
<script>
	import { DatePicker } from 'horizon-design';

	let selectedDates = $state([]);
</script>

<DatePicker label="Event date" bind:value={selectedDates} placeholder="Pick a date" />
```

| Prop           | Type          | Default |
| -------------- | ------------- | ------- |
| `label`        | `string`      | —       |
| `placeholder`  | `string`      | —       |
| `value`        | `DateValue[]` | —       |
| `defaultValue` | `DateValue[]` | —       |

---

### Dialog

Modal dialog with backdrop.

```svelte
<script>
	import { Dialog } from 'horizon-design';
	import { Button } from 'horizon-design';

	let open = $state(false);
</script>

<Dialog title="Edit Profile" description="Update your information." bind:open>
	{#snippet trigger()}
		<Button variant="outline">Edit</Button>
	{/snippet}
	<p>Form fields go here.</p>
	{#snippet footer()}
		<Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
		<Button>Save</Button>
	{/snippet}
</Dialog>
```

| Prop           | Type      | Default |
| -------------- | --------- | ------- |
| `trigger`      | `Snippet` | —       |
| `triggerClass` | `string`  | `''`    |
| `title`        | `string`  | —       |
| `description`  | `string`  | —       |
| `footer`       | `Snippet` | —       |
| `showClose`    | `boolean` | `true`  |
| `open`         | `boolean` | `false` |
| `defaultOpen`  | `boolean` | —       |
| `modal`        | `boolean` | `true`  |

---

### Drawer

Slide-in panel from an edge of the viewport.

```svelte
<script>
	import { Drawer } from 'horizon-design';
	import { Button } from 'horizon-design';

	let open = $state(false);
</script>

<Drawer title="Settings" side="right" bind:open>
	{#snippet trigger()}
		<Button variant="outline">Open</Button>
	{/snippet}
	<p>Drawer body.</p>
</Drawer>
```

| Prop           | Type                                     | Default   |
| -------------- | ---------------------------------------- | --------- |
| `trigger`      | `Snippet`                                | —         |
| `triggerClass` | `string`                                 | `''`      |
| `title`        | `string`                                 | —         |
| `description`  | `string`                                 | —         |
| `footer`       | `Snippet`                                | —         |
| `side`         | `'top' \| 'bottom' \| 'left' \| 'right'` | `'right'` |
| `showClose`    | `boolean`                                | `true`    |
| `open`         | `boolean`                                | `false`   |
| `defaultOpen`  | `boolean`                                | —         |

---

### Editable

Inline-editable text field that shows a preview until clicked.

```svelte
<script>
	import { Editable } from 'horizon-design';

	let name = $state('Click me to edit');
</script>

<Editable label="Display Name" bind:value={name} />
```

| Prop           | Type     | Default |
| -------------- | -------- | ------- |
| `label`        | `string` | —       |
| `defaultValue` | `string` | —       |
| `value`        | `string` | —       |
| `placeholder`  | `string` | —       |

---

### Field

Wraps a form control with accessible label, helper text, and error text.

```svelte
<script>
	import { Field } from 'horizon-design';
	import { Input } from 'horizon-design';
</script>

<Field label="Email" helperText="We'll never share your email.">
	<Input type="email" />
</Field>

<Field invalid label="Email" errorText="Invalid email address.">
	<Input type="email" />
</Field>
```

`label`, `helperText`, and `errorText` accept a string or a `Snippet` for rich content.

| Prop         | Type                | Default |
| ------------ | ------------------- | ------- |
| `label`      | `string \| Snippet` | —       |
| `helperText` | `string \| Snippet` | —       |
| `errorText`  | `string \| Snippet` | —       |
| `invalid`    | `boolean`           | —       |
| `disabled`   | `boolean`           | —       |
| `required`   | `boolean`           | —       |

---

### FileUpload

Drag-and-drop file upload area with a hidden file input.

```svelte
<script>
	import { FileUpload } from 'horizon-design';
</script>

<FileUpload label="Attachments" accept="image/*" maxFiles={3} />
```

| Prop          | Type     | Default |
| ------------- | -------- | ------- |
| `label`       | `string` | —       |
| `accept`      | `string` | —       |
| `maxFiles`    | `number` | —       |
| `maxFileSize` | `number` | —       |

---

### Float

Positions its children as a floating overlay (e.g. FAB button).

```svelte
<script>
	import { Float } from 'horizon-design';
	import { Button } from 'horizon-design';
</script>

<Float position="bottom-right">
	<Button size="icon-md" class="rounded-full shadow-lg">+</Button>
</Float>
```

| Prop       | Type                                                           | Default          |
| ---------- | -------------------------------------------------------------- | ---------------- |
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom-right'` |

---

### FloatingPanel

A draggable floating panel anchored to a trigger button. Drag the header to reposition.

```svelte
<script>
	import { FloatingPanel } from 'horizon-design';
</script>

{#snippet panelTrigger()}Open Panel{/snippet}
{#snippet panelBody()}
	<p class="text-muted-foreground text-sm">Drag the header to move this panel.</p>
{/snippet}

<FloatingPanel title="Settings" trigger={panelTrigger}>
	{@render panelBody()}
</FloatingPanel>
```

| Prop           | Type      | Default |
| -------------- | --------- | ------- |
| `trigger`      | `Snippet` | —       |
| `triggerClass` | `string`  | `''`    |
| `title`        | `string`  | —       |
| `children`     | `Snippet` | —       |

---

### Frame

A code-editor-style container with a title bar and traffic-light dots.

```svelte
<script>
	import { Frame } from 'horizon-design';
</script>

<Frame title="app.svelte" class="h-32">
	<div class="p-4 font-mono text-xs">let count = $state(0);</div>
</Frame>
```

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `title` | `string` | —       |

---

### Hint

Small helper text below a form field.

```svelte
<script>
	import { Hint } from 'horizon-design';
	import { Input } from 'horizon-design';
</script>

<Input type="password" />
<Hint>Must be at least 8 characters.</Hint>
```

---

### HoverCard

Rich preview card revealed on hover.

```svelte
<script>
	import { HoverCard } from 'horizon-design';
</script>

<HoverCard>
	{#snippet trigger()}
		<a href="#">@username</a>
	{/snippet}
	<p>User profile preview content.</p>
</HoverCard>
```

| Prop           | Type      | Default |
| -------------- | --------- | ------- |
| `trigger`      | `Snippet` | —       |
| `triggerClass` | `string`  | `''`    |
| `openDelay`    | `number`  | —       |
| `closeDelay`   | `number`  | —       |

---

### LinkOverlay

Clickable overlay link for making a full card area follow its primary link.

```svelte
<script>
	import { LinkBox, LinkOverlay } from 'horizon-design';
</script>

<LinkBox class="rounded-xl border p-4">
	<h3>
		<LinkOverlay href="/projects/alpha">Project Alpha</LinkOverlay>
	</h3>
	<p>Open the project overview.</p>
</LinkBox>
```

Use `LinkBox` as the positioned wrapper and `LinkOverlay` for the main link.

---

### ImageCropper

Interactive image crop area with drag handles, grid lines, and resize handles.

```svelte
<script>
	import { ImageCropper } from 'horizon-design';
</script>

<ImageCropper src="/photo.jpg" alt="Photo" axis="both" />
```

| Prop   | Type                                   | Default  |
| ------ | -------------------------------------- | -------- |
| `src`  | `string` **(required)**                | —        |
| `alt`  | `string`                               | `''`     |
| `axis` | `'horizontal' \| 'vertical' \| 'both'` | `'both'` |

---

### Input

Styled text input field.

```svelte
<script>
	import { Input } from 'horizon-design';
</script>

<Input placeholder="Enter text…" />
<Input size="lg" type="email" />
```

| Prop   | Type                   | Default |
| ------ | ---------------------- | ------- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'`  |

Accepts all HTML `<input>` attributes.

---

### InputGroup

Connects an input with prefix/suffix addons.

```svelte
<script>
	import { InputGroup, InputAddon } from 'horizon-design';
	import { Input } from 'horizon-design';
</script>

<InputGroup>
	<InputAddon>https://</InputAddon>
	<Input placeholder="yoursite.com" />
</InputGroup>
```

---

### Item

A styled list row (label + icon/trailing slot).

```svelte
<script>
	import { Item } from 'horizon-design';
	import MingcuteUserLine from '~icons/mingcute/user-line';
</script>

<Item>
	<MingcuteUserLine class="text-muted-foreground size-4" />
	<span class="text-sm">Profile</span>
</Item>
```

---

### Kbd

Keyboard shortcut badge.

```svelte
<script>
	import { Kbd } from 'horizon-design';
</script>

<Kbd>⌘K</Kbd>
<Kbd size="lg">Ctrl+S</Kbd>
```

| Prop   | Type                   | Default |
| ------ | ---------------------- | ------- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'`  |

---

### Listbox

A scrollable list that lets users select one or more items.

```svelte
<script>
	import { Listbox } from 'horizon-design';

	const items = [
		{ label: 'Svelte', value: 'svelte' },
		{ label: 'React', value: 'react' }
	];

	let selected = $state([]);
</script>

<Listbox {items} label="Choose a framework" bind:value={selected} />
```

| Prop           | Type                                      | Default |
| -------------- | ----------------------------------------- | ------- |
| `items`        | `Array<{ label: string; value: string }>` | `[]`    |
| `label`        | `string`                                  | —       |
| `multiple`     | `boolean`                                 | `false` |
| `value`        | `string[]`                                | `[]`    |
| `defaultValue` | `string[]`                                | —       |

---

### Marquee

Horizontally scrolling ticker band.

```svelte
<script>
	import { Marquee, MarqueeItem } from 'horizon-design';
	import { Badge } from 'horizon-design';
</script>

<Marquee class="py-2">
	{#each ['Svelte', 'TypeScript', 'Tailwind'] as name (name)}
		<MarqueeItem class="px-3">
			<Badge variant="outline">{name}</Badge>
		</MarqueeItem>
	{/each}
</Marquee>
```

| Prop           | Type      | Default |
| -------------- | --------- | ------- |
| `speed`        | `number`  | —       |
| `pauseOnHover` | `boolean` | —       |
| `reverse`      | `boolean` | —       |

---

### Menu

Dropdown menu with items, separators, and groups.

```svelte
<script>
	import { Menu, MenuItem, MenuSeparator, MenuGroup, MenuGroupLabel } from 'horizon-design';
	import { Button } from 'horizon-design';

	let menuOpen = $state(false);
</script>

<Menu bind:open={menuOpen}>
	{#snippet trigger()}
		<Button variant="outline">Options</Button>
	{/snippet}
	<MenuItem value="edit">Edit</MenuItem>
	<MenuItem value="delete">Delete</MenuItem>
	<MenuSeparator />
	<MenuItem value="help">Help</MenuItem>
</Menu>
```

| `Menu` Prop    | Type      | Default |
| -------------- | --------- | ------- |
| `trigger`      | `Snippet` | —       |
| `triggerClass` | `string`  | `''`    |
| `contentClass` | `string`  | `''`    |
| `open`         | `boolean` | `false` |

---

### NativeSelect

A styled native `<select>` element.

```svelte
<script>
	import { NativeSelect } from 'horizon-design';
</script>

<NativeSelect>
	<option value="">Choose…</option>
	<option value="svelte">Svelte</option>
	<option value="react">React</option>
</NativeSelect>
```

---

### NumberInput

Numeric input with increment/decrement buttons.

```svelte
<script>
	import { NumberInput } from 'horizon-design';

	let qty = $state('1');
</script>

<NumberInput label="Quantity" min={0} max={100} bind:value={qty} />
```

| Prop           | Type      | Default |
| -------------- | --------- | ------- |
| `label`        | `string`  | —       |
| `min`          | `number`  | —       |
| `max`          | `number`  | —       |
| `step`         | `number`  | `1`     |
| `defaultValue` | `string`  | —       |
| `value`        | `string`  | `''`    |
| `disabled`     | `boolean` | —       |

---

### Pagination

Page navigation controls.

```svelte
<script>
	import { Pagination } from 'horizon-design';

	let currentPage = $state(1);
</script>

<Pagination count={100} pageSize={10} bind:page={currentPage} />
```

| Prop           | Type                    | Default |
| -------------- | ----------------------- | ------- |
| `count`        | `number` **(required)** | —       |
| `pageSize`     | `number`                | `10`    |
| `siblingCount` | `number`                | `1`     |
| `page`         | `number`                | `1`     |
| `defaultPage`  | `number`                | —       |

---

### PinInput

One-time code entry with individual digit boxes.

```svelte
<script>
	import { PinInput } from 'horizon-design';

	let code = $state([]);
</script>

<PinInput label="Verification code" length={6} bind:value={code} />
```

| Prop              | Type                                          | Default     |
| ----------------- | --------------------------------------------- | ----------- |
| `label`           | `string`                                      | —           |
| `length`          | `number`                                      | `4`         |
| `placeholder`     | `string`                                      | `'○'`       |
| `type`            | `'numeric' \| 'alphabetic' \| 'alphanumeric'` | `'numeric'` |
| `value`           | `string[]`                                    | `[]`        |
| `onValueComplete` | `(details) => void`                           | —           |

---

### Popover

Floating content panel anchored to a trigger.

```svelte
<script>
	import { Popover } from 'horizon-design';
	import { Button } from 'horizon-design';

	let open = $state(false);
</script>

<Popover title="Info" bind:open>
	{#snippet trigger()}
		<Button variant="outline" size="icon-md">?</Button>
	{/snippet}
	<p>Helpful information here.</p>
</Popover>
```

| Prop           | Type      | Default |
| -------------- | --------- | ------- |
| `trigger`      | `Snippet` | —       |
| `triggerClass` | `string`  | `''`    |
| `title`        | `string`  | —       |
| `description`  | `string`  | —       |
| `footer`       | `Snippet` | —       |
| `contentClass` | `string`  | `''`    |
| `open`         | `boolean` | `false` |
| `defaultOpen`  | `boolean` | —       |

---

### Progress

Horizontal progress bar.

```svelte
<script>
	import { Progress } from 'horizon-design';

	let progress = $state(60);
</script>

<Progress label="Loading" bind:value={progress} />
<Progress value={null} /><!-- indeterminate -->
```

| Prop    | Type             | Default |
| ------- | ---------------- | ------- |
| `label` | `string`         | —       |
| `value` | `number \| null` | `0`     |
| `max`   | `number`         | `100`   |

---

### Prose

Rich text typography wrapper for rendered Markdown, CMS content, or long-form copy.

```svelte
<script>
	import { Prose } from 'horizon-design';
</script>

<Prose>
	<h2>Release notes</h2>
	<p>Use Prose to style headings, paragraphs, lists, quotes, and inline code.</p>
	<ul>
		<li>Consistent spacing</li>
		<li>Design-system colours</li>
	</ul>
</Prose>
```

---

### QrCode

Renders a QR code SVG for a given string value.

```svelte
<script>
	import { QrCode } from 'horizon-design';
</script>

<QrCode value="https://github.com" size={120} />
```

| Prop    | Type                    | Default |
| ------- | ----------------------- | ------- |
| `value` | `string` **(required)** | —       |
| `size`  | `number`                | `200`   |

---

### RadioGroup

A group of mutually exclusive radio buttons. Pass an `items` config array for a self-contained component, or use `children` for fully custom markup.

```svelte
<script>
	import { RadioGroup } from 'horizon-design';

	let plan = $state('pro');
</script>

<RadioGroup
	label="Subscription plan"
	bind:value={plan}
	items={[
		{ value: 'free', label: 'Free' },
		{ value: 'pro', label: 'Pro' },
		{ value: 'enterprise', label: 'Enterprise', disabled: true }
	]}
/>
```

Items can also use a `Snippet` for rich labels:

```svelte
{#snippet proLabel()}
	<span>Pro <Badge variant="info">Popular</Badge></span>
{/snippet}

<RadioGroup items={[{ value: 'pro', label: proLabel }]} />
```

| Prop           | Type                                                                | Default |
| -------------- | ------------------------------------------------------------------- | ------- |
| `label`        | `string`                                                            | —       |
| `items`        | `{ value: string; label: string \| Snippet; disabled?: boolean }[]` | —       |
| `value`        | `string`                                                            | `''`    |
| `defaultValue` | `string`                                                            | —       |
| `disabled`     | `boolean`                                                           | —       |
| `children`     | `Snippet`                                                           | —       |

---

### RatingGroup

Star rating input.

```svelte
<script>
	import { RatingGroup } from 'horizon-design';

	let rating = $state(3);
</script>

<RatingGroup label="Rate this" count={5} bind:value={rating} />
```

| Prop           | Type     | Default |
| -------------- | -------- | ------- |
| `label`        | `string` | —       |
| `count`        | `number` | `5`     |
| `defaultValue` | `number` | —       |
| `value`        | `number` | `0`     |

---

### ScrollArea

Thin custom scrollbars in a fixed-height container.

```svelte
<script>
	import { ScrollArea } from 'horizon-design';
</script>

<ScrollArea class="h-64">
	<p>Long content…</p>
</ScrollArea>
```

---

### SegmentGroup

Segmented button group (radio-style). Labels can be strings or Snippets.

```svelte
<script>
	import { SegmentGroup } from 'horizon-design';

	let view = $state('week');
</script>

<SegmentGroup
	items={[
		{ value: 'day', label: 'Day' },
		{ value: 'week', label: 'Week' },
		{ value: 'month', label: 'Month' }
	]}
	bind:value={view}
/>
```

The component uses `items-stretch` internally, so items always fill whatever height the root has. To control height, pass a height class: `class="h-9"` or `class="h-full"`.

| Prop           | Type                                                 | Default |
| -------------- | ---------------------------------------------------- | ------- |
| `items`        | `Array<{ value: string; label: string \| Snippet }>` | `[]`    |
| `value`        | `string`                                             | `''`    |
| `defaultValue` | `string`                                             | —       |

---

### Select

Styled accessible dropdown select.

```svelte
<script>
	import { Select } from 'horizon-design';

	const items = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' }
	];

	let selected = $state([]);
</script>

<Select {items} label="Fruit" bind:value={selected} placeholder="Pick a fruit…" />
```

| Prop           | Type                                                                         | Default              |
| -------------- | ---------------------------------------------------------------------------- | -------------------- |
| `items`        | `Array<{ label: string; value: string; disabled?: boolean }>` **(required)** | `[]`                 |
| `label`        | `string`                                                                     | —                    |
| `placeholder`  | `string`                                                                     | `'Select an option'` |
| `value`        | `string[]`                                                                   | `[]`                 |
| `defaultValue` | `string[]`                                                                   | —                    |
| `multiple`     | `boolean`                                                                    | `false`              |
| `disabled`     | `boolean`                                                                    | —                    |

---

### Separator

Horizontal or vertical dividing line.

```svelte
<script>
	import { Separator } from 'horizon-design';
</script>

<Separator />
<Separator orientation="vertical" class="h-6" />
```

| Prop          | Type                         | Default        |
| ------------- | ---------------------------- | -------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `decorative`  | `boolean`                    | `true`         |

---

### Sheet

Slide-in panel (alias of Drawer with configurable side).

```svelte
<script>
	import { Sheet } from 'horizon-design';
	import { Button } from 'horizon-design';
</script>

<Sheet title="Filters" side="right">
	{#snippet trigger()}
		<Button variant="outline">Open Filters</Button>
	{/snippet}
	<p>Filter content here.</p>
</Sheet>
```

| Prop           | Type                                     | Default   |
| -------------- | ---------------------------------------- | --------- |
| `trigger`      | `Snippet`                                | —         |
| `triggerClass` | `string`                                 | `''`      |
| `title`        | `string`                                 | —         |
| `description`  | `string`                                 | —         |
| `footer`       | `Snippet`                                | —         |
| `side`         | `'top' \| 'bottom' \| 'left' \| 'right'` | `'right'` |
| `showClose`    | `boolean`                                | `true`    |
| `open`         | `boolean`                                | `false`   |
| `defaultOpen`  | `boolean`                                | —         |

---

### Sidebar

Vertical navigation layout with header, grouped content, items, and footer.

```svelte
<script>
	import { Sidebar, SidebarSection, SidebarItem } from 'horizon-design';
</script>

<Sidebar>
	{#snippet header()}Workspace{/snippet}
	{#snippet footer()}<p>Signed in as Rayan</p>{/snippet}
	<SidebarSection label="General">
		<SidebarItem href="/" active>Overview</SidebarItem>
		<SidebarItem href="/settings">Settings</SidebarItem>
	</SidebarSection>
</Sidebar>
```

| `Sidebar` Prop | Type      | Default |
| -------------- | --------- | ------- |
| `collapsed`    | `boolean` | `false` |
| `header`       | `Snippet` | —       |
| `footer`       | `Snippet` | —       |

| `SidebarSection` Prop | Type     | Default |
| --------------------- | -------- | ------- |
| `label`               | `string` | `''`    |

| `SidebarItem` Prop | Type      | Default |
| ------------------ | --------- | ------- |
| `href`             | `string`  | `''`    |
| `active`           | `boolean` | `false` |

---

### SignaturePad

Freehand drawing canvas for signatures.

```svelte
<script>
	import { SignaturePad } from 'horizon-design';
</script>

<SignaturePad label="Draw your signature" onDrawEnd={(d) => console.log(d.paths)} />
```

| Prop        | Type                | Default |
| ----------- | ------------------- | ------- |
| `label`     | `string`            | —       |
| `onDrawEnd` | `(details) => void` | —       |

---

### Skeleton

Animated loading placeholder.

```svelte
<script>
	import { Skeleton } from 'horizon-design';
</script>

<Skeleton class="h-4 w-48" />
<Skeleton class="h-12 w-12 rounded-full" />
```

---

### SkipNav

Keyboard-only skip link for jumping directly to main page content.

```svelte
<script>
	import { SkipNav } from 'horizon-design';
</script>

<SkipNav href="#main-content">Skip to content</SkipNav>
```

| Prop   | Type     | Default           |
| ------ | -------- | ----------------- |
| `href` | `string` | `'#main-content'` |

---

### Slider

Range input with draggable thumb.

```svelte
<script>
	import { Slider } from 'horizon-design';

	let volume = $state([50]);
</script>

<Slider label="Volume" showValue min={0} max={100} bind:value={volume} />
```

| Prop           | Type                         | Default        |
| -------------- | ---------------------------- | -------------- |
| `label`        | `string`                     | —              |
| `showValue`    | `boolean`                    | `false`        |
| `min`          | `number`                     | `0`            |
| `max`          | `number`                     | `100`          |
| `step`         | `number`                     | `1`            |
| `value`        | `number[]`                   | `[0]`          |
| `defaultValue` | `number[]`                   | —              |
| `orientation`  | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `disabled`     | `boolean`                    | —              |

---

### Spinner

Animated loading indicator.

```svelte
<script>
	import { Spinner } from 'horizon-design';
</script>

<Spinner />
<Spinner class="size-8" aria-label="Uploading" />
```

---

### Splitter

Resizable split pane layout.

```svelte
<script>
	import { Splitter, SplitterPanel, SplitterResizeTrigger } from 'horizon-design';

	const panels = [{ id: 'a' }, { id: 'b' }];
</script>

<Splitter {panels} class="h-40 rounded-lg border">
	<SplitterPanel id="a">Panel A</SplitterPanel>
	<SplitterResizeTrigger id="a:b" />
	<SplitterPanel id="b">Panel B</SplitterPanel>
</Splitter>
```

| `Splitter` Prop | Type                                   | Default        |
| --------------- | -------------------------------------- | -------------- |
| `panels`        | `Array<{ id: string }>` **(required)** | —              |
| `orientation`   | `'horizontal' \| 'vertical'`           | `'horizontal'` |

---

### Status

Colour-coded presence dot.

```svelte
<script>
	import { Status } from 'horizon-design';
</script>

<Status variant="online" />
<Status variant="away" />
```

| Prop      | Type                                        | Default    |
| --------- | ------------------------------------------- | ---------- |
| `variant` | `'online' \| 'offline' \| 'away' \| 'busy'` | `'online'` |

---

### Steps

Multi-step wizard with progress indicators.

```svelte
<script>
	import { Steps } from 'horizon-design';
</script>

{#snippet step1()}
	<p>Fill in your profile details.</p>
{/snippet}
{#snippet step2()}
	<p>Configure your preferences.</p>
{/snippet}
{#snippet done()}
	<p>All done! 🎉</p>
{/snippet}

<Steps
	steps={[
		{ title: 'Profile', content: step1 },
		{ title: 'Preferences', content: step2 }
	]}
	completedContent={done}
/>
```

| Prop               | Type                                         | Default  |
| ------------------ | -------------------------------------------- | -------- |
| `steps`            | `Array<{ title: string; content: Snippet }>` | `[]`     |
| `step`             | `number` (bindable)                          | —        |
| `completedContent` | `Snippet`                                    | —        |
| `prevLabel`        | `string`                                     | `'Back'` |
| `nextLabel`        | `string`                                     | `'Next'` |

---

### Swap

Toggle between two rendered states with an animated transition. Both `on` and `off` are Snippets.

```svelte
<script>
	import { Swap } from 'horizon-design';
	import MingcuteSunLine from '~icons/mingcute/sun-line';
	import MingcuteMoonLine from '~icons/mingcute/moon-line';
</script>

{#snippet sunIcon()}<MingcuteSunLine class="size-6" />{/snippet}
{#snippet moonIcon()}<MingcuteMoonLine class="size-6" />{/snippet}

<button onclick={() => (dark = !dark)}>
	<Swap swap={dark} on={sunIcon} off={moonIcon} />
</button>
```

| Prop            | Type      | Default |
| --------------- | --------- | ------- |
| `swap`          | `boolean` | `false` |
| `on`            | `Snippet` | —       |
| `off`           | `Snippet` | —       |
| `lazyMount`     | `boolean` | `true`  |
| `unmountOnExit` | `boolean` | `true`  |

---

### Switch

Toggle switch.

```svelte
<script>
	import { Switch } from 'horizon-design';

	let notifications = $state(false);
</script>

<Switch label="Dark mode" />
<Switch label="Notifications" bind:checked={notifications} />
<Switch label="With content">
	{#snippet checkedContent()}<MyCheckIcon />{/snippet}
	{#snippet uncheckedContent()}<MyCloseIcon />{/snippet}
</Switch>
```

| Prop               | Type                           | Default     |
| ------------------ | ------------------------------ | ----------- |
| `size`             | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`      |
| `variant`          | `'default' \| 'secondary'`     | `'default'` |
| `label`            | `string`                       | —           |
| `checked`          | `boolean`                      | —           |
| `defaultChecked`   | `boolean`                      | —           |
| `disabled`         | `boolean`                      | —           |
| `checkedContent`   | `Snippet`                      | —           |
| `uncheckedContent` | `Snippet`                      | —           |

---

### Table

Data table from column config and row data. Row values can be strings or Snippets.

```svelte
<script>
	import { Table } from 'horizon-design';
</script>

<Table
	columns={[
		{ key: 'name', label: 'Name' },
		{ key: 'role', label: 'Role' },
		{ key: 'joined', label: 'Joined' }
	]}
	rows={[
		{ name: 'Alice', role: 'Admin', joined: 'Jan 2024' },
		{ name: 'Bob', role: 'Developer', joined: 'Mar 2024' }
	]}
/>
```

| Prop      | Type                                       | Default |
| --------- | ------------------------------------------ | ------- |
| `columns` | `Array<{ key: string; label: string }>`    | `[]`    |
| `rows`    | `Array<Record<string, string \| Snippet>>` | `[]`    |

---

### Tabs

Tabbed content sections. Each tab has a label (string or Snippet) and a content Snippet.

```svelte
<script>
	import { Tabs } from 'horizon-design';

	let activeTab = $state('overview');
</script>

{#snippet overview()}<p>Overview content.</p>{/snippet}
{#snippet settings()}<p>Settings content.</p>{/snippet}

<Tabs
	tabs={[
		{ value: 'overview', label: 'Overview', content: overview },
		{ value: 'settings', label: 'Settings', content: settings }
	]}
	bind:value={activeTab}
	defaultValue="overview"
/>
```

For the underline style:

```svelte
<Tabs {tabs} variant="underline" />
```

| Prop           | Type                                                                   | Default     |
| -------------- | ---------------------------------------------------------------------- | ----------- |
| `tabs`         | `Array<{ value: string; label: string \| Snippet; content: Snippet }>` | `[]`        |
| `variant`      | `'default' \| 'underline'`                                             | `'default'` |
| `value`        | `string`                                                               | —           |
| `defaultValue` | `string`                                                               | —           |

---

### Textarea

Multi-line text input.

```svelte
<script>
	import { Textarea } from 'horizon-design';
</script>

<Textarea placeholder="Write something…" rows={4} />
```

Accepts all HTML `<textarea>` attributes.

---

### ThemeSwitch

A three-position toggle (System / Dark / Light) with animated sliding thumb.

```svelte
<script>
	import { ThemeSwitch } from 'horizon-design';
</script>

<ThemeSwitch />
<ThemeSwitch size="lg" />
```

To enable theme switching, add an inline script to `app.html` to apply the stored theme before first paint (prevents flash):

```html
<!-- app.html, inside <head> -->
<script>
	(function () {
		var m = localStorage.getItem('horizon-theme');
		var dark =
			m === 'dark' || (m !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
		if (!dark) document.documentElement.classList.add('light');
	})();
</script>
```

Then initialize the theme store once in your root layout:

```svelte
<!-- src/routes/+layout.svelte -->
<script>
	import { onMount } from 'svelte';
	import { theme } from 'horizon-design';
	onMount(() => theme.init());
</script>
```

| Prop   | Type                           | Default |
| ------ | ------------------------------ | ------- |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`  |

---

### ThumbCard

Preview card with a thumbnail area and optional label link.

```svelte
<script>
	import { ThumbCard } from 'horizon-design';
</script>

<ThumbCard label="Component preview" href="/components">
	<img src="/preview.png" alt="" class="h-20 w-20 rounded-lg object-cover" />
</ThumbCard>
```

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `label` | `string` | `''`    |
| `href`  | `string` | `''`    |

---

### Timer

Countdown / stopwatch display with start, stop, and reset controls.

```svelte
<script>
	import { Timer } from 'horizon-design';
</script>

<Timer autoStart={true} />
```

| Prop        | Type      | Default |
| ----------- | --------- | ------- |
| `autoStart` | `boolean` | `false` |

---

### Toast

Transient notification messages.

```svelte
<script>
	import { Toaster, createToaster } from 'horizon-design';

	const toaster = createToaster({ placement: 'bottom-end' });

	function notify() {
		toaster.create({ title: 'Saved!', description: 'Changes were saved.', type: 'success' });
	}
</script>

<button onclick={notify}>Save</button>
<Toaster {toaster} />
```

`createToaster` options: `placement`, `max`, `duration`, `removeDelay`.

---

### Toggle

A pressable on/off button.

```svelte
<script>
	import { Toggle } from 'horizon-design';

	let bold = $state(false);
</script>

<Toggle bind:pressed={bold}>Bold</Toggle>
<Toggle variant="outline" size="sm">Italic</Toggle>
```

| Prop             | Type                     | Default     |
| ---------------- | ------------------------ | ----------- |
| `variant`        | `'default' \| 'outline'` | `'default'` |
| `size`           | `'sm' \| 'md' \| 'lg'`   | `'md'`      |
| `pressed`        | `boolean`                | `false`     |
| `defaultPressed` | `boolean`                | —           |

---

### ToggleGroup

A group of toggle buttons (multi-select or single-select). Each item content is a Snippet.

```svelte
<script>
	import { ToggleGroup } from 'horizon-design';
	import MingcuteBoldLine from '~icons/mingcute/bold-line';
	import MingcuteItalicLine from '~icons/mingcute/italic-line';

	let formatting = $state([]);
</script>

{#snippet boldIcon()}<MingcuteBoldLine class="size-4" />{/snippet}
{#snippet italicIcon()}<MingcuteItalicLine class="size-4" />{/snippet}

<ToggleGroup
	items={[
		{ value: 'bold', content: boldIcon },
		{ value: 'italic', content: italicIcon }
	]}
	bind:value={formatting}
/>
```

| Prop           | Type                                         | Default      |
| -------------- | -------------------------------------------- | ------------ |
| `items`        | `Array<{ value: string; content: Snippet }>` | `[]`         |
| `type`         | `'single' \| 'multiple'`                     | `'multiple'` |
| `value`        | `string[]`                                   | `[]`         |
| `defaultValue` | `string[]`                                   | —            |

---

### ToggleTooltip

A toggle button with an attached tooltip label.

```svelte
<script>
	import { ToggleTooltip } from 'horizon-design';
	import MingcuteBoldLine from '~icons/mingcute/bold-line';
</script>

<ToggleTooltip label="Bold">
	<MingcuteBoldLine class="size-4" />
</ToggleTooltip>
```

| Prop    | Type                    | Default |
| ------- | ----------------------- | ------- |
| `label` | `string` **(required)** | —       |

---

### Tooltip

Floating text hint on hover/focus.

```svelte
<script>
	import { Tooltip } from 'horizon-design';
	import { Button } from 'horizon-design';
</script>

<Tooltip content="Helpful text">
	<Button variant="ghost" size="icon-md">?</Button>
</Tooltip>
```

| Prop          | Type                               | Default                |
| ------------- | ---------------------------------- | ---------------------- |
| `content`     | `string \| Snippet` **(required)** | —                      |
| `openDelay`   | `number`                           | `200`                  |
| `closeDelay`  | `number`                           | `100`                  |
| `positioning` | `PositioningOptions`               | `{ placement: 'top' }` |

---

### Tour

Guided multi-step product tour with spotlight and step navigation.

```svelte
<script>
	import { Tour } from 'horizon-design';
	import { Button } from 'horizon-design';
</script>

{#snippet tourTrigger(start)}
	<Button onclick={start}>Start Tour</Button>
{/snippet}

<Tour
	trigger={tourTrigger}
	steps={[
		{
			id: 'step-1',
			type: 'dialog',
			title: 'Welcome',
			description: 'This is the first step.',
			actions: [{ label: 'Next', action: 'next' }]
		},
		{
			id: 'step-2',
			type: 'dialog',
			title: 'Done!',
			description: 'You finished the tour.',
			actions: [{ label: 'Finish', action: 'dismiss' }]
		}
	]}
/>
```

The `trigger` snippet receives a `start` function as its first argument — pass it to your button's `onclick` to avoid nested `<button>` elements.

| Prop           | Type                    | Default |
| -------------- | ----------------------- | ------- |
| `steps`        | `TourStepDetails[]`     | `[]`    |
| `trigger`      | `Snippet<[() => void]>` | —       |
| `showProgress` | `boolean`               | `true`  |
| `showClose`    | `boolean`               | `true`  |

---

### FileTree

File-explorer style tree. Folders (branches) are expand-only — clicking a folder row expands or collapses it but does not select it. Files (leaves) are selectable. Depth indentation is driven by a `--depth` CSS variable; no structural padding is added to containers.

```svelte
<script>
	import { FileTree, createTreeCollection } from 'horizon-design';

	const collection = createTreeCollection({
		nodeToValue: (n) => n.id,
		nodeToString: (n) => n.name,
		rootNode: {
			id: 'root',
			name: '',
			children: [
				{
					id: 'src',
					name: 'src',
					children: [
						{ id: 'app', name: 'app.ts' },
						{ id: 'index', name: 'index.ts' }
					]
				},
				{ id: 'package', name: 'package.json' }
			]
		}
	});

	let selectedValue = $state([]);
	let expandedValue = $state([]);
</script>

<FileTree {collection} bind:selectedValue bind:expandedValue />
```

| Prop                | Type                                      | Default                    |
| ------------------- | ----------------------------------------- | -------------------------- |
| `collection`        | `TreeCollection<TreeNode>` **(required)** | —                          |
| `icon`              | `Snippet<[node]>`                         | folder/file mingcute icons |
| `selectedValue`     | `string[]` (bindable)                     | `[]`                       |
| `expandedValue`     | `string[]` (bindable)                     | `[]`                       |
| `focusedValue`      | `string` (bindable)                       | —                          |
| `onSelectionChange` | `(details) => void`                       | —                          |
| `onExpandedChange`  | `(details) => void`                       | —                          |
| `onFocusChange`     | `(details) => void`                       | —                          |

**Custom icons**

The `icon` snippet receives the current node:

```svelte
{#snippet icon(node)}
	{#if node.children}
		<FolderIcon class="size-4" />
	{:else}
		<FileIcon class="size-4" />
	{/if}
{/snippet}

<FileTree {collection} {icon} />
```

Folder branches default to `mingcute:folder-2-line` / `mingcute:folder-open-line` (open/closed) and files to `mingcute:file-line`.

The following are re-exported from `horizon-design` for convenience: `createTreeCollection`, `createFileTreeCollection`, `TreeCollection`, `TreeNode`, `TreeCollectionOptions`, `FilePathTreeNode`.

---

### HierarchyView

Unity-style hierarchy panel. Accepts a plain nested object tree — no collection wrapper needed. Both branches and leaves are fully selectable. Clicking a row selects it; only the chevron button toggles expand/collapse. Supports multi-select (Shift-click), inline rename (double-click or F2), long-press drag-and-drop reordering, and keyboard-driven node movement. `onDataChange` fires whenever the tree is mutated by any interaction.

```svelte
<script>
	import { HierarchyView } from 'horizon-design';

	const data = [
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

	let selectedValue = $state([]);
	let expandedValue = $state([]);
</script>

<HierarchyView {data} bind:selectedValue bind:expandedValue />
```

| Prop                | Type                                             | Default                            |
| ------------------- | ------------------------------------------------ | ---------------------------------- |
| `data`              | `AnyNode[]` **(required)**                       | —                                  |
| `nodeToValue`       | `(node: AnyNode) => string`                      | uses `node.id` then `node.name`    |
| `nodeToString`      | `(node: AnyNode) => string`                      | uses `node.name` then `node.label` |
| `icon`              | `Snippet<[node]>`                                | `mingcute:file-line`               |
| `selectedValue`     | `string[]` (bindable)                            | `[]`                               |
| `expandedValue`     | `string[]` (bindable)                            | `[]`                               |
| `onSelectionChange` | `(details: { selectedValue: string[] }) => void` | —                                  |
| `onExpandedChange`  | `(details: { expandedValue: string[] }) => void` | —                                  |
| `onDataChange`      | `(data: AnyNode[]) => void`                      | —                                  |

`AnyNode` is a flexible shape: `{ id?, name?, label?, children?, [key: string]: unknown }`. Pass the top-level nodes directly — no root wrapper needed.

**Keyboard shortcuts**

| Key                    | Action                                          |
| ---------------------- | ----------------------------------------------- |
| `↑` / `↓`              | Move cursor                                     |
| `→`                    | Expand branch / move cursor into first child    |
| `←`                    | Collapse branch / move cursor to parent         |
| `Shift+↑` / `Shift+↓`  | Move focused node up / down within its siblings |
| `Shift+→` / `Shift+←`  | Indent / outdent focused node                   |
| `Enter` / `Space`      | Toggle selection                                |
| `F2`                   | Rename focused node                             |
| `Delete` / `Backspace` | Delete focused node and its subtree             |
| `Home` / `End`         | Jump to first / last visible node               |
| `Escape`               | Clear selection                                 |

All nodes default to `mingcute:file-line`. Supply an `icon` snippet to differentiate node types by shape.

---

### InspectorPanel

An accordion-style panel of cards with drag-to-reorder and full keyboard navigation. Each card has a title, an optional subtitle, and collapsible content rendered via a `content` snippet.

```svelte
<script>
	import { InspectorPanel } from 'horizon-design';

	let cards = $state([
		{ id: 'fill', title: 'Fill', subtitle: 'Solid' },
		{ id: 'stroke', title: 'Stroke', subtitle: '2px' },
		{ id: 'shadow', title: 'Shadow' }
	]);

	let expandedIds = $state(['fill']);
</script>

<InspectorPanel bind:cards bind:expandedIds>
	{#snippet content(card)}
		<p>Content for {card.title}</p>
	{/snippet}
</InspectorPanel>
```

| Prop               | Type                               | Default | Description                                |
| ------------------ | ---------------------------------- | ------- | ------------------------------------------ |
| `cards`            | `InspectorCard[]`                  | `[]`    | List of cards (bindable)                   |
| `expandedIds`      | `string[]`                         | `[]`    | IDs of currently expanded cards (bindable) |
| `content`          | `Snippet<[InspectorCard]>`         | —       | Snippet rendered inside each card body     |
| `onCardsChange`    | `(cards: InspectorCard[]) => void` | —       | Fired when card order changes              |
| `onExpandedChange` | `(ids: string[]) => void`          | —       | Fired when expanded state changes          |
| `class`            | `string`                           | `''`    | Extra classes on the root element          |

`InspectorCard` requires an `id: string` and `title: string`; any additional properties are passed through to the `content` snippet.

**Keyboard navigation** (focus the panel first): `↑`/`↓` move the cursor, `Enter`/`Space` toggle expansion, `Shift+↑`/`Shift+↓` reorder, `Home`/`End` jump to first/last, `Escape` clears the cursor. `Tab` moves focus into the expanded card's content (inputs, buttons, etc.); `Escape` from inside card content returns focus to the panel.

---

### HorizonLayout

A resizable, drag-to-reorder tabbed layout engine. Wrapper around [horizon-layout](https://github.com/horizon-engine/horizon-layout).

```svelte
<script>
	import HorizonLayout from '$lib/components/horizon-layout/HorizonLayout.svelte';
	import type { LayoutConfig, Id, View } from 'horizon-layout';
	import { SvelteMap } from 'svelte/reactivity';

	let config: LayoutConfig = $state({
		root: {/* ... */}
	});

	const views = new SvelteMap<Id, View>([['panel-a', { title: 'Panel A', snippet: mySnippetA }]]);
</script>

<HorizonLayout bind:config {views} />
```

| Prop               | Type                                     | Default |
| ------------------ | ---------------------------------------- | ------- |
| `config`           | `LayoutConfig` (bindable) **(required)** | —       |
| `views`            | `SvelteMap<Id, View>` **(required)**     | —       |
| `tabgroupControls` | `View[]`                                 | —       |
| `showSplitRatio`   | `boolean`                                | `false` |

---

## Utilities

### `theme`

The global theme store. Import it to read or change the active theme:

```ts
import { theme } from 'horizon-design';

theme.mode; // 'system' | 'dark' | 'light' — the stored preference
theme.resolved; // 'dark' | 'light' — the effective theme (resolves 'system' against OS preference)
theme.set('dark');
```

`theme.onChange(callback)` fires whenever the effective theme changes — either because `theme.set()` was called or because the OS preference changed while mode is `'system'`. Returns an unsubscribe function.

```ts
const off = theme.onChange((resolved, mode) => {
	console.log(resolved); // 'dark' | 'light'
	console.log(mode); // 'system' | 'dark' | 'light'
});

// later:
off();
```

| Member         | Type                                           | Description                                       |
| -------------- | ---------------------------------------------- | ------------------------------------------------- |
| `mode`         | `'system' \| 'dark' \| 'light'`                | Stored preference (`$state` — reactive in Svelte) |
| `resolved`     | `'dark' \| 'light'`                            | Effective theme (resolves `'system'`)             |
| `set(mode)`    | `(mode: ThemeMode) => void`                    | Change and persist the theme                      |
| `onChange(cb)` | `(cb: (resolved, mode) => void) => () => void` | Subscribe to theme changes; returns unsubscribe   |
| `init()`       | `() => void`                                   | Apply stored theme and listen for OS changes      |

---

### `cn(...inputs)`

Merges Tailwind class names (clsx + tailwind-merge).

```ts
import { cn } from 'horizon-design';

const cls = cn('px-4 py-2', { 'bg-primary': isActive });
```

---

### `createMonacoTheme()`

Returns a Monaco `IStandaloneThemeData` object built from the active Horizon CSS tokens. Call it after the DOM is ready (so CSS variables are resolved) and re-call when the theme switches.

```ts
import { createMonacoTheme } from 'horizon-design';
import * as monaco from 'monaco-editor';

monaco.editor.defineTheme('horizon', createMonacoTheme());
monaco.editor.setTheme('horizon');
```

To keep it in sync with the Horizon theme store:

```ts
import { theme, createMonacoTheme } from 'horizon-design';
import * as monaco from 'monaco-editor';

$effect(() => {
	void theme.mode;
	monaco.editor.defineTheme('horizon', createMonacoTheme());
	monaco.editor.setTheme('horizon');
});
```

---

## Theme Tokens

Override any token in your CSS:

```css
:root {
	--primary: oklch(0.7 0.2 300);
	--radius: 0.75rem;
}
```

| Token                  | Dark (default)                | Light (`.light`)              |
| ---------------------- | ----------------------------- | ----------------------------- |
| `--background`         | `oklch(0.09 0.02 264)`        | `oklch(0.96 0.01 264)`        |
| `--foreground`         | `oklch(0.89 0.02 255)`        | `oklch(0.13 0.02 264)`        |
| `--primary`            | `oklch(0.65 0.18 277)`        | `oklch(0.55 0.18 277)`        |
| `--primary-foreground` | `white`                       | `white`                       |
| `--secondary`          | `oklch(0.16 0.03 265)`        | `oklch(0.9 0.02 264)`         |
| `--muted`              | `oklch(0.16 0.03 265)`        | `oklch(0.92 0.015 264)`       |
| `--muted-foreground`   | `oklch(0.59 0.03 255)`        | `oklch(0.42 0.04 255)`        |
| `--accent`             | `oklch(0.22 0.05 266)`        | `oklch(0.88 0.025 264)`       |
| `--card`               | `oklch(0.13 0.02 264)`        | `white`                       |
| `--popover`            | `oklch(0.12 0.02 264 / 0.92)` | `oklch(0.98 0.01 264 / 0.95)` |
| `--border`             | `oklch(0.22 0.05 266)`        | `oklch(0.82 0.02 264)`        |
| `--input`              | `oklch(0.19 0.02 264)`        | `oklch(0.88 0.02 264)`        |
| `--ring`               | `oklch(0.65 0.18 277 / 0.55)` | `oklch(0.55 0.18 277 / 0.55)` |
| `--destructive`        | `oklch(0.6 0.22 25)`          | same                          |
| `--success`            | `oklch(0.65 0.18 142)`        | same                          |
| `--warning`            | `oklch(0.75 0.18 85)`         | same                          |
| `--info`               | `oklch(0.65 0.18 220)`        | same                          |
| `--radius`             | `0.5rem`                      | same                          |

---

## Fonts

Both fonts are self-hosted and bundled with the library CSS.

| Token         | Family                                                                  | Usage                         |
| ------------- | ----------------------------------------------------------------------- | ----------------------------- |
| `--font-sans` | [Encode Sans](https://fonts.google.com/specimen/Encode+Sans) (variable) | All UI text                   |
| `--font-mono` | [Lilex](https://github.com/mishamyrt/Lilex) (variable)                  | Code, `Kbd`, numeric displays |

`Encode Sans` is applied at `semi-expanded` stretch by default. Override either token in your CSS to swap in a different font:

```css
:root {
	--font-mono: 'Fira Code', monospace;
}
```
