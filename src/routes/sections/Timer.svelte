<!--
@component
Docs: Timer. Live examples of the Timer component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { Timer } from '#lib/components/timer/index.js';

	const labels = { start: 'Start', pause: 'Pause', resume: 'Resume', reset: 'Reset' };
</script>

<section id="timer">
	<Card>
		<div class="flex justify-center">
			<Timer autoStart={true} {labels} />
		</div>
	</Card>
</section>
