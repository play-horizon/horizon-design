<!--
@component
Docs: Announcement. Live examples of the Announcement component.
-->
<script lang="ts">
	import { Announcement } from '#lib/components/announcement/index.js';
	import { Card } from '#lib/components/card/index.js';
	import MingcuteLightningLine from '~icons/mingcute/lightning-line';
</script>

<section id="announcement">
	<Card>
		<div>
			<Announcement>
				<MingcuteLightningLine class="size-3.5" aria-hidden="true" />
				New: 78 components available
			</Announcement>
		</div>
	</Card>
</section>
