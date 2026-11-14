<!--
@component
Docs: Combobox. Live examples of the Combobox component.
-->
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
	<Card>
		<div>
			<Combobox
				items={comboboxItems}
				label="Framework"
				placeholder="Search frameworks…"
				emptyText="No results found."
			/>
		</div>
	</Card>
</section>
