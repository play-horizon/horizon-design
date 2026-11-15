<!--
@component
Docs: Select. Live examples of the Select component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Select } from '#lib/components/select/index.js';

	const selectItems = [
		{ label: 'Svelte', value: 'svelte' },
		{ label: 'React', value: 'react' },
		{ label: 'Vue', value: 'vue' },
		{ label: 'Solid', value: 'solid' }
	];
</script>

<section id="select">
	<Card>
		<Select items={selectItems} label="Framework" placeholder="Choose a framework…" />
	</Card>
</section>
