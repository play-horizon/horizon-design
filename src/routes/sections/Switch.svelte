<!--
@component
Docs: Switch. Live examples of the Switch component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Switch } from '#lib/components/switch/index.js';
	import MingcuteCheckFill from '~icons/mingcute/check-fill';
	import MingcuteCloseFill from '~icons/mingcute/close-fill';
</script>

<section id="switch">
	<Card>
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
			<p class="text-xs font-medium tracking-wide text-muted uppercase">Secondary</p>
			<Switch variant="secondary" defaultChecked={true} label="label" />
			<Switch label="With icon" variant="secondary">
				{#snippet checkedContent()}<MingcuteCheckFill class="size-3" />{/snippet}
				{#snippet uncheckedContent()}<MingcuteCloseFill class="size-3" />{/snippet}
			</Switch>
			<Switch variant="secondary" disabled label="Disabled switch" />
			<Switch variant="secondary" disabled label="Checked Disabled switch" checked />
		</div>
		<div class="mt-4 space-y-3">
			<p class="text-xs font-medium tracking-wide text-muted uppercase">Sizes</p>
			<Switch size="sm" label="Small" />
			<Switch size="md" label="Medium" />
			<Switch size="lg" label="Large" />
			<Switch size="xl" defaultChecked={true} label="Extra Large" />
		</div>
	</Card>
</section>
