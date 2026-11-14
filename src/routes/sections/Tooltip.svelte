<!--
@component
Docs: Tooltip. A tooltip on its own trigger button, and one on an icon button of the app's.
-->
<script lang="ts">
	import { buttonVariants } from '$lib/components/button';
	import { Card } from '$lib/components/card';
	import { Tooltip } from '$lib/components/tooltip';
	import MingcuteInformationLine from '~icons/mingcute/information-line';
	import MingcuteSettings3Line from '~icons/mingcute/settings-3-line';
</script>

<section id="tooltip">
	<Card>
		<div class="flex items-center gap-3">
			<Tooltip
				content="Tooltips provide helpful context on hover."
				triggerClass={buttonVariants({ variant: 'default' })}
			>
				<MingcuteInformationLine class="size-4" aria-hidden="true" />
				Hover Tooltip
			</Tooltip>
			<Tooltip content="Settings">
				{#snippet trigger(props)}
					<button
						{...props}
						type="button"
						aria-label="Settings"
						class={buttonVariants({ variant: 'ghost', size: 'icon-md' })}
					>
						<MingcuteSettings3Line aria-hidden="true" />
					</button>
				{/snippet}
			</Tooltip>
		</div>
	</Card>
</section>
