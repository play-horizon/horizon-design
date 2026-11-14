<!--
@component
Docs: ActionBar. Live examples of the ActionBar component.
-->
<script lang="ts">
	import { ActionBar, ActionBarSeparator } from '#lib/components/action-bar/index.js';
	import { Button } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import MingcuteArchiveLine from '~icons/mingcute/archive-line';
	import MingcuteCopy2Line from '~icons/mingcute/copy-2-line';
	import MingcuteDelete2Line from '~icons/mingcute/delete-2-line';
</script>

<section id="action-bar">
	<Card>
		<div class="flex min-h-28 items-center justify-center">
			<ActionBar class="relative bottom-auto left-auto z-0 translate-x-0">
				<Button variant="ghost" size="icon-sm" aria-label="Archive">
					<MingcuteArchiveLine class="size-4" aria-hidden="true" />
				</Button>
				<Button variant="ghost" size="icon-sm" aria-label="Copy">
					<MingcuteCopy2Line class="size-4" aria-hidden="true" />
				</Button>
				<ActionBarSeparator />
				<Button variant="ghost" size="icon-sm" aria-label="Delete">
					<MingcuteDelete2Line class="size-4" aria-hidden="true" />
				</Button>
			</ActionBar>
		</div>
	</Card>
</section>
