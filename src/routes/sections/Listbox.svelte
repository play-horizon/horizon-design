<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Listbox } from '$lib/components/listbox';

	const comboboxItems = [
		{ label: 'Svelte', value: 'svelte' },
		{ label: 'React', value: 'react' },
		{ label: 'Vue', value: 'vue' },
		{ label: 'Solid', value: 'solid' },
		{ label: 'Angular', value: 'angular' }
	];
</script>

<section id="listbox">
	<p class="section-tag">Forms</p>
	<h2 class="mb-6 text-2xl font-bold">Listbox</h2>
	<Card>
		<div>
			<Listbox items={comboboxItems} label="Choose a framework" />
		</div>
	</Card>
</section>
