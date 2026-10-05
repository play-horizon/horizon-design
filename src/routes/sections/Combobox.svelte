<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Combobox } from '$lib/components/combobox';

	const comboboxItems = [
		{ label: 'Svelte', value: 'svelte' },
		{ label: 'React', value: 'react' },
		{ label: 'Vue', value: 'vue' },
		{ label: 'Solid', value: 'solid' },
		{ label: 'Angular', value: 'angular' }
	];
</script>

<section id="combobox">
	<p class="section-tag">Forms</p>
	<h2 class="mb-6 text-2xl font-bold">Combobox</h2>
	<Card>
		<div>
			<Combobox items={comboboxItems} label="Framework" placeholder="Search frameworks…" />
		</div>
	</Card>
</section>
