<!--
@component
Docs: Editable. Live examples of the Editable component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Editable } from '$lib/components/editable';
</script>

<section id="editable">
	<Card>
		<div>
			<Editable label="Display Name" defaultValue="Click me to edit" />
		</div>
	</Card>
</section>
