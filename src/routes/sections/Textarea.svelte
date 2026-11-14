<!--
@component
Docs: Textarea. Live examples of the Textarea component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Field } from '$lib/components/field';
	import { Textarea } from '$lib/components/textarea';
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
