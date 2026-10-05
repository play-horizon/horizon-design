<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Steps } from '$lib/components/steps';

	let stepsStep = $state(0);
</script>

<section id="steps">
	<p class="section-tag">Navigation</p>
	<h2 class="mb-6 text-2xl font-bold">Steps</h2>
	<Card>
		<div>
			{#snippet stepsAccount()}
				<p class="text-muted-foreground py-4 text-sm">
					Fill in your account details to get started.
				</p>
			{/snippet}
			{#snippet stepsProfile()}
				<p class="text-muted-foreground py-4 text-sm">Complete your profile information.</p>
			{/snippet}
			{#snippet stepsReview()}
				<p class="text-muted-foreground py-4 text-sm">Review and confirm your information.</p>
			{/snippet}
			{#snippet stepsCompleted()}
				<p class="text-success py-4 text-sm">All steps completed!</p>
			{/snippet}
			<Steps
				bind:step={stepsStep}
				completedContent={stepsCompleted}
				steps={[
					{ title: 'Account', content: stepsAccount },
					{ title: 'Profile', content: stepsProfile },
					{ title: 'Review', content: stepsReview }
				]}
			/>
		</div>
	</Card>
</section>
