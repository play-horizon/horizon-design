<!--
@component
Docs: ColorPicker. Live examples of the ColorPicker component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { ColorPicker, parseColor } from '#lib/components/color-picker/index.js';
</script>

<section id="color-picker">
	<Card>
		<div>
			<!-- A colour picker's values are content (a material's colour), not interface colours. -->
			<ColorPicker
				label="Material colour"
				labels={{
					trigger: 'Choose a colour',
					area: 'Saturation and brightness',
					areaRoleDescription: '2D slider',
					areaValue: (saturation, brightness) =>
						`Saturation ${saturation}, brightness ${brightness}`,
					hue: 'Hue',
					hueValue: (hue) => `${hue} degrees`,
					alpha: 'Opacity',
					alphaValue: (alpha) => `${Math.round(alpha * 100)}%`,
					hex: 'Hex',
					swatch: (color) => `Use ${color}`
				}}
				value={parseColor('#737efa')}
				swatches={[
					'#ef4444',
					'#f97316',
					'#eab308',
					'#22c55e',
					'#3b82f6',
					'#8b5cf6',
					'#ffffff',
					'#000000'
				]}
			/>
		</div>
	</Card>
</section>
