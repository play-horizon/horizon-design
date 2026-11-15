<!--
@component
Docs: InputGroup. Live examples of the InputGroup component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Input } from '#lib/components/input/index.js';
	import { InputGroup, InputAddon } from '#lib/components/input-group/index.js';
	import MingcuteSearchLine from '~icons/mingcute/search-line';
</script>

<section id="input-group">
	<Card>
		<div class="space-y-4">
			<InputGroup>
				<InputAddon>https://</InputAddon>
				<Input placeholder="yoursite.com" aria-label="Website" />
			</InputGroup>
			<InputGroup>
				<Input placeholder="Search…" aria-label="Search" />
				<InputAddon><MingcuteSearchLine class="size-4" aria-hidden="true" /></InputAddon>
			</InputGroup>
		</div>
	</Card>
</section>
