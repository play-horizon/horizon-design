<!--
@component
Docs: Clipboard. Live examples of the Clipboard component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Clipboard } from '$lib/components/clipboard';
</script>

<section id="clipboard">
	<Card>
		<div class="space-y-4">
			<Clipboard
				value="npm install horizon-design"
				label="Install command"
				translations={{ triggerLabel: (copied) => (copied ? 'Copied' : 'Copy') }}
			/>
		</div>
	</Card>
</section>
