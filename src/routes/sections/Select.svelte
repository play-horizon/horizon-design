<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Select } from '$lib/components/select';

	const selectItems = [
		{ label: 'Svelte', value: 'svelte' },
		{ label: 'React', value: 'react' },
		{ label: 'Vue', value: 'vue' },
		{ label: 'Solid', value: 'solid' }
	];
</script>

<section id="select">
	<p class="section-tag">Forms</p>
	<h2 class="mb-6 text-2xl font-bold">Select</h2>
	<Card>
		<Select items={selectItems} label="Framework" placeholder="Choose a framework…" />
	</Card>
</section>
