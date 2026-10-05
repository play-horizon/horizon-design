<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/button';
	import { Card } from '$lib/components/card';
	import { Drawer, DrawerClose } from '$lib/components/drawer';
	import MingcuteRightLine from '~icons/mingcute/right-line';
</script>

<section id="drawer">
	<p class="section-tag">Overlays</p>
	<h2 class="mb-6 text-2xl font-bold">Drawer</h2>
	<Card>
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
