<!--
@component
Docs: Drawer. Live examples of the Drawer component.
-->
<script lang="ts">
	import { Button, buttonVariants } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { Drawer, DrawerClose } from '#lib/components/drawer/index.js';
	import MingcuteRightLine from '~icons/mingcute/right-line';
</script>

<section id="drawer">
	<Card>
		<Drawer
			closeLabel="Close"
			title="Drawer Panel"
			description="This drawer slides in from the right."
			triggerClass={buttonVariants({ variant: 'default' })}
		>
			{#snippet trigger()}
				<MingcuteRightLine class="size-4" aria-hidden="true" />
				Open Drawer
			{/snippet}
			<p class="text-sm text-muted">
				Drawer content goes here. Use it for settings, filters, or secondary views.
			</p>
			{#snippet footer()}
				<DrawerClose class={buttonVariants({ variant: 'default' })}>Close</DrawerClose>
				<Button>Save</Button>
			{/snippet}
		</Drawer>
	</Card>
</section>
