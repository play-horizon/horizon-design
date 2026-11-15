<!--
@component
Docs: Steps. Live examples of the Steps component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Steps } from '#lib/components/steps/index.js';

	let stepsStep = $state(0);
</script>

<section id="steps">
	<Card>
		<div>
			{#snippet stepsAccount()}
				<p class="py-4 text-sm text-muted">Fill in your account details to get started.</p>
			{/snippet}
			{#snippet stepsProfile()}
				<p class="py-4 text-sm text-muted">Complete your profile information.</p>
			{/snippet}
			{#snippet stepsReview()}
				<p class="py-4 text-sm text-muted">Review and confirm your information.</p>
			{/snippet}
			{#snippet stepsCompleted()}
				<p class="py-4 text-sm text-success">All steps completed!</p>
			{/snippet}
			<Steps
				bind:step={stepsStep}
				completedContent={stepsCompleted}
				prevLabel="Back"
				nextLabel="Next"
				steps={[
					{ id: 'account', title: 'Account', content: stepsAccount },
					{ id: 'profile', title: 'Profile', content: stepsProfile },
					{ id: 'review', title: 'Review', content: stepsReview }
				]}
			/>
		</div>
	</Card>
</section>
