<!--
@component
Docs: Steps. A playground over the flow (two to five steps, linear or free, the back and next
labels, the completed content), then a three-step sign-up whose current step is bound, and the
flow once every step is done.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Steps } from '#lib/components/steps/index.js';
	import Playground from '../playground/Playground.svelte';
	import { boolean, number, text } from '../playground/controls';

	const titles = ['Account', 'Profile', 'Game', 'Friends', 'Review'];

	let step = $state(0);
</script>

{#snippet accountContent()}
	<p class="py-4 text-sm text-muted">Fill in your account details to get started.</p>
{/snippet}
{#snippet profileContent()}
	<p class="py-4 text-sm text-muted">Complete your profile information.</p>
{/snippet}
{#snippet reviewContent()}
	<p class="py-4 text-sm text-muted">Review and confirm your information.</p>
{/snippet}
{#snippet completed()}
	<p class="py-4 text-sm text-success">All steps completed!</p>
{/snippet}
{#snippet stepContent()}
	<p class="py-4 text-sm text-muted">The content of the current step.</p>
{/snippet}

<div class="grid gap-4">
	<Playground
		description="In a linear flow, a step is reached only through the ones before it."
		controls={{
			count: number(3, { min: 2, max: 5 }),
			linear: boolean(),
			prevLabel: text('Back'),
			nextLabel: text('Next'),
			completedContent: boolean(true)
		}}
	>
		{#snippet example(values)}
			<Steps
				class="w-full"
				linear={values.linear}
				prevLabel={values.prevLabel}
				nextLabel={values.nextLabel}
				completedContent={values.completedContent ? completed : undefined}
				steps={titles
					.slice(0, values.count)
					.map((title) => ({ id: title.toLowerCase(), title, content: stepContent }))}
			/>
		{/snippet}
	</Playground>
	<Card title="Sign-up" description="step binds the current step.">
		<Steps
			bind:step
			completedContent={completed}
			prevLabel="Back"
			nextLabel="Next"
			steps={[
				{ id: 'account', title: 'Account', content: accountContent },
				{ id: 'profile', title: 'Profile', content: profileContent },
				{ id: 'review', title: 'Review', content: reviewContent }
			]}
		/>
		<p class="mt-3 text-xs text-muted">Current step: {step}</p>
	</Card>
	<Card title="Completed" description="Once every step is done, step equals the step count.">
		<Steps
			step={3}
			completedContent={completed}
			prevLabel="Back"
			nextLabel="Next"
			steps={[
				{ id: 'account', title: 'Account', content: accountContent },
				{ id: 'profile', title: 'Profile', content: profileContent },
				{ id: 'review', title: 'Review', content: reviewContent }
			]}
		/>
	</Card>
</div>
