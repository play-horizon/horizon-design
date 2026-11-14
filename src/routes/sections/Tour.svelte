<!--
@component
Docs: Tour. Live examples of the Tour component.
-->
<script lang="ts">
	import { Button } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { Tour } from '#lib/components/tour/index.js';
</script>

<section id="tour">
	<Card>
		<div class="flex flex-col gap-3">
			<p class="text-sm text-muted">A guided product tour with spotlight and step navigation.</p>
			{#snippet tourTrigger(start: () => void)}
				<Button onclick={start}>Start Tour</Button>
			{/snippet}
			<Tour
				closeLabel="Close"
				progressText={({ current, total }) => `${current + 1} of ${total}`}
				trigger={tourTrigger}
				steps={[
					{
						id: 'step-1',
						type: 'dialog',
						title: 'Welcome',
						description: 'This is the first step of the tour.',
						actions: [{ label: 'Next', action: 'next' }]
					},
					{
						id: 'step-2',
						type: 'dialog',
						title: 'Step 2',
						description: 'Keep going, you are doing great!',
						actions: [
							{ label: 'Back', action: 'prev' },
							{ label: 'Next', action: 'next' }
						]
					},
					{
						id: 'step-3',
						type: 'dialog',
						title: 'Done!',
						description: 'You have completed the tour.',
						actions: [{ label: 'Finish', action: 'dismiss' }]
					}
				]}
			/>
		</div>
	</Card>
</section>
