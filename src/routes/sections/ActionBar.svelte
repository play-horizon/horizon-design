<script lang="ts">
	import { ActionBar, ActionBarSeparator } from '$lib/components/action-bar';
	import { Button } from '$lib/components/button';
	import { Card } from '$lib/components/card';
	import MingcuteArchiveLine from '~icons/mingcute/archive-line';
	import MingcuteCopy2Line from '~icons/mingcute/copy-2-line';
	import MingcuteDelete2Line from '~icons/mingcute/delete-2-line';
</script>

<section id="action-bar">
	<p class="section-tag">Actions</p>
	<h2 class="mb-6 text-2xl font-bold">Action Bar</h2>
	<Card>
		<div class="flex min-h-28 items-center justify-center">
			<ActionBar class="relative bottom-auto left-auto z-0 translate-x-0">
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
		</div>
	</Card>
</section>
