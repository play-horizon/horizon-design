<!--
@component
Docs: Textarea. Live examples of the Textarea component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Field } from '#lib/components/field/index.js';
	import { Textarea } from '#lib/components/textarea/index.js';
</script>

<section id="textarea">
	<Card>
		<div>
			<Field label="Message">
				<Textarea placeholder="Type your message here…" rows={3} />
			</Field>
		</div>
	</Card>
</section>
