<script lang="ts">
	import { Button } from '$lib/components/button';
	import { ButtonGroup } from '$lib/components/button-group';
	import { Card } from '$lib/components/card';
</script>

<section id="button-group">
	<p class="section-tag">Actions</p>
	<h2 class="mb-6 text-2xl font-bold">Button Group</h2>
	<Card>
		<div>
			<ButtonGroup>
				<Button variant="outline" size="sm">Cut</Button>
				<Button variant="outline" size="sm">Copy</Button>
				<Button variant="outline" size="sm">Paste</Button>
			</ButtonGroup>
		</div>
	</Card>
</section>
