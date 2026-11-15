<!--
@component
Docs: NumberInput. Live examples of the NumberInput component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { NumberInput } from '#lib/components/number-input/index.js';
</script>

<section id="number-input">
	<Card>
		<div>
			<div class="max-w-xs">
				<NumberInput
					min={0}
					max={100}
					defaultValue="5"
					label="Quantity"
					translations={{
						incrementLabel: 'Increase',
						decrementLabel: 'Decrease',
						roleDescription: 'number field'
					}}
				/>
			</div>
		</div>
	</Card>
</section>
