<!--
@component
Docs: Frame. Live examples of the Frame component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Frame } from '#lib/components/frame/index.js';
</script>

<section id="frame">
	<Card>
		<div>
			<Frame title="my-app.svelte" class="h-32">
				<div class="p-4 font-mono text-xs text-muted">
					<span class="text-primary">&lt;script&gt;</span><br />
					&nbsp;&nbsp;let count = $state(0);<br />
					<span class="text-primary">&lt;/script&gt;</span>
				</div>
			</Frame>
		</div>
	</Card>
</section>
