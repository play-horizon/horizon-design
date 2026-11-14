<!--
@component
Docs: NativeSelect. Live examples of the NativeSelect component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { NativeSelect } from '#lib/components/native-select/index.js';
</script>

<section id="native-select">
	<Card>
		<div>
			<NativeSelect aria-label="Framework">
				<option value="">Choose framework…</option>
				<option value="svelte">Svelte</option>
				<option value="react">React</option>
				<option value="vue">Vue</option>
			</NativeSelect>
		</div>
	</Card>
</section>
