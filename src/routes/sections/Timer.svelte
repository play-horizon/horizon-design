<!--
@component
Docs: Timer. Live examples of the Timer component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Timer } from '$lib/components/timer';
</script>

<section id="timer">
	<Card>
		<div class="flex justify-center">
			<Timer autoStart={true} />
		</div>
	</Card>
</section>
