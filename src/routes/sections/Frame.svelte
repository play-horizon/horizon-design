<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Frame } from '$lib/components/frame';
</script>

<section id="frame">
	<p class="section-tag">Layout</p>
	<h2 class="mb-6 text-2xl font-bold">Frame</h2>
	<Card>
		<div>
			<Frame title="my-app.svelte" class="h-32">
				<div class="text-muted-foreground p-4 font-mono text-xs">
					<span class="text-primary">&lt;script&gt;</span><br />
					&nbsp;&nbsp;let count = $state(0);<br />
					<span class="text-primary">&lt;/script&gt;</span>
				</div>
			</Frame>
		</div>
	</Card>
</section>
