<script lang="ts">
	import { Card } from '$lib/components/card';
	import { NativeSelect } from '$lib/components/native-select';
</script>

<section id="native-select">
	<p class="section-tag">Forms</p>
	<h2 class="mb-6 text-2xl font-bold">Native Select</h2>
	<Card>
		<div>
			<NativeSelect>
				<option value="">Choose framework…</option>
				<option value="svelte">Svelte</option>
				<option value="react">React</option>
				<option value="vue">Vue</option>
			</NativeSelect>
		</div>
	</Card>
</section>
