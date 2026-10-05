<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Input } from '$lib/components/input';
	import { InputGroup, InputAddon } from '$lib/components/input-group';
	import MingcuteSearchLine from '~icons/mingcute/search-line';
</script>

<section id="input-group">
	<p class="section-tag">Forms</p>
	<h2 class="mb-6 text-2xl font-bold">Input Group</h2>
	<Card>
		<div class="space-y-4">
			<InputGroup>
				<InputAddon>https://</InputAddon>
				<Input placeholder="yoursite.com" />
			</InputGroup>
			<InputGroup>
				<Input placeholder="Search…" />
				<InputAddon><MingcuteSearchLine class="size-4" /></InputAddon>
			</InputGroup>
		</div>
	</Card>
</section>
