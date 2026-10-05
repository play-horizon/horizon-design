<script lang="ts">
	import { Button } from '$lib/components/button';
	import { Card } from '$lib/components/card';
	import { Tour } from '$lib/components/tour';
</script>

<section id="tour">
	<p class="section-tag">Overlays</p>
	<h2 class="mb-6 text-2xl font-bold">Tour</h2>
	<Card>
		<div class="flex flex-col gap-3">
			<p class="text-muted-foreground text-sm">
				A guided product tour with spotlight and step navigation.
			</p>
			{#snippet tourTrigger(start: () => void)}
				<Button onclick={start}>Start Tour</Button>
			{/snippet}
			<Tour
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
