<!--
@component
Docs: Popover. Live examples of the Popover component.
-->
<script lang="ts">
	import { buttonVariants } from '$lib/components/button';
	import { Card } from '$lib/components/card';
	import { Input } from '$lib/components/input';
	import { Popover } from '$lib/components/popover';
	import MingcuteLayout4Line from '~icons/mingcute/layout-4-line';
</script>

<section id="popover">
	<Card>
		<Popover
			title="Layer Dimensions"
			description="Configure width and height of the layer."
			triggerClass={buttonVariants({ variant: 'default' })}
		>
			{#snippet trigger()}
				<MingcuteLayout4Line class="size-4" aria-hidden="true" />
				Open Popover
			{/snippet}
			<div class="grid gap-2 py-2">
				<div class="grid grid-cols-3 items-center gap-4">
					<label for="popover-width" class="text-sm text-muted">Width</label>
					<Input id="popover-width" class="col-span-2 h-8" value="100px" />
				</div>
				<div class="grid grid-cols-3 items-center gap-4">
					<label for="popover-height" class="text-sm text-muted">Height</label>
					<Input id="popover-height" class="col-span-2 h-8" value="auto" />
				</div>
			</div>
		</Popover>
	</Card>
</section>
