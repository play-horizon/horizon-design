<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Checkbox } from '$lib/components/checkbox';
</script>

<section id="checkbox">
	<p class="section-tag">Forms</p>
	<h2 class="mb-6 text-2xl font-bold">Checkbox</h2>
	<Card>
		<div class="space-y-2">
			<Checkbox defaultChecked label="Accept terms and conditions" />
			<Checkbox label="Subscribe to newsletter" />
			<Checkbox disabled label="Disabled option" />
		</div>
	</Card>
</section>
