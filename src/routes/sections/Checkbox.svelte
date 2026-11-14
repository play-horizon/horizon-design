<!--
@component
Docs: Checkbox. Live examples of the Checkbox component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Checkbox } from '#lib/components/checkbox/index.js';
</script>

<section id="checkbox">
	<Card>
		<div class="space-y-2">
			<Checkbox defaultChecked label="Accept terms and conditions" />
			<Checkbox label="Subscribe to newsletter" />
			<Checkbox checked="indeterminate" label="Some games selected" />
			<Checkbox disabled label="Disabled option" />
		</div>
	</Card>
</section>
