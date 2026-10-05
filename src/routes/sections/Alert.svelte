<script lang="ts">
	import { Alert } from '$lib/components/alert';
	import { Card } from '$lib/components/card';
</script>

<section id="alert">
	<p class="section-tag">Feedback</p>
	<h2 class="mb-6 text-2xl font-bold">Alert</h2>
	<Card>
		<div class="space-y-3">
			<Alert title="Default Alert" description="This is a default informational alert message." />
			<Alert variant="info" title="Info Alert" description="Saving your changes." />
			<Alert
				variant="success"
				title="Success!"
				description="Your changes have been saved successfully."
			/>
			<Alert
				variant="warning"
				title="Warning"
				description="Please review your configuration before proceeding."
			/>
			<Alert variant="error" title="Error" description="Something went wrong. Please try again." />
		</div>
	</Card>
</section>
