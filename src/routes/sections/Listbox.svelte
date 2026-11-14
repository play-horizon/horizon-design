<!--
@component
Docs: Listbox. Live examples of the Listbox component.
-->
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
	<Card>
		<div>
			<Listbox items={comboboxItems} label="Choose a framework" />
		</div>
	</Card>
</section>
