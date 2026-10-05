<script lang="ts">
	import { buttonVariants } from '$lib/components/button';
	import { Card } from '$lib/components/card';
	import { Input } from '$lib/components/input';
	import { Popover } from '$lib/components/popover';
	import MingcuteLayout4Line from '~icons/mingcute/layout-4-line';
</script>

<section id="popover">
	<p class="section-tag">Overlays</p>
	<h2 class="mb-6 text-2xl font-bold">Popover</h2>
	<Card>
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
