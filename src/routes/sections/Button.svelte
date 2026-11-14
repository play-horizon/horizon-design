<!--
@component
Docs: Button. Every variant and size, icon-only buttons, a link styled as a button, and the
loading and disabled states.
-->
<script lang="ts">
	import { Button, buttonVariants } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import MingcuteAddLine from '~icons/mingcute/add-line';
	import MingcutePlayFill from '~icons/mingcute/play-fill';
	import MingcuteSearchLine from '~icons/mingcute/search-line';
	import MingcuteMore1Line from '~icons/mingcute/more-1-line';
	import MingcuteDelete2Line from '~icons/mingcute/delete-2-line';

	let loading = $state(false);

	function load() {
		loading = true;
		setTimeout(() => (loading = false), 1500);
	}
</script>

<div class="grid gap-4">
	<Card title="Variants" description="Primary is for the one main action of a screen.">
		<div class="flex flex-wrap items-center gap-2">
			<Button variant="primary"><MingcutePlayFill aria-hidden="true" />Play</Button>
			<Button>Play privately</Button>
			<Button variant="tint"><MingcuteAddLine aria-hidden="true" />New game</Button>
			<Button variant="ghost">Cancel</Button>
			<Button variant="danger"><MingcuteDelete2Line aria-hidden="true" />Delete</Button>
			<Button variant="danger-solid">Delete game</Button>
			<Button variant="link">Profile</Button>
		</div>
	</Card>
	<Card title="Sizes">
		<div class="flex flex-wrap items-center gap-2">
			<Button size="xs">Extra small</Button>
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg" variant="primary"><MingcutePlayFill aria-hidden="true" />Large</Button>
		</div>
	</Card>
	<Card title="Icon buttons" description="An icon-only button needs an aria-label.">
		<div class="flex flex-wrap items-center gap-2">
			<Button size="icon-xs" variant="ghost" aria-label="Search"
				><MingcuteSearchLine aria-hidden="true" /></Button
			>
			<Button size="icon-sm" aria-label="More"><MingcuteMore1Line aria-hidden="true" /></Button>
			<Button size="icon-md" variant="tint" aria-label="Add"
				><MingcuteAddLine aria-hidden="true" /></Button
			>
			<Button size="icon-lg" variant="primary" aria-label="Play"
				><MingcutePlayFill aria-hidden="true" /></Button
			>
		</div>
	</Card>
	<Card title="States and links">
		<div class="flex flex-wrap items-center gap-2">
			<Button {loading} onclick={load}>Publish</Button>
			<Button disabled>Disabled</Button>
			<Button pill>Pill</Button>
			<a href="#top" class={buttonVariants({ variant: 'primary', size: 'sm' })}>A link</a>
		</div>
	</Card>
</div>
