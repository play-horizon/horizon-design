<script lang="ts">
	import { Breadcrumb } from '$lib/components/breadcrumb';
	import { Card } from '$lib/components/card';
</script>

<section id="breadcrumb">
	<p class="section-tag">Navigation</p>
	<h2 class="mb-6 text-2xl font-bold">Breadcrumb</h2>
	<Card>
		<div>
			<Breadcrumb
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Components', href: '/components' },
					{ label: 'Breadcrumb' }
				]}
			/>
		</div>
	</Card>
</section>
