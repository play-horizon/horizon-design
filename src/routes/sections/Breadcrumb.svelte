<!--
@component
Docs: Breadcrumb. Live examples of the Breadcrumb component.
-->
<script lang="ts">
	import { resolve } from '$app/paths';
	import { Breadcrumb } from '$lib/components/breadcrumb';
	import { Card } from '$lib/components/card';
</script>

<section id="breadcrumb">
	<Card>
		<div>
			<Breadcrumb
				label="Breadcrumb"
				items={[
					{ label: 'Foundations', href: resolve('/') },
					{ label: 'Navigation', href: resolve('/[section]', { section: 'tabs' }) },
					{ label: 'Breadcrumb' }
				]}
			/>
		</div>
	</Card>
</section>
