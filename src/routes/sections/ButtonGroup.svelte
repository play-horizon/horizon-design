<!--
@component
Docs: ButtonGroup. Live examples of the ButtonGroup component.
-->
<script lang="ts">
	import { Button } from '#lib/components/button/index.js';
	import { ButtonGroup } from '#lib/components/button-group/index.js';
	import { Card } from '#lib/components/card/index.js';
</script>

<section id="button-group">
	<Card>
		<div>
			<ButtonGroup>
				<Button variant="default" size="sm">Cut</Button>
				<Button variant="default" size="sm">Copy</Button>
				<Button variant="default" size="sm">Paste</Button>
			</ButtonGroup>
		</div>
	</Card>
</section>
